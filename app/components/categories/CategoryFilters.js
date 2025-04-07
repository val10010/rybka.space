'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import styles from './CategoryFilters.module.scss';

/**
 * Компонент для фильтрации товаров в категории
 * @param {Array} products - Массив всех товаров в категории
 * @param {Function} onFilterChange - Функция обратного вызова при изменении фильтров
 * @param {string} locale - Текущая локаль
 */
export default function CategoryFilters({ products, onFilterChange, locale }) {
  const t = useTranslations();
  
  // Состояния для фильтров
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSeasons, setSelectedSeasons] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [currentPriceRange, setCurrentPriceRange] = useState({ min: 0, max: 0 });
  
  // Получаем уникальные значения для фильтров
  const sizes = [...new Set(products.flatMap(p => p.grid?.availableSizes || []))].sort();
  
  const colors = [...new Set(products.map(p => JSON.stringify({
    name: p.currentColor,
    id: p.id
  })))].map(c => JSON.parse(c));
  
  const uniqueColors = [];
  const colorIds = new Set();
  
  colors.forEach(color => {
    if (!colorIds.has(color.name[locale])) {
      colorIds.add(color.name[locale]);
      uniqueColors.push(color);
    }
  });
  
  const seasons = [...new Set(products.flatMap(p => 
    p.info?.season ? p.info.season[locale] : []
  ))];
  
  // Определяем диапазон цен
  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map(p => p.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      setPriceRange({ min, max });
      setCurrentPriceRange({ min, max });
    }
  }, [products]);
  
  // Обработчики изменения фильтров
  const handleSizeChange = (size) => {
    const newSizes = selectedSizes.includes(size)
      ? selectedSizes.filter(s => s !== size)
      : [...selectedSizes, size];
    
    setSelectedSizes(newSizes);
    applyFilters(newSizes, selectedColors, selectedSeasons, currentPriceRange);
  };
  
  const handleColorChange = (color) => {
    const newColors = selectedColors.includes(color)
      ? selectedColors.filter(c => c !== color)
      : [...selectedColors, color];
    
    setSelectedColors(newColors);
    applyFilters(selectedSizes, newColors, selectedSeasons, currentPriceRange);
  };
  
  const handleSeasonChange = (season) => {
    const newSeasons = selectedSeasons.includes(season)
      ? selectedSeasons.filter(s => s !== season)
      : [...selectedSeasons, season];
    
    setSelectedSeasons(newSeasons);
    applyFilters(selectedSizes, selectedColors, newSeasons, currentPriceRange);
  };
  
  const handlePriceChange = (e, type) => {
    const value = parseInt(e.target.value, 10);
    const newRange = { ...currentPriceRange, [type]: value };
    setCurrentPriceRange(newRange);
  };
  
  const handlePriceApply = () => {
    applyFilters(selectedSizes, selectedColors, selectedSeasons, currentPriceRange);
  };
  
  const resetFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedSeasons([]);
    setCurrentPriceRange(priceRange);
    onFilterChange(products);
  };
  
  // Применение фильтров
  const applyFilters = (sizes, colors, seasons, priceRange) => {
    let filteredProducts = [...products];
    
    // Фильтрация по размерам
    if (sizes.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        product.grid?.availableSizes?.some(size => sizes.includes(size))
      );
    }
    
    // Фильтрация по цветам
    if (colors.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        colors.includes(product.currentColor[locale])
      );
    }
    
    // Фильтрация по сезонам
    if (seasons.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        product.info?.season && 
        product.info.season[locale]?.some(season => seasons.includes(season))
      );
    }
    
    // Фильтрация по цене
    filteredProducts = filteredProducts.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );
    
    onFilterChange(filteredProducts);
  };
  
  return (
    <div className={styles.filters}>
      <div className={styles.filterHeader}>
        <h3 className={styles.filterTitle}>{t('products.filters')}</h3>
        <button 
          className={styles.resetButton} 
          onClick={resetFilters}
        >
          {t('products.resetFilters')}
        </button>
      </div>
      
      {/* Фильтр по размерам */}
      {sizes.length > 0 && (
        <div className={styles.filterSection}>
          <h4 className={styles.filterSectionTitle}>{t('products.size')}</h4>
          <div className={styles.filterOptions}>
            {sizes.map(size => (
              <label key={size} className={styles.filterOption}>
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(size)}
                  onChange={() => handleSizeChange(size)}
                  className={styles.filterCheckbox}
                />
                <span className={styles.filterLabel}>{size}</span>
              </label>
            ))}
          </div>
        </div>
      )}
      
      {/* Фильтр по цветам */}
      {uniqueColors.length > 0 && (
        <div className={styles.filterSection}>
          <h4 className={styles.filterSectionTitle}>{t('products.color')}</h4>
          <div className={styles.filterOptions}>
            {uniqueColors.map(color => (
              <label key={color.id} className={styles.filterOption}>
                <input
                  type="checkbox"
                  checked={selectedColors.includes(color.name[locale])}
                  onChange={() => handleColorChange(color.name[locale])}
                  className={styles.filterCheckbox}
                />
                <span className={styles.filterLabel}>{color.name[locale]}</span>
              </label>
            ))}
          </div>
        </div>
      )}
      
      {/* Фильтр по сезонам */}
      {seasons.length > 0 && (
        <div className={styles.filterSection}>
          <h4 className={styles.filterSectionTitle}>{t('products.season')}</h4>
          <div className={styles.filterOptions}>
            {seasons.map(season => (
              <label key={season} className={styles.filterOption}>
                <input
                  type="checkbox"
                  checked={selectedSeasons.includes(season)}
                  onChange={() => handleSeasonChange(season)}
                  className={styles.filterCheckbox}
                />
                <span className={styles.filterLabel}>{season}</span>
              </label>
            ))}
          </div>
        </div>
      )}
      
      {/* Фильтр по цене */}
      <div className={styles.filterSection}>
        <h4 className={styles.filterSectionTitle}>{t('product.price')}</h4>
        <div className={styles.priceInputs}>
          <div className={styles.priceInputGroup}>
            <label className={styles.priceLabel}>{t('products.minPrice')}</label>
            <input
              type="number"
              min={priceRange.min}
              max={priceRange.max}
              value={currentPriceRange.min}
              onChange={(e) => handlePriceChange(e, 'min')}
              className={styles.priceInput}
            />
          </div>
          <div className={styles.priceInputGroup}>
            <label className={styles.priceLabel}>{t('products.maxPrice')}</label>
            <input
              type="number"
              min={priceRange.min}
              max={priceRange.max}
              value={currentPriceRange.max}
              onChange={(e) => handlePriceChange(e, 'max')}
              className={styles.priceInput}
            />
          </div>
        </div>
        <button 
          className={styles.applyButton} 
          onClick={handlePriceApply}
        >
          {t('products.apply')}
        </button>
      </div>
    </div>
  );
}
