'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { getPopularProductsByCategory } from '../../services/categoryService';
import styles from './PopularCategoryProducts.module.scss';

/**
 * Компонент для отображения популярных товаров в категории
 * @param {string} categoryId - ID категории
 * @param {number} limit - Максимальное количество товаров для отображения
 */
export default function PopularCategoryProducts({ categoryId, limit = 4 }) {
  const locale = useLocale();
  const t = useTranslations('products');
  
  // Получаем популярные товары категории
  const popularProducts = getPopularProductsByCategory(categoryId, limit);
  
  if (!popularProducts || popularProducts.length === 0) {
    return null;
  }
  
  return (
    <section className={styles.popularProducts}>
      <h2 className={styles.title}>{t('popularInCategory')}</h2>
      
      <div className={styles.productsGrid}>
        {popularProducts.map(product => (
          <Link 
            href={`/${locale}/product/${product.id}`}
            key={product.id}
            className={styles.productCard}
          >
            <div className={styles.imageWrapper}>
              {product.images && product.images.length > 0 && (
                <Image
                  src={`/images/products/${product.id}/${product.images[0]}.jpg`}
                  alt={product.name[locale]}
                  width={250}
                  height={350}
                  className={styles.productImage}
                />
              )}
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{product.name[locale]}</h3>
              <div className={styles.productPrice}>
                {product.oldPrice && (
                  <span className={styles.oldPrice}>
                    {product.oldPrice} ₴
                  </span>
                )}
                <span className={styles.price}>{product.price} ₴</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
