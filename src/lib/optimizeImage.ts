export const optimizeImage = async (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = async () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject('Canvas context is not available');
        return;
      }

      const size = 300;
      canvas.width = size;
      canvas.height = size;

      const scale = Math.max(size / img.width, size / img.height);
      const x = (img.width * scale - size) / 2;
      const y = (img.height * scale - size) / 2;

      ctx.drawImage(img, -x, -y, img.width * scale, img.height * scale);

      canvas.toBlob(
        async blob => {
          if (!blob) {
            reject('Failed to create blob');
            return;
          }

          const croppedFile = new File([blob], 'avatar.webp', { type: 'image/webp' });

          const imageCompression = (await import('browser-image-compression')).default;

          const compressedFile = await imageCompression(croppedFile, {
            maxWidthOrHeight: size,
            useWebWorker: true,
            fileType: 'image/webp',
            initialQuality: 0.8,
          });

          resolve(compressedFile);
        },
        'image/webp',
        0.9
      );
    };

    img.onerror = () => reject('Image loading failed');
  });
};
