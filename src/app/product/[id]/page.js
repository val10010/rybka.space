import styles from "./page.module.scss";

export default function ProductItem({ params }) {


    console.log(params.id)
    return (
        <div className={styles.test}>
            <span>sdfsdfsd</span>
        </div>
    );
}
