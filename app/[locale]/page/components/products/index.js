"use client"

import React, { useState, useMemo } from 'react';
import Product from "./components/product";
import productsInfo from "@/mocks/productsInfo.json";
import reviewsData from "@/mocks/reviews.json";
import styles from "./products.module.scss";
import Reviews from "@/components/reviews";
import {VideoPlayer} from "@/components/videoPlayer";
import { useLocale, useTranslations } from 'next-intl';

export default function Products() {
    const [selectedSize, setSelectedSize] = useState('all');
    const [isFleece, setIsFleece] = useState('all');
    const [selectedColor, setSelectedColor] = useState('all');
    const locale = useLocale();
    const t = useTranslations('products');

    const { reviews } = reviewsData;
    const hasReviews = reviews && reviews.length > 0;
    const averageRating = hasReviews
        ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
        : "0";

    const availableSizes = useMemo(() => {
        const sizes = new Set();
        productsInfo.filter(product => !product.disabled).forEach(product => {
            product.grid.sizes.forEach(size => sizes.add(size));
        });
        const sizeOrder = { s: 1, m: 2, l: 3, xl: 4, xxl: 5 };
        const sortedSizes = Array.from(sizes).sort((a, b) => {
            return (sizeOrder[a.toLowerCase()] || 999) - (sizeOrder[b.toLowerCase()] || 999);
        });
        return ['all', ...sortedSizes];
    }, []);

    const availableColors = useMemo(() => {
        const colors = new Set();
        productsInfo.filter(product => !product.disabled).forEach(product => {
            colors.add(product.currentColor[locale]);
        });
        return ['all', ...Array.from(colors)];
    }, []);

    const filteredProducts = useMemo(() => {
        return productsInfo.filter(product => {
            if (product.disabled) return false;

            const sizeMatch = selectedSize === 'all' || product.grid.sizes.includes(selectedSize);
            const colorMatch = selectedColor === 'all' || product.currentColor[locale] === selectedColor;
            const fleeceMatch = isFleece === 'all' ||
                (isFleece === 'yes' && product.name['uk'].toLowerCase().includes('фліс')) ||
                (isFleece === 'no' && !product.name['uk'].toLowerCase().includes('фліс'));

            return sizeMatch && colorMatch && fleeceMatch;
        });
    }, [selectedSize, selectedColor, isFleece]);

    // Generate structured data for products
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": filteredProducts.map((product, index) => {
            const productData = {
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "Product",
                    "name": `${product.name[locale]} - ${product.currentColor[locale]}`,
                    "description": product.info.desc[locale],
                    "image": product.images.map(img => `https://rybkaspace.com/images/products/${product.id}/${img}.jpg`),
                    "sku": `RS-${product.id}`,
                    "brand": {
                        "@type": "Brand",
                        "name": "Rybka Space"
                    },
                    "offers": {
                        "@type": "Offer",
                        "url": `https://rybkaspace.com/product/${product.id}`,
                        "price": product.price.toString(),
                        "priceCurrency": "UAH",
                        "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
                        "itemCondition": "https://schema.org/NewCondition",
                        "availability": product.disabled ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
                        "seller": {
                            "@type": "Organization",
                            "name": "Rybka Space"
                        }
                    }
                }
            };

            if (hasReviews) {
                productData.item.aggregateRating = {
                    "@type": "AggregateRating",
                    "ratingValue": averageRating,
                    "reviewCount": reviews.length.toString(),
                    "bestRating": "5",
                    "worstRating": "1"
                };

                productData.item.review = reviews.map(review => ({
                    "@type": "Review",
                    "reviewRating": {
                        "@type": "Rating",
                        "ratingValue": review.rating.toString(),
                        "bestRating": "5",
                        "worstRating": "1"
                    },
                    "author": {
                        "@type": "Person",
                        "name": review.author
                    },
                    "datePublished": review.date,
                    "reviewBody": review.text
                }));
            }

            return productData;
        })
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <div className={styles.container}>
                <div className={styles.filters}>
                    <div className={styles.filterGroup}>
                        <label htmlFor="size-select" className={styles.label}>{t('size')}</label>
                        <select
                            id="size-select"
                            className={styles.select}
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)}
                            aria-label={t('size')}
                        >
                            {availableSizes.map(size => (
                                <option key={size} value={size}>
                                    {size === 'all' ? t('allSizes') : size.toUpperCase()}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.filterGroup}>
                        <label htmlFor="season-select" className={styles.label}>{t('season')}</label>
                        <select
                            id="season-select"
                            className={styles.select}
                            value={isFleece}
                            onChange={(e) => setIsFleece(e.target.value)}
                            aria-label={t('season')}
                        >
                            <option value="all">{t('allSeasons')}</option>
                            <option value="yes">{t('winter')}</option>
                            <option value="no">{t('autumn')}</option>
                        </select>
                    </div>

                    <div className={styles.filterGroup}>
                        <label htmlFor="color-select" className={styles.label}>{t('color')}</label>
                        <select
                            id="color-select"
                            className={styles.select}
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                            aria-label={t('color')}
                        >
                            {availableColors.map(color => (
                                <option key={color} value={color}>
                                    {color === 'all' ? t('allColors') : color}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.results}>
                        {t('foundProducts')}: {filteredProducts.length}
                    </div>
                </div>

                <div className={styles.productsGrid}>
                    {filteredProducts.map(data => (
                        <Product key={data.id} data={data} />
                    ))}
                </div>
                <Reviews />
                <section className={styles.videoDetails}>
                    <h3 className={styles.videoDetailsTitle}>{t('videoReviews')}</h3>
                    <VideoPlayer
                        url="https://youtube.com/shorts/LAXrt1adoHg?feature=share"
                    />
                </section>
            </div>
        </>
    );
}
