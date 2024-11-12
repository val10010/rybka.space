import Product from "./components/product";

import productsInfo from "@/mocks/productsInfo.json";

import styles from "./products.module.scss";

export default function Products() {
    return (
        <div className={styles.container}>
            {
                productsInfo.map(data => (
                    <Product data={data}/>
                ))
            }
        </div>
    );
}
