'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { getMainCategories } from '../../../../services/categoryService';
import styles from './featured-categories.module.scss';

export default function FeaturedCategories() {
  const locale = useLocale();
  const t = useTranslations('categories');
  
  // Получаем основные категории и берем только 3 для главной страницы
  const featuredCategories = getMainCategories().slice(0, 3);
  
  if (!featuredCategories || featuredCategories.length === 0) {
    return null;
  }
  
  return (
    <section className={styles.featuredSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t('title')}</h2>
          <Link href={`/${locale}/categories`} className={styles.viewAllLink}>
            {t('viewAll')}
          </Link>
        </div>
        
        <div className={styles.categoriesGrid}>
          {featuredCategories.map(category => (
            <Link 
              href={`/${locale}/categories/${category.slug[locale]}`}
              key={category.id}
              className={styles.categoryCard}
            >
              <div className={styles.imageWrapper}>
                {category.image && (
                  <Image
                    src={category.image}
                    alt={category.name[locale]}
                    width={400}
                    height={300}
                    className={styles.categoryImage}
                  />
                )}
                <div className={styles.categoryOverlay}>
                  <span className={styles.viewButton}>{t('viewAll')}</span>
                </div>
              </div>
              <div className={styles.categoryInfo}>
                <h3 className={styles.categoryName}>{category.name[locale]}</h3>
                <p className={styles.categoryDescription}>{category.description[locale]}</p>
              </div>
            </Link>
          ))}
        </div>
        
        <div className={styles.allCategoriesLink}>
          <Link href={`/${locale}/categories`} className={styles.button}>
            {t('exploreAllCategories')}
          </Link>
        </div>
      </div>
    </section>
  );
}
