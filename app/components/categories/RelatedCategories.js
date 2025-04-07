'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { 
  getRelatedCategories, 
  getParentCategory 
} from '../../services/categoryService';
import styles from './RelatedCategories.module.scss';

/**
 * Компонент для отображения связанных категорий
 * @param {string} categoryId - ID текущей категории
 */
export default function RelatedCategories({ categoryId }) {
  const locale = useLocale();
  const t = useTranslations('categories');
  
  // Получаем родительскую категорию
  const parentCategory = getParentCategory(categoryId);
  
  // Получаем связанные категории (сестринские или дочерние)
  const relatedCategories = getRelatedCategories(categoryId);
  
  if (relatedCategories.length === 0) {
    return null;
  }
  
  return (
    <section className={styles.relatedCategories}>
      <h2 className={styles.title}>
        {parentCategory 
          ? `${t('exploreMore')} ${parentCategory.name[locale]}` 
          : t('exploreCategories')}
      </h2>
      
      <div className={styles.categoriesGrid}>
        {relatedCategories.map(category => (
          <Link 
            href={`/${locale}/categories/${category.slug[locale]}`}
            key={category.id}
            className={styles.categoryLink}
          >
            <span className={styles.categoryName}>{category.name[locale]}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
