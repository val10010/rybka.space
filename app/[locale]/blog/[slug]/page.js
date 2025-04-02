import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { formatDate } from '../../../utils/dateFormatter';
import { generateBlogSchema } from '../../../components/blog/BlogSchema';
import BlogContent from '../../../components/blog/BlogContent';
import BlogSEO from '../../../components/blog/BlogSEO';
import BlogAnalytics from '../../../components/blog/BlogAnalytics';
import BlogBreadcrumbs from '../../../components/blog/BlogBreadcrumbs';
import BlogPostHeaderSection from '../../../components/blog/BlogPostHeaderSection';
import BlogPostCoverImage from '../../../components/blog/BlogPostCoverImage';
import BlogPostTags from '../../../components/blog/BlogPostTags';
import RelatedProducts from '../../../components/blog/RelatedProducts';
import BackToListButton from '../../../components/blog/BackToListButton';
import blogPosts from '../../../mocks/blogPosts.json';
import styles from './page.module.scss';

export async function generateMetadata({ params: { locale, slug } }) {
  await setRequestLocale(locale);
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

export default async function BlogPostPage({ params: { slug, locale } }) {
  const url = `https://rybka.space/${locale}/blog/${slug}`;
  await setRequestLocale(locale);
  
  // Находим пост по slug
  const post = blogPosts.find(post => post.slug === slug);
  
  // Если пост не найден, возвращаем 404
  if (!post) {
    notFound();
  }

  const formattedDate = formatDate(post.date, locale);
  const breadcrumbItems = [
    { href: `/${locale}`, text: 'Главная' },
    { href: `/${locale}/blog`, text: 'Блог' },
    { text: post.title[locale] }
  ];

  // Генерируем JSON-LD разметку
  const schema = generateBlogSchema({
    title: post.title[locale],
    description: post.description[locale],
    image: post.coverImage,
    author: post.author[locale],
    date: post.date,
    locale,
    url
  });

  return (
    <>
      <BlogSEO post={post} locale={locale} url={url} />
      <article className={styles.article} itemScope itemType="https://schema.org/BlogPosting">
        <div className={styles.container}>
          {/* Хлебные крошки */}
          <BlogBreadcrumbs items={breadcrumbItems} />

          {/* Заголовок и метаданные */}
          <BlogPostHeaderSection 
            title={post.title[locale]} 
            date={formattedDate} 
            author={post.author[locale]}
          >
            <BlogAnalytics post={post} locale={locale} />
          </BlogPostHeaderSection>

          {/* Главное изображение */}
          <BlogPostCoverImage 
            src={post.coverImage} 
            alt={post.title[locale]} 
          />

        {/* Контент статьи */}
        <div itemProp="articleBody">
          <BlogContent content={post.content} locale={locale} />
        </div>
        
        {/* Вставляем JSON-LD разметку */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        {/* Теги */}
        {post.tags && post.tags[locale].length > 0 && (
          <BlogPostTags tags={post.tags[locale]} />
        )}

        {/* Связанные товары */}
        {post.relatedProducts && post.relatedProducts.length > 0 && (
          <RelatedProducts productIds={post.relatedProducts} locale={locale} />
        )}

        {/* Кнопка возврата (клиентский компонент) */}
        <BackToListButton locale={locale} />
      </div>
    </article>
    </>
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
