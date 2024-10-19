import productsInfo from "@/mocks/productsInfo.json";

import styles from "./product.module.scss";

export default function Product({ params }) {
    const product = productsInfo[params.id];

    return (
        <section className={styles.container}>

        </section>
    );
}
