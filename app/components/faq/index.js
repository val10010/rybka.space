"use client"

import { useState } from "react";
import { useTranslations } from 'next-intl';
import styles from "./faq.module.scss";

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const t = useTranslations('faq');

    const faqData = [
        {
            question: t('question1'),
            answer: t('answer1'),
            datePublished: "2023-12-01"
        },
        {
            question: t('question2'),
            answer: t('answer2'),
            datePublished: "2023-12-01"
        },
        {
            question: t('question3'),
            answer: t('answer3'),
            datePublished: "2023-12-01"
        },
        {
            question: t('question4'),
            answer: t('answer4'),
            datePublished: "2023-12-01"
        },
        {
            question: t('question5'),
            answer: t('answer5'),
            datePublished: "2023-12-01"
        }
    ];

    return (
        <section className={styles.faq}>
            <h2 className={styles.title}>{t('title')}</h2>
            <div 
                className={styles.questions}
                itemScope 
                itemType="https://schema.org/FAQPage"
            >
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
                            id={`faq-question-${index}`}
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
                            className={`${styles.answer} ${openIndex === index ? styles.active : ""}`}
                            itemScope
                            itemProp="acceptedAnswer"
                            itemType="https://schema.org/Answer"
                            role="region"
                            aria-labelledby={`faq-question-${index}`}
                            aria-hidden={openIndex !== index}
                        >
                            <p itemProp="text">{item.answer}</p>
                            <meta itemProp="dateCreated" content={item.datePublished} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQ;
