import styles from './page.module.scss';
import { getTranslations } from 'next-intl/server';
import { getAllPosts } from '@/services/blogService';
import BlogPost from '@/components/BlogPost';

export default async function Blog({params: {locale}}) {
    const t = await getTranslations('Blog');
    const posts = await getAllPosts(locale);

    return (
        <main className={styles.main}>
            <h1>{t('title')}</h1>
            <div className={styles.blogGrid}>
                {posts.map(post => (
                    <BlogPost
                        key={post.id}
                        post={post}
                        locale={locale}
                    />
                ))}
            </div>
        </main>
    );
}
