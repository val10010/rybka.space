import React from 'react';
import Link from 'next/link';
import Image from 'next/image'
import styles from "./header.module.scss";

const Header = () => {
    return (
        <header className={styles.header}>
            <Link href="/">
                <Image
                    width={500}
                    height={500}
                    src="/images/logo.svg"
                    alt="Picture of the author"
                />
            </Link>
        </header>
    );
};

export default Header;
