# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server (localhost:3000)
- `npm run build` - Build production version
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Custom Scripts
- `npm run generate-webp` - Convert images to WebP format (scripts/generateWebp.js)
- `npm run generate-google-feed` - Generate Google shopping feed (scripts/generateGoogleFeed.js)

## Architecture Overview

This is a **Next.js 14 e-commerce application** for "Rybka Space" (sportswear store) with the following key characteristics:

### Internationalization (i18n)
- **Supported locales**: Ukrainian ('uk') and Russian ('ru')
- **Default locale**: Ukrainian ('uk')
- **Implementation**: next-intl with path-based routing (/uk/, /ru/)
- **Configuration**: 
  - `i18n.js` - main config with request handling
  - `i18n/routing.js` - locale definitions
  - `middleware.js` - route handling
  - `messages/` - translation files (uk.json, ru.json)

### File Structure
- **App Router**: Uses Next.js 13+ app directory structure
- **Locale-based routing**: `app/[locale]/` contains all internationalized pages
- **Components**: Organized in `app/components/` with co-located SCSS modules
- **Services**: API layer in `app/services/` (using axios)
- **Mocks**: Static data in `app/mocks/` (products, blog posts, reviews)
- **Utilities**: Helper functions in `app/utils/`

### Key Features
- **Product catalog**: Dynamic product pages with variants, sizes, pricing
- **Blog system**: Multi-language blog with SEO optimization
- **Image optimization**: WebP support with fallbacks, organized by product ID
- **Analytics**: Google Analytics 4 integration with e-commerce tracking
- **SEO**: Comprehensive meta tags, structured data, sitemaps
- **Video integration**: React Player for product videos
- **Animations**: GSAP for smooth interactions

### Styling
- **SCSS modules**: Component-scoped styles with `.module.scss` suffix
- **Global styles**: `app/globals.scss` for base styling
- **Mixins**: Shared SCSS utilities in `app/utils/mixins.scss`
- **Reset CSS**: Uses reset-css package

### Data Management
- **Static product data**: Stored in `app/mocks/productsInfo.json`
- **Images**: Organized by product ID in `public/products/[id]/`
- **API routes**: Simple bot integration in `app/api/bot/`

### Performance Optimizations
- **Static generation**: Uses generateStaticParams for locale routes
- **Image optimization**: Next.js Image component with WebP conversion
- **Code splitting**: Dynamic imports for non-critical components
- **Font optimization**: next/font for web font loading

## Development Notes

### Working with Products
- Product data structure includes multilingual names, pricing, variants, and size grids
- Images are referenced by ID and stored in numbered directories
- Product pages use dynamic routing: `app/[locale]/product/[id]/`

### Internationalization Development
- Always update both `messages/uk.json` and `messages/ru.json` when adding new text
- Use `useTranslations` hook in client components
- Server components get messages via `getMessages()` helper

### Component Patterns
- Components are organized with index.js + .module.scss in dedicated folders
- Use "use client" directive for interactive components
- GSAP animations are commonly used for UI interactions

### SEO Implementation
- Each page has comprehensive metadata generation
- Structured data (JSON-LD) for organization and products
- Multilingual sitemaps and canonical URLs
- Open Graph and Twitter Card optimization