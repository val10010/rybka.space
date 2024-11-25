'use client';

import { useRouter } from "next/navigation";

import styles from "./backBtn.module.scss";

const BackBtn = () => {
    const router = useRouter();

    return (
        <button
            onClick={() => router.push('/')}
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
