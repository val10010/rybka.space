const fs = require('fs');
const path = require('path');

// Импортируем данные о товарах
const productsInfo = require('../app/mocks/productsInfo.json');

// Функция для создания XML фида для Google Merchant Center
function generateGoogleFeed() {
  // Начало XML документа
  let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
<channel>
  <title>Rybka Space - Жіночі спортивні костюми</title>
  <link>https://rybkaspace.com</link>
  <description>Великий вибір жіночих спортивних костюмів в інтернет-магазині Rybka Space</description>
`;

  // Добавляем каждый товар в фид
  productsInfo.forEach(product => {
    // Пропускаем отключенные товары
    if (product.disabled) return;

    // Получаем основную информацию о товаре
    const id = product.id;
    const title_uk = product.name.uk;
    const title_ru = product.name.ru;
    const description_uk = product.info.desc.uk;
    const description_ru = product.info.desc.ru;
    const price = product.price;
    const availability = product.disabled ? 'out of stock' : 'in stock';
    const color_uk = product.currentColor.uk;
    const color_ru = product.currentColor.ru;
    const link = `https://rybkaspace.com/product/${id}`;
    
    // Формируем список доступных размеров
    const sizes = product.grid.availableSizes.join(', ');
    
    // Формируем материалы (берем первый элемент из массива)
    const material_uk = product.info.material?.uk?.[0] || '';
    const material_ru = product.info.material?.ru?.[0] || '';
    
    // Формируем изображения
    const imageLinks = product.images.map(img => 
      `https://rybkaspace.com/images/products/${product.id}/${img}.jpg`
    );
    
    // Добавляем товар в фид (украинская версия)
    xmlContent += `  <item>
    <g:id>RS-${id}-UK</g:id>
    <g:title>${title_uk} - ${color_uk}</g:title>
    <g:description>${description_uk}</g:description>
    <g:link>${link}</g:link>
    <g:image_link>${imageLinks[0]}</g:image_link>
    ${imageLinks.slice(1).map(img => `    <g:additional_image_link>${img}</g:additional_image_link>`).join('\n')}
    <g:availability>${availability}</g:availability>
    <g:price>${price} UAH</g:price>
    <g:brand>Rybka Space</g:brand>
    <g:condition>new</g:condition>
    <g:color>${color_uk}</g:color>
    <g:size>${sizes}</g:size>
    <g:material>${material_uk.replace(/<[^>]*>?/gm, '')}</g:material>
    <g:gender>female</g:gender>
    <g:age_group>adult</g:age_group>
    <g:product_type>Одяг &gt; Жіночий одяг &gt; Спортивні костюми</g:product_type>
    <g:custom_label_0>${product.info.season?.uk?.[0] || ''}</g:custom_label_0>
  </item>
`;

    // Добавляем товар в фид (русская версия)
    xmlContent += `  <item>
    <g:id>RS-${id}-RU</g:id>
    <g:title>${title_ru} - ${color_ru}</g:title>
    <g:description>${description_ru}</g:description>
    <g:link>${link}</g:link>
    <g:image_link>${imageLinks[0]}</g:image_link>
    ${imageLinks.slice(1).map(img => `    <g:additional_image_link>${img}</g:additional_image_link>`).join('\n')}
    <g:availability>${availability}</g:availability>
    <g:price>${price} UAH</g:price>
    <g:brand>Rybka Space</g:brand>
    <g:condition>new</g:condition>
    <g:color>${color_ru}</g:color>
    <g:size>${sizes}</g:size>
    <g:material>${material_ru.replace(/<[^>]*>?/gm, '')}</g:material>
    <g:gender>female</g:gender>
    <g:age_group>adult</g:age_group>
    <g:product_type>Одежда &gt; Женская одежда &gt; Спортивные костюмы</g:product_type>
    <g:custom_label_0>${product.info.season?.ru?.[0] || ''}</g:custom_label_0>
  </item>
`;
  });

  // Закрываем XML документ
  xmlContent += `</channel>
</rss>`;

  // Записываем XML в файл
  const outputPath = path.join(__dirname, '../public/google-feed.xml');
  fs.writeFileSync(outputPath, xmlContent, 'utf8');
  
  console.log(`Google Shopping Feed успешно создан: ${outputPath}`);
}

// Запускаем генерацию фида
generateGoogleFeed();
