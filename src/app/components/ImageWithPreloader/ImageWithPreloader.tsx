'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import css from './ImageWithPreloader.module.scss';

const PLACEHOLDER_SRC = '/placeholder.webp';

interface ImageWithPreloaderProps extends Omit<ImageProps, 'src'> {
  src?: string | null | undefined;
}

const ImageWithPreloader: React.FC<ImageWithPreloaderProps> = ({ src, alt, ...props }) => {
  const [imageSrc, setImageSrc] = useState<string>(src || PLACEHOLDER_SRC);
  const [isLoading, setIsLoading] = useState(true);

  const onImageLoad = () => {
    setIsLoading(false);
  };

  const onImageError = () => {
    setImageSrc(PLACEHOLDER_SRC);
  };

  return (
    <div className={`${css.imageWrapper} ${isLoading ? css.Loading : ''}`}>
      <Image {...props} alt={alt || 'Placeholder image'} src={imageSrc} onLoad={onImageLoad} onError={onImageError} />
    </div>
  );
};

export default ImageWithPreloader;
