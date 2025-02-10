"use client"

import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from 'next-intl';

import styles from "./header.module.scss";

gsap.registerPlugin(ScrollToPlugin);

export default function Header() {
    const t = useTranslations('header');
    const headerRef = useRef(null);
    const logoRef = useRef(null);
    const titleRef = useRef(null);
    const arrowRef = useRef(null);
    const scrollPosition = useRef(0);

    const lockScroll = () => {
        scrollPosition.current = window.scrollY;
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPosition.current}px`;
        document.body.style.width = '100%';

        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        if (scrollBarWidth > 0) {
            document.documentElement.style.paddingRight = `${scrollBarWidth}px`;
            document.body.style.paddingRight = `${scrollBarWidth}px`;
        }
    };

    const unlockScroll = () => {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.documentElement.style.paddingRight = '';
        document.body.style.paddingRight = '';

        window.scrollTo(0, scrollPosition.current);
    };

    const startAnimation = () => {
        lockScroll();

        // Делаем элементы видимыми перед началом анимации
        gsap.set([logoRef.current, titleRef.current, arrowRef.current], {
            visibility: "visible"
        });

        const tl = gsap.timeline();

        const headerHeight = headerRef.current.offsetHeight;
        const headerWidth = headerRef.current.offsetWidth;
        const logoHeight = logoRef.current.offsetHeight;
        const logoWidth = logoRef.current.offsetWidth;

        const centerY = (headerHeight - logoHeight) / 2;
        const centerX = (headerWidth - logoWidth) / 2;

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

        tl.to(logoRef.current, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.inOut",
            delay: 0.1
        });

        tl.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
        });

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
                unlockScroll();
                gsap.to(window, {
                    duration: .5,
                    scrollTo: {
                        y: "main",
                        ease: "power2.inOut"
                    },
                    onComplete: () => {
                        // Динамически импортируем и запускаем Hotjar после завершения анимации
                        import('../HotjarScript').then(module => {
                            module.default();
                        });
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
        window.scrollTo(0, 0);
        // Устанавливаем начальное состояние элементов как скрытое
        gsap.set([logoRef.current, titleRef.current, arrowRef.current], {
            visibility: "hidden"
        });

        return startAnimation();
    }, []);

    function em(px, base = 16) {
        return `${px / base}em`;
    }

    return (
        <header
            ref={headerRef}
            className={styles.container}
            role="banner"
        >
            <Link
                href="/"
                ref={logoRef}
                className={styles.logo}
                aria-label={t('logo')}
            >
                <Image
                    src="/images/logo.svg"
                    fill
                    alt={t('logo')}
                    priority={true}
                />
            </Link>
            <h1
                ref={titleRef}
                className={styles.title}
            >
                {t.rich('title', {
                    special: (chunks) => <span>{chunks}</span>
                })}
            </h1>
            <img
                src={'/images/header-arrow.svg'}
                className={styles.arrow}
                ref={arrowRef}
                aria-label={t('scrollToTop')}
            />
        </header>
    );
}
