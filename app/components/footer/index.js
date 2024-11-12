import React from 'react';
import styles from './footer.module.scss';
import Image from "next/image";

const Footer = () => {
    return (
        <footer className={styles.container}>
            <div className={styles.copyright}>
                © 2024 Rybka.space
            </div>
            <div className={styles.social}>
                <a href="https://www.instagram.com/rybka.space?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                   className={styles.socialItem}
                   target="_blank" rel="noopener noreferrer">
                    <Image
                        src={'/images/i.svg'}
                        fill
                    />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61566339753971"
                   className={styles.socialItem}
                   target="_blank" rel="noopener noreferrer">
                    <Image
                        src={'/images/f.svg'}
                        fill
                    />
                </a>
                <a href="https://www.tiktok.com/@rybka.space?is_from_webapp=1&sender_device=pc"
                   className={styles.socialItem}
                   target="_blank" rel="noopener noreferrer">
                    <Image
                        src={'/images/t.svg'}
                        fill
                    />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
