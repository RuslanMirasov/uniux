export const getFileKey = (url: string | null): string | null => {
  if (!url || !url.includes('figma.com')) return null;

  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');

    const fileKeyIndex = pathParts.indexOf('proto') + 1;
    const fileKey = fileKeyIndex > 0 ? pathParts[fileKeyIndex] : null;

    return fileKey || null;
  } catch {
    return null;
  }
};
