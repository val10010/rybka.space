'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { useTranslations } from 'next-intl';

import styles from './styles.module.scss';

const TelegramButton = () => {
  const t = useTranslations('common');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 100);
    };

    // Проверяем начальное положение
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className={`${styles.telegramContainer} ${!isVisible ? styles.hidden : ''}`}>
        <p className={styles.telegramText} id="chat-label">{t('needConsultation')}</p>
        <a
          href="https://t.me/rybkaspace"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.telegramButton}
          aria-labelledby="chat-label"
          role="button"
          title={t('needConsultation')}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="telegramTitle telegramDesc"
          >
            <title id="telegramTitle">{t('telegramTitle')}</title>
            <desc id="telegramDesc">{t('telegramDesc')}</desc>
            <path d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM17.8446 8.19643L15.9375 17.3839C15.7857 18.0804 15.4018 18.2411 14.8125 17.9089L11.8393 15.7232L10.4196 17.0893C10.25 17.2589 10.1071 17.4018 9.77679 17.4018L10.0089 14.3661L15.5625 9.33929C15.8214 9.11607 15.5089 8.99107 15.1696 9.21429L8.33036 13.5804L5.38393 12.6696C4.70179 12.4554 4.68750 12.0179 5.52679 11.6857L17.0357 7.33929C17.6161 7.13393 18.125 7.45714 17.8446 8.19643Z" fill="currentColor"/>
          </svg>
        </a>
      </div>
      <Script id="telegram-chat-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "ContactPoint",
            "contactType": "customer support",
            "availableLanguage": ["Ukrainian", "Russian"],
            "url": "https://t.me/rybkaspace",
            "name": "Rybka Space Customer Support Chat"
          }
        `}
      </Script>
    </>
  );
};

export default TelegramButton;
