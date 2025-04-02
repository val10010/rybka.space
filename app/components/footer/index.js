import Image from "next/image";
import Link from "next/link";
import styles from "./footer.module.scss";
import LanguageSwitcher from "../language-switcher";
import {useTranslations, useLocale} from 'next-intl';

const Footer = () => {
    const t = useTranslations('footer');
    const locale = useLocale();

    return (
        <footer className={styles.container} role="contentinfo">
            <div className={styles.navigation}>
                <nav className={styles.menu} aria-label={t('siteNavigation')}>
                    <Link href={`/${locale}`} className={styles.menuItem}>
                        {t('home')}
                    </Link>
                    <Link href={`/${locale}/blog`} className={styles.menuItem}>
                        {t('blog')}
                    </Link>
                    <Link href={`/${locale}/delivery-and-payment`} className={styles.menuItem}>
                        {t('deliveryAndPayment')}
                    </Link>
                </nav>
            </div>
            
            <div className={styles.copyright}>
                2024 Rybka.space
            </div>
            <LanguageSwitcher/>
            <nav className={styles.social} aria-label={t('socialMedia')}>
                <a href="https://www.instagram.com/rybka.space?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                   className={styles.socialItem}
                   target="_blank" rel="noopener noreferrer"
                   aria-label={t('ourInstagram')}>
                    <Image
                        src="/images/i.svg"
                        fill
                        alt={t('instagramAlt')}
                    />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61566339753971"
                   className={styles.socialItem}
                   target="_blank" rel="noopener noreferrer"
                   aria-label={t('ourFacebook')}>
                    <Image
                        src="/images/f.svg"
                        fill
                        alt={t('facebookAlt')}
                    />
                </a>
                <a href="https://www.tiktok.com/@rybka.space?is_from_webapp=1&sender_device=pc"
                   className={styles.socialItem}
                   target="_blank" rel="noopener noreferrer"
                   aria-label={t('ourTiktok')}>
                    <Image
                        src="/images/t.svg"
                        fill
                        alt={t('tiktokAlt')}
                    />
                </a>
            </nav>
            <address className={styles.address}>
                {t('address')}
            </address>
        </footer>
    );
};

export default Footer;
