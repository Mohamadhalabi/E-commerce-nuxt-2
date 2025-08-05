import config from './configs';
import LRU from 'lru-cache';

const version = process.env.version;
const { locale, availableLocales } = config.locales;
const currency = 'USD';

export default {
  target: 'server',
  ssr: true,

  head: {
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icons/apple-touch-icon-180x180-precomposed.png' },

      // ✅ Preconnect for faster first requests
      { rel: 'preconnect', href: 'https://fonts.googleapis.com', crossorigin: true },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
      { rel: 'preconnect', href: 'https://www.tlkeys.com', crossorigin: true }, // main domain
      { rel: 'preconnect', href: 'https://static.cloudflareinsights.com', crossorigin: true }, // Cloudflare analytics
      { rel: 'preconnect', href: 'https://dev-srv.tlkeys.com', crossorigin: true }, // image domain

      // ✅ Preload fonts to avoid chaining requests
      { rel: 'preload', href: '/fonts/normal.woff2', as: 'font', type: 'font/woff2', crossorigin: true },
      { rel: 'preload', href: '/fonts/normal-bold.woff2', as: 'font', type: 'font/woff2', crossorigin: true },

      // ✅ Preload Google Fonts stylesheet
      { rel: 'preload', as: 'style', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap' },

      // ✅ Load Google Fonts without blocking render
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap', media: 'print', onload: "this.media='all'" }
    ],

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'application-name', content: 'Techno Lock Keys' },
    ],

    script: [
      // ✅ Defer Cloudflare email decode so it doesn’t block rendering
      { src: '/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js', defer: true },

      // ✅ GTM already async/defer
      {
        hid: 'gtm',
        innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PWSSMVC7');`,
        type: 'text/javascript',
        defer: true
      }
    ],

    noscript: [
      { innerHTML: `<div><img src="https://mc.yandex.ru/watch/96738038" style="position:absolute; left:-9999px;" alt="" /></div>` }
    ],

    __dangerouslyDisableSanitizers: ['script', 'noscript']
  },

  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '@/static/sass/style.scss',
    '@/static/css/steper.css',
    '@/static/css/agile.css',
    'vue-ssr-carousel/index.css'
  ],

  plugins: [
    { src: '~/plugins/bootstrap.js', ssr: false },
    { src: '~/plugins/user.js', ssr: false },
    { src: '~/plugins/settings.js', ssr: true },
    { src: '~/plugins/directives/sticky.js', ssr: false },
    { src: '~/plugins/direction-control.js', ssr: true },
    { src: '~/plugins/vue-progressbar.js', ssr: false },
    { src: '~/plugins/axios-cache.js', ssr: true },
    { src: '~/plugins/visibility.js', ssr: true },
    { src: '~/plugins/index.js', ssr: false },
  ],

  components: true,

  buildModules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
    ['nuxt-i18n', {
      detectBrowserLanguage: false,
      locales: availableLocales,
      strategy: 'prefix_except_default',
      lazy: true,
      langDir: 'translations/',
      defaultLocale: 'en',
      vueI18n: {
        fallbackLocale: ['en', 'fr', 'es', 'de', 'ru', 'ar'],
      },
    }]
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/google-gtag',
    '@nuxtjs/auth',
    '@nuxt/image',
    'nuxt-precompress',
    'cookie-universal-nuxt',
    'nuxt-ssr-cache', // ✅ Added SSR HTML caching
  ],

  // ✅ SSR Full Page Cache Settings
  cache: {
    pages: [
      '/',                
      '/product/**',      
      '/category/**',     
      '/:lang/product/**',
      '/:lang/category/**'
    ],
    key: (route, context) => {
      const url = context.req.url || '';
      // ❌ Do not cache cart, checkout, account
      if (url.startsWith('/cart') || url.startsWith('/checkout') || url.startsWith('/account')) {
        return false; // Returning false disables caching for this route
      }
      return url;
    },
    store: {
      type: 'memory',
      max: 2000,
      ttl: 60 * 60
    }
  },

  axios: {
    baseURL: process.env.API_BASE_URL,
    headers: {
      'Accept-Language': locale,
      'Content-Type': 'application/json',
      'currency': currency,
      'Accept': 'application/json',
      'secret-key': process.env.SECRET_KEY,
      'api-key': process.env.API_KEY
    }
  },

  'google-gtag': {
    id: 'G-5G2DSZVBJ9'
  },

  image: {
    domains: ['dev-srv.tlkeys.com'],
    quality: 60,
    format: ['webp'],
    screens: {
      xs: 320, sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1536, '2xl': 1920
    },
  },

  render: {
    asyncScripts: true,
    http2: {
      push: true,
      pushAssets: (req, res, publicPath, preloadFiles) =>
        preloadFiles
          .filter(f => ['script', 'style'].includes(f.asType))
          .map(f => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`)
    },
    bundleRenderer: {
      cache: new LRU({
        max: 1000,
        maxAge: 1000 * 60 * 15 // 15 minutes
      })
    },
    compressor: false // ✅ turn off HTML compression for faster SSR
  },

  auth: {
    resetOnError: true,
    strategies: {
      local: {
        endpoints: {
          login: { url: '/user/auth/login', method: 'post', propertyName: 'authorisation.token' },
          logout: { url: '/user/auth/logout', method: 'post' },
          user: { url: '/me', method: 'post', propertyName: 'data' }
        },
        tokenType: 'Bearer',
        user: { property: false }
      }
    },
    redirect: false
  },

  router: {
    base: '/',
    prefetchLinks: false,
    linkActiveClass: '',
    linkExactActiveClass: 'active',
  },

  serverMiddleware: [
    '~/server-middleware/compression.js',
    '~/middleware/redirects.js',
    '~/middleware/force410.js',
  ],

  build: {
    transpile: ['cookie-es'],
    extractCSS: true,
    optimizeCSS: true,
    minifyCSS: true,
    minifyJS: true,
    html: {
      minifyCSS: true,
      minifyJS: true
    },
    babel: {
      compact: true
    },
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true
    },
    filenames: {
      app: ({ isDev }) => isDev ? '[name].js' : `[contenthash:7].${version}.js`,
      chunk: ({ isDev }) => isDev ? '[name].js' : `[contenthash:7].${version}.js`,
      css: ({ isDev }) => isDev ? '[name].css' : `css/[contenthash:7].${version}.css`,
    },
    optimization: {
      minimize: true,
      runtimeChunk: true,
    },
    terser: {
      terserOptions: {
        compress: true,
        mangle: true,
      }
    },
    modern: true
  },

  nuxtPrecompress: {
    enabled: true,
    report: false,
    test: /\.(js|css|html|txt|xml|svg)$/,
    middleware: {
      enabled: true,
      enabledStatic: true,
      encodingsPriority: ['br', 'gzip'],
    },
    gzip: {
      enabled: true,
      filename: '[path].gz[query]',
      threshold: 10240,
      minRatio: 0.8,
      compressionOptions: { level: 9 },
    },
    brotli: {
      enabled: true,
      filename: '[path].br[query]',
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 0.8,
    },
  },

  generate: {
    fallback: '404.html',
    subFolders: false,
  },

  loading: {
    color: '#f07905',
    height: '6px',
    throttle: 0,
    failedColor: 'red',
    duration: 15000,
    continuous: true
  },

  pageTransition: 'page',

  server: {
    port: 4000,
    host: 'localhost'
  }
};