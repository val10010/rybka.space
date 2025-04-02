export function formatDate(dateString, locale) {
  return new Date(dateString).toLocaleDateString(
    locale === 'uk' ? 'uk-UA' : 'ru-RU',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  );
}
