import axios from 'axios';
import * as cheerio from 'cheerio';
import { JSDOM } from 'jsdom';
import * as Readability from '@mozilla/readability';

interface ScrapedContent {
  title: string;
  content: string;
  url: string;
}

export async function scrapeWebsite(url: string): Promise<ScrapedContent> {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const contentType = response.headers['content-type'];
    if (!contentType || !contentType.includes('text/html')) {
      throw new Error('The URL does not point to an HTML page');
    }

    const html = response.data;
    const $ = cheerio.load(html);

    // Remove script tags, style tags, and comments
    $('script, style, comment').remove();

    // Try to extract content using Readability
    const dom = new JSDOM(html, { url });
    const reader = new (Readability as any).Readability(dom.window.document);
    const article = reader.parse();

    if (article) {
      return {
        title: article.title || $('title').text().trim(),
        content: article.content || $('body').text().trim(),
        url: url
      };
    }

    // Fallback to basic extraction if Readability fails
    const title = $('title').text().trim() || $('h1').first().text().trim() || 'Untitled';
    const content = $('body').text().trim();

    return { title, content, url };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new Error(`Failed to fetch website: ${error.response.status} ${error.response.statusText}`);
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('No response received from the website');
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error(`Error setting up the request: ${error.message}`);
      }
    }
    throw new Error(`Failed to scrape website: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
