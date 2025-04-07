/**
 * Компонент для SEO-метаданных категорий
 * @param {Object} category - Объект категории
 * @param {string} locale - Текущая локаль
 * @param {string} url - URL страницы категории
 */
export default function CategorySEO({ category, locale, url }) {
  if (!category) {
    return null;
  }

  // Генерируем JSON-LD разметку для категории
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name[locale],
    description: category.description[locale],
    url: url,
    mainEntity: {
      '@type': 'ItemList',
      name: category.name[locale],
      description: category.description[locale],
      url: url
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
