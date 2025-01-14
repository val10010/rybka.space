import styles from './page.module.scss';
import { useTranslations } from 'next-intl';

export default function DeliveryAndPayment() {
  const t = useTranslations('deliveryAndPayment');

  return (
    <div className={styles.static__content}>
      <div className={styles.static__title}>
        <div className={styles.page_title}>
          <h1>{t('pageTitle')}</h1>
        </div>
      </div>
      <div className={styles.static__delivery_payment}>
        <div className={styles.static__delivery_item}>
          <div className={styles.static__delivery_item_title}>
            <div className={styles.static__subtitle}>{t('delivery.title')}</div>
            <div className={styles.static__delivery_desc}>
              {t('delivery.description')}
            </div>
            <div className={styles.static__delivery_italic}>
              {t('delivery.note')}
            </div>
          </div>
        </div>

        <div className={styles.static__delivery_item}>
          <div className={styles.static__delivery_item_title}>
            <div className={styles.static__subtitle}>{t('payment.title')}</div>
            <div className={styles.static__delivery_desc}>
              {t('payment.description')}
            </div>
          </div>
        </div>

        <div className={styles.static__delivery_item}>
          <div className={styles.static__delivery_item_title}>
            <div className={styles.static__subtitle}>{t('qualityCheck.title')}</div>
            <div className={styles.static__delivery_desc}>
              {t('qualityCheck.description')}
            </div>
          </div>
        </div>

        <div className={styles.static__delivery_item}>
          <div className={styles.static__delivery_item_title}>
            <div className={styles.static__subtitle}>{t('return.title')}</div>
            <div className={styles.static__delivery_desc}>
              {t('return.description')}
              <br /><br />
              {t('return.instagram')} <a href="https://www.instagram.com/rybka.space">{t('return.instagramWord')}</a> {t('return.instagramText')}
              <br /><br />
              {t('return.deliveryNote')} <b>{t('return.freeReturnNote')}</b>
              <br /><br />
              {t('return.refundInfo')}
              <br /><br />
              <p className={styles.static__delivery_bold}>{t('return.conditions.title')}</p>
              <ul>
                {t.raw('return.conditions.list').map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              {t('return.conditions.warning')}
              <br /><br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
