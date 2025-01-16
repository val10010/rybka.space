'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

import styles from './language-switcher.module.scss';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLocale = (e, newLocale) => {
        e.preventDefault();
        const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
        router.push(newPath);
    };

    return (
        <div className={styles.languageSwitcher}>
            <button
                onClick={(e) => switchLocale(e, 'uk')}
                className={`${styles.languageButton} ${locale === 'uk' ? styles.active : ''}`}
            >
                UA
            </button>
            <button
                onClick={(e) => switchLocale(e, 'ru')}
                className={`${styles.languageButton} ${locale === 'ru' ? styles.active : ''}`}
            >
                RU
            </button>
        </div>
    );
}
