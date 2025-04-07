'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { getMainCategories } from '../../../../services/categoryService';
import styles from './categories.module.scss';

export default function HomeCategories() {
  const locale = useLocale();
  const t = useTranslations('categories');
  
  // Получаем основные категории
  const mainCategories = getMainCategories();
  
  if (!mainCategories || mainCategories.length === 0) {
    return null;
  }
  
  return (
    <section className={styles.categoriesSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>{t('title')}</h2>
        
        <div className={styles.categoriesGrid}>
          {mainCategories.map(category => (
            <Link 
              href={`/${locale}/category/${category.slug[locale]}`}
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
      </div>
    </section>
  );
}
