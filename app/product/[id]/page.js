import BackBtn from "./components/backBtn";
import ProductClient from "./components/productClient";
import VariantsSlider from "./components/variantsSlider";
import VisitorCounter from "./components/visitorCounter";
import { redirect } from 'next/navigation'

import productsInfo from "@/mocks/productsInfo.json";

import styles from "./product.module.scss";

export async function generateMetadata({ params }) {
    const id = +params.id;
    const product = productsInfo.filter(item => item.id === id)[0];

    return {
        title: `${product.name} ${product.currentColor} - RYBKA.SPACE`,
        description: product.info.desc
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
                        <span className={styles.bf}>Black Friday -15%</span>
                        <span className={styles.price}>
                           <span className={styles.oldPrice}>
                               { product?.oldPrice } </span> &nbsp; { product?.price } грн.
                        </span>
                        <VisitorCounter/>
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
                    {/*<p className={styles.descTitle}>*/}
                    {/*    Матеріал:*/}
                    {/*</p>*/}
                    {/*<ul className={styles.descList}>*/}
                    {/*    {*/}
                    {/*        product.info.material.map(item => (*/}
                    {/*            <li>{item}</li>*/}
                    {/*        ))*/}
                    {/*    }*/}
                    {/*</ul>*/}
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
                        <li>зріст моделі - 164 см;</li>
                        <li>обхват грудей - 86 см;</li>
                        <li>обхват бедер - 95 см;</li>
                        {
                            product.currentSize ? <li>розмір речей - "{product.currentSize}".</li> : <li>розмір речей - "S".</li>
                        }
                    </ul>
                </div>
            </section>
        </>
    );
}
