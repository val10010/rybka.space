import styles from './page.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { getPostBySlug } from '@/services/blogService';

export default async function BlogPost({params: {locale, slug}}) {
    const t = await getTranslations('Blog');
    const post = await getPostBySlug(slug, locale);

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <article className={styles.article}>
            <Link href={`/${locale}/blog`} className={styles.backLink}>
                ← {t('backToBlog')}
            </Link>

            <div className={styles.header}>
                <h1>{post.title}</h1>
                <time>{new Date(post.date).toLocaleDateString()}</time>
            </div>

            <div className={styles.coverImage}>
                <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="100vw"
                    priority
                    className={styles.image}
                />
            </div>

            <div
                className={styles.content}
                dangerouslySetInnerHTML={{__html: post.content}}
            />
        </article>
    );
}
