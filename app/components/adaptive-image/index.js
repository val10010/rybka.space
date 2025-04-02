"use client"

import { useState, useEffect } from 'react';
import Image from "next/image";
import { checkWebPSupport } from '@/utils/webpSupport';

export default function AdaptiveImage({ src, ...props }) {
    const [imageSrc, setImageSrc] = useState(src);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        
        async function checkAndSetImage() {
            try {
                // Проверяем поддерживаемые форматы
                const originalFormat = src.match(/\.(jpg|jpeg|png)$/i)?.[0]?.toLowerCase();
                if (!originalFormat) return; // Если формат не поддерживается, оставляем как есть

                // Используем статическую проверку поддержки WebP
                const webpSupported = await checkWebPSupport();
                if (!webpSupported) return;

                // Сразу пробуем использовать WebP версию
                setImageSrc(src.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
            } catch (error) {
                console.warn('Error in AdaptiveImage, using original format:', error);
            }
        }

        checkAndSetImage();
    }, [src]);

    const imageProps = {
        ...props,
        src: imageSrc,
        // Устанавливаем разумные значения по умолчанию
        quality: props.quality || 75, // Снижаем качество по умолчанию
        loading: props.loading || 'lazy',
        unoptimized: false // Включаем оптимизацию Next.js
    };

    return <Image {...imageProps} />;
}
