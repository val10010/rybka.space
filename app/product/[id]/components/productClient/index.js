"use client"

import React, { useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { innerServices } from "@/services/index";
import Link from "next/link";
import Image from "next/image";
import SizesBtn from "../sizesBtn";
import Popup from "@/components/popup";

import styles from "./productClient.module.scss";

const ProductClient = ({ product }) => {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isValid, isSubmitting },
    } = useForm({ mode: 'onChange' });

    const [selectedSize, setSize] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState();

    const handleSelectSize = useCallback((size) => {
        setSize(size)
    }, [setSize]);

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
        const res =  await innerServices.sendBotData({
            formName: 'Форма зворотного зв\'язку',
            ...data
        });

        if (res.success) {
            reset();
        }
    };

    return (
        <>
            <div className={styles.aboutInfoSizeBlock}>
                <span className={styles.aboutInfoSubtitle}>Розмір</span>
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
                                { item }
                            </button>
                        ))
                    }
                </div>
            </div>
            {
                product?.colors &&
                <div className={styles.aboutInfoColorsBlock}>
                    <span className={styles.aboutInfoSubtitle}>Кольори</span>
                    <div className={styles.aboutInfoColorsWrap}>
                        {
                            product?.colors?.map((item, i) => (
                                <Link
                                    key={i}
                                    href={'/product/' + item}
                                    className={styles.aboutInfoColors}
                                >
                                    <Image
                                        fill
                                        src={`/images/products/${item}/4.jpg`}
                                    />
                                </Link>
                            ))
                        }
                    </div>
                </div>
            }

            <SizesBtn product={product}/>

            <button
                onClick={handleBuyBtnClick}
                className={styles.aboutInfoBuyBtn}
            >
                Купити в один клік
            </button>
            <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.orderForm}>
                    <h2 className={styles.orderFormTitle}>
                        Швидке замовлення
                    </h2>
                    <div className={styles.orderFormInputWrap}>
                        <label>Призвище Ім'я*</label>
                        <input
                            type="text"
                            className={`${styles.orderFormInput} ${errors?.name?.message ? styles.orderFormInputInvalid : '' }`}
                            {...register('name', { required: 'Заповнить це поле' })}
                        />
                        <p className={`${styles.orderFormInputError}`}>{ errors?.name?.message }</p>
                    </div>
                    <div className={styles.orderFormInputWrap}>
                        <label>Номер телефону*</label>
                        <Controller
                            name="phone"
                            control={control}
                            defaultValue="+380"
                            rules={{
                                required: 'Заповнить це поле',
                                minLength: {
                                    value: 13,
                                    message: 'Введіть повний номер телефону'
                                }
                            }}
                            render={({ field: { onChange, value } }) => (
                                <input
                                    type="text"
                                    className={`${styles.orderFormInput} ${errors?.phone?.message ? styles.orderFormInputInvalid : ''}`}
                                    value={value}
                                    onChange={(e) => handlePhoneChange(e, onChange)}
                                    onKeyDown={handlePhoneKeyDown}
                                />
                            )}
                        />
                        <p className={`${styles.orderFormInputError}`}>{ errors?.phone?.message }</p>
                    </div>
                    <button
                        className={`${styles.aboutInfoBuyBtn} ${!isValid || isSubmitting ? styles.orderFormBtnDisabled : ''}`}
                        disabled={!isValid || isSubmitting}
                    >
                        Відправити
                    </button>
                </form>
            </Popup>
        </>
    );
};

export default ProductClient;
