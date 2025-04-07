import Link from 'next/link';
import styles from './CategoryBreadcrumbs.module.scss';

/**
 * Компонент для отображения хлебных крошек с учетом категорий
 * @param {Array} items - Массив элементов хлебных крошек
 * @param {string} locale - Текущая локаль
 */
export default function CategoryBreadcrumbs({ items, locale }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav className={styles.breadcrumbs} aria-label={locale === 'uk' ? 'Навігація по сайту' : 'Навигация по сайту'}>
      <ol className={styles.breadcrumbsList} itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, index) => (
          <li 
            key={index} 
            className={styles.breadcrumbsItem}
            itemProp="itemListElement" 
            itemScope 
            itemType="https://schema.org/ListItem"
          >
            {item.href ? (
              <Link href={item.href} itemProp="item" className={styles.breadcrumbsLink}>
                <span itemProp="name">{item.text}</span>
              </Link>
            ) : (
              <span itemProp="name" className={styles.breadcrumbsCurrent}>{item.text}</span>
            )}
            <meta itemProp="position" content={index + 1} />
            {index < items.length - 1 && (
              <span className={styles.breadcrumbsSeparator} aria-hidden="true">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
