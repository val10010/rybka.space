"use client"

import React, { useState, useMemo } from 'react';
import Product from "./components/product";
import productsInfo from "@/mocks/productsInfo.json";
import styles from "./products.module.scss";

export default function Products() {
    const [selectedSize, setSelectedSize] = useState('all');
    const [isFleece, setIsFleece] = useState('all');
    const [selectedColor, setSelectedColor] = useState('all');

    const availableSizes = useMemo(() => {
        const sizes = new Set();
        productsInfo.filter(product => !product.disabled).forEach(product => {
            product.grid.sizes.forEach(size => sizes.add(size));
        });
        return ['all', ...Array.from(sizes)];
    }, []);

    const availableColors = useMemo(() => {
        const colors = new Set();
        productsInfo.filter(product => !product.disabled).forEach(product => {
            colors.add(product.currentColor);
        });
        return ['all', ...Array.from(colors)];
    }, []);

    const filteredProducts = useMemo(() => {
        return productsInfo.filter(product => {
            if (product.disabled) return false;

            const sizeMatch = selectedSize === 'all' || product.grid.sizes.includes(selectedSize);
            const colorMatch = selectedColor === 'all' || product.currentColor === selectedColor;
            const fleeceMatch = isFleece === 'all' ||
                (isFleece === 'yes' && product.name.toLowerCase().includes('фліс')) ||
                (isFleece === 'no' && !product.name.toLowerCase().includes('фліс'));

            return sizeMatch && colorMatch && fleeceMatch;
        });
    }, [selectedSize, selectedColor, isFleece]);

    // Generate structured data for products
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": filteredProducts.map((product, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Product",
                "name": product.name,
                "description": product.info.desc,
                "offers": {
                    "@type": "Offer",
                    "price": product.price,
                    "priceCurrency": "UAH",
                    "availability": product.disabled ? "https://schema.org/OutOfStock" : "https://schema.org/InStock"
                }
            }
        }))
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
                        <label className={styles.label}>Розмір</label>
                        <select
                            className={styles.select}
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)}
                        >
                            {availableSizes.map(size => (
                                <option key={size} value={size}>
                                    {size === 'all' ? 'Всі розміри' : size.toUpperCase()}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.filterGroup}>
                        <label className={styles.label}>Сезон</label>
                        <select
                            className={styles.select}
                            value={isFleece}
                            onChange={(e) => setIsFleece(e.target.value)}
                        >
                            <option value="all">Всі сезони</option>
                            <option value="yes">Зима</option>
                            <option value="no">Осінь</option>
                        </select>
                    </div>

                    <div className={styles.filterGroup}>
                        <label className={styles.label}>Колір</label>
                        <select
                            className={styles.select}
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                        >
                            {availableColors.map(color => (
                                <option key={color} value={color}>
                                    {color === 'all' ? 'Всі кольори' : color}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.results}>
                        Знайдено товарів: {filteredProducts.length}
                    </div>
                </div>

                <div className={styles.productsGrid}>
                    {filteredProducts.map(data => (
                        <Product key={data.id} data={data} />
                    ))}
                </div>
            </div>
        </>
    );
}
