'use client';

import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';

import styles from "./backBtn.module.scss";

const BackBtn = () => {
    const router = useRouter();
    const t = useTranslations('product');

    return (
        <button
            onClick={() => router.push('/')}
            className={styles.backBtn}
        >
           <img
               className={styles.backBtnIcon}
               src={'/images/backBtn.svg'}
               alt={t('backAlt')}
           />
            {t('back')}
        </button>
    );
}

export default BackBtn;
