import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from "./product.module.scss";

export default function ProductSlider({ data }) {
    if(data.disabled) return;

    const navigationPrevRef = React.useRef(null);
    const navigationNextRef = React.useRef(null);
    const paginationRef = React.useRef(null);

    return (
        <div className={styles.container}>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                navigation={{
                    prevEl: navigationPrevRef?.current,
                    nextEl: navigationNextRef?.current,
                    enabled: true,
                }}
                pagination={{
                    el: paginationRef?.current,
                    bulletClass: styles.paginationDot,
                    bulletActiveClass: styles.active,
                    clickable: true,
                }}
                grabCursor={true}
                className={styles.slideTrack}
            >
                {data.images.map((imageId) => (
                    <SwiperSlide key={imageId} className={styles.slide}>
                        <Image
                            fill
                            src={`/images/products/${data.id}/${imageId}.jpg`}
                            alt={`${data.name} - изображение ${imageId}`}
                            className={styles.img}
                            draggable={false}
                            priority={imageId === data.images[0]}
                        />
                        <Link
                            href={`/product/${data.id}`}
                            className={styles.details}
                        >
                            Детальніше
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>

            <button ref={navigationPrevRef} className={`${styles.navButton} ${styles.prevButton}`}>
                <ChevronLeft />
            </button>
            <button ref={navigationNextRef} className={`${styles.navButton} ${styles.nextButton}`}>
                <ChevronRight />
            </button>
            <div ref={paginationRef} className={styles.pagination} />
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
