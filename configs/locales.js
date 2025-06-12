const locale = 'en'

export default {
  // current locale
  locale,
  // when translation is not available fallback to that locale
  fallbackLocale: 'en',

  // availabled locales for user selection
availableLocales: [
  {
    code: 'en',
    flag: 'https://dev-srv.tlkeys.com/storage/images/languages/enflag.jpg',
    shortName: 'En',
    dir: 'ltr',
    name: 'English',
    file: 'en.js'
  },
  {
    code: 'ar',
    flag: 'https://dev-srv.tlkeys.com/storage/images/languages/arflag.jpg',
    shortName: 'Ar',
    dir: 'rtl',
    name: 'Arabic',
    file: 'ar.js'
  },
  {
    code: 'fr',
    flag: 'https://dev-srv.tlkeys.com/storage/images/languages/frflag.jpg',
    shortName: 'Fr',
    dir: 'ltr',
    name: 'French',
    file: 'fr.js'
  },
  {
    code: 'es',
    flag: 'https://dev-srv.tlkeys.com/storage/images/languages/esflag.jpg',
    shortName: 'Es',
    dir: 'ltr',
    name: 'Spanish',
    file: 'es.js'
  },
  {
    code: 'ru',
    flag: 'https://dev-srv.tlkeys.com/storage/images/languages/ruflag.jpg',
    shortName: 'Ru',
    dir: 'ltr',
    name: 'Russian',
    file: 'ru.js'
  },
  {
    code: 'de',
    flag: 'https://dev-srv.tlkeys.com/storage/images/languages/deflag.jpg',
    shortName: 'De',
    dir: 'ltr',
    name: 'Deutsch',
    file: 'de.js'
  }
],

};
