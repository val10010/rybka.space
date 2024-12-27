"use client"

import React, { useCallback, useState } from 'react';
import Popup from "@/components/popup";
import Image from "next/image";

import SizeGrid from "../sizeGrid";

import styles from "./sizesBtn.module.scss";

const sizesBtn = ({ product }) => {
    const [isPopupOpen,  setIsPopupOpen] = useState(false);

    const handleShowPopup = useCallback(() => {
        setIsPopupOpen(true);
    }, [setIsPopupOpen]);

    const handleHidePopup = useCallback(() => {
        setIsPopupOpen(false);
    }, [setIsPopupOpen])

    return (
        <>
            <button className={styles.aboutInfoSizesBtn} onClick={handleShowPopup}>
                <Image
                    width="20"
                    height="20"
                    src="/images/pages/product/sizes.svg"
                    className={styles.aboutInfoSizesBtnImg}
                    alt="Іконка таблиці розмірів"
                />
                Підібрати розмір
            </button>
            <Popup
                isOpen={isPopupOpen}
                onClose={handleHidePopup}

            >
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
                        <SizeGrid product={product} className={styles.sizeGrid} />
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
