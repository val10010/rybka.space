import Header from "@/components/header";

import "./globals.scss";


export const metadata = {
  title: "rybka.space",
  description: "твій особистий space краси та комфорту",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header/>
        <main>
            {children}
        </main>
      </body>
    </html>
  );
}
