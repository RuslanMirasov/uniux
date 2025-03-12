import { getFileKey } from '@/lib/figma/getFileKey';
import { getNodeId } from '@/lib/figma/getNodeId';

export const createFigmaEmbedUrl = (url: string): string => {
  if (!url || !url.includes('figma.com')) return url || '';

  const CLIENT_ID = process.env.NEXT_PUBLIC_FIGMA_CLIENT_ID;
  const EMBED_HOST = process.env.NEXT_PUBLIC_FIGMA_EMBED_URL;

  const fileKey = getFileKey(url);
  const nodeId = getNodeId(url);

  if (!fileKey || !nodeId) return url;

  return `https://embed.figma.com/proto/${fileKey}?embed-host=${EMBED_HOST}&client-id=${CLIENT_ID}&node-id=${nodeId}&scaling=fit-width&hide-ui=1`;
};
