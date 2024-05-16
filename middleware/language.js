// middleware/locale-redirect.js

export default function ({ app, route, redirect }) {
  const cookies = app.$cookies;
  const locale = cookies.get('locale') || 'en'; // default to English if no cookie is set

  // Extract the current path without the locale prefix
  const pathWithoutLocale = route.path.replace(/^\/(en|fr|es)/, '');

  // Check if the current path includes the locale prefix
  const hasLocalePrefix = /^\/(fr|es)/.test(route.path);

  if (!hasLocalePrefix && locale !== 'en') {
    // Redirect to the path with the appropriate locale prefix
    return redirect(`/${locale}${pathWithoutLocale}`);
  } else if (hasLocalePrefix && locale === 'en') {
    // Redirect to the path without any locale prefix for English
    return redirect(pathWithoutLocale || '/');
  } else if (!hasLocalePrefix && locale === 'en' && route.path !== '/') {
    // Redirect to the root path if no locale is set and path is not root
    return redirect('/');
  }
}
