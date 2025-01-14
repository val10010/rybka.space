"use client"

import React, { useCallback, useState } from 'react';
import Popup from "@/components/popup";
import Image from "next/image";

import styles from "./sizesBtn.module.scss";

const sizesBtn = ({ product }) => {
    const [isPopupOpen,  setIsPopupOpen] = useState(false);

    const handleOpenPopup = useCallback(() => {
        setIsPopupOpen(true);
    }, [setIsPopupOpen]);

    const handleClosePopup = useCallback(() => {
        setIsPopupOpen(false);
    }, [setIsPopupOpen])

    return (
        <>
            <button
                onClick={handleOpenPopup}
                className={styles.aboutInfoSizesBtn}
                aria-expanded={isPopupOpen}
                aria-haspopup="dialog"
            >
                <Image
                    width="20"
                    height="20"
                    src="/images/pages/product/sizes.svg"
                    className={styles.aboutInfoSizesBtnImg}
                    alt="Іконка таблиці розмірів"
                    aria-hidden="true"
                />
                Підібрати розмір
            </button>
            <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
                <div className={styles.popupContent}>
                    <h2 className={styles.popupContentTitle}>
                        Таблиця мірок
                    </h2>
                    <p className={styles.popupContentDesc}>
                        Мірки потрібно знімати зі свого одягу.
                        Покладіть на рівну поверхню свій спортивний костюм та зніміть заміри,
                        як показано на схемі. Якщо ви все зробите правильно, помилитися з розміром у вас не буде шансу.
                    </p>
                    <div className={styles.popupContentSizesImgWrap}>
                        <Image
                            fill
                            src="/images/pages/product/sizes.jpg"
                            alt="Схема вимірювання жіночого спортивного костюма"
                        />
                    </div>
                    <div className={styles.popupContentSizesGridWrap}>
                        <div className={styles.popupContentSizesGrid}>
                            <div className={styles.popupContentSizesGridHeader}>
                                <span>Розмір</span>
                                <span>Груди</span>
                                <span>Талія</span>
                                <span>Стегна</span>
                            </div>
                            {
                                product?.grid?.table?.map((item, i) => (
                                    <div key={i} className={styles.popupContentSizesGridRow}>
                                        <span>{item.size}</span>
                                        <span>{item.chest}</span>
                                        <span>{item.waist}</span>
                                        <span>{item.hips}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <h2 className={styles.popupContentTitle}>
                        ЯК ПРАВИЛЬНО ЗНЯТИ МІРКИ?
                    </h2>
                </div>
            </Popup>
        </>
    );
};

export default sizesBtn;
