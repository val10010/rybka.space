'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import styles from './BlogAnalytics.module.scss';

export default function BlogAnalytics({ post, locale }) {
  const t = useTranslations('Blog');

  // Подсчет примерного времени чтения
  const readingTime = Math.ceil(post.content[locale].reduce((acc, block) => {
    if (block.type === 'paragraph') {
      return acc + block.text.split(' ').length / 200; // 200 слов в минуту
    }
    return acc;
  }, 0));

  useEffect(() => {
    // Проверка, что мы в браузере
    if (typeof window === 'undefined') return;

    // Отправка события просмотра страницы
    if (window.gtag) {
      window.gtag('event', 'view_item', {
        item_type: 'blog_post',
        item_id: post.slug,
        item_name: post.title[locale],
        item_category: 'Blog'
      });
    }

    // Отслеживание времени чтения
    let startTime = Date.now();
    let isReading = true;
    let scrollHandler;
    let visibilityHandler;

    // Обработчик видимости страницы
    visibilityHandler = () => {
      if (document.hidden) {
        isReading = false;
      } else {
        startTime = Date.now();
        isReading = true;
      }
    };

    // Обработчик прокрутки для отслеживания активности
    scrollHandler = () => {
      if (isReading) {
        // Обновляем активность при прокрутке
        isReading = true;
      }
    };

    // Добавляем обработчики событий
    document.addEventListener('visibilitychange', visibilityHandler);
    window.addEventListener('scroll', scrollHandler, { passive: true });

    // Функция очистки
    return () => {
      // Удаляем все обработчики
      document.removeEventListener('visibilitychange', visibilityHandler);
      window.removeEventListener('scroll', scrollHandler);
      
      // Отправляем событие о времени чтения при размонтировании
      if (window.gtag && isReading) {
        const readTime = Math.round((Date.now() - startTime) / 1000);
        window.gtag('event', 'read_article', {
          article_id: post.slug,
          article_title: post.title[locale],
          read_time: readTime
        });
      }
    };
  }, [post.slug, post.title, locale]);

  return (
    <div className={styles.analytics}>
      <span className={styles.readingTime}>
        {t('readingTime', { minutes: readingTime })}
      </span>
    </div>
  );
}
