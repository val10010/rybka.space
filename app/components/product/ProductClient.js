'use client'

import React, {useState, useCallback} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {innerServices} from "@/services/index";
import {useTranslations} from 'next-intl';
import Link from "next/link";
import Image from "next/image";
import {useLocale} from 'next-intl';
import ImageWithWebp from '@/components/Image'
import Popup from "@/components/popup";
import productsInfo from "@/mocks/productsInfo.json";
import { getCategoryByProductId } from '@/services/categoryService';
import styles from "./ProductClient.module.scss";

// Вспомогательная функция для получения slug категории товара
function getCategorySlugForProduct(productId, locale) {
  const category = getCategoryByProductId(productId);
  return category ? category.slug[locale] : 'zhinochi-kostyumy';
}

const ProductClient = ({product}) => {
    const locale = useLocale();
    const t = useTranslations('product.client');
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: {errors, isValid, isSubmitting},
    } = useForm({mode: 'onChange'});

    const [selectedSize, setSize] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState();
    const [isShowMessage, setIsShowMessage] = useState();
    const [isPreOrderSize, setIsPreOrderSize] = useState(false);

    const handleSelectSize = useCallback((size) => {
        setSize(size);
        setIsPreOrderSize(!product?.grid?.availableSizes?.includes(size));
    }, [setSize, product?.grid?.availableSizes]);

    const handleBuyBtnClick = useCallback(() => {
        setIsPopupOpen(true);
    }, []);

    const handleClosePopup = useCallback(() => {
        setIsPopupOpen(false);
    }, [])

    const handlePhoneChange = (e, onChange) => {
        const prefix = '+380';
        let value = e.target.value;

        if (value.length < prefix.length) {
            onChange(prefix);
            return;
        }

        if (value.startsWith(prefix)) {
            value = value.slice(prefix.length);
        }

        value = value.replace(/\D/g, '');

        if (value.length > 9) {
            value = value.slice(0, 9);
        }

        onChange(`${prefix}${value}`);
    };

    const onSubmit = async (data) => {
        try {
            await innerServices.sendOrder({
                ...data,
                product: product.name[locale],
                color: product.currentColor[locale],
                price: product.price,
                size: selectedSize,
                isPreOrderSize
            });
            reset();
            setIsShowMessage(true);
            setSize('');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <div className={styles.aboutInfoSizes}>
                <span className={styles.aboutInfoSubtitle}>{t('size')}</span>
                <div className={styles.aboutInfoSizesWrap}>
                    {
                        product?.grid?.sizes?.map((item, i) => {
                            const isAvailable = product?.grid?.availableSizes?.includes(item);
                            return (
                                <button
                                    key={i}
                                    className={`${styles.aboutInfoSizesItem} ${selectedSize === item ? styles.active : ''} ${!isAvailable ? styles.disabled : ''}`}
                                    onClick={() => handleSelectSize(item)}
                                    disabled={!isAvailable}
                                >
                                    {item}
                                </button>
                            )
                        })
                    }
                </div>
                <SizesBtn/>
            </div>
            <div className={styles.aboutInfoColors}>
                <span className={styles.aboutInfoSubtitle}>{t('color')}</span>
                <div className={styles.aboutInfoColorsWrap}>
                    {
                        product?.colors?.map((item, i) => {
                            const colorProduct = productsInfo.filter(product => product.id === item)[0];

                            if (colorProduct.disabled) return null;

                            // Получаем slug категории для товара с другим цветом
                            const categorySlug = getCategorySlugForProduct(item, locale);

                            return (
                                <Link
                                    key={i}
                                    href={`/${locale}/categories/${categorySlug}/${item}`}
                                    className={styles.aboutInfoColors}
                                >
                                    <ImageWithWebp
                                        src={`/images/products/${item}/4.jpg`}
                                        alt={t('imageAlt', {
                                            name: productsInfo.filter(product => product.id === item)[0].name[locale],
                                            color: productsInfo.filter(product => product.id === item)[0].currentColor[locale]
                                        })}
                                    />
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
            <div className={styles.aboutInfoBtn}>
                <button
                    className={`${styles.aboutInfoBuyBtn} ${!selectedSize ? styles.disabled : ''}`}
                    onClick={handleBuyBtnClick}
                    disabled={!selectedSize}
                >
                    {isPreOrderSize ? t('preOrder') : t('buy')}
                </button>
            </div>

            <Popup
                isOpen={isPopupOpen}
                onClose={handleClosePopup}
                title={isShowMessage ? t('thanks') : t('order')}
            >
                {
                    isShowMessage ? (
                        <div className={styles.message}>
                            <p className={styles.messageText}>{t('orderSuccess')}</p>
                            <button
                                className={styles.messageBtn}
                                onClick={handleClosePopup}
                            >
                                {t('close')}
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name" className={styles.label}>{t('name')}</label>
                                <input
                                    id="name"
                                    type="text"
                                    className={styles.input}
                                    {...register('name', {required: true})}
                                />
                                {errors.name && <span className={styles.error}>{t('required')}</span>}
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="phone" className={styles.label}>{t('phone')}</label>
                                <Controller
                                    name="phone"
                                    control={control}
                                    defaultValue="+380"
                                    rules={{
                                        required: true,
                                        validate: value => value.length === 13
                                    }}
                                    render={({field: {onChange, value}}) => (
                                        <input
                                            id="phone"
                                            type="tel"
                                            className={styles.input}
                                            value={value}
                                            onChange={(e) => handlePhoneChange(e, onChange)}
                                        />
                                    )}
                                />
                                {errors.phone && <span className={styles.error}>{t('invalidPhone')}</span>}
                            </div>
                            <button
                                type="submit"
                                className={styles.submitBtn}
                                disabled={!isValid || isSubmitting}
                            >
                                {isSubmitting ? t('sending') : t('send')}
                            </button>
                        </form>
                    )
                }
            </Popup>
        </>
    );
};

// Вспомогательный компонент SizesBtn
const SizesBtn = () => {
    const t = useTranslations('product.client');
    
    return (
        <button className={styles.sizesBtn}>
            {t('sizesTable')}
        </button>
    );
};

export default ProductClient;
