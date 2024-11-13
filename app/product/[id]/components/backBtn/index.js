'use client';

import { useRouter } from "next/navigation";

import styles from "./backBtn.module.scss";

const BackBtn = () => {
    const router = useRouter();
        console.log(1111)
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

export default BackBtn;
