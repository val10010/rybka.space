'use client';

import {useLocale} from 'next-intl';
import {useRouter, usePathname} from 'next/navigation';
import styles from './language-switcher.module.scss';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLocale = (newLocale) => {
        const currentPath = pathname;
        const newPath = currentPath.replace(`/${locale}/`, `/${newLocale}/`);
        router.push(newPath);
    };

    return (
        <div className={styles.languageSwitcher}>
            <button 
                onClick={() => switchLocale('uk')}
                className={`${styles.languageButton} ${locale === 'uk' ? styles.active : ''}`}
            >
                UA
            </button>
            <button 
                onClick={() => switchLocale('ru')}
                className={`${styles.languageButton} ${locale === 'ru' ? styles.active : ''}`}
            >
                RU
            </button>
        </div>
    );
}
