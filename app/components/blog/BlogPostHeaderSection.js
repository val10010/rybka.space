import styles from './BlogPostHeaderSection.module.scss';

export default function BlogPostHeaderSection({ title, date, author, children }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title} itemProp="headline">{title}</h1>
      <div className={styles.meta}>
        <time dateTime={date} itemProp="datePublished">{date}</time>
        <span className={styles.author} itemProp="author" itemScope itemType="https://schema.org/Person">
          <span itemProp="name">{author}</span>
        </span>
      </div>
      {children}
    </header>
  );
}
