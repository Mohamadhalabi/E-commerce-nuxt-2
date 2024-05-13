import api from "~/api";

export default function ({ isHMR, app, store, route, params, error, redirect, req }) {
  if (isHMR) return; // Ignore if called from Hot Module Replacement.

  // Function to set new locale and redirect
  function setLocaleAndRedirect(newLocale) {
    app.$cookies.set('locale', newLocale); // Update cookie
    app.i18n.locale = newLocale; // Update i18n locale
    api.defaults.headers["Accept-Language"] = newLocale;
    store.dispatch('updateLanguageCode', newLocale);

    const basePath = route.fullPath.indexOf('/') === 0 ? route.fullPath.substring(1) : route.fullPath;
    const pathParts = basePath.split('/');
    const currentLocale = pathParts[0];
    const locales = ['fr', 'es']; // Supported locales

    if (locales.includes(currentLocale) && currentLocale !== newLocale) {
      // let test = `/${newLocale}/${basePath.replace(currentLocale + '/', '')}`
      redirect(`/${newLocale}/${basePath.replace(currentLocale + '/', '')}`);
    } else if (!locales.includes(currentLocale)) {
      redirect(`/${newLocale}/${basePath}`);
    }
  }

  let locale = null;

  if (req && req.headers.cookie) {
    // Server-side: parse cookies
    const cookieparser = require('cookieparser');
    locale = cookieparser.parse(req.headers.cookie).locale || 'en';
  } else if (process.client) {
    // Client-side: use cookies and localStorage
    locale = app.$cookies.get('locale') || localStorage.getItem('locale') || 'en';

    window.addEventListener('storage', (event) => {
      if (event.key === 'locale' && event.newValue && event.newValue !== locale) {
        setLocaleAndRedirect(event.newValue);
      }
    });
  }

  if (locale !== 'en') setLocaleAndRedirect(locale); // Apply locale if not English
}
