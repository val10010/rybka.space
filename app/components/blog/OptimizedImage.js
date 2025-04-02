'use client';

import Image from 'next/image';
import { useState } from 'react';
import styles from './OptimizedImage.module.scss';

export default function OptimizedImage({ src, alt, width, height, priority = false }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`${styles.wrapper} ${isLoading ? styles.loading : ''}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={`${styles.image} ${isLoading ? styles.loading : ''}`}
        onLoadingComplete={() => setIsLoading(false)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={85}
        loading={priority ? 'eager' : 'lazy'}
      />
      {isLoading && (
        <div className={styles.skeleton} />
      )}
    </div>
  );
}
