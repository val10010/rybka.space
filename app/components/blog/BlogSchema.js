export function generateBlogSchema({ title, description, image, author, date, locale, url }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: image,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Rybka Space',
      logo: {
        '@type': 'ImageObject',
        url: 'https://rybka.space/images/logo.png',
      },
    },
    datePublished: new Date(date).toISOString(),
    dateModified: new Date(date).toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    inLanguage: locale === 'uk' ? 'uk-UA' : 'ru-RU',
  };
}
