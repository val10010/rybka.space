'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { getAllCategories } from '../../services/categoryService';
import styles from './CategorySidebar.module.scss';

export default function CategorySidebar({ currentCategoryId }) {
  const locale = useLocale();
  const t = useTranslations('categories');

  // Получаем все категории
  const categories = getAllCategories();

  if (!categories || categories.length === 0) {
    return null;
  }

  // Отфильтруем текущую категорию и отсортируем по приоритету
  const sidebarCategories = categories
    .filter(category => category.id !== currentCategoryId)
    .sort((a, b) => (b.priority || 0) - (a.priority || 0)); // Показываем все категории, без ограничения

  return (
    <div className={styles.sidebar}>
      <h3 className={styles.sidebarTitle}>{t('title')}</h3>

      <ul className={styles.categoryList}>
        {sidebarCategories.map(category => (
          <li key={category.id} className={styles.categoryItem}>
            <Link
              href={`/${locale}/categories/${category.slug[locale]}`}
              className={styles.categoryLink}
            >
              {category.image && (
                <div className={styles.categoryImageWrapper}>
                  <Image
                    src={category.image}
                    alt={category.name[locale]}
                    width={40}
                    height={40}
                    className={styles.categoryImage}
                  />
                </div>
              )}
              <span className={styles.categoryName}>{category.name[locale]}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
