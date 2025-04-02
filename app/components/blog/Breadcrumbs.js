import Link from 'next/link';
import styles from './Breadcrumbs.module.scss';

export default function Breadcrumbs({ items }) {
  return (
    <div className={styles.breadcrumbs}>
      {items.map((item, index) => (
        <span key={item.href || index}>
          {index > 0 && <span className={styles.separator}>/</span>}
          {item.href ? (
            <Link href={item.href} className={styles.link}>
              {item.text}
            </Link>
          ) : (
            <span className={styles.current}>{item.text}</span>
          )}
        </span>
      ))}
    </div>
  );
}
