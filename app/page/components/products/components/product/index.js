import React, { useState, useRef, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { gsap } from 'gsap';
import styles from "./product.module.scss";

export default function ProductSlider({ data }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const slideTrackRef = useRef(null);
    const slidesRef = useRef([]);

    // Состояния для отслеживания свайпа
    const dragRef = useRef({
        startX: 0,
        currentX: 0,
        isDragging: false,
        startTime: 0
    });

    useEffect(() => {
        gsap.set(slidesRef.current, {
            xPercent: i => i * 100
        });
    }, []);

    const animateSlides = (direction) => {
        if (isAnimating) return;
        setIsAnimating(true);

        const nextSlide = direction === 'next'
            ? currentSlide === data.images.length - 1 ? 0 : currentSlide + 1
            : currentSlide === 0 ? data.images.length - 1 : currentSlide - 1;

        gsap.to(slideTrackRef.current, {
            duration: 0.8,
            xPercent: -nextSlide * 100,
            ease: "power2.inOut",
            onComplete: () => {
                setCurrentSlide(nextSlide);
                setIsAnimating(false);
            }
        });
    };

    const goToSlide = (index) => {
        if (isAnimating || index === currentSlide) return;
        setIsAnimating(true);

        gsap.to(slideTrackRef.current, {
            duration: 0.8,
            xPercent: -index * 100,
            ease: "power2.inOut",
            onComplete: () => {
                setCurrentSlide(index);
                setIsAnimating(false);
            }
        });
    };

    // Обработчики свайпа
    const handleDragStart = (e) => {
        if (isAnimating) return;

        const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;

        dragRef.current = {
            startX: clientX,
            currentX: clientX,
            isDragging: true,
            startTime: Date.now()
        };

        gsap.set(slideTrackRef.current, {
            clearProps: "all"
        });

        if (e.type === 'mousedown') {
            document.addEventListener('mousemove', handleDragMove);
            document.addEventListener('mouseup', handleDragEnd);
        }
    };

    const handleDragMove = (e) => {
        if (!dragRef.current.isDragging) return;

        const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        const delta = clientX - dragRef.current.startX;
        const containerWidth = slideTrackRef.current.offsetWidth;

        const maxDrag = containerWidth * 0.3;
        const boundedDelta = Math.max(Math.min(delta, maxDrag), -maxDrag);

        dragRef.current.currentX = clientX;

        const newX = (-currentSlide * 100) + (boundedDelta / containerWidth * 100);
        gsap.set(slideTrackRef.current, {
            xPercent: newX
        });
    };

    const handleDragEnd = (e) => {
        if (!dragRef.current.isDragging) return;

        document.removeEventListener('mousemove', handleDragMove);
        document.removeEventListener('mouseup', handleDragEnd);

        const dragDistance = dragRef.current.currentX - dragRef.current.startX;
        const dragDuration = Date.now() - dragRef.current.startTime;
        const containerWidth = slideTrackRef.current.offsetWidth;

        const threshold = containerWidth * 0.2;
        const isQuickSwipe = dragDuration < 300 && Math.abs(dragDistance) > threshold * 0.5;

        if (Math.abs(dragDistance) > threshold || isQuickSwipe) {
            if (dragDistance > 0 && currentSlide > 0) {
                goToSlide(currentSlide - 1);
            } else if (dragDistance < 0 && currentSlide < data.images.length - 1) {
                goToSlide(currentSlide + 1);
            } else {
                goToSlide(currentSlide);
            }
        } else {
            goToSlide(currentSlide);
        }

        dragRef.current.isDragging = false;
    };

    const handleMouseEnter = (slideIndex) => {
        const detailsButton = slidesRef.current[slideIndex]?.querySelector(`.${styles.details}`);
        if (detailsButton) {
            gsap.to(detailsButton, {
                duration: 0.3,
                opacity: 1,
                scale: 1,
                ease: "back.out(1.7)"
            });
        }
    };

    const handleMouseLeave = (slideIndex) => {
        const detailsButton = slidesRef.current[slideIndex]?.querySelector(`.${styles.details}`);
        if (detailsButton) {
            gsap.to(detailsButton, {
                duration: 0.2,
                opacity: 0,
                scale: 0.9,
                ease: "power2.in"
            });
        }
    };

    const ChevronLeft = () => (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M15 18l-6-6 6-6" />
        </svg>
    );

    const ChevronRight = () => (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M9 18l6-6-6-6" />
        </svg>
    );

    return (
        <div className={styles.container}>
            <div
                ref={slideTrackRef}
                className={styles.slideTrack}
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
            >
                {data.images.map((imageId, index) => (
                    <div
                        key={imageId}
                        ref={el => slidesRef.current[index] = el}
                        className={styles.slide}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={() => handleMouseLeave(index)}
                    >
                        <Image
                            width={367}
                            height={652}
                            src={`/images/products/${data.id}/${imageId}.png`}
                            alt={`${data.name} - изображение ${imageId}`}
                            className={styles.img}
                            draggable={false}
                        />
                        <Link
                            href={`/product/${data.id}`}
                            className={styles.details}
                        >
                            Детальніше
                        </Link>
                    </div>
                ))}
            </div>

            <button
                onClick={() => animateSlides('prev')}
                className={`${styles.navButton} ${styles.prevButton}`}
                disabled={isAnimating}
            >
                <ChevronLeft className={styles.navIcon} />
            </button>

            <button
                onClick={() => animateSlides('next')}
                className={`${styles.navButton} ${styles.nextButton}`}
                disabled={isAnimating}
            >
                <ChevronRight className={styles.navIcon} />
            </button>

            <div className={styles.pagination}>
                {data.images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`${styles.paginationDot} ${
                            currentSlide === index ? styles.active : ''
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
