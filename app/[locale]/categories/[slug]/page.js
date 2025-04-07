import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { 
  getCategoryBySlug, 
  getCategoryBreadcrumbs, 
  getProductsByCategory,
  getSubcategories
} from '../../../services/categoryService';
import CategoryBreadcrumbs from '../../../components/categories/CategoryBreadcrumbs';
import CategoryList from '../../../components/categories/CategoryList';
import CategorySEO from '../../../components/categories/CategorySEO';
import RelatedCategories from '../../../components/categories/RelatedCategories';
import PopularCategoryProducts from '../../../components/categories/PopularCategoryProducts';
import CategoryClientPage from './client-page';
import styles from './page.module.scss';

// Генерация метаданных для страницы категории
export async function generateMetadata({ params: { locale, slug } }) {
  await setRequestLocale(locale);
  
  const category = getCategoryBySlug(slug, locale);
  
  if (!category) {
    return {};
  }
  
  return {
    title: category.metaTitle[locale],
    description: category.metaDescription[locale],
    openGraph: {
      title: category.metaTitle[locale],
      description: category.metaDescription[locale],
      url: `https://rybka.space/${locale}/categories/${slug}`,
      siteName: 'Rybka Space',
      images: [
        {
          url: `https://rybka.space${category.image}`,
          width: 1200,
          height: 630,
          alt: category.name[locale],
        },
      ],
      type: 'website',
    },
    // Добавляем canonical URL для SEO
    alternates: {
      canonical: `https://rybka.space/${locale}/categories/${slug}`,
      languages: {
        'uk': `https://rybka.space/uk/categories/${category.slug['uk']}`,
        'ru': `https://rybka.space/ru/categories/${category.slug['ru']}`,
      },
    },
  };
}

// Страница категории
export default async function CategoryPage({ params: { locale, slug } }) {
  await setRequestLocale(locale);
  
  // Получаем данные категории
  const category = getCategoryBySlug(slug, locale);
  
  // Если категория не найдена, возвращаем 404
  if (!category) {
    console.error(`Category not found for slug: ${slug}`);
    notFound();
  }
  
  // Получаем хлебные крошки
  const breadcrumbs = getCategoryBreadcrumbs(category.id, locale);
  
  // Получаем товары для категории
  const products = getProductsByCategory(category.id) || [];
  
  // Получаем подкатегории, если это родительская категория
  const subcategories = getSubcategories(category.id) || [];
  
  // URL страницы для SEO
  const url = `https://rybka.space/${locale}/categories/${slug}`;
  
  return (
    <div className={styles.container}>
      {/* SEO-компонент */}
      <CategorySEO category={category} locale={locale} url={url} />
      
      {/* Хлебные крошки */}
      <CategoryBreadcrumbs items={breadcrumbs} locale={locale} />
      
      {/* Заголовок категории */}
      <div className={styles.categoryHeader}>
        <h1 className={styles.categoryTitle}>{category.name[locale]}</h1>
        <p className={styles.categoryDescription}>{category.description[locale]}</p>
      </div>
      
      {/* Подкатегории, если есть */}
      {Array.isArray(subcategories) && subcategories.length > 0 && (
        <CategoryList categories={subcategories} locale={locale} />
      )}
      
      {/* Клиентский компонент с фильтрами и товарами */}
      {Array.isArray(products) && products.length > 0 && (
        <CategoryClientPage 
          products={products} 
          locale={locale} 
          categoryId={category.id}
        />
      )}
      
      {/* Популярные товары в категории */}
      <PopularCategoryProducts categoryId={category.id} limit={4} />
      
      {/* Связанные категории */}
      <RelatedCategories categoryId={category.id} />
    </div>
  );
}

// Генерация статических путей для всех категорий
export async function generateStaticParams() {
  const locales = ['uk', 'ru'];
  const paths = [];
  
  // Импортируем категории напрямую для генерации путей
  const categories = await import('../../../mocks/categories.json').then(m => m.default);
  
  for (const locale of locales) {
    for (const category of categories) {
      paths.push({
        locale,
        slug: category.slug[locale],
      });
    }
  }
  
  return paths;
}
