"use client"

import React from 'react';
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './reviews.module.scss';

const reviews = [
    {
        id: 1,
        author: 'Олена Петренко',
        rating: 5,
        date: '2024-12-28',
        text: 'Тканина дихаюча, приємна до тіла. Після прання форма не змінилась. Дуже задоволена покупкою ',
    },
    {
        id: 2,
        author: 'Мария Ковальчук',
        rating: 4,
        date: '2024-11-25',
        text: 'Костюм сел идеально . Единственный минус доставка была дольше, чем ожидала. Но качество товара компенсирует это полностью)',
    },
    {
        id: 5,
        author: 'София Мельник',
        rating: 5,
        date: '2024-11-15',
        text: 'Отлично держит форму, не теряет цвет после стирки. Однозначно рекомендую ',
    },
    {
        id: 6,
        author: 'Анна Коваленко',
        rating: 4,
        date: '2024-12-12',
        text: 'Якість пошиву відмінна, все акуратно . Трохи засмутив колір на фото здавався яскравішим. Але в цілому дуже задоволена.',
    },
    {
        id: 7,
        author: 'Виктория Лысенко',
        rating: 5,
        date: '2024-11-08',
        text: 'Приятно удивлена скоростью доставки и качеством обслуживания! Костюм сидит идеально, не стесняет движений ',
    },
    {
        id: 8,
        author: 'Катерина Бондаренко',
        rating: 4,
        date: '2024-12-05',
        text: 'Дуже стильний та зручний костюмчик) матеріал приємний до тіла, не електризується ',
    },
    {
        id: 9,
        author: 'Диана Романенко',
        rating: 5,
        date: '2024-11-30',
        text: 'Сидит идеально, качество отличное . Отдельное спасибо за быструю доставку и красивую упаковку!',
    }
];

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
                            </div>
                            <div className={styles.header}>
                                <div className={styles.author} itemProp="author">{review.author}</div>
                                <div className={styles.date} itemProp="datePublished">{review.date}</div>
                            </div>
                            <div className={styles.rating} itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                                <meta itemProp="ratingValue" content={review.rating} />
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
                            {review.image && (
                                <div className={styles.image}>
                                    <Image
                                        src={review.image}
                                        alt={`Відгук від ${review.author}`}
                                        width={200}
                                        height={200}
                                        className={styles.reviewImage}
                                    />
                                </div>
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
