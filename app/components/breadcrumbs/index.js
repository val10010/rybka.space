import Link from "next/link";
import styles from "./breadcrumbs.module.scss";
import { useTranslations } from 'next-intl';

const Breadcrumbs = ({ items }) => {
    const t = useTranslations('breadcrumbs');

    return (
        <nav className={styles.breadcrumbs} aria-label={t('navigation')}>
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
                        <span itemProp="name">{t('home')}</span>
                        <meta itemProp="url" content="https://rybkaspace.com/" />
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
                                <meta itemProp="url" content={`https://rybkaspace.com${item.path}`} />
                            </Link>
                        ) : (
                            <>
                                <span itemProp="name">{item.title}</span>
                                <meta itemProp="url" content={`https://rybkaspace.com${item.path}`} />
                            </>
                        )}
                        <meta itemProp="position" content={index + 2} />
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
