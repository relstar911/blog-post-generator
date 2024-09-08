import fs from 'fs';
import pdf from 'pdf-parse';

interface PDFContent {
  text: string;
  metadata: {
    title?: string;
    author?: string;
    subject?: string;
    keywords?: string;
    creationDate?: Date;
    modificationDate?: Date;
  };
  numpages: number;
}

interface ExtendedOptions extends pdf.Options {
  includeFormData?: boolean;
}

export async function parsePDF(filePath: string): Promise<PDFContent> {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const options: ExtendedOptions = {
      // Increase max pages to parse if needed
      max: 0,
      // Enable parsing form fields
      includeFormData: true,
    };

    const data = await pdf(dataBuffer, options as pdf.Options);

    // Extract text content
    let text = data.text;

    // Handle potential OCR content
    if (text.trim().length === 0) {
      console.warn('No text content found. The PDF might be scanned or contain images only.');
      text = 'This PDF appears to be scanned or contain only images. Please provide a text-based PDF for better results.';
    }

    // Extract metadata
    const metadata = {
      title: data.info.Title,
      author: data.info.Author,
      subject: data.info.Subject,
      keywords: data.info.Keywords,
      creationDate: data.info.CreationDate ? new Date(data.info.CreationDate) : undefined,
      modificationDate: data.info.ModDate ? new Date(data.info.ModDate) : undefined,
    };

    // Clean up the text content
    text = cleanPDFText(text);

    return {
      text,
      metadata,
      numpages: data.numpages,
    };
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw new Error('Failed to parse PDF');
  }
}

function cleanPDFText(text: string): string {
  // Remove excessive whitespace
  text = text.replace(/\s+/g, ' ').trim();

  // Remove page numbers (assuming they're at the end of each page)
  text = text.replace(/\n\d+(\n|$)/g, '\n');

  // Remove headers and footers (assuming they're repeated on each page)
  const lines = text.split('\n');
  const headerFooterThreshold = Math.floor(lines.length * 0.1); // 10% of total lines
  const lineFrequency: { [key: string]: number } = {};

  lines.forEach(line => {
    lineFrequency[line] = (lineFrequency[line] || 0) + 1;
  });

  const cleanedLines = lines.filter(line => {
    return lineFrequency[line] <= headerFooterThreshold;
  });

  return cleanedLines.join('\n');
}

export async function extractTableFromPDF(filePath: string): Promise<string[][]> {
  // This is a placeholder for table extraction functionality
  // Implementing robust table extraction from PDFs is complex and often requires
  // specialized libraries or machine learning models
  console.warn('Table extraction from PDF is not implemented yet.');
  return [['Table extraction not available']];
}
