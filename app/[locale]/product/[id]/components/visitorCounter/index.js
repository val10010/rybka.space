"use client"

import { useState, useEffect } from 'react';
import Image from "next/image";
import { useTranslations } from 'next-intl';

import styles from './visitorCounter.module.scss'

const VisitorCounter = () => {
    const [visitorCount, setVisitorCount] = useState(0);
    const t = useTranslations('product.visitors');

    useEffect(() => {
        // Базовое количество посетителей
        const getBaseVisitors = () => {
            const hour = new Date().getHours();
            const day = new Date().getDay();

            // Больше посетителей с 12 до 20 часов
            let baseCount = 8;

            // Дневное время - больше посетителей
            if (hour >= 12 && hour <= 20) {
                baseCount += 7;
            }
            // Ночное время - меньше посетителей
            else if (hour >= 0 && hour <= 6) {
                baseCount -= 4;
            }

            // Выходные дни - больше посетителей
            if (day === 0 || day === 6) {
                baseCount += 5;
            }

            return baseCount;
        };

        const updateVisitorCount = () => {
            const baseCount = getBaseVisitors();
            const randomVariation = Math.floor(Math.random() * 5) - 2; // Random variation between -2 and 2
            setVisitorCount(Math.max(1, baseCount + randomVariation));
        };

        updateVisitorCount();
        const interval = setInterval(updateVisitorCount, 30000); // Update every 30 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.aboutInfoSee} role="status" aria-live="polite">
            <span className={styles.aboutInfoSeeImg} aria-hidden="true">
                <Image
                    src="/images/eye.svg"
                    fill
                    alt="Кількість відвідувачів, які зараз переглядають цей товар"
                />
            </span>
            {visitorCount} {t('people')} {t('now')}
        </div>
    );
};

export default VisitorCounter;
