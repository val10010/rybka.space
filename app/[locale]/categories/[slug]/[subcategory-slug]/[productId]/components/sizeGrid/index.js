"use client"

import React from "react";
import { useTranslations } from 'next-intl';

import styles from "./sizeGrid.module.scss"

const SizeGrid = ({ product, className }) => {
    const t = useTranslations('components.sizeGrid');

    return (
        <table className={`${styles.table} ${className}`} cellPadding="15">
            <thead>
                <tr className={styles.tableTitle}>
                    <th></th>
                    {product.grid.sizes.map((item, index) => (
                        <th key={index}>{item}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>{t('topLength')}</th>
                    {product.grid.topLength.map((item, index) => (
                        <td key={index}>{item}</td>
                    ))}
                </tr>
                <tr>
                    <th>{t('sleeve')}</th>
                    {product.grid.arm.map((item, index) => (
                        <td key={index}>{item}</td>
                    ))}
                </tr>
                <tr>
                    <th>{t('chest')}</th>
                    {product.grid.breast.map((item, index) => (
                        <td key={index}>{item}</td>
                    ))}
                </tr>
                <tr>
                    <th>{t('shoulders')}</th>
                    {product.grid.shoulder.map((item, index) => (
                        <td key={index}>{item}</td>
                    ))}
                </tr>
                <tr>
                    <th>{t('pantsLength')}</th>
                    {product.grid.shanksLength.map((item, index) => (
                        <td key={index}>{item}</td>
                    ))}
                </tr>
                <tr>
                    <th>{t('hips')}</th>
                    {product.grid.thigh.map((item, index) => (
                        <td key={index}>{item}</td>
                    ))}
                </tr>
                <tr>
                    <th>{t('waistUnstretched')}</th>
                    {product.grid.stretchedBelt.map((item, index) => (
                        <td key={index}>{item}</td>
                    ))}
                </tr>
                <tr>
                    <th>{t('waistStretched')}</th>
                    {product.grid.notStretchedBelt.map((item, index) => (
                        <td key={index}>{item}</td>
                    ))}
                </tr>
            </tbody>
        </table>
    );
};

export default SizeGrid;
