import config from './configs';
const version = process.env.version;

const {locale, availableLocales} = config.locales;
const currency = 'USD';

export default ({
  "scripts": {
    "build:modern": "nuxt build --modern=server",
    "start:modern": "nuxt start --modern=server"
  },
  // modern: true, // Enables modern mode in both server and client side

  head: {
    link: [{rel: 'icon', type: 'image/x-icon', href: 'https://www.tlkeys.com/images/icons/apple-touch-icon-180x180-precomposed.png'},
      {rel: 'shortcut icon', sizes: '16x16 24x24 32x32 48x48', href: 'https://www.tlkeys.com/images/icons/apple-touch-icon-180x180-precomposed.png'},
      {rel: 'apple-touch-icon', sizes: '180x180', href: 'https://www.tlkeys.com/images/icons/apple-touch-icon-180x180-precomposed.png'},
      {rel: 'apple-touch-icon', sizes: '152x152', href: 'https://www.tlkeys.com/images/icons/apple-touch-icon-152x152-precomposed.png'},
      {rel: 'apple-touch-icon', sizes: '144x144', href: 'https://www.tlkeys.com/images/icons/apple-touch-icon-144x144-precomposed.png'},
      {rel: 'apple-touch-icon', sizes: '120x120', href: 'https://www.tlkeys.com/images/icons/apple-touch-icon-120x120-precomposed.png'},
      {rel: 'apple-touch-icon', sizes: '114x114', href: 'https://www.tlkeys.com/images/icons/apple-touch-icon-114x114-precomposed.png'},
      {rel: 'apple-touch-icon', sizes: '76x76', href: 'https://www.tlkeys.com/images/icons/apple-touch-icon-76x76-precomposed.png'},
      {rel: 'apple-touch-icon', sizes: '72x72', href: 'https://www.tlkeys.com/images/icons/apple-touch-icon-72x72-precomposed.png'},
      {rel: 'icon', sizes: '192x192', href: 'https://www.tlkeys.com/images/icons/touch-icon-192x192.png'},
      {rel: 'icon', sizes: '128x128', href: 'https://www.tlkeys.com/images/icons/touch-icon-128x128.png'},
      {rel: 'icon', type: 'image/png', sizes: '32x32', href: 'https://www.tlkeys.com/images/icons/technolock-icon-32x32.png'}
    ],
    meta: [
      {
        "http-equiv": "Content-Type", content: 'text/html; charset=utf-8'
      },
      { name: 'msapplication-TileImage', content: 'https://www.tlkeys.com/images/icons/apple-touch-icon-144x144-precomposed.png'},
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        "http-equiv": "X-UA-Compatible",
        content: "IE=edge",
      },
      {
        name:'msapplication-tap-highlight', content:'no'
      },
      {
        name:'mobile-web-app-capable' , content: 'yes'
      },
      {
        name:'application-name', content: 'Techno Lock Keys'
      },
      {
        name:'apple-mobile-web-app-capable', content: 'yes',
      },
      {
        name:'apple-mobile-web-app-status-bar-style', content: 'default'
      },
      {
        name:'apple-mobile-web-app-title', content:'Techno Lock Keys'
      }
    ],
    script: [
      {
        hid: 'google-tag-manager',
        innerHTML: String.raw`
      (function(w,d,s,l,i){
        w[l]=w[l]||[];
        w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
        var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
        j.async=true;
        j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
        f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-PWSSMVC7');
    `,
        defer: true,
        async: true,
      },
      {
        hid:'yandex',
        src: "https://mc.yandex.ru/metrika/tag.js",
        async: true,
        defer: true,
      }
    ],
    noscript: [
      {
        innerHTML: '<div><img src="https://mc.yandex.ru/watch/96738038" style="position:absolute; left:-9999px;" alt="" /></div>'
      }
    ],
    __dangerouslyDisableSanitizers: ['script']
  },
  css: [
    'bootstrap/dist/css/bootstrap.min.css',// Import Bootstrap CSS
    '@static/sass/style.scss',
    // '@static/css/ltrStyle.css',
    // 'vue-multiselect/dist/vue-multiselect.min.css',
    // '@static/css/porto-icons.min.css',
    '@static/css/steper.css',
    // '@static/vendor/fontawesome-free/css/all.min.css',
    '@static/css/agile.css',
  ],

  plugins: [
    {src: '~/plugins/bootstrap.js', ssr:false },
    {src: '~/plugins/user.js', ssr: false},
    // {src : '~/plugins/i18n-watch.js', ssr: true},
    {src: '@plugins/index.js', ssr: false},
    {src: '@plugins/settings.js', ssr: true},
    // {src: '@plugins/localstorage.js', ssr: false},
    // {src: '@plugins/filters.js', ssr: true},
    {src: '@plugins/directives/sticky.js', ssr: false},
    {src: '@plugins/direction-control.js', ssr: true}, // rTL
    // {src: '@plugins/vue-awesome-swiper.js', ssr: false},
    {src: '~/plugins/vue-progressbar.js', ssr: false},
  ],

  buildModules: [
    'vue-ssr-carousel/nuxt',
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
        fallbackLocale: ['en', 'fr','es','de','ru','ar'],
      },
      skipSettingLocaleOnNavigate: false
    }]
  ],


  modules: ['@nuxtjs/axios' , '@nuxtjs/google-gtag' , '@nuxtjs/auth' ,'nuxt-precompress', '@nuxt/image', 'cookie-universal-nuxt'],
  // bootstrapVue: {
  //   componentPlugins: [
  //     'CardPlugin',
  //     'FormInputPlugin',
  //     'ModalPlugin',
  //     'TablePlugin',
  //     'CollapsePlugin',
  //     'PaginationPlugin',
  //     'ListGroupPlugin',
  //     'FormTagsPlugin',
  //     'AlertPlugin',
  //     'ButtonPlugin',
  //     'FormFilePlugin',
  //     'FormTextareaPlugin',
  //   ],
  // },

  axios: {
    headers: {
      'Accept-Language': locale,
      'Content-Type': 'application/json',
      'currency': currency,
      'Accept': 'application/json',
      'secret-key': process.env.SECRET_KEY,
      'api-key': process.env.API_KEY
    },
    baseURL: process.env.API_BASE_URL
  },
  'google-gtag':{
    id: 'G-5G2DSZVBJ9', // required
  },
  image: {
    domains: ['dev-srv.tlkeys.com'],
    quality: 1,
    format: ['webp'],
    screens: {
      'xs': 320,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      'xxl': 1536,
      '2xl': 1920
    },
  },
  render: {
    asyncScript:true,
    http2: {
      pushAssets: (req, res, publicPath, preloadFiles) =>
        preloadFiles
          .filter(f => f.asType === 'script' && f.file === 'runtime.js')
          .map(f => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`),
    },
    bundleRenderer: {
      shouldPrefetch: () => false,
      shouldPreload: (fileWithoutQuery, asType) => ["script", "style"].includes(asType),
    },
  },

  auth: {
    resetOnError: true,
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/user/auth/login',
            method: 'post',
            propertyName: 'authorisation.token'
          },
          logout: {url: '/user/auth/logout', method: 'post'},
          user: {url: '/me', method: 'post', propertyName: 'data'}
        },
        user: {
          property: false,
        },
        tokenType: 'Bearer'
      }
    },
    redirect: false
  },


  router: {
    prefetchLinks: true,
    base: '/',
    linkActiveClass: '',
    linkExactActiveClass: 'active',
    scrollBehavior(to, from, savedPosition) {
      return new Promise((resolve) => {
        // Set a timeout of 500 milliseconds (adjust as needed)
        setTimeout(() => {
          if (savedPosition) {
            // If the user is navigating back, restore the saved scroll position
            resolve(savedPosition);
          } else {
            // If navigating to a new page, scroll to the top
            return({ x: 0, y: 0 });
          }
        }, 1500); // Adjust the timeout value as needed
      });
    }
  },
  serverMiddleware: [
    '~/middleware/redirects.js',
    '~/middleware/force410.js',
  ],
  build: {
    loaders: {
      scss: {
        implementation: require('sass')
      }
    },
    transpile: ['cookie-es'],
    
    analyze: true,
    minifyCSS: true,
    minifyJS: true,
    html: {
      minifyCSS: true,
      minifyJS: true,
    },
    extractCSS: true,
    optimizeCSS: true,
    publicPath: '/publicpath',
    babel: {
      compact: true
    },
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true
    },
    filenames: {
      app: ({ isDev, isModern }) => isDev ? `[name]${isModern ? '.modern' : ''}.js` : `[contenthash:7]${isModern ? '.modern' : ''}.${version}.js`,
      chunk: ({ isDev, isModern }) => isDev ? `[name]${isModern ? '.modern' : ''}.js` : `[contenthash:7]${isModern ? '.modern' : ''}.${version}.js`,
      css: ({ isDev }) => isDev ? `[name].css` : `css/[contenthash:7].${version}.css`,
      img: ({ isDev }) => isDev ? `[path][name].[ext]` : `img/[name].[contenthash:7].${version}.[ext]`,
      font: ({ isDev }) => isDev ? `[path][name].[ext]` : `fonts/[name].[contenthash:7].${version}.[ext]`,
      video: ({ isDev }) => isDev ? `[path][name].[ext]` : `videos/[name].[contenthash:7].${version}.[ext]`
    },
    optimization:{
      minimize: true,
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '.',
        name: true,
        cacheGroups: {}
      },
      runtimeChunk: true,
    },
    terser: {
      terserOptions:{
        compress: true,
        mangle: true,
      }
    },
    modern: true,
    aggressiveCodeRemoval: true
  },

  generate: {
    subFolders: false,
    fallback: '404.html'
  },
  ssr: true,
  loading: {
    color: '#f07905',
    height: '6px',
    throttle: 0,
    failedColor: 'red',
    duration: 15000,
  },
  // loading: false,
  // loadingIndicator: false,


  pageTransition: 'page',

  server: {
    port: 4000,
    host: 'localhost'  // Correctly defined as a string
  },
  nuxtPrecompress: {
    enabled: true, // Enable in production
    report: false, // set true to turn one console messages during module init
    test: /\.(js|css|html|txt|xml|svg)$/, // files to compress on build
    // Serving options
    middleware: {
      // You can disable middleware if you serve static files using nginx...
      enabled: true,
      // Enable if you have .gz or .br files in /static/ folder
      enabledStatic: true,
      // Priority of content-encodings, first matched with request Accept-Encoding will me served
      encodingsPriority: ['br', 'gzip'],
    },

    // build time compression settings
    gzip: {
      enabled: true,
      filename: '[path].gz[query]', // middleware will look for this filename
      threshold: 10240,
      minRatio: 0.8,
      compressionOptions: { level: 9 },
    },
    brotli: {
      enabled: true,
      filename: '[path].br[query]', // middleware will look for this filename
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 0.8,
    },
  },
});
