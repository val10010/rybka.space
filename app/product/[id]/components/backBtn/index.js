'use client';

import { useRouter } from "next/navigation";

import styles from "./backBtn.module.scss";

const BackButton = () => {
    const router = useRouter();
        console.log(234234)
    return (
        <button
            onClick={() => router.back()}
            className={styles.backBtn}
        >
           <img
               className={styles.backBtnIcon}
               src={'/images/backBtn.svg'}
           />
            Назад
        </button>
    );
}

export default BackButton;
