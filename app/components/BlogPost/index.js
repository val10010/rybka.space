import Link from 'next/link';
import Image from 'next/image';
import styles from './styles.module.scss';

export default function BlogPost({ post, locale }) {
    return (
        <article className={styles.blogPost}>
            <div className={styles.imageContainer}>
                <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={styles.image}
                />
            </div>
            <div className={styles.content}>
                <h2>{post.title}</h2>
                <p className={styles.excerpt}>{post.excerpt}</p>
                <div className={styles.meta}>
                    <time>{new Date(post.date).toLocaleDateString()}</time>
                    <Link href={`/${locale}/blog/${post.slug}`} className={styles.readMore}>
                        Читать далее
                    </Link>
                </div>
            </div>
        </article>
    );
}
