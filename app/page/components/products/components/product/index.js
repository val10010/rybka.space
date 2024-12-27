import React, { useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from "./product.module.scss";

export default function ProductSlider({ data }) {
    if(data.disabled) return null;

    const navigationPrevRef = React.useRef(null);
    const navigationNextRef = React.useRef(null);
    const swiperRef = React.useRef(null);

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
        <div className={styles.container} itemScope itemType="https://schema.org/Product">
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
                            itemProp="image"
                        />
                        <Link
                            href={productUrl}
                            className={styles.details}
                            title={`Переглянути деталі про ${productName}`}
                        >
                            Детальніше
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>

            <meta itemProp="name" content={productName} />
            <meta itemProp="description" content={data.info?.desc || ''} />
            <meta itemProp="sku" content={`RS-${data.id}`} />
            <meta itemProp="productID" content={`RS-${data.id}`} />
            <meta itemProp="category" content="Жіночі спортивні костюми" />
            <meta itemProp="url" content={`https://rybkaspace.com${productUrl}`} />
            
            <div itemProp="brand" itemScope itemType="https://schema.org/Brand">
                <meta itemProp="name" content={brandName} />
            </div>

            <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
                <meta itemProp="price" content={data.price} />
                <meta itemProp="priceCurrency" content="UAH" />
                <meta itemProp="availability" content={data.disabled ? "https://schema.org/OutOfStock" : "https://schema.org/InStock"} />
                <meta itemProp="url" content={`https://rybkaspace.com${productUrl}`} />
                <meta itemProp="priceValidUntil" content={currentDate} />
                {data.oldPrice && (
                    <div itemProp="priceSpecification" itemScope itemType="https://schema.org/PriceSpecification">
                        <meta itemProp="price" content={data.oldPrice} />
                        <meta itemProp="priceCurrency" content="UAH" />
                    </div>
                )}
            </div>

            <div itemProp="additionalProperty" itemScope itemType="https://schema.org/PropertyValue">
                <meta itemProp="name" content="Колір" />
                <meta itemProp="value" content={data.currentColor} />
            </div>

            {data.grid?.sizes?.map((size) => (
                <div key={size} itemProp="additionalProperty" itemScope itemType="https://schema.org/PropertyValue">
                    <meta itemProp="name" content="Розмір" />
                    <meta itemProp="value" content={size} />
                </div>
            ))}

            <div itemProp="manufacturer" itemScope itemType="https://schema.org/Organization">
                <meta itemProp="name" content={brandName} />
                <meta itemProp="address" content="Україна, м. Ізмаїл, проспект Миру, 36" />
            </div>

            {data.info?.material?.map((material, index) => (
                <div key={index} itemProp="material" itemScope itemType="https://schema.org/PropertyValue">
                    <meta itemProp="name" content="Матеріал" />
                    <meta itemProp="value" content={material} />
                </div>
            ))}

            <button ref={navigationPrevRef} className={`${styles.navButton} ${styles.prevButton}`}>
                <ChevronLeft />
            </button>
            <button ref={navigationNextRef} className={`${styles.navButton} ${styles.nextButton}`}>
                <ChevronRight />
            </button>
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
