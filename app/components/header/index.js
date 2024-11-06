"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

import styles from "./header.module.scss";

export default function Header() {
    const headerRef = useRef(null);
    const logoRef = useRef(null);
    const titleRef = useRef(null);

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

        return () => tl.kill();
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
        </header>
    );
}
