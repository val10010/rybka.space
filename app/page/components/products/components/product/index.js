import React, { useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from "./product.module.scss";
import reviewsData from '@/mocks/reviews.json';

const { reviews } = reviewsData;

export default function ProductSlider({ data }) {
    if(data.disabled) return null;

    const navigationPrevRef = React.useRef(null);
    const navigationNextRef = React.useRef(null);
    const swiperRef = React.useRef(null);

    // Вычисляем средний рейтинг
    const averageRating = (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1);

    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.params.navigation.prevEl = navigationPrevRef.current;
            swiperRef.current.params.navigation.nextEl = navigationNextRef.current;
            swiperRef.current.navigation.init();
            swiperRef.current.navigation.update();
        }
    }, []);

    const productUrl = `/product/${data.id}`;
    const productName = `${data.name} - ${data.currentColor}`;
    const currentDate = new Date().toISOString().split('T')[0];
    const brandName = "Rybka Space";

    return (
        <div className={styles.wrapper}>
            <article className={styles.container}>
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation={{
                        prevEl: navigationPrevRef.current,
                        nextEl: navigationNextRef.current,
                    }}
                    pagination={{
                        enabled: true,
                        clickable: true,
                    }}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    className={styles.slideTrack}
                >
                    {data.images.map((imageId) => (
                        <SwiperSlide key={imageId} className={styles.slide}>
                            <Image
                                fill
                                src={`/images/products/${data.id}/${imageId}.jpg`}
                                alt={`Жіночий спортивний костюм ${productName} - фото ${imageId}`}
                                className={styles.img}
                                draggable={false}
                                priority={imageId === data.images[0]}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <Link
                                href={productUrl}
                                className={styles.details}
                                title={`Переглянути деталі про ${productName}`}
                                aria-label={`Переглянути деталі про ${productName}`}
                            >
                                Детальніше
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Product",
                            "name": productName,
                            "description": data.info?.desc || '',
                            "image": data.images.map((imageId) => `https://rybkaspace.com/images/products/${data.id}/${imageId}.jpg`),
                            "sku": `RS-${data.id}`,
                            "brand": {
                                "@type": "Brand",
                                "name": brandName
                            },
                            "offers": {
                                "@type": "Offer",
                                "url": `https://rybkaspace.com${productUrl}`,
                                "priceCurrency": "UAH",
                                "price": data.price,
                                "priceValidUntil": currentDate,
                                "itemCondition": "https://schema.org/NewCondition",
                                "availability": data.disabled ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
                                "priceSpecification": {
                                    "@type": "PriceSpecification",
                                    "price": data.oldPrice,
                                    "priceCurrency": "UAH"
                                }
                            },
                            "aggregateRating": {
                                "@type": "AggregateRating",
                                "ratingValue": averageRating,
                                "reviewCount": reviews.length.toString(),
                                "bestRating": "5",
                                "worstRating": "1"
                            },
                            "review": reviews.map(review => ({
                                "@type": "Review",
                                "reviewRating": {
                                    "@type": "Rating",
                                    "ratingValue": review.rating.toString(),
                                    "bestRating": "5",
                                    "worstRating": "1"
                                },
                                "author": {
                                    "@type": "Person",
                                    "name": review.author
                                },
                                "datePublished": review.date,
                                "reviewBody": review.text,
                                "itemReviewed": {
                                    "@type": "Product",
                                    "name": productName,
                                    "sku": `RS-${data.id}`
                                }
                            })),
                            "material": data.info?.material?.join(", ") || '',
                            "size": data.grid?.sizes?.join(", ") || '',
                            "category": "Жіночі спортивні костюми",
                            "manufacturer": {
                                "@type": "Organization",
                                "name": brandName,
                                "address": "Україна, м. Ізмаїл, проспект Миру, 36"
                            },
                            "additionalProperty": [
                                {
                                    "@type": "PropertyValue",
                                    "name": "Колір",
                                    "value": data.currentColor
                                },
                                ...(data.grid?.sizes || []).map(size => ({
                                    "@type": "PropertyValue",
                                    "name": "Розмір",
                                    "value": size
                                }))
                            ]
                        })
                    }}
                />

                <button
                    ref={navigationPrevRef}
                    className={`${styles.navButton} ${styles.prevButton}`}
                    aria-label="Попереднє фото"
                >
                    <ChevronLeft />
                </button>
                <button
                    ref={navigationNextRef}
                    className={`${styles.navButton} ${styles.nextButton}`}
                    aria-label="Наступне фото"
                >
                    <ChevronRight />
                </button>
            </article>
            <Link href={`/product/${data.id}`} className={styles.cardInfo}>
                <p>{ data.name }</p>
                <p>{ data.oldPrice }</p>
            </Link>
        </div>
    );
}

const ChevronLeft = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 18l-6-6 6-6" />
    </svg>
);

const ChevronRight = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18l6-6-6-6" />
    </svg>
);
