import React, { useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useLocale, useTranslations } from 'next-intl';
import styles from "./product.module.scss";
import reviewsData from '@/mocks/reviews.json';

const { reviews } = reviewsData;

export default function ProductSlider({ data }) {
    const locale = useLocale();
    const t = useTranslations('products');

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
    const productName = `${data.name[locale]} - ${data.currentColor[locale]}`;
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
                                title={`${t('details')} ${productName}`}
                                aria-label={`${t('details')} ${productName}`}
                            >
                                {t('details')}
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
                            "image": data.images.map((imageId) => `https://rybkaspace.com/images/products/${data.id}/${imageId}.jpg`),
                            "description": data.info?.desc[locale] || '',
                            "sku": `RS-${data.id}`,
                            "mpn": `RSM-${data.id}`,
                            "brand": {
                                "@type": "Brand",
                                "name": brandName
                            },
                            "review": {
                                "@type": "Review",
                                "reviewRating": {
                                    "@type": "Rating",
                                    "ratingValue": reviews[0]?.rating || 4,
                                    "bestRating": 5
                                },
                                "author": {
                                    "@type": "Person",
                                    "name": reviews[0]?.author || "Customer"
                                }
                            },
                            "aggregateRating": {
                                "@type": "AggregateRating",
                                "ratingValue": averageRating,
                                "reviewCount": reviews.length
                            },
                            "offers": {
                                "@type": "AggregateOffer",
                                "offerCount": 1,
                                "lowPrice": data.price,
                                "highPrice": data.oldPrice || data.price,
                                "priceCurrency": "UAH",
                                "availability": data.disabled ? "https://schema.org/OutOfStock" : "https://schema.org/InStock"
                            }
                        })
                    }}
                />

                <button
                    ref={navigationPrevRef}
                    className={`${styles.navButton} ${styles.prevButton}`}
                    aria-label={t('prevPhoto')}
                >
                    <ChevronLeft />
                </button>
                <button
                    ref={navigationNextRef}
                    className={`${styles.navButton} ${styles.nextButton}`}
                    aria-label={t('nextPhoto')}
                >
                    <ChevronRight />
                </button>
            </article>
            <Link href={`/product/${data.id}`} className={styles.cardInfo}>
                <p>{ data.name[locale] } { data.currentColor[locale] }</p>
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
