import * as cheerio from 'cheerio';
import { fetcher } from '@/lib/fetcher';

interface Metadata {
  name: string | null;
  image: string | null;
}

export async function getMetaFromUrl(url: string): Promise<Metadata> {
  try {
    const html = await fetcher<string>(url, {
      method: 'GET',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.104 Safari/537.36',
      },
    });
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
      $('meta[name="twitter:image"]').attr('content') ||
      $('meta[property="og:image"]').attr('content') ||
      $('link[rel="image_src"]').attr('href') ||
      null;

    return { name, image };
  } catch {
    return { name: 'New project', image: null };
  }
}
