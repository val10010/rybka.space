import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import BlogContent from '../../../components/blog/BlogContent';
import RelatedProducts from '../../../components/blog/RelatedProducts';
import blogPosts from '../../../mocks/blogPosts.json';
import styles from './page.module.scss';

export function generateMetadata({ params: { locale, slug } }) {
  const post = blogPosts.find(post => post.slug === slug);
  
  if (!post) {
    return {};
  }
  
  return {
    title: post.title[locale],
    description: post.description[locale],
    openGraph: {
      title: post.title[locale],
      description: post.description[locale],
      url: `https://rybka.space/${locale}/blog/${slug}`,
      siteName: 'Rybka Space',
      images: [
        {
          url: `https://rybka.space${post.coverImage}`,
          width: 1200,
          height: 630,
          alt: post.title[locale],
        },
      ],
      type: 'article',
    },
  };
}

export default function BlogPostPage({ params: { slug } }) {
  const locale = useLocale();
  const t = useTranslations('Blog');
  
  // Находим пост по slug
  const post = blogPosts.find(post => post.slug === slug);
  
  // Если пост не найден, возвращаем 404
  if (!post) {
    notFound();
  }
  
  // Форматирование даты
  const formattedDate = new Date(post.date).toLocaleDateString(locale === 'uk' ? 'uk-UA' : 'ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <article className={styles.article}>
        <div className={styles.container}>
          <div className={styles.breadcrumbs}>
            <Link href={`/${locale}`}>{t('home')}</Link> / 
            <Link href={`/${locale}/blog`}>{t('blog')}</Link> / 
            <span>{post.title[locale]}</span>
          </div>
          
          <header className={styles.header}>
            <h1 className={styles.title}>{post.title[locale]}</h1>
            <div className={styles.meta}>
              <time dateTime={post.date}>{formattedDate}</time>
              <span className={styles.author}>{post.author[locale]}</span>
            </div>
          </header>
          
          <figure className={styles.coverImage}>
            <Image
              src={post.coverImage}
              alt={post.title[locale]}
              width={1200}
              height={630}
              priority
              className={styles.image}
            />
          </figure>
          
          <BlogContent content={post.content} locale={locale} />
          
          {post.tags && post.tags[locale].length > 0 && (
            <div className={styles.tags}>
              {post.tags[locale].map((tag, index) => (
                <span key={index} className={styles.tag}>#{tag}</span>
              ))}
            </div>
          )}
          
          {post.relatedProducts && post.relatedProducts.length > 0 && (
            <RelatedProducts productIds={post.relatedProducts} locale={locale} />
          )}
          
          <div className={styles.navigation}>
            <Link href={`/${locale}/blog`} className={styles.backButton}>
              {t('backToBlog')}
            </Link>
          </div>
        </div>
      </article>
  );
}

// Генерация статических путей для всех постов
export async function generateStaticParams() {
  const locales = ['uk', 'ru'];
  const paths = [];
  
  for (const locale of locales) {
    for (const post of blogPosts) {
      paths.push({
        locale,
        slug: post.slug,
      });
    }
  }
  
  return paths;
}
