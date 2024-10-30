import Link from "next/link";
import Image from "next/image";
import SizesBtn from "./components/sizesBtn";
import productsInfo from "@/mocks/productsInfo.json";

import styles from "./product.module.scss";

export default function Product({ params }) {
    const id = params.id - 1;
    const product = productsInfo[id];

    return (
        <>
            <section className={styles.about}>
                <Image
                    width={300}
                    height={600}
                    src={'/images/products/' + (id + 1) + '.png'}
                    className={styles.img}
                />

                <div className={styles.aboutInfo}>
                    <h1 className={styles.aboutInfoTitle}>
                        { product?.name }
                    </h1>

                    <div className={styles.aboutInfoPrice}>
                        <span className={styles.aboutInfoSubtitle}>Ціна</span>
                        { product?.price } грн.
                    </div>

                    <div className={styles.aboutInfoSizeBlock}>
                        <span className={styles.aboutInfoSubtitle}>Розмір</span>
                        <div className={styles.aboutInfoSizeWrap}>
                            {
                                product?.size?.map((item, i) => (
                                    <button className={styles.aboutInfoSizeItem}>
                                        { item }
                                    </button>
                                ))
                            }
                        </div>
                    </div>

                    <div className={styles.aboutInfoColorsBlock}>
                        <span className={styles.aboutInfoSubtitle}>Кольори</span>
                        <div className={styles.aboutInfoColorsWrap}>
                            {
                                product?.colors?.map((item, i) => (
                                    <Link href={'/product/' + item.id}>
                                        <Image
                                            width={20}
                                            height={50}
                                            src={'/images/products/' + item.id + '.png'}
                                        />
                                    </Link>
                                ))
                            }
                        </div>
                    </div>

                    <SizesBtn/>

                    <button className={styles.aboutInfoBuyBtn}>
                        Купити в один клік
                    </button>

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
