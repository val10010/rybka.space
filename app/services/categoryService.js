import categories from '../mocks/categories.json';
import productCategories from '../mocks/productCategories.json';
import productsInfo from '../mocks/productsInfo.json';

/**
 * Получает все категории
 * @returns {Array} Массив всех категорий
 */
export const getAllCategories = () => {
  return categories;
};

/**
 * Получает основные категории (без родительской категории)
 * @returns {Array} Массив основных категорий
 */
export const getMainCategories = () => {
  return categories.filter(category => category.isMain);
};

/**
 * Получает родительскую категорию
 * @param {string} categoryId - ID категории
 * @returns {Object|null} Объект родительской категории или null, если не найдена
 */
export const getParentCategory = (categoryId) => {
  const category = categories.find(cat => cat.id === categoryId);
  if (!category || !category.parentId) return null;
  
  return categories.find(cat => cat.id === category.parentId);
};

/**
 * Получает связанные категории (сестринские или дочерние)
 * @param {string} categoryId - ID категории
 * @returns {Array} Массив связанных категорий
 */
export const getRelatedCategories = (categoryId) => {
  const category = categories.find(cat => cat.id === categoryId);
  if (!category) return [];
  
  // Если у категории есть родитель, получаем другие категории с тем же родителем (сестринские)
  if (category.parentId) {
    return categories.filter(cat => 
      cat.parentId === category.parentId && cat.id !== categoryId
    );
  }
  
  // Если это родительская категория, получаем её дочерние категории
  return categories.filter(cat => cat.parentId === categoryId);
};

/**
 * Получает подкатегории для указанной родительской категории
 * @param {string} parentId - ID родительской категории
 * @returns {Array} Массив подкатегорий
 */
export const getSubcategories = (parentId) => {
  return categories.filter(category => category.parentId === parentId);
};

/**
 * Получает категорию по slug
 * @param {string|null} slug - Slug категории, если null - возвращает все категории
 * @param {string} locale - Текущая локаль
 * @returns {Object|Array|null} Объект категории, массив всех категорий или null, если категория не найдена
 */
export const getCategoryBySlug = (slug, locale) => {
  // Если slug не указан, возвращаем все категории
  if (slug === null || slug === undefined) {
    return categories;
  }
  
  // Иначе ищем категорию по slug
  return categories.find(category => category.slug[locale] === slug) || null;
};

/**
 * Получает категорию по ID
 * @param {string} id - ID категории
 * @returns {Object|null} Объект категории или null, если категория не найдена
 */
export const getCategoryById = (id) => {
  return categories.find(category => category.id === id) || null;
};

/**
 * Получает все товары для указанной категории
 * @param {string} categoryId - ID категории
 * @returns {Array} Массив товаров в категории
 */
export const getProductsByCategory = (categoryId) => {
  // Получаем ID товаров, которые принадлежат к данной категории
  const productIds = productCategories
    .filter(item => item.categories.includes(categoryId))
    .map(item => item.productId);
  
  // Возвращаем информацию о товарах
  return productsInfo.filter(product => productIds.includes(product.id));
};

/**
 * Получает хлебные крошки для категории
 * @param {string} categoryId - ID категории
 * @param {string} locale - Текущая локаль
 * @returns {Array} Массив объектов для хлебных крошек
 */
export const getCategoryBreadcrumbs = (categoryId, locale) => {
  const breadcrumbs = [];
  let currentCategory = getCategoryById(categoryId);
  
  // Добавляем текущую категорию
  if (currentCategory) {
    breadcrumbs.unshift({
      text: currentCategory.name[locale],
      href: null // Текущая категория не имеет ссылки
    });
    
    // Добавляем родительские категории
    while (currentCategory.parentId) {
      currentCategory = getCategoryById(currentCategory.parentId);
      if (currentCategory) {
        breadcrumbs.unshift({
          text: currentCategory.name[locale],
          href: `/${locale}/categories/${currentCategory.slug[locale]}`
        });
      }
    }
  }
  
  // Добавляем ссылку на главную страницу
  breadcrumbs.unshift({
    text: locale === 'uk' ? 'Головна' : 'Главная',
    href: `/${locale}`
  });
  
  return breadcrumbs;
};

/**
 * Получает категории товара по ID
 * @param {number} productId - ID товара
 * @returns {Array} Массив ID категорий товара
 */
export const getProductCategories = (productId) => {
  const productCategory = productCategories.find(item => item.productId === productId);
  return productCategory ? productCategory.categories : [];
};

/**
 * Получает связанные товары из той же категории
 * @param {number} productId - ID текущего товара
 * @param {number} limit - Максимальное количество связанных товаров
 * @returns {Array} Массив связанных товаров
 */
export const getRelatedProducts = (productId, limit = 4) => {
  // Получаем категории текущего товара
  const productCats = getProductCategories(productId);
  
  if (!productCats.length) return [];
  
  // Получаем товары из тех же категорий, исключая текущий товар
  const relatedProductIds = new Set();
  
  productCats.forEach(categoryId => {
    productCategories
      .filter(item => item.categories.includes(categoryId) && item.productId !== productId)
      .forEach(item => relatedProductIds.add(item.productId));
  });
  
  // Получаем информацию о связанных товарах
  const related = productsInfo.filter(product => relatedProductIds.has(product.id));
  
  // Возвращаем ограниченное количество товаров
  return related.slice(0, limit);
};

/**
 * Получает популярные товары для указанной категории
 * @param {string} categoryId - ID категории
 * @param {number} limit - Максимальное количество товаров
 * @returns {Array} Массив популярных товаров
 */
export const getPopularProductsByCategory = (categoryId, limit = 4) => {
  // Получаем все товары для категории
  const products = getProductsByCategory(categoryId);
  
  if (!products.length) {
    return [];
  }
  
  // Сортируем по популярности (в данном случае просто берем первые N товаров)
  // В реальном приложении здесь можно добавить логику сортировки по продажам, просмотрам и т.д.
  return products.slice(0, limit);
};

/**
 * Получает основную категорию товара по его ID
 * @param {number} productId - ID товара
 * @returns {Object|null} Объект категории или null, если категория не найдена
 */
export const getCategoryByProductId = (productId) => {
  // Получаем все категории товара
  const productCats = getProductCategories(productId);
  
  if (!productCats.length) return null;
  
  // Ищем основную категорию (не подкатегорию)
  for (const catId of productCats) {
    const category = getCategoryById(catId);
    if (category && !category.parentId) {
      return category;
    }
  }
  
  // Если основная категория не найдена, возвращаем первую доступную
  const firstCatId = productCats[0];
  return getCategoryById(firstCatId);
};
