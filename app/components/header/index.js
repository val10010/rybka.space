"use client"

import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import ScrollToPlugin from "gsap/ScrollToPlugin";

import styles from "./header.module.scss";

gsap.registerPlugin(ScrollToPlugin);

export default function Header() {
    const headerRef = useRef(null);
    const logoRef = useRef(null);
    const titleRef = useRef(null);
    const arrowRef = useRef(null);
    const pathname = usePathname();

    // Функции для блокировки/разблокировки скролла
    const lockScroll = () => {
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.documentElement.style.overflow = 'hidden';
        document.documentElement.style.paddingRight = `${scrollBarWidth}px`;
    };

    const unlockScroll = () => {
        document.documentElement.style.overflow = 'initial';
        document.documentElement.style.paddingRight = '';
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
            repeat: -1
        }).to(arrowRef.current, {
            opacity: 0,
            duration: 0.3,
            delay: 1,
            onComplete: () => {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: "main",
                        ease: "power2.inOut"
                    },
                    onComplete: () => {
                        // Разблокируем скролл после завершения всех анимаций
                        unlockScroll();
                    }
                });
            }
        });

        return () => {
            // Убеждаемся, что скролл разблокирован при очистке
            unlockScroll();
            tl.kill();
            gsap.killTweensOf(window);
        };
    };

    useEffect(() => {
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
