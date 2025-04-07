'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import styles from './VisitorCounter.module.scss';

export default function VisitorCounter() {
  const t = useTranslations('product');
  const [visitors, setVisitors] = useState(0);
  
  useEffect(() => {
    // Генерируем случайное число посетителей от 5 до 20
    const randomVisitors = Math.floor(Math.random() * 16) + 5;
    setVisitors(randomVisitors);
    
    // Обновляем число посетителей каждые 30 секунд
    const interval = setInterval(() => {
      // Случайное изменение от -2 до +3
      const change = Math.floor(Math.random() * 6) - 2;
      setVisitors(prev => {
        const newValue = prev + change;
        // Убеждаемся, что число посетителей не меньше 3 и не больше 25
        return Math.max(3, Math.min(25, newValue));
      });
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={styles.counter}>
      <span className={styles.icon}>👁️</span>
      <span className={styles.text}>
        {t('currentlyViewing', { count: visitors })}
      </span>
    </div>
  );
}
