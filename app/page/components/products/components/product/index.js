import Image from "next/image";
import Link from "next/link";

import styles from "./product.module.scss";

export default function Product({ data }) {
    return (
        <div className={styles.container}>
            <Image
                width={300}
                height={600}
                src={'/images/products/' + data.id + '.png'}
                className={styles.img}
            />
            <Link
                href={'/product/' + data.id}
                className={styles.details}
            >
                Детальніше
            </Link>
        </div>
    );
}
