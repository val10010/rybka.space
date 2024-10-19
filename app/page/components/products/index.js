import Product from "./components/product";

import products from "@/mocks/products.json"

import styles from "./products.module.scss";

export default function Products() {
    return (
        <div className={styles.container}>
            {
                products.map(data => (
                    <Product data={data}/>
                ))
            }
        </div>
    );
}
