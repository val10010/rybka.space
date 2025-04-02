import Link from 'next/link';
import styles from './BlogBreadcrumbs.module.scss';

export default function BlogBreadcrumbs({ items }) {
  return (
    <nav className={styles.breadcrumbs} aria-label="breadcrumb">
      {items.map((item, index) => (
        <span key={item.href || index}>
          {index > 0 && ' / '}
          {item.href ? (
            <Link href={item.href} className={styles.link}>
              {item.text}
            </Link>
          ) : (
            <span className={styles.current}>{item.text}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
