import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { 
  getCategoryBySlug, 
  getCategoryBreadcrumbs, 
  getProductsByCategory,
  getSubcategories
} from '../../../../services/categoryService';
import CategoryBreadcrumbs from '../../../../components/categories/CategoryBreadcrumbs';
import CategorySEO from '../../../../components/categories/CategorySEO';
import RelatedCategories from '../../../../components/categories/RelatedCategories';
import PopularCategoryProducts from '../../../../components/categories/PopularCategoryProducts';
import CategoryClientPage from '../client-page';
import styles from '../page.module.scss';

// Генерация метаданных для страницы подкатегории
export async function generateMetadata({ params: { locale, slug, 'subcategory-slug': subcategorySlug } }) {
  await setRequestLocale(locale);
  
  // Получаем данные основной категории и подкатегории
  const mainCategory = getCategoryBySlug(slug, locale);
  const subcategory = getCategoryBySlug(subcategorySlug, locale);
  
  if (!mainCategory || !subcategory) {
    return {};
  }
  
  // Проверяем, что подкатегория действительно принадлежит основной категории
  if (subcategory.parentId !== mainCategory.id) {
    return {};
  }
  
  return {
    title: subcategory.metaTitle[locale],
    description: subcategory.metaDescription[locale],
    openGraph: {
      title: subcategory.metaTitle[locale],
      description: subcategory.metaDescription[locale],
      url: `https://rybka.space/${locale}/categories/${slug}/${subcategorySlug}`,
      siteName: 'Rybka Space',
      images: [
        {
          url: `https://rybka.space${subcategory.image}`,
          width: 1200,
          height: 630,
          alt: subcategory.name[locale],
        },
      ],
      type: 'website',
    },
    // Добавляем canonical URL для SEO
    alternates: {
      canonical: `https://rybka.space/${locale}/categories/${slug}/${subcategorySlug}`,
      languages: {
        'uk': `https://rybka.space/uk/categories/${mainCategory.slug['uk']}/${subcategory.slug['uk']}`,
        'ru': `https://rybka.space/ru/categories/${mainCategory.slug['ru']}/${subcategory.slug['ru']}`,
      },
    },
  };
}

// Страница подкатегории
export default async function SubcategoryPage({ params: { locale, slug, 'subcategory-slug': subcategorySlug } }) {
  await setRequestLocale(locale);
  
  // Получаем данные основной категории и подкатегории
  const mainCategory = getCategoryBySlug(slug, locale);
  const subcategory = getCategoryBySlug(subcategorySlug, locale);
  
  // Если категория или подкатегория не найдена, возвращаем 404
  if (!mainCategory || !subcategory) {
    console.error(`Category or subcategory not found for slug: ${slug}/${subcategorySlug}`);
    notFound();
  }
  
  // Проверяем, что подкатегория действительно принадлежит основной категории
  if (subcategory.parentId !== mainCategory.id) {
    console.error(`Subcategory ${subcategorySlug} does not belong to category ${slug}`);
    notFound();
  }
  
  // Получаем хлебные крошки
  const breadcrumbs = getCategoryBreadcrumbs(subcategory.id, locale);
  
  // Получаем товары для подкатегории
  const products = getProductsByCategory(subcategory.id) || [];
  
  // URL страницы для SEO
  const url = `https://rybka.space/${locale}/categories/${slug}/${subcategorySlug}`;
  
  return (
    <div className={styles.container}>
      {/* SEO-компонент */}
      <CategorySEO category={subcategory} locale={locale} url={url} />
      
      {/* Хлебные крошки */}
      <CategoryBreadcrumbs items={breadcrumbs} locale={locale} />
      
      {/* Заголовок подкатегории */}
      <div className={styles.categoryHeader}>
        <h1 className={styles.categoryTitle}>{subcategory.name[locale]}</h1>
        <p className={styles.categoryDescription}>{subcategory.description[locale]}</p>
      </div>
      
      {/* Клиентский компонент с фильтрами и товарами */}
      {Array.isArray(products) && products.length > 0 && (
        <CategoryClientPage 
          products={products} 
          locale={locale} 
          categoryId={subcategory.id}
        />
      )}
      
      {/* Популярные товары в подкатегории */}
      <PopularCategoryProducts categoryId={subcategory.id} limit={4} />
      
      {/* Связанные категории */}
      <RelatedCategories categoryId={subcategory.id} />
    </div>
  );
}

// Генерация статических путей для всех подкатегорий
export async function generateStaticParams() {
  const locales = ['uk', 'ru'];
  const paths = [];
  
  // Получаем все категории
  const allCategories = getCategoryBySlug(null, 'uk');
  
  // Для каждой категории и локали создаем путь
  allCategories.forEach(category => {
    if (category.parentId) { // Это подкатегория
      const parentCategory = allCategories.find(c => c.id === category.parentId);
      if (parentCategory) {
        locales.forEach(locale => {
          paths.push({
            locale,
            slug: parentCategory.slug[locale],
            'subcategory-slug': category.slug[locale]
          });
        });
      }
    }
  });
  
  return paths;
}
