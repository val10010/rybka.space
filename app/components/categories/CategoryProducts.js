import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { getCategoryByProductId } from '../../services/categoryService';
import styles from './CategoryProducts.module.scss';

// Вспомогательная функция для получения slug категории товара
function getCategorySlugForProduct(productId, locale) {
  const category = getCategoryByProductId(productId);
  return category ? category.slug[locale] : 'zhinochi-kostyumy';
}

/**
 * Компонент для отображения товаров в категории
 * @param {Array} products - Массив товаров для отображения
 * @param {string} locale - Текущая локаль
 */
export default function CategoryProducts({ products, locale }) {
  const t = useTranslations();

  if (!products || products.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>{t('products.notFound')}</p>
      </div>
    );
  }

  return (
    <div className={styles.productsGrid}>
      {products.map((product) => (
        <Link 
          href={`/${locale}/categories/${getCategorySlugForProduct(product.id, locale)}/${product.id}`}
          key={product.id}
          className={styles.productCard}
        >
          <div className={styles.imageWrapper}>
            {product.images && product.images.length > 0 && (
              <Image
                src={`/images/products/${product.id}/${product.images[0]}.webp`}
                alt={product.name[locale]}
                width={300}
                height={450}
                className={styles.productImage}
              />
            )}
            {product.discount && (
              <span className={styles.discountBadge}>-{product.discount}%</span>
            )}
          </div>
          <div className={styles.productInfo}>
            <h3 className={styles.productName}>{product.name[locale]}</h3>
            <div className={styles.priceContainer}>
              {product.oldPrice ? (
                <>
                  <span className={styles.oldPrice}>{product.oldPrice} {t('product.currency')}</span>
                  <span className={styles.price}>{product.price} {t('product.currency')}</span>
                </>
              ) : (
                <span className={styles.price}>{product.price} {t('product.currency')}</span>
              )}
            </div>
            <div className={styles.productMeta}>
              {product.grid && product.grid.availableSizes && (
                <div className={styles.sizes}>
                  {product.grid.availableSizes.map((size) => (
                    <span key={size} className={styles.sizeTag}>{size}</span>
                  ))}
                </div>
              )}
              <span className={styles.colorName}>{product.currentColor[locale]}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
