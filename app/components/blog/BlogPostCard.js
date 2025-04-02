import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '../../utils/dateFormatter';
import styles from './BlogPostCard.module.scss';

export default function BlogPostCard({ post, locale }) {
  return (
    <article className={styles.card}>
      <Link href={`/${locale}/blog/${post.slug}`} className={styles.link}>
        <div className={styles.imageWrapper}>
          <Image
            src={post.coverImage}
            alt={post.title[locale]}
            width={400}
            height={300}
            className={styles.image}
          />
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>{post.title[locale]}</h2>
          <p className={styles.description}>{post.description[locale]}</p>
          <div className={styles.meta}>
            <time dateTime={post.date}>
              {formatDate(post.date, locale)}
            </time>
            <span className={styles.author}>{post.author[locale]}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
