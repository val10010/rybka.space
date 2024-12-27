import Image from "next/image";
import styles from "./footer.module.scss";

const Footer = () => {
    return (
        <footer className={styles.container} role="contentinfo">
            <div className={styles.copyright}>
                2024 Rybka.space
            </div>
            <nav className={styles.social} aria-label="Соціальні мережі">
                <a href="https://www.instagram.com/rybka.space?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                   className={styles.socialItem}
                   target="_blank" rel="noopener noreferrer"
                   aria-label="Наш Instagram">
                    <Image
                        src="/images/i.svg"
                        fill
                        alt="Наш Instagram - жіночі спортивні костюми Rybka Space"
                    />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61566339753971"
                   className={styles.socialItem}
                   target="_blank" rel="noopener noreferrer"
                   aria-label="Наш Facebook">
                    <Image
                        src="/images/f.svg"
                        fill
                        alt="Наш Facebook - жіночі спортивні костюми Rybka Space"
                    />
                </a>
                <a href="https://www.tiktok.com/@rybka.space?is_from_webapp=1&sender_device=pc"
                   className={styles.socialItem}
                   target="_blank" rel="noopener noreferrer"
                   aria-label="Наш TikTok">
                    <Image
                        src="/images/t.svg"
                        fill
                        alt="Наш TikTok - жіночі спортивні костюми Rybka Space"
                    />
                </a>
            </nav>
            <address className={styles.address}>
                наша адреса: Україна, м. Ізмаїл, проспект Миру, 36.
            </address>
        </footer>
    );
};

export default Footer;
