"use client"

import React from 'react';
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './reviews.module.scss';
import reviewsData from '@/mocks/reviews.json';

const { reviews } = reviewsData;

export default function Reviews() {
    return (
        <section className={styles.reviews}>
            <h2 className={styles.title}>Відгуки наших клієнтів</h2>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView={3}
                navigation
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    }
                }}
                className={`${styles.swiper} ${styles.swiperNavigation} ${styles.swiperPagination}`}
            >
                {reviews.map((review) => (
                    <SwiperSlide key={review.id} className={styles.slide}>
                        <div className={styles.review} itemScope itemType="https://schema.org/Review">
                            <div itemProp="itemReviewed" itemScope itemType="https://schema.org/Product">
                                <meta itemProp="name" content="Спортивний костюм" />
                                <meta itemProp="sku" content="RS-18" />
                            </div>
                            <div className={styles.header}>
                                <div className={styles.author} itemProp="author" itemScope itemType="https://schema.org/Person">
                                    <meta itemProp="name" content={review.author} />
                                    {review.author}
                                </div>
                                <div className={styles.date} itemProp="datePublished">{review.date}</div>
                            </div>
                            <div className={styles.rating} itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                                <meta itemProp="ratingValue" content={review.rating} />
                                <meta itemProp="bestRating" content="5" />
                                {[...Array(5)].map((_, index) => (
                                    <span
                                        key={index}
                                        className={`${styles.star} ${index < review.rating ? styles.filled : ''}`}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            <p className={styles.text} itemProp="reviewBody">{review.text}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
