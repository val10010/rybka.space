import { setRequestLocale } from 'next-intl/server';
import Products from "./page/components/products";
import FeaturedCategories from "./page/components/featured-categories";

export default function Home({ params: { locale } }) {
  // Enable static rendering
  setRequestLocale(locale);
  
  return (
    <>
      <FeaturedCategories />
      <Products/>
    </>
  );
}
