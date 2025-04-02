import { setRequestLocale } from 'next-intl/server';
import Breadcrumbs from '../../components/blog/Breadcrumbs';
import TranslatedHeader from '../../components/blog/TranslatedHeader';
import BlogPostCard from '../../components/blog/BlogPostCard';
import blogPosts from '../../mocks/blogPosts.json';
import styles from './page.module.scss';

export async function generateMetadata({ params: { locale } }) {
  await setRequestLocale(locale);

  return {
    title: 'Blog - Rybka Space',
    description: 'Блог о женской моде, стиле и трендах от Rybka Space',
    openGraph: {
      title: 'Blog - Rybka Space',
      description: 'Блог о женской моде, стиле и трендах от Rybka Space',
      url: `https://rybka.space/${locale}/blog`,
      siteName: 'Rybka Space',
    },
  };
}

export default async function BlogPageRoute({ params: { locale } }) {
  await setRequestLocale(locale);

  // Сортировка постов по дате (от новых к старым)
  const sortedPosts = [...blogPosts].sort((a, b) =>
    new Date(b.date) - new Date(a.date)
  );

  const breadcrumbItems = [
    { href: `/${locale}`, text: 'Главная' },
    { text: 'Блог' }
  ];

  return (
    <div className={styles.container}>
      <Breadcrumbs items={breadcrumbItems} />
      <TranslatedHeader titleKey="blog" descriptionKey="blogDescription" />
      <div className={styles.grid}>
        {sortedPosts.map(post => (
          <div key={post.id} className={styles.cardWrapper}>
            <BlogPostCard post={post} locale={locale} />
          </div>
        ))}
      </div>
    </div>
  );
}
