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
                        <div className={styles.review}>
                            <div className={styles.header}>
                                <div className={styles.author}>
                                    {review.author}
                                </div>
                                <div className={styles.rating}>
                                    {[...Array(review.rating)].map((_, index) => (
                                        <Image
                                            key={index}
                                            src="/images/star.svg"
                                            alt="star"
                                            width={15}
                                            height={15}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className={styles.text}>{review.text}</div>
                            <div className={styles.date}>{review.date}</div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
