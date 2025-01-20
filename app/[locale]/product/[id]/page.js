import BackBtn from "./components/backBtn";
import ProductClient from "./components/productClient";
import VariantsSlider from "./components/variantsSlider";
import VisitorCounter from "./components/visitorCounter";
import { VideoPlayer } from "@/components/videoPlayer"
import { redirect } from 'next/navigation'
import SchemaProduct from "@/components/SchemaProduct";
import Breadcrumbs from "@/components/breadcrumbs";
import FAQ from "@/components/faq";
import Reviews from "@/components/reviews";
import { useTranslations } from 'next-intl';

import productsInfo from "@/mocks/productsInfo.json";

import styles from "./product.module.scss";

export async function generateMetadata({ params }) {
    const id = +params.id;
    const locale = params.locale;
    const product = productsInfo.filter(item => item.id === id)[0];

    return {
        title: `${product.name[locale]} ${product.currentColor[locale]} - RYBKA.SPACE`,
        description: product.info.desc
    }
}

export default function Product({ params }) {
    const id = +params.id;
    const locale = params.locale;
    const product = productsInfo.filter(item => item.id === id)[0];
    const t = useTranslations('product');

    if(!product || product.disabled) {
        redirect('/');
    }

    return (
        <>
            <SchemaProduct product={product} locale={locale} />
            <Breadcrumbs
                items={[
                    {
                        title: `${product.name[locale]} ${product.currentColor[locale]}`,
                        path: `/product/${product.id}`
                    }
                ]}
            />
            <section className={styles.about}>
                <BackBtn/>
                <VariantsSlider product={product}/>
                <div className={styles.aboutInfo}>
                    <h1 className={styles.aboutInfoTitle}>
                        { product.name[locale] } { product.currentColor[locale] }
                    </h1>

                    <div className={styles.aboutInfoPrice}>
                        <span className={styles.aboutInfoSubtitle}>{t('price')}</span>
                        <span className={styles.price}>
                            <span className={styles.oldPrice}>{ product?.oldPrice } </span> { product?.price } {t('currency')}
                        </span>
                        <VisitorCounter/>
                    </div>
                    <ProductClient product={product}/>
                </div>
            </section>
            <section className={styles.videoDetails}>
                <VideoPlayer
                    url={product.videoLink}
                />
            </section>
            <Reviews />
            <section className={styles.videoDetails}>
                <h3 className={styles.videoDetailsTitle}>{t('videoReviews')}</h3>
                <VideoPlayer
                    url="https://youtube.com/shorts/LAXrt1adoHg?feature=share"
                />
            </section>
            <section className={styles.desc}>
                <h2 className={styles.descTitle}>{t('description')}</h2>
                <div className={styles.descWrap}>
                    <p className={styles.descItem}>
                        { product.info.desc[locale] }
                    </p>
                    <p className={styles.descTitle}>
                        {t('season')}:
                    </p>
                    <ul className={styles.descList}>
                       <li>{t('seasonValue')}.</li>
                    </ul>
                    <p className={styles.descTitle}>
                        {t('color')}:
                    </p>
                    <ul className={styles.descList}>
                        <li>{ product.currentColor[locale] }</li>
                    </ul>
                    <p className={styles.descTitle}>
                        {t('care')}:
                    </p>
                    <ul className={styles.descList}>
                        <li>{t('careValue1')}</li>
                        <li>{t('careValue2')}</li>
                        <li>{t('careValue3')}</li>
                    </ul>
                    <p className={styles.descTitle}>
                        {t('onPhoto')}:
                    </p>
                    <ul className={styles.descList}>
                        <li>{t('onPhotoValue1')}</li>
                        <li>{t('onPhotoValue2')}</li>
                        <li>{t('onPhotoValue3')}</li>
                        {
                            product.currentSize ? <li>{t('onPhotoValue4')} "{product.currentSize}".</li> : <li>{t('onPhotoValue4')} "S".</li>
                        }
                    </ul>
                </div>
            </section>
            <FAQ />
        </>
    );
}
