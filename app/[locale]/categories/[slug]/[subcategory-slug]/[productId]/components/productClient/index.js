"use client"

import React, {useState, useCallback} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {innerServices} from "@/services/index";
import {useTranslations} from 'next-intl';
import Link from "next/link";
import Image from "next/image";
import {useLocale} from 'next-intl';
import {useParams} from 'next/navigation';
import ImageWithWebp from '@/components/Image'
import SizesBtn from "../sizesBtn";
import Popup from "@/components/popup";
import productsInfo from "@/mocks/productsInfo.json";

import styles from "./productClient.module.scss";

const ProductClient = ({product}) => {
    const locale = useLocale();
    const params = useParams();
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

        const newDigits = value.slice(prefix.length).replace(/\D/g, '');

        const truncatedDigits = newDigits.slice(0, 9);

        onChange(prefix + truncatedDigits);
    };

    const handlePhoneKeyDown = (e) => {
        const prefix = '+380';

        if (e.key === 'Backspace' && e.target.selectionStart <= prefix.length) {
            e.preventDefault();
        }
    };

    const onSubmit = async (data) => {
        const res = await innerServices.sendBotData({
            orderSize: selectedSize,
            orderName: product.name[locale],
            orderColor: product.currentColor[locale],
            orderPrice: product.price,
            ...data
        });

        if (res.success) {
            window.gtag && window.gtag('event', 'conversion', {
                'send_to': 'AW-16799720217/Ctj7CJaT5fEZEJnG3co-',
                'value': 1.0,
                'currency': 'UAH',
                'transaction_id': res.orderNumber
            });
            reset();
            setIsShowMessage(t('orderSuccess', {orderNumber: res.orderNumber}))
        } else {
            reset();
            setIsShowMessage(t('orderError'))
        }
    };

    return (
        <>
            <div className={styles.aboutInfoSizeBlock}>
                <span className={styles.aboutInfoSubtitle}>{t('size')}</span>
                <div className={styles.aboutInfoSizeWrap}>
                    {
                        product?.grid.sizes?.map((item, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    handleSelectSize(item)
                                }}
                                className={`${styles.aboutInfoSizeItem} ${item === selectedSize ? styles.aboutInfoSizeItemSelected : ''}`}
                            >
                                {item}
                            </button>
                        ))
                    }
                </div>
                {selectedSize && isPreOrderSize && (
                    <span className={styles.preOrderMessage}>{t('preOrder')}</span>
                )}
            </div>
            {
                product?.colors &&
                <div className={styles.aboutInfoColorsBlock}>
                    <span className={styles.aboutInfoSubtitle}>{t('colors')}</span>
                    <div className={styles.aboutInfoColorsWrap}>
                        {
                            product?.colors?.map((item, i) => {
                                const productVariant = productsInfo.find(p => p.id === item);

                                // Пропускаем, если товар не найден или отключен
                                if (!productVariant || productVariant.disabled) return null;

                                return (
                                    <Link
                                        key={i}
                                        href={`/${locale}/categories/${params.slug}/${params['subcategory-slug']}/${item}`}
                                        className={styles.aboutInfoColors}
                                    >
                                        <ImageWithWebp
                                            src={`/images/products/${item}/4.jpg`}
                                            alt={t('imageAlt', {
                                                name: productVariant.name[locale],
                                                color: productVariant.currentColor[locale]
                                            })}
                                        />
                                    </Link>
                                );
                            })
                        }
                    </div>
                </div>
            }

            {/*<SizesBtn product={product}/>*/}
            <Link className={styles.link} href="/delivery-and-payment">{t('deliveryAndPayment')}</Link>

            <button
                onClick={handleBuyBtnClick}
                className={styles.aboutInfoBuyBtn}
            >
                {t('buyOneClick')}
            </button>
            <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
                {
                    isShowMessage
                        ?
                            <div className={styles.message}>
                                <h2 className={styles.messageTxt}>
                                    {isShowMessage}
                                </h2>
                            </div>
                        :
                            <form onSubmit={handleSubmit(onSubmit)} className={styles.orderForm}>
                                <h2 className={styles.orderFormTitle}>
                                    {t('quickOrder')}
                                </h2>
                                <div className={styles.orderFormInputWrap}>
                                    <label>{t('fullName')}</label>
                                    <input
                                        type="text"
                                        className={`${styles.orderFormInput} ${errors?.name?.message ? styles.orderFormInputInvalid : ''}`}
                                        {...register('name', {required: t('fillField')})}
                                    />
                                    <p className={`${styles.orderFormInputError}`}>{errors?.name?.message}</p>
                                </div>
                                <div className={styles.orderFormInputWrap}>
                                    <label>{t('phoneNumber')}</label>
                                    <Controller
                                        name="phone"
                                        control={control}
                                        defaultValue="+380"
                                        rules={{
                                            required: t('fillField'),
                                            minLength: {
                                                value: 13,
                                                message: t('enterFullPhone')
                                            }
                                        }}
                                        render={({field: {onChange, value}}) => (
                                            <input
                                                type="text"
                                                className={`${styles.orderFormInput} ${errors?.phone?.message ? styles.orderFormInputInvalid : ''}`}
                                                value={value}
                                                onChange={(e) => handlePhoneChange(e, onChange)}
                                                onKeyDown={handlePhoneKeyDown}
                                            />
                                        )}
                                    />
                                    <p className={`${styles.orderFormInputError}`}>{errors?.phone?.message}</p>
                                </div>
                                <div className={styles.orderFormInputWrap}>
                                    <span>{t('size')}</span>
                                    <div className={`${styles.aboutInfoSizeWrap} ${styles.aboutInfoSizeWrapMargin}`}>
                                        {
                                            product?.grid.sizes?.map((item, i) => (
                                                <button
                                                    type="button"
                                                    key={i}
                                                    onClick={() => {
                                                        handleSelectSize(item)
                                                    }}
                                                    className={`${styles.aboutInfoSizeItem} ${item === selectedSize ? styles.aboutInfoSizeItemSelected : ''}`}
                                                >
                                                    {item}
                                                </button>
                                            ))
                                        }
                                    </div>
                                    {selectedSize && isPreOrderSize && (
                                        <span className={styles.preOrderMessage}>{t('preOrder')}</span>
                                    )}
                                </div>
                                <button
                                    className={`${styles.aboutInfoBuyBtn} ${!isValid || isSubmitting ? styles.orderFormBtnDisabled : ''}`}
                                    disabled={!isValid || isSubmitting}
                                >
                                    {t('send')}
                                </button>
                            </form>
                }
            </Popup>
        </>
    );
};

export default ProductClient;
