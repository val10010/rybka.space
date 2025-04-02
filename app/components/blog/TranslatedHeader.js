'use client';

import { useTranslations } from 'next-intl';
import styles from './TranslatedHeader.module.scss';

export default function TranslatedHeader({ titleKey, descriptionKey }) {
  const t = useTranslations('Blog');

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{t(titleKey)}</h1>
      {descriptionKey && (
        <p className={styles.description}>{t(descriptionKey)}</p>
      )}
    </header>
  );
}
