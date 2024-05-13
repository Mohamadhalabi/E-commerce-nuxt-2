export default function ({ isHMR, app, store, route, params, error, redirect, req }) {
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return;

  // Get locale from cookies
  let locale = null;
  if (req && req.headers.cookie) {
    // Server-side: Parse the cookies from the request headers
    const cookieparser = require('cookieparser');
    const parsedCookies = cookieparser.parse(req.headers.cookie);
    locale = parsedCookies.locale;
  } else if (process.client) {
    // Client-side: Directly use the js-cookie library or similar
    locale = app.$cookies.get('locale');
  }

  if (!locale || locale === 'en') return; // If no locale in cookies or it's English, do nothing

  // Get the current path without the locale
  const basePath = route.fullPath.indexOf('/') === 0 ? route.fullPath.substring(1) : route.fullPath;
  const pathParts = basePath.split('/');
  const currentLocale = pathParts[0];

  // List of supported locales
  const locales = ['fr', 'es']; // French and Spanish, English has no prefix

  // Check if the first part of the path is a locale
  if (locales.includes(currentLocale)) {
    // If the current locale is already correct, do nothing
    if (currentLocale === locale) return;
    // If different, redirect to the correct locale
    redirect('/' + locale + '/' + basePath.replace(currentLocale + '/', ''));
  } else {
    // No locale in the URL, redirect to include the locale for French and Spanish
    redirect('/' + locale + '/' + basePath);
  }
}
