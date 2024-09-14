import { PDFExtract } from 'pdf.js-extract';

export async function parsePDF(filePath: string): Promise<{ text: string; metadata: any; numpages: number }> {
  const pdfExtract = new PDFExtract();
  const options = {}; // specify any options here

  try {
    const data = await pdfExtract.extract(filePath, options);
    
    const text = data.pages.map(page => page.content.map(item => item.str).join(' ')).join('\n');
    const metadata = data.meta;
    const numpages = data.pages.length;

    return { text, metadata, numpages };
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
