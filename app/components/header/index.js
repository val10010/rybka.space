"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";

import styles from "./header.module.scss";

gsap.registerPlugin(ScrollToPlugin);

export default function Header() {
    const headerRef = useRef(null);
    const logoRef = useRef(null);
    const titleRef = useRef(null);
    const arrowRef = useRef(null);

    useEffect(() => {
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
                    scrollTo: "main",
                    ease: "power2.inOut"
                });
            }
        });

        return () => {
            tl.kill();
            gsap.killTweensOf(window);
        };
    }, []);

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
