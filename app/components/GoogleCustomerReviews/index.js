"use client"

import { useEffect } from 'react';
import Script from 'next/script';
import { useLocale } from 'next-intl';

// Компонент Google Customer Reviews
// Документация: https://support.google.com/merchants/answer/7124322
export default function GoogleCustomerReviews({
  merchantId, // ID вашего аккаунта в Google Merchant Center
  orderId, // ID заказа
  email, // Email клиента (опционально)
  deliveryCountry = 'UA', // Код страны доставки
  productIds = [] // Массив ID товаров в заказе (опционально)
}) {
  const locale = useLocale();

  // Дата ожидаемой доставки (через 7 дней)
  const estimatedDeliveryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  return (
    <>
      {/* Скрипт для загрузки библиотеки Google Customer Reviews */}
      <Script
        id="gcrScript"
        strategy="afterInteractive"
        src="https://apis.google.com/js/platform.js"
      />

      {/* Скрипт для инициализации Google Customer Reviews */}
      <Script
        id="gcrInit"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('load', function() {
              if (window.gapi && window.gapi.load) {
                window.gapi.load('surveyoptin', function() {
                  if (window.gapi.surveyoptin && window.gapi.surveyoptin.render) {
                    window.gapi.surveyoptin.render({
                      "merchant_id": ${merchantId},
                      "order_id": "${orderId}",
                      "email": "${email || ''}",
                      "delivery_country": "${deliveryCountry}",
                      "estimated_delivery_date": "${estimatedDeliveryDate}",
                      "opt_in_style": "CENTER_DIALOG"
                    });
                    console.log('Google Customer Reviews initialized');
                  } else {
                    console.error('gapi.surveyoptin.render is not available');
                  }
                });
              } else {
                console.error('gapi.load is not available');
              }
            });
          `
        }}
      />

      {/* Скрипт для отправки информации о заказе */}
      <div 
        className="goog-review-opt-in-container" 
        data-merchant-id={merchantId}
        data-order-id={orderId}
        data-email={email || ''}
        data-delivery-country={deliveryCountry}
        data-estimated-delivery-date={estimatedDeliveryDate}
      />
    </>
  );
}
