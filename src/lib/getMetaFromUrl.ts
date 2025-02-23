import * as cheerio from 'cheerio';
import { fetcher } from '@/lib/fetcher';

interface Metadata {
  name: string | null;
  image: string | null;
}

export async function getMetaFromUrl(url: string): Promise<Metadata> {
  try {
    const html = await fetcher<string>(url, { method: 'GET' });
    const $ = cheerio.load(html);

    const possibleNames = [
      $('meta[name="twitter:title"]').attr('content'),
      $('meta[property="twitter:title"]').attr('content'),
      $('meta[name="og:title"]').attr('content'),
      $('meta[property="og:title"]').attr('content'),
      $('meta[property="og:site_name"]').attr('content'),
      $('title').text(),
    ];

    const name =
      possibleNames.find(value => String(value).trim() !== 'Figma' && String(value).trim() !== '') || 'New project';

    const image =
      $('meta[property="og:image"]').attr('content') ||
      $('meta[name="twitter:image"]').attr('content') ||
      $('link[rel="image_src"]').attr('href') ||
      null;

    return { name, image };
  } catch {
    return { name: 'New project', image: null };
  }
}
