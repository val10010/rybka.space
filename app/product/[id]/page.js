import BackBtn from "./components/backBtn";
import ProductClient from "./components/productClient";
import VariantsSlider from "./components/variantsSlider";
import { redirect } from 'next/navigation'

import productsInfo from "@/mocks/productsInfo.json";

import styles from "./product.module.scss";

export async function generateMetadata({ params }) {
    const id = +params.id;
    const product = productsInfo.filter(item => item.id === id)[0];

    return {
        title: `${product.name} - RYBKA.SPACE`,
        description: product.description
    }
}

export default function Product({ params }) {
    const id = +params.id;
    const product = productsInfo.filter(item => item.id === id)[0];

    if(!product || product.disabled) {
        redirect('/');
    }

    return (
        <>
            <section className={styles.about}>
                <BackBtn/>
                <VariantsSlider product={product}/>
                <div className={styles.aboutInfo}>
                    <h1 className={styles.aboutInfoTitle}>
                        { product?.name } { product?.currentColor }
                    </h1>

                    <div className={styles.aboutInfoPrice}>
                        <span className={styles.aboutInfoSubtitle}>Ціна</span>
                        { product?.price } грн.
                    </div>
                    <ProductClient product={product}/>
                </div>
            </section>
            <section className={styles.desc}>
                <h2 className={styles.descTitle}>ОПИС</h2>
                <div className={styles.descWrap}>
                    <p className={styles.descItem}>
                        { product.info.desc }
                    </p>
                    <p className={styles.descTitle}>
                        Матеріал:
                    </p>
                    <ul className={styles.descList}>
                        {
                            product.info.material.map(item => (
                                <li>{item}</li>
                            ))
                        }
                    </ul>
                    <p className={styles.descTitle}>
                        Сезон:
                    </p>
                    <ul className={styles.descList}>
                       <li>осінь/зима.</li>
                    </ul>
                    <p className={styles.descTitle}>
                        Колір:
                    </p>
                    <ul className={styles.descList}>
                        <li>{ product.currentColor }</li>
                    </ul>
                    <p className={styles.descTitle}>
                        Догляд:
                    </p>
                    <ul className={styles.descList}>
                        <li>прання у звичайному режимі при температурі не вище 30°C, без віджиму;</li>
                        <li>відбілювання заборонено;</li>
                        <li>сушити в підвішеному стані, без застосування штучної сушки.</li>
                    </ul>
                    <p className={styles.descTitle}>
                        На фото:
                    </p>
                    <ul className={styles.descList}>
                        <li>зріст моделі - 176 см;</li>
                        <li>вага моделі - 74 кг;</li>
                        <li>розмір речей - "M".</li>
                    </ul>
                </div>
            </section>
        </>
    );
}
