export const getNodeId = (url: string | null): string | null => {
  if (!url || !url.includes('figma.com')) return null;

  try {
    const urlObj = new URL(url);
    const searchParams = urlObj.searchParams;
    const nodeId = searchParams.get('node-id');

    return nodeId || null;
  } catch {
    return null;
  }
};
