'use client';

import { useState } from 'react';
import CategoryFilters from '../../../components/categories/CategoryFilters';
import CategoryProducts from '../../../components/categories/CategoryProducts';
import CategorySidebar from '../../../components/categories/CategorySidebar';
import styles from './client-page.module.scss';

/**
 * Клиентский компонент страницы категории с фильтрами
 * @param {Array} products - Массив товаров категории
 * @param {string} locale - Текущая локаль
 * @param {string} categoryId - ID текущей категории
 */
export default function CategoryClientPage({ products, locale, categoryId }) {
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  // Обработчик изменения фильтров
  const handleFilterChange = (newFilteredProducts) => {
    setFilteredProducts(newFilteredProducts);
  };
  
  return (
    <div className={styles.layout}>
      {/* Боковая панель с фильтрами и категориями */}
      <aside className={styles.sidebar}>
        <CategorySidebar currentCategoryId={categoryId} />
        <CategoryFilters 
          products={products} 
          onFilterChange={handleFilterChange}
          locale={locale}
        />
      </aside>
      
      {/* Основной контент с товарами */}
      <main className={styles.content}>
        <div className={styles.resultsInfo}>
          <span className={styles.resultsCount}>
            {filteredProducts.length} {locale === 'uk' ? 'товарів' : 'товаров'}
          </span>
        </div>
        <CategoryProducts products={filteredProducts} locale={locale} />
      </main>
    </div>
  );
}
