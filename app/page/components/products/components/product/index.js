// ProductSlider.jsx
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

    const sliderState = useRef({
        startX: 0,
        startY: 0,
        currentX: 0,
        isDragging: false,
        currentTranslateX: 0,
        isScrolling: false,
        isDirectionLocked: false
    });

    useEffect(() => {
        const slider = slideTrackRef.current;
        if (!slider) return;

        gsap.set(slider, {
            x: 0
        });
    }, []);

    const getPositionX = (event) => {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].pageX;
    };

    const getPositionY = (event) => {
        return event.type.includes('mouse') ? event.pageY : event.touches[0].pageY;
    };

    const handleDragStart = (event) => {
        if (isAnimating) return;

        const positionX = getPositionX(event);
        const positionY = getPositionY(event);

        sliderState.current = {
            startX: positionX,
            startY: positionY,
            currentX: positionX,
            isDragging: true,
            currentTranslateX: -currentSlide * slideTrackRef.current.offsetWidth,
            isScrolling: false,
            isDirectionLocked: false
        };

        gsap.killTweensOf(slideTrackRef.current);
    };

    const handleDragMove = (event) => {
        if (!sliderState.current.isDragging) return;

        const currentX = getPositionX(event);
        const currentY = getPositionY(event);
        const deltaX = Math.abs(currentX - sliderState.current.startX);
        const deltaY = Math.abs(currentY - sliderState.current.startY);

        if (!sliderState.current.isDirectionLocked) {
            if (deltaX > deltaY && deltaX > 5) {
                sliderState.current.isScrolling = false;
                sliderState.current.isDirectionLocked = true;
                event.preventDefault();
            } else if (deltaY > deltaX && deltaY > 5) {
                sliderState.current.isScrolling = true;
                sliderState.current.isDirectionLocked = true;
                sliderState.current.isDragging = false;
                return;
            }
            return;
        }

        if (sliderState.current.isScrolling) {
            return;
        }

        event.preventDefault();

        const diffX = currentX - sliderState.current.startX;
        const moveX = sliderState.current.currentTranslateX + diffX;

        gsap.set(slideTrackRef.current, {
            x: moveX
        });

        sliderState.current.currentX = currentX;
    };

    const handleDragEnd = () => {
        if (!sliderState.current.isDragging || sliderState.current.isScrolling) return;

        const movedBy = sliderState.current.currentX - sliderState.current.startX;
        const slideWidth = slideTrackRef.current.offsetWidth;

        let newSlideIndex = currentSlide;

        if (Math.abs(movedBy) > slideWidth * 0.15) {
            if (movedBy < 0 && currentSlide < data.images.length - 1) {
                newSlideIndex = currentSlide + 1;
            } else if (movedBy > 0 && currentSlide > 0) {
                newSlideIndex = currentSlide - 1;
            }
        }

        goToSlide(newSlideIndex);
        sliderState.current.isDragging = false;
        sliderState.current.isDirectionLocked = false;
    };

    const goToSlide = (index) => {
        if (isAnimating) return;
        setIsAnimating(true);

        gsap.to(slideTrackRef.current, {
            duration: 0.3,
            x: -index * slideTrackRef.current.offsetWidth,
            ease: "power2.out",
            onComplete: () => {
                setCurrentSlide(index);
                setIsAnimating(false);
            }
        });
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
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
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
                            priority={index === 0}
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

            {currentSlide > 0 && (
                <button
                    onClick={() => goToSlide(currentSlide - 1)}
                    className={`${styles.navButton} ${styles.prevButton}`}
                    disabled={isAnimating}
                >
                    <ChevronLeft className={styles.navIcon} />
                </button>
            )}

            {currentSlide < data.images.length - 1 && (
                <button
                    onClick={() => goToSlide(currentSlide + 1)}
                    className={`${styles.navButton} ${styles.nextButton}`}
                    disabled={isAnimating}
                >
                    <ChevronRight className={styles.navIcon} />
                </button>
            )}

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
