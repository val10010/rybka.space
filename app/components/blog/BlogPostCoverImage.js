import OptimizedImage from './OptimizedImage';
import styles from './BlogPostCoverImage.module.scss';

export default function BlogPostCoverImage({ src, alt }) {
  return (
    <figure className={styles.coverImage} itemProp="image">
      <OptimizedImage
        src={src}
        alt={alt}
        width={1200}
        height={630}
        priority
      />
    </figure>
  );
}
