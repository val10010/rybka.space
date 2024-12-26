import styles from './page.module.scss';

export default function DeliveryAndPayment() {
  return (
    <div className={styles.static__content}>
      <div className={styles.static__title}>
        <div className={styles.page_title}>
          <h1>Доставка, оплата, повернення</h1>
        </div>
      </div>
      <div className={styles.static__delivery_payment}>
        <div className={styles.static__delivery_item}>
          <div className={styles.static__delivery_item_title}>
            <div className={styles.static__subtitle}>Доставка</div>
            <div className={styles.static__delivery_desc}>
              Новою Поштою в будь-який куточок України 2-5 днів.
            </div>
            <div className={styles.static__delivery_italic}>
              (Терміни відправлення товару, можуть змінюватись продавцем)
            </div>
          </div>
        </div>

        <div className={styles.static__delivery_item}>
          <div className={styles.static__delivery_item_title}>
            <div className={styles.static__subtitle}>Оплата</div>
            <div className={styles.static__delivery_desc}>
                Переказом на карту або при отриманні замовлення накладеним платежем.
            </div>
          </div>
        </div>

        <div className={styles.static__delivery_item}>
          <div className={styles.static__delivery_item_title}>
            <div className={styles.static__subtitle}>Перевірка якості</div>
            <div className={styles.static__delivery_desc}>
              Отримуючи товар на пошті, ви маєте право перш ніж оплачувати замовлення, приміряти, подивитися і оцінити наскільки якість замовленої продукції влаштовує вас. Чи підходить вам розмір і фасон, чи відповідає вашому очікуванню.
            </div>
          </div>
        </div>

        <div className={styles.static__delivery_item}>
          <div className={styles.static__delivery_item_title}>
            <div className={styles.static__subtitle}>Повернення обмін / товару</div>
            <div className={styles.static__delivery_desc}>
              Якщо вам не підійшов розмір, колір, або ж ви виявили інші проблеми, впродовж 14 днів після покупки, ви можете повернути нам товар або обміняти на інший.
              <br /><br />
                Пишіть нам в <a href="https://www.instagram.com/rybka.space">інстаграм</a> ми оформимо обмін або повернення товару.
              <br /><br />
              Доставка оплачується покупцем, у разі повернення або обміну товару. <b>Якщо відправити повернення за допомогою послуги "Легкого повернення"
             </b> (тисни на посилання, щоб переглянути відео)<b> - доставка безкоштовна!</b>
              <br /><br />
              Повернення коштів або обмін відбувається упродовж 3-7 робочих днів після отримання нами товару, що повертається від вас на склад Нової Пошти. У разі виявлення браку виробництва, доставку оплачуємо ми.
              <br /><br />
              <p className={styles.static__delivery_bold}>Умови повернення / обміну:</p>
              <ul>
                <li>відсутність ознак використання товару, забруднень, сторонніх запахів;</li>
                <li>наявність ярликів;</li>
                <li>збережений товарний вигляд.</li>
              </ul>
              У разі виявлення ознак використання товару, ми залишаємо за собою право на відмову у поверненні коштів.
              <br /><br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
