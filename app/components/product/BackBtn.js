'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import styles from './BackBtn.module.scss';

export default function BackBtn() {
  const router = useRouter();
  const t = useTranslations('product');
  
  return (
    <button 
      className={styles.backBtn} 
      onClick={() => router.back()}
      aria-label={t('back')}
    >
      ← {t('back')}
    </button>
  );
}
