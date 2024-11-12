import Header from "@/components/header";
import Footer from "@/components/footer";

import "./globals.scss";
import styles from "./page.module.scss";

export const metadata = {
  title: "rybka.space",
  description: "твій особистий space краси та комфорту",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header/>
        <main className={styles.main}>
            {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
