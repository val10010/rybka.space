'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Pagination } from 'swiper/modules';
import { useTranslations } from 'next-intl';
import styles from './VariantsSlider.module.scss';

// Импортируем стили Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

export default function VariantsSlider({ product }) {
  const t = useTranslations('product');
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  
  return (
    <div className={styles.sliderContainer}>
      {product.discount > 0 && (
        <div className={styles.discountBadge}>-{product.discount}%</div>
      )}
      
      <Swiper
        modules={[Navigation, Thumbs, Pagination]}
        spaceBetween={10}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        pagination={{ clickable: true }}
        className={styles.mainSlider}
      >
        {product.images.map((imageId) => (
          <SwiperSlide key={imageId} className={styles.slide}>
            <Image
              src={`/images/products/${product.id}/${imageId}.webp`}
              alt={product.name.uk}
              width={600}
              height={900}
              className={styles.productImage}
              priority={imageId === product.images[0]}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      
      <Swiper
        modules={[Thumbs]}
        watchSlidesProgress
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        className={styles.thumbsSlider}
      >
        {product.images.map((imageId) => (
          <SwiperSlide key={imageId} className={styles.thumbSlide}>
            <Image
              src={`/images/products/${product.id}/${imageId}.webp`}
              alt={`${product.name.uk} - миниатюра ${imageId}`}
              width={100}
              height={150}
              className={styles.thumbImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
