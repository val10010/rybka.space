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
                const webpSupported = await checkWebPSupport();
                if (!webpSupported) return; // Используем оригинальный src

                // Проверяем поддерживаемые форматы
                const originalFormat = src.match(/\.(jpg|jpeg|png)$/i)?.[0]?.toLowerCase();
                if (!originalFormat) return; // Если формат не поддерживается, оставляем как есть

                const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
                
                // Проверяем существование WebP файла
                const response = await fetch(webpSrc, { method: 'HEAD' });
                if (response.ok) {
                    setImageSrc(webpSrc);
                }
                // Если WebP не существует, оставляем оригинальный src
            } catch (error) {
                console.warn('Error checking WebP image, falling back to original:', error);
                // В случае ошибки используем оригинальный src
            }
        }

        checkAndSetImage();
    }, [src]);

    // На сервере всегда используем оригинальный формат
    if (!isClient) {
        return <Image src={src} {...props} />;
    }

    return <Image src={imageSrc} {...props} />;
}
