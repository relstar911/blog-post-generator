import { Request, Response, NextFunction } from 'express';
import { scrapeWebsite } from '../services/webScraperService';
import { generateBlogPost, extractKeywords } from '../services/openaiService';
import { parsePDF } from '../services/pdfParseService';
import * as fs from 'fs';

export const processUrlInput = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { url } = req.body;
    const scrapedContent = await scrapeWebsite(url);
    const prompt = `Title: ${scrapedContent.title}\n\nContent: ${scrapedContent.content}\n\nWrite a blog post based on this content:`;
    const generatedContent = await generateBlogPost(prompt);

    res.json({ content: generatedContent, originalTitle: scrapedContent.title, sourceUrl: scrapedContent.url });
  } catch (error) {
    next(error);
  }
};

export const processTextInput = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { text } = req.body;
    const generatedContent = await generateBlogPost(text);

    res.json({ content: generatedContent });
  } catch (error) {
    next(error);
  }
};

export const processPDFInput = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No PDF file uploaded' });
    }

    const pdfContent = await parsePDF(req.file.path);
    const prompt = `Title: ${pdfContent.metadata.title || 'Untitled PDF'}\n\nContent: ${pdfContent.text}\n\nWrite a blog post based on this content:`;
    const generatedContent = await generateBlogPost(prompt);

    // Clean up the uploaded file
    fs.unlinkSync(req.file.path);

    res.json({
      content: generatedContent,
      originalTitle: pdfContent.metadata.title || 'Untitled PDF',
      metadata: pdfContent.metadata,
      pageCount: pdfContent.numpages,
    });
  } catch (error) {
    next(error);
  }
};

// You can add more controller functions here for other input methods
// For example, processPDFInput if you decide to implement PDF parsing
