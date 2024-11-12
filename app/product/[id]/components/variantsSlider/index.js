"use client"

import React, { useState, useEffect } from 'react';

import s from './variantsSlider.module.scss';
import Image from "next/image";

const ImageSlider = ({
                         images = [
                             "/images/products/1.png",
                             "/images/products/2.png",
                             "/images/products/3.png"
                         ]
                     }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleNextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleThumbnailClick = (index) => {
        setCurrentIndex(index);
    };

    const handleFullscreenToggle = () => {
        setIsFullscreen(!isFullscreen);
    };

    const handleFullscreenClose = (e) => {
        if (e.target === e.currentTarget) {
            setIsFullscreen(false);
        }
    };

    const handleKeyDown = (e) => {
        if (isFullscreen) {
            if (e.key === 'Escape') setIsFullscreen(false);
            if (e.key === 'ArrowLeft') handlePrevSlide();
            if (e.key === 'ArrowRight') handleNextSlide();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isFullscreen]);

    return (
        <>
            <div className={s.slider}>
                <div className={s.mainImageContainer}>
                    <img
                        src={images[currentIndex]}
                        alt={`Slide ${currentIndex + 1}`}
                        className={s.mainImage}
                        onClick={handleFullscreenToggle}
                    />

                    <button
                        onClick={handlePrevSlide}
                        className={`${s.navButton} ${s.prevButton}`}
                    >
                        <Image
                            fill
                            src={'/images/arrow-left.svg'}
                        />
                    </button>
                    <button
                        onClick={handleNextSlide}
                        className={`${s.navButton} ${s.nextButton}`}
                    >
                        <Image
                            fill
                            src={'/images/arrow-left.svg'}
                        />
                    </button>
                </div>

                <div className={s.thumbnailContainer}>
                    {images.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => handleThumbnailClick(index)}
                            className={`${s.thumbnailButton} ${
                                currentIndex === index ? s.activeThumbnail : ''
                            }`}
                        >
                            <img
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                className={s.thumbnailImage}
                            />
                        </button>
                    ))}
                </div>
            </div>

            {isFullscreen && (
                <div className={s.fullscreenOverlay} onClick={handleFullscreenClose}>
                    <button
                        className={s.closeButton}
                        onClick={() => setIsFullscreen(false)}
                    >
                        ×
                    </button>
                    <div className={s.fullscreenContent}>
                        <button
                            onClick={handlePrevSlide}
                            className={`${s.navButton} ${s.fullscreenNavButton} ${s.fullscreenPrevButton}`}
                        >
                            <Image
                                fill
                                src={'/images/arrow-left.svg'}
                            />
                        </button>
                        <img
                            src={images[currentIndex]}
                            alt={`Fullscreen ${currentIndex + 1}`}
                            className={s.fullscreenImage}
                        />
                        <button
                            onClick={handleNextSlide}
                            className={`${s.navButton} ${s.fullscreenNavButton} ${s.fullscreenNextButton}`}
                        >
                            <Image
                                fill
                                src={'/images/arrow-left.svg'}
                            />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ImageSlider;
