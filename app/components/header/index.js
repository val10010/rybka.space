"use client"

import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname, useNavigationType } from "next/navigation";
import ScrollToPlugin from "gsap/ScrollToPlugin";

import styles from "./header.module.scss";

gsap.registerPlugin(ScrollToPlugin);

export default function Header() {
    const [isBackNavigation, setIsBackNavigation] = useState(false);
    const headerRef = useRef(null);
    const logoRef = useRef(null);
    const titleRef = useRef(null);
    const arrowRef = useRef(null);
    const pathname = usePathname();
    const scrollPosition = useRef(0);

    // Функции для блокировки/разблокировки скролла
    const lockScroll = () => {
        // Сохраняем текущую позицию скролла
        scrollPosition.current = window.scrollY;

        // Добавляем стили для блокировки
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPosition.current}px`;
        document.body.style.width = '100%';

        // Компенсация ширины скроллбара
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        if (scrollBarWidth > 0) {
            document.documentElement.style.paddingRight = `${scrollBarWidth}px`;
            document.body.style.paddingRight = `${scrollBarWidth}px`;
        }
    };

    const unlockScroll = () => {
        // Удаляем стили блокировки
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.documentElement.style.paddingRight = '';
        document.body.style.paddingRight = '';

        // Восстанавливаем позицию скролла
        window.scrollTo(0, scrollPosition.current);
    };

    const startAnimation = () => {
        // Блокируем скролл в начале анимации
        lockScroll();

        const tl = gsap.timeline();

        // Получаем размеры контейнера и лого
        const headerHeight = headerRef.current.offsetHeight;
        const headerWidth = headerRef.current.offsetWidth;
        const logoHeight = logoRef.current.offsetHeight;
        const logoWidth = logoRef.current.offsetWidth;

        // Вычисляем центральную позицию
        const centerY = (headerHeight - logoHeight) / 2;
        const centerX = (headerWidth - logoWidth) / 2;

        // Устанавливаем начальные состояния
        gsap.set(logoRef.current, {
            y: centerY,
            x: centerX,
            scale: 2,
        });

        gsap.set(titleRef.current, {
            opacity: 0,
            y: em(10),
        });

        gsap.set(arrowRef.current, {
            opacity: 0,
            y: em(2),
        });

        // Анимация лого
        tl.to(logoRef.current, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.inOut",
            delay: 0.1
        });

        // Анимация текста
        tl.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
        });

        // Анимация стрелки
        tl.to(arrowRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: "power2.out"
        }).to(arrowRef.current, {
            y: em(10),
            duration: 0.5,
            ease: "power1.inOut",
            yoyo: true,
            repeat: 3
        }).to(arrowRef.current, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                // Разблокируем скролл перед анимацией скролла
                unlockScroll();
                gsap.to(window, {
                    duration: .5,
                    scrollTo: {
                        y: "main",
                        ease: "power2.inOut"
                    }
                });
            }
        });

        return () => {
            unlockScroll();
            tl.kill();
            gsap.killTweensOf(window);
        };
    };

    useEffect(() => {
        // Слушаем событие popstate (срабатывает при навигации назад)
        const handlePopState = () => {
            setIsBackNavigation(true);
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    useEffect(() => {
        if (isBackNavigation) {
            setIsBackNavigation(false); // Сбрасываем флаг
            return;
        }

        // Прокручиваем страницу наверх при изменении маршрута
        window.scrollTo(0, 0);

        return startAnimation();
    }, [pathname]);

    function em(px, base = 16) {
        return `${px / base}em`;
    }

    return (
        <header
            ref={headerRef}
            className={styles.container}
        >
            <Link
                href="/"
                className={styles.logo}
                ref={logoRef}
            >
                <Image
                    className={styles.img}
                    src="/images/logo.svg"
                    fill
                    alt="Logo"
                />
            </Link>
            <h1
                className={styles.title}
                ref={titleRef}
            >
                твій особистий <span>space</span> краси та комфорту
            </h1>
            <img
                src={'/images/header-arrow.svg'}
                className={styles.arrow}
                ref={arrowRef}
                alt="Scroll down"
            />
        </header>
    );
}
