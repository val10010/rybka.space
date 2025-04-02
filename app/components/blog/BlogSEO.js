import Head from 'next/head';

export default function BlogSEO({ post, locale, url }) {
  const formattedDate = new Date(post.date).toISOString();
  const readingTime = Math.ceil(post.content[locale].reduce((acc, block) => {
    if (block.type === 'paragraph') {
      return acc + block.text.split(' ').length / 200; // Среднее время чтения: 200 слов в минуту
    }
    return acc;
  }, 0));

  return (
    <Head>
      {/* Основные мета-теги */}
      <meta name="article:published_time" content={formattedDate} />
      <meta name="article:author" content={post.author[locale]} />
      <meta name="article:section" content="Fashion" />
      <meta name="twitter:label1" content="Written by" />
      <meta name="twitter:data1" content={post.author[locale]} />
      <meta name="twitter:label2" content="Est. reading time" />
      <meta name="twitter:data2" content={`${readingTime} minutes`} />
      
      {/* Разметка для поисковых систем */}
      <link rel="canonical" href={url} />
      <link 
        rel="alternate" 
        hrefLang="uk" 
        href={url.replace(`/${locale}/`, '/uk/')} 
      />
      <link 
        rel="alternate" 
        hrefLang="ru" 
        href={url.replace(`/${locale}/`, '/ru/')} 
      />
      <link rel="alternate" hrefLang="x-default" href={url.replace(`/${locale}/`, '/uk/')} />
      
      {/* Мета-теги для социальных сетей */}
      <meta property="og:type" content="article" />
      <meta property="og:locale" content={locale === 'uk' ? 'uk_UA' : 'ru_RU'} />
      <meta property="og:site_name" content="Rybka Space" />
      <meta property="article:published_time" content={formattedDate} />
      <meta property="article:modified_time" content={formattedDate} />
      <meta property="article:author" content={post.author[locale]} />
      <meta property="article:section" content="Fashion" />
      {post.tags && post.tags[locale].map(tag => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
    </Head>
  );
}
