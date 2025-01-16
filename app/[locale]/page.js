import { setRequestLocale } from 'next-intl/server';
import Products from "./page/components/products";

export default function Home({ params: { locale } }) {
  // Enable static rendering
  setRequestLocale(locale);
  
  return (
    <>
      <Products/>
    </>
  );
}
