import Image from "next/image";
import Link from "next/link";

import styles from "./header.module.scss";

export default function Header() {
    return (
        <header className={styles.container}>
            <Link
                href="/"
                className={styles.logo}
            >
                <Image
                    className={styles.img}
                    src="/images/logo.svg"
                    width="0"
                    height="0"
                />
            </Link>
            <h1 className={styles.title}>твій особистий <span>space</span> краси та комфорту</h1>
        </header>
    );
}
