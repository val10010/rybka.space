import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import styles from './CategoryList.module.scss';

/**
 * Компонент для отображения списка категорий
 * @param {Array} categories - Массив категорий для отображения
 * @param {string} locale - Текущая локаль
 */
export default function CategoryList({ categories, locale }) {
  const t = useTranslations();

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className={styles.categorySection}>
      <h2 className={styles.sectionTitle}>{t('categories.title')}</h2>
      <div className={styles.categoryGrid}>
        {categories.map((category) => (
          <Link 
            href={`/${locale}/categories/${category.slug[locale]}`}
            key={category.id}
            className={styles.categoryCard}
          >
            <div className={styles.imageWrapper}>
              {category.image && (
                <Image
                  src={category.image}
                  alt={category.name[locale]}
                  width={300}
                  height={300}
                  className={styles.categoryImage}
                />
              )}
            </div>
            <div className={styles.categoryInfo}>
              <h3 className={styles.categoryName}>{category.name[locale]}</h3>
              <p className={styles.categoryDescription}>{category.description[locale]}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
