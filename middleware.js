import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import productsInfo from './app/mocks/productsInfo.json';
import categories from './app/mocks/categories.json';

// Функция для получения категории товара по ID
function getCategoryByProductId(productId) {
  // Получаем товар по ID
  const product = productsInfo.find(item => item.id === productId);
  // Получаем категории товара
  const productCats = product?.categories || [];
  
  if (!productCats.length) return null;
  
  // Ищем основную категорию (не подкатегорию)
  for (const catId of productCats) {
    const category = categories.find(cat => cat.id === catId);
    if (category && !category.parentId) {
      return category;
    }
  }
  
  // Если основная категория не найдена, возвращаем первую доступную
  const firstCatId = productCats[0];
  return categories.find(cat => cat.id === firstCatId);
}

// Функция для получения подкатегории товара
function getSubcategoryByProductId(productId) {
  // Получаем товар по ID
  const product = productsInfo.find(item => item.id === productId);
  // Получаем категории товара
  const productCats = product?.categories || [];
  
  if (!productCats.length) return null;
  
  // Ищем подкатегорию (с родительской категорией)
  for (const catId of productCats) {
    const category = categories.find(cat => cat.id === catId);
    if (category && category.parentId) {
      return category;
    }
  }
  
  // Если подкатегория не найдена, возвращаем null
  return null;
}

// Создаем middleware для мультиязычности
const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['uk', 'ru'],
  
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'uk'
});

// Обработчик для перенаправления со старых URL на новые
export default function middleware(request) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = /^\/([a-z]{2})(\/|$)/.test(pathname);
  
  // Проверяем, если URL соответствует старой структуре /[locale]/product/[id]
  const oldProductMatch = pathnameHasLocale ? 
    pathname.match(/^\/([a-z]{2})\/product\/(\d+)$/) : 
    pathname.match(/^\/product\/(\d+)$/);
  
  // Проверяем, если URL соответствует старой структуре /[locale]/categories/[slug]/[productId]
  const oldCategoryProductMatch = pathnameHasLocale ?
    pathname.match(/^\/([a-z]{2})\/categories\/([^\/]+)\/(\d+)$/) :
    null;
  
  // Обрабатываем старые URL вида /product/[id]
  if (oldProductMatch) {
    const locale = pathnameHasLocale ? oldProductMatch[1] : 'uk';
    const productId = parseInt(pathnameHasLocale ? oldProductMatch[2] : oldProductMatch[1]);
    
    // Проверяем, существует ли товар
    const product = productsInfo.find(p => p.id === productId);
    if (product) {
      // Получаем основную категорию и подкатегорию товара
      const mainCategory = getCategoryByProductId(productId);
      const subCategory = getSubcategoryByProductId(productId);
      
      if (mainCategory) {
        const newUrl = request.nextUrl.clone();
        
        // Если есть подкатегория, включаем её в URL
        if (subCategory) {
          newUrl.pathname = `/${locale}/categories/${mainCategory.slug[locale]}/${subCategory.slug[locale]}/${productId}`;
        } else {
          // Если подкатегории нет, используем основную категорию дважды
          newUrl.pathname = `/${locale}/categories/${mainCategory.slug[locale]}/${mainCategory.slug[locale]}/${productId}`;
        }
        
        return NextResponse.redirect(newUrl);
      }
    }
  }
  
  // Обрабатываем старые URL вида /categories/[slug]/[productId]
  if (oldCategoryProductMatch) {
    const locale = oldCategoryProductMatch[1];
    const categorySlug = oldCategoryProductMatch[2];
    const productId = parseInt(oldCategoryProductMatch[3]);
    
    // Проверяем, существует ли товар
    const product = productsInfo.find(p => p.id === productId);
    if (product) {
      // Получаем основную категорию и подкатегорию товара
      const mainCategory = getCategoryByProductId(productId);
      const subCategory = getSubcategoryByProductId(productId);
      
      if (mainCategory && mainCategory.slug[locale] === categorySlug) {
        const newUrl = request.nextUrl.clone();
        
        // Если есть подкатегория, включаем её в URL
        if (subCategory) {
          newUrl.pathname = `/${locale}/categories/${mainCategory.slug[locale]}/${subCategory.slug[locale]}/${productId}`;
        } else {
          // Если подкатегории нет, используем основную категорию дважды
          newUrl.pathname = `/${locale}/categories/${mainCategory.slug[locale]}/${mainCategory.slug[locale]}/${productId}`;
        }
        
        return NextResponse.redirect(newUrl);
      }
    }
  }
  
  // Если не требуется перенаправление, продолжаем с обычным middleware
  return intlMiddleware(request);
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
