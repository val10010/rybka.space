"use client"

import { useState, useEffect } from 'react';
import Image from "next/image";

import styles from './visitorCounter.module.scss'

const VisitorCounter = () => {
    const [visitorCount, setVisitorCount] = useState(0);

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

            return Math.max(baseCount, 1); // Минимум 1 посетитель
        };

        // Небольшие случайные колебания
        const addNoise = (base) => {
            const noise = Math.floor(Math.random() * 3) - 1; // -1, 0, или 1
            return Math.max(base + noise, 1);
        };

        // Обновление каждые 30-60 секунд
        const updateInterval = Math.floor(Math.random() * 30000) + 30000;

        const updateVisitors = () => {
            const base = getBaseVisitors();
            const withNoise = addNoise(base);
            setVisitorCount(withNoise);
        };

        // Начальное обновление
        updateVisitors();

        // Периодическое обновление
        const interval = setInterval(updateVisitors, updateInterval);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.aboutInfoSee}>
            <span className={styles.aboutInfoSeeImg}>
                <Image src="/images/eye.svg" fill alt="Visitors" />
            </span>
            {visitorCount} {visitorCount === 1 ? 'людина' : visitorCount < 5 ? 'людини' : 'людей'} зараз переглядає
        </div>
    );
};

export default VisitorCounter;
