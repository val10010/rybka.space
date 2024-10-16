import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <div className={styles.page}>
        <Image
            src="images/logo.svg"
            width="300"
            height="300"
        />
        test8
    </div>
  );
}
