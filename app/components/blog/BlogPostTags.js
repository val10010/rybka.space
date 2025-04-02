import styles from './BlogPostTags.module.scss';

export default function BlogPostTags({ tags }) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className={styles.tags}>
      {tags.map((tag, index) => (
        <span key={index} className={styles.tag}>
          #{tag}
        </span>
      ))}
    </div>
  );
}
