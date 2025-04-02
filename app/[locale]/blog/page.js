import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import BlogCard from '../../components/blog/BlogCard';
import blogPosts from '../../mocks/blogPosts.json';
import styles from './page.module.scss';

export const metadata = {
  title: 'Blog - Rybka Space',
  description: 'Блог о женской моде, стиле и трендах от Rybka Space',
  openGraph: {
    title: 'Blog - Rybka Space',
    description: 'Блог о женской моде, стиле и трендах от Rybka Space',
    url: 'https://rybka.space/blog',
    siteName: 'Rybka Space',
  },
};

export default function BlogPage() {
  const locale = useLocale();
  const t = useTranslations('Blog');

  // Сортировка постов по дате (от новых к старым)
  const sortedPosts = [...blogPosts].sort((a, b) =>
    new Date(b.date) - new Date(a.date)
  );

  return (
    <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.breadcrumbs}>
            <Link href={`/${locale}`}>{t('home')}</Link> / <span>{t('blog')}</span>
          </div>
          <h1 className={styles.title}>{t('blog')}</h1>
          <p className={styles.description}>{t('blogDescription')}</p>
        </header>

        <div className={styles.grid}>
          {sortedPosts.map(post => (
            <div key={post.id} className={styles.cardWrapper}>
              <BlogCard post={post} locale={locale} />
            </div>
          ))}
        </div>
    </div>
  );
}
