import Link from 'next/link';
import Image from 'next/image';
import styles from './BlogContent.module.scss';

export default function BlogContent({ content, locale }) {
  return (
    <div className={styles.content}>
      {content[locale].map((block, index) => {
        switch (block.type) {
          case 'paragraph':
            return <p key={index} className={styles.paragraph}>{block.text}</p>;
          
          case 'heading':
            return <h2 key={index} className={styles.heading}>{block.text}</h2>;
          
          case 'image':
            return (
              <figure key={index} className={styles.figure}>
                <Image
                  src={block.src}
                  alt={block.alt}
                  width={800}
                  height={500}
                  className={styles.image}
                />
                {block.caption && <figcaption className={styles.caption}>{block.caption}</figcaption>}
              </figure>
            );
          
          case 'list':
            return (
              <ul key={index} className={styles.list}>
                {block.items.map((item, i) => (
                  <li key={i} className={styles.listItem}>{item}</li>
                ))}
              </ul>
            );
          
          case 'cta':
            return (
              <div key={index} className={styles.cta}>
                <Link href={block.link} className={styles.ctaButton}>
                  {block.text}
                </Link>
              </div>
            );
          
          default:
            return null;
        }
      })}
    </div>
  );
}
