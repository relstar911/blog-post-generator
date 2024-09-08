import { Request, Response, NextFunction } from 'express';
import { scrapeWebsite } from '../services/webScraperService';
import { generateBlogPost } from '../services/openaiService';

export const processUrlInput = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { url } = req.body;
    const scrapedContent = await scrapeWebsite(url);
    
    // You might want to process or summarize the scraped content here
    // before sending it to the OpenAI service

    const generatedContent = await generateBlogPost(scrapedContent);

    res.json({ content: generatedContent });
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

// You can add more controller functions here for other input methods
// For example, processPDFInput if you decide to implement PDF parsing
