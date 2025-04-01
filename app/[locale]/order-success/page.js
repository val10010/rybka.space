"use client"

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import GoogleCustomerReviews from '@/components/GoogleCustomerReviews';
import styles from './order-success.module.scss';

// Компонент для работы с параметрами URL
function OrderSuccessContent() {
  const t = useTranslations('orderSuccess');
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState({
    orderId: '',
    email: '',
    products: []
  });

  useEffect(() => {
    // Получаем данные заказа из URL параметров
    const orderId = searchParams.get('orderId') || '';
    const email = searchParams.get('email') || '';
    const productsParam = searchParams.get('products') || '';

    // Парсим ID товаров из параметра
    const products = productsParam ? productsParam.split(',').map(Number) : [];

    setOrderDetails({
      orderId,
      email,
      products
    });
  }, [searchParams]);

  // Merchant ID для Google Customer Reviews (замените на ваш ID после регистрации)
  const MERCHANT_ID = 5519949330; // Замените на ваш реальный ID из Google Merchant Center

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('title')}</h1>

      <div className={styles.orderInfo}>
        <p className={styles.orderNumber}>
          {t('orderNumber')}: <span>{orderDetails.orderId}</span>
        </p>

        <p className={styles.thankYou}>{t('thankYou')}</p>

        <div className={styles.nextSteps}>
          <h2 className={styles.subtitle}>{t('nextSteps')}</h2>
          <ul className={styles.stepsList}>
            <li>{t('step1')}</li>
            <li>{t('step2')}</li>
            <li>{t('step3')}</li>
          </ul>
        </div>

        <div className={styles.actions}>
          <Link href="/" className={styles.button}>
            {t('continueShopping')}
          </Link>
        </div>
      </div>

      {/* Интеграция Google Customer Reviews */}
      {orderDetails.orderId && (
        <GoogleCustomerReviews
          merchantId={MERCHANT_ID}
          orderId={orderDetails.orderId}
          email={orderDetails.email}
          productIds={orderDetails.products}
        />
      )}
    </div>
  );
}

// Основной компонент страницы с Suspense boundary
export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<OrderSuccessLoading />}>
      <OrderSuccessContent />
    </Suspense>
  );
}

// Компонент загрузки
function OrderSuccessLoading() {
  const t = useTranslations('orderSuccess');
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('title')}</h1>
      <div className={styles.orderInfo}>
        <p className={styles.loading}>Загрузка информации о заказе...</p>
      </div>
    </div>
  );
}
