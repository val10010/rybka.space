import BackBtn from "./components/backBtn";
import ProductClient from "./components/productClient";
import VariantsSlider from "./components/variantsSlider";
import VisitorCounter from "./components/visitorCounter";
import { VideoPlayer } from "@/components/videoPlayer"
import { redirect } from 'next/navigation'
import SchemaProduct from "@/components/SchemaProduct";
import CategoryBreadcrumbs from "@/components/categories/CategoryBreadcrumbs";
import FAQ from "@/components/faq";
import Reviews from "@/components/reviews";
import { useTranslations } from 'next-intl';

import productsInfo from "@/mocks/productsInfo.json";
import { getCategoryBySlug, getCategoryByProductId } from "@/services/categoryService";

import styles from "./product.module.scss";

export async function generateMetadata({ params }) {
    const productId = +params.productId;
    const locale = params.locale;
    const product = productsInfo.find(item => item.id === productId);
    
    if (!product || product.disabled) {
        return {
            title: 'Товар не найден - RYBKA.SPACE',
        };
    }

    return {
        title: `${product.name[locale]} ${product.currentColor[locale]} - RYBKA.SPACE`,
        description: product.info.desc[locale] || ''
    }
}

export default function Product({ params }) {
    const productId = +params.productId;
    const locale = params.locale;
    const slug = params.slug;
    const subcategorySlug = params['subcategory-slug'];
    
    // Находим товар по ID
    const product = productsInfo.find(item => item.id === productId);
    const t = useTranslations('product');
    
    // Проверяем, существует ли товар
    if(!product || product.disabled) {
        redirect(`/${locale}/categories`);
    }
    
    // Получаем категорию и подкатегорию товара
    const mainCategory = getCategoryByProductId(productId);
    
    // Проверяем, соответствует ли slug основной категории в URL
    if (mainCategory && mainCategory.slug[locale] !== slug) {
        // Если не соответствует, перенаправляем на правильный URL
        redirect(`/${locale}/categories/${mainCategory.slug[locale]}/${subcategorySlug}/${productId}`);
    }
    
    // Получаем категорию по slug подкатегории
    const subCategory = getCategoryBySlug(subcategorySlug, locale);
    
    // Проверяем, является ли эта категория подкатегорией основной категории
    if (subCategory && subCategory.parentId !== mainCategory.id) {
        // Если это не подкатегория основной категории, перенаправляем
        redirect(`/${locale}/categories/${mainCategory.slug[locale]}/${mainCategory.slug[locale]}/${productId}`);
    }

    return (
        <>
            <SchemaProduct product={product} locale={locale} />
            <CategoryBreadcrumbs
                items={[
                    {
                        text: locale === 'uk' ? 'Головна' : 'Главная',
                        href: `/${locale}`
                    },
                    {
                        text: locale === 'uk' ? 'Категорії' : 'Категории',
                        href: `/${locale}/categories`
                    },
                    {
                        text: getCategoryBySlug(params.slug, locale)?.name[locale] || '',
                        href: `/${locale}/categories/${params.slug}`
                    },
                    {
                        text: getCategoryBySlug(params['subcategory-slug'], locale)?.name[locale] || '',
                        href: `/${locale}/categories/${params.slug}/${params['subcategory-slug']}`
                    },
                    {
                        text: `${product.name[locale]} ${product.currentColor[locale]}`,
                        href: null
                    }
                ]}
                locale={locale}
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
                       <li>{ product.info.season[locale] }</li>
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
