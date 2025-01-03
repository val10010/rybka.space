"use client"

import { useState } from "react";
import styles from "./faq.module.scss";

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqData = [
        {
            question: "Як підібрати правильний розмір спортивного костюма?",
            answer: "Для правильного підбору розміру використовуйте нашу таблицю розмірів. Виміряйте обхват грудей, талії та стегон, та порівняйте з таблицею. Якщо ваші заміри знаходяться між розмірами, рекомендуємо вибрати більший розмір для комфортної посадки."
        },
        {
            question: "Які методи оплати ви приймаєте?",
            answer: "Ми приймаємо оплату банківським переказом та накладеним платежем при отриманні товару у відділенні пошти."
        },
        {
            question: "Скільки часу займає доставка?",
            answer: "Доставка по Україні зазвичай займає 1-3 робочих дні. Відправка здійснюється Новою Поштою або Укрпоштою. Точний термін доставки залежить від вашого міста."
        },
        {
            question: "Чи можна повернути або обміняти товар?",
            answer: "Так, ви можете повернути або обміняти товар протягом 14 днів з моменту покупки, якщо він не був у використанні та збережені всі бірки та упаковка."
        },
        {
            question: "З яких матеріалів виготовлені ваші спортивні костюми?",
            answer: "Наші спортивні костюми виготовлені з високоякісних матеріалів: бавовни, поліестеру та еластану. Це забезпечує комфорт, довговічність та зручність під час носіння."
        }
    ];

    return (
        <section className={styles.faq} itemScope itemType="https://schema.org/FAQPage">
            <h2 className={styles.title}>Часті запитання</h2>
            <div className={styles.questions}>
                {faqData.map((item, index) => (
                    <div
                        key={index}
                        className={styles.item}
                        itemScope
                        itemProp="mainEntity"
                        itemType="https://schema.org/Question"
                    >
                        <button
                            className={`${styles.question} ${openIndex === index ? styles.active : ""}`}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            aria-expanded={openIndex === index}
                            aria-controls={`faq-answer-${index}`}
                        >
                            <span itemProp="name">{item.question}</span>
                            <svg
                                className={styles.icon}
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    d="M19 9l-7 7-7-7"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                        <div
                            id={`faq-answer-${index}`}
                            className={`${styles.answer} ${openIndex === index ? styles.visible : ""}`}
                            itemScope
                            itemProp="acceptedAnswer"
                            itemType="https://schema.org/Answer"
                            role="region"
                            aria-hidden={openIndex !== index}
                        >
                            <div itemProp="text">{item.answer}</div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQ;
