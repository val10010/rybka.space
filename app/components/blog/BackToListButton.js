'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import styles from './BackToListButton.module.scss';

export default function BackToListButton({ locale }) {
  const t = useTranslations('Blog');

  return (
    <div className={styles.navigation}>
      <Link href={`/${locale}/blog`} className={styles.backButton}>
        {t('backToBlog')}
      </Link>
    </div>
  );
}
