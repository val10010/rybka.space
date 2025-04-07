"use client"

import React, { useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import Popup from "@/components/popup";
import Image from "next/image";

import styles from "./sizesBtn.module.scss"

const sizesBtn = ({ product }) => {
    const t = useTranslations('components.sizesBtn');
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleOpenPopup = useCallback(() => {
        setIsPopupOpen(true);
    }, []);

    const handleClosePopup = useCallback(() => {
        setIsPopupOpen(false);
    }, []);

    return (
        <>
            <button
                type="button"
                className={styles.aboutInfoSizesBtn}
                onClick={handleOpenPopup}
            >
                <Image
                    src="/images/size.svg"
                    width={20}
                    height={20}
                    alt={t('iconAlt')}
                    className={styles.icon}
                />
                {t('selectSize')}
            </button>
            <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
                <div className={styles.popupContent}>
                    <h2 className={styles.popupContentTitle}>
                        {t('sizeTable')}
                    </h2>
                    <p className={styles.popupContentDesc}>
                        {t('measurementInstructions')}
                        {t('measurementDetails')}
                    </p>
                    <div className={styles.popupContentSizesImgWrap}>
                        <Image
                            src="/images/schema.webp"
                            width={500}
                            height={500}
                            alt={t('schemaAlt')}
                            className={styles.schema}
                        />
                    </div>
                    <div className={styles.popupContentSizesGridWrap}>
                        <div className={styles.popupContentSizesGrid}>
                            <div className={styles.popupContentSizesGridHeader}>
                                <span>{t('size')}</span>
                                <span>{t('chest')}</span>
                                <span>{t('waist')}</span>
                                <span>{t('hips')}</span>
                            </div>
                            {product?.grid?.table?.map((item, i) => (
                                <div key={i} className={styles.popupContentSizesGridRow}>
                                    <span>{item.size}</span>
                                    <span>{item.chest}</span>
                                    <span>{item.waist}</span>
                                    <span>{item.hips}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <h2 className={styles.popupContentTitle}>
                        {t('howToMeasure')}
                    </h2>
                </div>
            </Popup>
        </>
    );
};

export default sizesBtn;
