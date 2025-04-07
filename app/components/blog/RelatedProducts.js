import { useTranslations } from 'next-intl';
import Link from 'next/link';
import AdaptiveImage from '../adaptive-image';
import productsInfo from '../../mocks/productsInfo.json';
import { getCategoryByProductId } from '../../services/categoryService';
import styles from './RelatedProducts.module.scss';

// Вспомогательная функция для получения slug категории товара
function getCategorySlugForProduct(productId, locale) {
  const category = getCategoryByProductId(productId);
  return category ? category.slug[locale] : 'zhinochi-kostyumy'; // Используем основную категорию по умолчанию
}

export default function RelatedProducts({ productIds, locale }) {
  const t = useTranslations('Blog');

  // Получаем информацию о связанных товарах
  const relatedProducts = productIds
    .map(id => productsInfo.find(product => product.id === id))
    .filter(Boolean);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className={styles.relatedProducts}>
      <h2 className={styles.heading}>{t('relatedProducts')}</h2>
      <div className={styles.grid}>
        {relatedProducts.map(product => (
          <div key={product.id} className={styles.productCard}>
            <Link href={`/${locale}/categories/${getCategorySlugForProduct(product.id, locale)}/${product.id}`} className={styles.productLink}>
              <div className={styles.imageContainer}>
                <AdaptiveImage
                  src={`/images/products/${product.id}/${product.images[0]}.webp`}
                  alt={product.name[locale]}
                  width={200}
                  height={300}
                  className={styles.productImage}
                />
                {product.discount > 0 && (
                  <span className={styles.discount}>-{product.discount}%</span>
                )}
              </div>
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name[locale]}</h3>
                <div className={styles.priceContainer}>
                  {product.discount > 0 && (
                    <span className={styles.oldPrice}>{product.oldPrice} ₴</span>
                  )}
                  <span className={styles.price}>{product.price} ₴</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
