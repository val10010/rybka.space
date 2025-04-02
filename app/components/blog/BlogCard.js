import Link from 'next/link';
import { useTranslations } from 'next-intl';
import AdaptiveImage from '../adaptive-image';
import styles from './BlogCard.module.scss';

export default function BlogCard({ post, locale }) {
  const t = useTranslations('Blog');
  const { id, slug, title, description, coverImage, date } = post;
  
  // Форматирование даты
  const formattedDate = new Date(date).toLocaleDateString(locale === 'uk' ? 'uk-UA' : 'ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <article className={styles.card}>
      <Link href={`/${locale}/blog/${slug}`} className={styles.imageLink}>
        <AdaptiveImage
          src={coverImage}
          alt={title[locale]}
          width={400}
          height={250}
          className={styles.image}
        />
      </Link>
      <div className={styles.content}>
        <div className={styles.meta}>
          <time dateTime={date}>{formattedDate}</time>
        </div>
        <h3 className={styles.title}>
          <Link href={`/${locale}/blog/${slug}`}>
            {title[locale]}
          </Link>
        </h3>
        <p className={styles.description}>{description[locale]}</p>
        <Link href={`/${locale}/blog/${slug}`} className={styles.readMore}>
          {t('readMore')}
        </Link>
      </div>
    </article>
  );
}
