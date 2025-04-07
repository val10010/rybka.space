import { setRequestLocale } from 'next-intl/server';
import { getAllCategories, getMainCategories } from '../../services/categoryService';
import CategoryList from '../../components/categories/CategoryList';
import CategoryBreadcrumbs from '../../components/categories/CategoryBreadcrumbs';
import styles from './page.module.scss';

// Генерация метаданных для страницы категорий
export async function generateMetadata({ params: { locale } }) {
  await setRequestLocale(locale);
  
  const title = locale === 'uk' ? 'Категорії жіночих костюмів | Rybka.Space' : 'Категории женских костюмов | Rybka.Space';
  const description = locale === 'uk' 
    ? 'Всі категорії жіночих костюмів в інтернет-магазині Rybka.Space. Зимові, осінні, спортивні, елегантні та повсякденні костюми.'
    : 'Все категории женских костюмов в интернет-магазине Rybka.Space. Зимние, осенние, спортивные, элегантные и повседневные костюмы.';
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://rybka.space/${locale}/categories`,
      siteName: 'Rybka Space',
      type: 'website',
    },
    // Добавляем canonical URL для SEO
    alternates: {
      canonical: `https://rybka.space/${locale}/categories`,
      languages: {
        'uk': 'https://rybka.space/uk/categories',
        'ru': 'https://rybka.space/ru/categories',
      },
    },
  };
}

// Страница всех категорий
export default async function CategoriesPage({ params: { locale } }) {
  await setRequestLocale(locale);
  
  // Получаем основные категории
  const mainCategories = getMainCategories();
  
  // Получаем все категории
  const allCategories = getAllCategories();
  
  // Группируем категории по типам
  const seasonalCategories = allCategories.filter(cat => cat.type === 'seasonal');
  const styleCategories = allCategories.filter(cat => cat.type === 'style');
  
  const pageTitle = locale === 'uk' ? 'Категорії' : 'Категории';
  const seasonalTitle = locale === 'uk' ? 'Сезонні костюми' : 'Сезонные костюмы';
  const styleTitle = locale === 'uk' ? 'Стилі костюмів' : 'Стили костюмов';
  
  // Создаем хлебные крошки для страницы категорий
  const breadcrumbs = [
    {
      text: locale === 'uk' ? 'Головна' : 'Главная',
      href: `/${locale}`
    },
    {
      text: pageTitle,
      href: null // Текущая страница не имеет ссылки
    }
  ];
  
  return (
    <div className={styles.container}>
      {/* Хлебные крошки */}
      <CategoryBreadcrumbs items={breadcrumbs} locale={locale} />
      
      <h1 className={styles.pageTitle}>{pageTitle}</h1>
      
      {/* Основные категории */}
      <section className={styles.categorySection}>
        <CategoryList categories={mainCategories} locale={locale} />
      </section>
      
      {/* Сезонные категории */}
      {seasonalCategories.length > 0 && (
        <section className={styles.categorySection}>
          <h2 className={styles.sectionTitle}>{seasonalTitle}</h2>
          <CategoryList categories={seasonalCategories} locale={locale} />
        </section>
      )}
      
      {/* Категории по стилю */}
      {styleCategories.length > 0 && (
        <section className={styles.categorySection}>
          <h2 className={styles.sectionTitle}>{styleTitle}</h2>
          <CategoryList categories={styleCategories} locale={locale} />
        </section>
      )}
      
      {/* SEO-текст */}
      <section className={styles.seoText}>
        <h2 className={styles.seoTitle}>
          {locale === 'uk' ? 'Жіночі костюми на будь-який смак' : 'Женские костюмы на любой вкус'}
        </h2>
        <p>
          {locale === 'uk' 
            ? 'В інтернет-магазині Rybka.Space ви знайдете широкий вибір жіночих костюмів різних стилів та сезонів. Ми пропонуємо якісний одяг за доступними цінами з доставкою по всій Україні.'
            : 'В интернет-магазине Rybka.Space вы найдете широкий выбор женских костюмов различных стилей и сезонов. Мы предлагаем качественную одежду по доступным ценам с доставкой по всей Украине.'}
        </p>
        <p>
          {locale === 'uk'
            ? 'Наші костюми виготовлені з високоякісних матеріалів, що забезпечують комфорт та довговічність. Ви можете вибрати зимові костюми з утепленням, легкі весняні моделі, спортивні або елегантні варіанти.'
            : 'Наши костюмы изготовлены из высококачественных материалов, обеспечивающих комфорт и долговечность. Вы можете выбрать зимние костюмы с утеплением, легкие весенние модели, спортивные или элегантные варианты.'}
        </p>
      </section>
    </div>
  );
}
