<template>
  <main class="main">
    <home-page-search />
    <pv-intro-section/>
    <home-page-offer/>

    <!-- Latest Products Section -->
    <div class="container-fluid">
      <div class="container">
        <pv-section-title
          :title="$t('home.latestProducts')"
          :link="'new-arrival'"
        />
        <div class="row">
          <div class="col-3 home-page-banners d-none d-lg-block m-auto">
            <div class="featured-collection-info flex shrink-0 flex-col">
              <div class="featured-collection-image">
                <a href="#" class="media block relative w-full">
                  <img
                    src="https://dev-srv.tlkeys.com/storage/images/main-banner/ford-software-banner.webp"
                    class="img-fit home-page-banner-image img-fit--cover rounded-lg"
                    style="object-position: 50% 50%"
                    loading="lazy"
                    alt="Latest Products"
                  />
                </a>
              </div>
              <div class="featured-collection-text flex flex-col grow">
                <h2 class="section-heading">Latest Arrival</h2>
                <div class="grow">
                  <div class="rte">
                    <p>Discover what’s new – Just landed!</p>
                  </div>
                </div>
                <a class="mt-8 w-full shop-now" href="/new-arrival">Shop Now</a>
              </div>
            </div>
          </div>
          <div class="col-lg-9 col-12 m-0">
            <pv-latest-products :isIndexPage="true" />
          </div>
        </div>
      </div>
    </div>

    <!-- Best Selling Section -->
    <div class="container">
      <pv-section-title
        :title="$t('home.bestSellingProducts')"
        :link="'best-seller'"
      />
      <div class="row">
        <div class="col-3 home-page-banners d-none d-lg-block m-auto">
          <div class="featured-collection-info flex shrink-0 flex-col">
            <div class="featured-collection-image">
              <a href="https://www.locksmithkeyless.com/pages/deal-of-the-day" class="media block relative w-full">
                <img
                  src="https://www.locksmithkeyless.com/cdn/shop/files/11-6-2025-Deal-of-the-day.webp?v=1749651259&amp;width=460"
                  class="img-fit home-page-banner-image img-fit--cover"
                  style="object-position: 50% 50%"
                  loading="lazy"
                  alt="Deal of the Day"
                />
              </a>
            </div>
            <div class="featured-collection-text flex flex-col grow">
              <h2 class="section-heading">Deal Of The Day</h2>
              <div class="grow">
                <div class="rte">
                  <p>Limited Time, Big Savings – Grab It Now!</p>
                </div>
              </div>
              <a class="mt-8 w-full shop-now" href="https://www.locksmithkeyless.com/pages/deal-of-the-day">Shop Now</a>
            </div>
          </div>
        </div>
        <div class="col-lg-9 col-12 m-0">
          <pv-best-selling :isIndexPage="true" />
        </div>
      </div>
    </div>

    <!-- Line Banner -->
    <div class="container-fluid pt-4">
      <div class="container large-screen-only">
        <pv-line-banner class="mb-4" v-if="!isMobile" />
      </div>
    </div>

    <!-- Top Selling Section -->
    <div class="container-fluid">
      <div class="container">
        <div class="mb-2">
          <pv-section-title
            :title="$t('home.topSellingProduct')"
            :link="'top-selling'"
          />
        </div>
        <div class="row">
          <div class="col-3 home-page-banners d-none d-lg-block m-auto">
            <div class="featured-collection-info flex shrink-0 flex-col">
              <div class="featured-collection-image">
                <a href="/top-selling" class="media block relative w-full">
                  <img
                    src="https://dev-srv.tlkeys.com/storage/images/sliders/Xhorse-Dolphin-XP-005L.jpg"
                    class="img-fit home-page-banner-image img-fit--cover rounded-lg"
                    style="object-position: 50% 50%"
                    loading="lazy"
                    alt="Top Selling"
                  />
                </a>
              </div>
              <div class="featured-collection-text flex flex-col grow">
                <h2 class="section-heading">Top Selling</h2>
                <div class="grow">
                  <div class="rte">
                    <p>Most Popular Picks – Customers’ Favorites!</p>
                  </div>
                </div>
                <a class="mt-8 w-full shop-now" href="/top-selling">Shop Now</a>
              </div>
            </div>
          </div>
          <div class="col-lg-9 col-12 m-0">
            <pv-top-selling :isIndexPage="true" />
          </div>
        </div>
      </div>
    </div>
      <div class="container">
        <div
          class="p-3 justify-content-center">
            <pv-manufacturers-section/>
        </div>
      </div>
      <div class="container">
          <div class="product-widgets-container row pb-2">
            <pv-on-sale-products
              :collection-title="$t('home.onSaleProduct')"
              :animation-delay="'200'"
              :link="'discount'"
            />
            <pv-top-selling-three-products
              :collection-title="$t('home.topSellingProduct')"
              :animation-delay="'500'"
              :link="'top-selling'"
            />
            <pv-new-arrival
              :collection-title="$t('home.newarrivalproducts')"
              :animation-delay="'800'"
              :link="'new-arrival'"
            />
            <pv-free-shipping
              :collection-title="$t('home.freeshoppingproducts')"
              :animation-delay="'1100'"
              :link="'free-shipping'"
            />
          </div>
        </div>
  </main>
</template>
<script>
import HomePageOffer from '~/components/home/HomePageOffer.vue';

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
    // PvStories: () => import("~/components/home/PvStories"),
    HomePageSearch: () => import("~/components/home/HomePageSearch.vue"),
    PvIntroSection: () => import("~/components/home/PvIntroSection.vue"),
    PvManufacturersSection: () => import("~/components/home/PvManufacturersSection.vue"),
    HomePageOffer: () => import("~/components/home/HomePageOffer.vue"),
    PvSliderBanner: () => import("~/components/home/PvSliderBanner.vue"),
    PvLatestProducts: () => import("~/components/home/PvLatestProducts.vue"),
    PvBestSelling: () => import("~/components/home/PvBestSelling.vue"),
    PvTopSelling: () => import("~/components/home/PvTopSelling.vue"),
    PvLineBanner: () => import("~/components/home/PvLineBanner.vue"),
    PvOnSaleProducts: () => import("~/components/home/PvOnSaleProducts.vue"),
    PvTopSellingThreeProducts: () => import("~/components/home/PvTopSellingThreeProducts.vue"),
    PvNewArrival: () => import("~/components/home/PvNewArrival.vue"),
    PvFreeShipping:() => import("~/components/home/PvFreeShipping.vue"),
    PvSectionTitle: () => import("~/components/common/PvSectionTitle.vue"),
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
    async checkIfMobile() {
      this.isMobile = window.innerWidth <= 767;
      if (!this.isMobile) {
        const { default: PvStories } = await import("~/components/home/PvStories");
        this.$options.components.PvStories = PvStories;
        
        const { default: PvSliderBanner } = await import("~/components/home/PvSliderBanner.vue");
        this.$options.components.PvSliderBanner = PvSliderBanner;

        const { default: PvLineBanner } = await import("~/components/home/PvLineBanner.vue");
        this.$options.components.PvLineBanner = PvLineBanner;
        this.$forceUpdate();
      }
    },

    handleResize() {
      this.isMobile = window.innerWidth < 768;
    },
    Subscribe(){
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        // Assuming `api` is an instance of Axios or similar HTTP client
        api.post("/subscribe", { email: this.email }).then((response) => {
        }).catch((error) => {
          if (error.response.status === 400) {
            this.$notify({
              group: "errorMessage",
              type: "error",
              text:  this.$t("alerts.emailAlready"),
            });
          } else {
            console.error(error);
          }
        });
      } else {
        this.$notify({
          group: "errorMessage",
          type: "error",
          text:  this.$t("alerts.enterValidEmail"),
        });
      }
    }
  },
  mounted() {
    if(process.client) {
      this.isMobile = window.innerWidth < 768;
      window.addEventListener('resize', this.handleResize);
    }
    this.checkIfMobile();
    window.addEventListener('resize', this.checkIfMobile);

  },
  beforeDestroy() {
    // Remove the resize event listener when the component is destroyed
    if(process.client)
    window.removeEventListener('resize', this.handleResize);
  },
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
