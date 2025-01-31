<template>
  <div>
    <h1>Test</h1>
  </div>
</template>
<script>
// import {mapGetters} from "vuex";
// import api from '~/api';
export default {
  head() {
    const languagePrefix = this.$i18n.locale !== 'en' ? `/${this.$i18n.locale}` : '';
    return {
      title: 'Techno Lock Keys Trading | Automotive Locksmith Services',
      link: [
        {
          rel: 'canonical',
          href: process.env.PUBLIC_PATH_WITHOUT_SLASH + languagePrefix + '/',
        },
        ...this.$i18n.availableLocales.map(loc => ({
            rel: 'alternate',
            hreflang: loc,
            href: process.env.PUBLIC_PATH_WITHOUT_SLASH + (loc !== 'en' ? `/${loc}` : '')
        })),
        {
            rel: 'alternate',
            hreflang: 'x-default',
            href: process.env.PUBLIC_PATH_WITHOUT_SLASH + '/'
        }
      ],
      meta: [
        {
          "http-equiv": 'content-language',
          content: this.$i18n.locale,
        },
        {
          name: 'description',
          content: "Techno Lock Keys provides a wide range of auto keys, remotes, diagnostics, cutting machines, programming devices, Fobs, transponder keys, and emulators"
        },
        {
          name: "og:type",
          content: "website",
        },
        {
          name: "og:site_name",
          content: "Techno Lock Keys",
        },
        {
          name: "og:title",
          content: "Techno Lock Keys Trading | Automotive Locksmith Services",
        },
        {
          name: "og:description",
          content: "Techno Lock Keys provides a wide range of auto keys, remotes, diagnostics, cutting machines, programming devices, Fobs, transponder keys, and emulators"
        },
        {
          name: "og:url",
          content: "https://www.tlkeys.com",
        },
        {
          name: "og:image",
          content: "https://dev-srv.tlkeys.com/storage/images/seo/og-image.jpg",
        },
        {
          name: "og:image:alt",
          content: this.$settings.seo.meta_image.l.alt,
        },
        {
          name: "og:image:height",
          content: "627",
        },
        {
          name: "og:image:width",
          content: "1200",
        },
        // {
        //   name: "twitter:card",
        //   content: "summary",
        // },
        // {
        //   name: "twitter:site",
        //   content: `${this.$settings.social_media.twitter}`,
        // },
        // {
        //   name: "twitter:title",
        //   content: 'Techno Lock Keys Trading | Automotive Locksmith Services',
        // },
        // {
        //   name: "twitter:description",
        //   content: "Techno Lock Keys provides a wide range of auto keys, remotes, diagnostics, cutting machines, programming devices, Fobs, transponder keys, and emulators"
        // },
        // {
        //   rel: "shortcut icon",
        //   href: "https://dev-srv.tlkeys.com/storage/images/seo/favicon-tlkeys.png",
        // },
      ],
      script: [
        { type: 'application/ld+json', json: {
            "@context": "https://schema.org/",
            "@type": "Organization",
            "name": "Techno Lock Keys Trading",
            "url": "https://www.tlkeys.com/",
            "image": "https://www.tlkeys.com/tlk-logo.png",
            "description": "Techno Lock Keys provides a wide range of auto keys, remotes, diagnostics, cutting machines, programming devices, Fobs, transponder keys, and emulators.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Industrial No. 5, behind Maliah Road., shop No. 8",
              "addressCountry": "AE"
            },
            "telephone": "+971504429045",
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Saturday",
                  "Sunday"
                ],
                "opens": "8:00",
                "closes": "18:00"
              }
            ],
            "priceRange": "$$",
            "paymentAccepted": "Cash, Credit Card, Paypal",
            "sameAs": [
              "https://www.facebook.com/technolockkeys_world/",
              "https://twitter.com/techno_lock",
              "https://api.whatsapp.com/send?phone=971504429045"
            ]
          }
        },
      ]
    }
  },
  components: {
    // PvNewsletterModal,
    // LazyHydrate,
    // PvStories: () => import("~/components/home/PvStories"),
    // PvIntroSection: () => import("~/components/home/PvIntroSection.vue"),
    // HomePageSearch: () => import("~/components/home/HomePageSearch.vue"),
    // PvSliderBanner: () => import("~/components/home/PvSliderBanner.vue"),
    // PvLatestProducts: () => import("~/components/home/PvLatestProducts.vue"),
    // PvBestSelling: () => import("~/components/home/PvBestSelling.vue"),
    // PvTopSelling: () => import("~/components/home/PvTopSelling.vue"),
    // PvLineBanner: () => import("~/components/home/PvLineBanner.vue"),
    // PvOnSaleProducts: () => import("~/components/home/PvOnSaleProducts.vue"),
    // PvTopSellingThreeProducts: () => import("~/components/home/PvTopSellingThreeProducts.vue"),
    // PvNewArrival: () => import("~/components/home/PvNewArrival.vue"),
    // PvFreeShipping:() => import("~/components/home/PvFreeShipping.vue"),
    // PvManufacturersSection: () => import("~/components/home/PvManufacturersSection.vue"),
  },

  data: function () {
    return {
      isMobile:false,
      email:"",
    };
  },
  computed: {
    // ...mapGetters("rtlStore", ["getIsAr"]),
  },
  methods: {
    // async checkIfMobile() {
    //   this.isMobile = window.innerWidth <= 767;
    //   if (!this.isMobile) {
    //     const { default: PvStories } = await import("~/components/home/PvStories");
    //     this.$options.components.PvStories = PvStories;
        
    //     const { default: PvSliderBanner } = await import("~/components/home/PvSliderBanner.vue");
    //     this.$options.components.PvSliderBanner = PvSliderBanner;

    //     const { default: PvLineBanner } = await import("~/components/home/PvLineBanner.vue");
    //     this.$options.components.PvLineBanner = PvLineBanner;
    //     this.$forceUpdate();
    //   }
    // },

    // handleResize() {
    //   this.isMobile = window.innerWidth < 768;
    // },
    // Subscribe(){
    //   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
    //     // Assuming `api` is an instance of Axios or similar HTTP client
    //     api.post("/subscribe", { email: this.email }).then((response) => {
    //     }).catch((error) => {
    //       if (error.response.status === 400) {
    //         this.$notify({
    //           group: "errorMessage",
    //           type: "error",
    //           text:  this.$t("alerts.emailAlready"),
    //         });
    //       } else {
    //         console.error(error);
    //       }
    //     });
    //   } else {
    //     this.$notify({
    //       group: "errorMessage",
    //       type: "error",
    //       text:  this.$t("alerts.enterValidEmail"),
    //     });
    //   }
    // }
  },
  mounted() {
    // if(process.client) {
    //   this.isMobile = window.innerWidth < 768;
    //   window.addEventListener('resize', this.handleResize);
    // }
    // this.checkIfMobile();
    // window.addEventListener('resize', this.checkIfMobile);

  },
  // beforeDestroy() {
  //   // Remove the resize event listener when the component is destroyed
  //   if(process.client)
  //   window.removeEventListener('resize', this.handleResize);
  // },
}
</script>
<style>
@media screen and (max-width: 993px){
  .desktop-only{
    display: none;
  }
}
.news-letter-h6{
  font-size: 24px;
  color: #FFFFFF;
}
.subscribe{
  padding: 10px;
  border-radius: 10px;
  background-color: #a51017;
  color: #FFFFFF;
  border-color: black;
}
</style>
