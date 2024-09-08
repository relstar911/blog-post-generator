import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scrapeWebsite(url: string): Promise<string> {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // This is a basic example that extracts all text from <p> tags
    // You may need to adjust this based on the specific websites you're scraping
    const paragraphs = $('p').map((_, element) => $(element).text()).get();
    
    return paragraphs.join('\n\n');
  } catch (error) {
    console.error('Error scraping website:', error);
    throw new Error('Failed to scrape website');
  }
}
