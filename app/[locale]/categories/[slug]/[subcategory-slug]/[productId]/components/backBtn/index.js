'use client';

import { useRouter, useParams } from "next/navigation";
import { useTranslations } from 'next-intl';

import styles from "./backBtn.module.scss";

const BackBtn = () => {
    const router = useRouter();
    const params = useParams();
    const t = useTranslations('product');
    
    const handleBack = () => {
        // Возвращаемся на страницу подкатегории
        router.push(`/${params.locale}/categories/${params.slug}/${params['subcategory-slug']}`);
    };

    return (
        <button
            onClick={handleBack}
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
