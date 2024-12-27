import Link from "next/link";
import styles from "./breadcrumbs.module.scss";

const Breadcrumbs = ({ items }) => {
    return (
        <nav className={styles.breadcrumbs} aria-label="Навігація по сайту">
            <ol
                className={styles.list}
                itemScope
                itemType="https://schema.org/BreadcrumbList"
            >
                <li
                    className={styles.item}
                    itemProp="itemListElement"
                    itemScope
                    itemType="https://schema.org/ListItem"
                >
                    <Link href="/" itemProp="item">
                        <span itemProp="name">Головна</span>
                    </Link>
                    <meta itemProp="position" content="1" />
                </li>
                {items.map((item, index) => (
                    <li
                        key={item.path}
                        className={styles.item}
                        itemProp="itemListElement"
                        itemScope
                        itemType="https://schema.org/ListItem"
                    >
                        {index < items.length - 1 ? (
                            <Link href={item.path} itemProp="item">
                                <span itemProp="name">{item.title}</span>
                            </Link>
                        ) : (
                            <span itemProp="name">{item.title}</span>
                        )}
                        <meta itemProp="position" content={index + 2} />
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
