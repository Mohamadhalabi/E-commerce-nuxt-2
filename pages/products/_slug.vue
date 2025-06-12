<template>
  <main class="main">
    <div>
      <nav aria-label="breadcrumb" class="breadcrumb-nav container product-breadcrumb mb-3">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <nuxt-link
              :to="getLink('/')">
              {{ $t("products.home") }}
            </nuxt-link>
          </li>
          <li class="breadcrumb-item">
            <nuxt-link
              :to="getLink('/shop')">
              {{ $t("products.shop") }}
            </nuxt-link>
          </li>
          <li
            v-for="category in product.categories"
            :key="category.id"
            class="breadcrumb-item">
            <nuxt-link
              :to="getLink('/'+category.slug)">
              {{ category.name }}
            </nuxt-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ product.short_title }}
          </li>
        </ol>
        <div class="mt-auto">
          <PvBtnShare />
        </div>
      </nav>
      <div class="container">
        <div class="row">
          <div class="col-xl-5 col-lg-5 col-md-6 col-sm-6 col-12">
            <pv-media-new :product="product" />
            <div class="text-center">
              <span class="sku-color d-lg-none d-md-none">SKU: {{ product.sku }}</span>
            </div>
          </div>
          <div class="col-xl-7 col-lg-7 col-md-5 col-sm-6 col-12 product-single-details">
            <pv-detail
            :product="product"
            :tokens="tokens"
            :prev-product="prev_product"
            :next-product="next_product"
          />
          </div>
        </div>
      </div>
      <div
        v-if="!product"
        class="skel-group container">
        <div class="summary-before col-lg-5 col-md-6" />
        <div class="summary entry-summary col-lg-7 col-md-6" />
        <div class="tab-content col-lg-12 mb-7" />
      </div>
      <div>
        <!-- <LazyHydrate when-visible> -->
          <pv-description
          v-if="product"
          :product="product"
          class="container"
        />
        <!-- </LazyHydrate> -->
      </div>
      <pv-collection
        v-if="product.work_with_blade.length > 0"
        :products="product.work_with_blade"
        :collection-title="'Works with this blade'"
        class="container"
      />
      <!-- <div ref="relatedProducts" class="related-products-section container">
        <div v-if="related_products && related_products.length">
          <pv-collection
          :products="related_products"
          :collection-title="$t('products.relatedProducts')"
          class="container"
        />
        </div>
      </div> -->

      <hr class="mt-0 m-b-5 container" />
      <div class="product-widgets-container container mx-auto row pb-2">
        <div class="container" style="display: contents;">
            <pv-on-sale-products
            :collection-title="$t('home.onSaleProduct')"
            />  
            <pv-top-selling-three-products
            :collection-title="$t('home.topSellingProduct')"
            />
              <pv-new-arrival
              :collection-title="$t('home.newarrivalproducts')"
            />
              <pv-free-shipping
              :collection-title="$t('home.freeshoppingproducts')"
            />

        </div>
      </div>
      </div>
  </main>
</template>

<script>
import {mapGetters} from "vuex";
import axios from "axios";
// import LazyHydrate from 'vue-lazy-hydration';
export default {
  components: {
    // LazyHydrate,
    PvMediaNew: () => import("~/components/product/PvMediaNew.vue"),
    PvBtnShare: () => import("~/components/common/PvBtnShare.vue"),
    PvOnSaleProducts: () => import("~/components/home/PvOnSaleProducts.vue"),
    PvTopSellingThreeProducts: () => import("~/components/home/PvTopSellingThreeProducts.vue"),
    PvNewArrival: () => import("~/components/home/PvNewArrival.vue"),
    PvFreeShipping: () => import("~/components/home/PvFreeShipping.vue"),
    PvDescription: () => import("~/components/product/PvDescription.vue"),
    PvCollection: () => import("~/components/product/card/PvCollection.vue"),
    PvDetail: () => import("~/components/product/PvDetail.vue")
  },
  async asyncData({ params, redirect, app, error }) {
    try {
      const { data } = await axios.get(`products/${params.slug}`, {
        baseURL: process.env.API_BASE_URL,
        headers: {
          'Accept-Language': app.i18n.locale,
          'Content-Type': 'application/json',
          'currency': app.$cookies.get('currency') || 'USD',
          'Accept': 'application/json',
          'secret-key': process.env.SECRET_KEY,
          'api-key': process.env.API_KEY,
        }
      });

      // Check if the product exists
      if (!data.product) {
        // Trigger a 404 error
        error({ statusCode: 404, message: 'Product not found' });
        return;
      }

      // Redirect to the correct URL if the slug is different
      if (data.product.slug !== params.slug) {
        redirect(301, `/products/${data.product.slug}`);
      }

      return {
        product: data.product,
        tokens: data.tokens,
        prev_product: data.next_previous_products[0],
        next_product: data.next_previous_products[1],
      };
    } catch (e) {
      // Trigger a 404 error if the API request fails
      error({ statusCode: 404, message: 'Product not found' });
      return;
    }
  },
  data: function () {
    return {
      product: null,
      tokens: null,
      related_products: null,
      relatedProductsLoaded: false,
      prev_product: null,
      next_product: null,
      loaded: false,
    };
  },
  head() {
    function formatDate(dateString) {
      if (dateString !== undefined) {
        var date = new Date(dateString);
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
        return year + "-" + month + "-" + day;
      } else {
        var lastDayOfYear = new Date(new Date().getFullYear(), 11, 31);
        var year = lastDayOfYear.getFullYear();
        var month = ("0" + (lastDayOfYear.getMonth() + 1)).slice(-2);
        var day = ("0" + lastDayOfYear.getDate()).slice(-2);
        return year + "-" + month + "-" + day;
      }
    }

    const head_data = {
      titleTemplate: this.product.meta.title || this.product.title,
      title: this.product.meta.title || this.product.title,
      link: [
        {
          rel: 'canonical',
          href: this.product.canonical,
        },
        ...this.$i18n.availableLocales.map(loc => ({
          rel: 'alternate',
          hreflang: loc,
          href: process.env.PUBLIC_PATH_WITHOUT_SLASH + (loc !== 'en' ? `/${loc}` : '') + '/products/' + this.product.slug
        })),
        {
          rel: 'alternate',
          hreflang: 'x-default',
          href: process.env.PUBLIC_PATH_WITHOUT_SLASH + '/products/' + this.product.slug
        }
      ],
      meta: [
        { "http-equiv": "content-language", content: this.$i18n.locale },
        { name: "description", content: this.product.meta.description },
        { name: "og:title", content: this.product.meta.title },
        { name: "og:description", content: this.product.meta.description },
        { property: "og:image", content: this.product.open_graph },
        { property: "og:type", content: "product" },
        { property: "og:site_name", content: "Techno Lock Keys" },
        { property: "og:url", content: process.env.PUBLIC_PATH_WITHOUT_SLASH + this.$route.fullPath },
      ],
      script: []
    };

    // BreadcrumbList
    const breadcrumbs = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": this.$i18n.t("products.home"),
        "item": process.env.PUBLIC_PATH,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": this.$i18n.t("products.shop"),
        "item": `${process.env.PUBLIC_PATH}shop`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": this.product.categories[0]?.name || '-',
        "item": `${process.env.PUBLIC_PATH}${this.product.categories[0]?.slug || ''}`,
      }
    ];

    if (this.product.categories[1]) {
      breadcrumbs.push({
        "@type": "ListItem",
        "position": 4,
        "name": this.product.categories[1]?.name || '-',
        "item": `${process.env.PUBLIC_PATH}${this.product.categories[1]?.slug || ''}`,
      });
      breadcrumbs.push({
        "@type": "ListItem",
        "position": 5,
        "name": this.product.title,
        "item": `${process.env.PUBLIC_PATH}products/${this.product.slug}`,
      });
    } else {
      breadcrumbs.push({
        "@type": "ListItem",
        "position": 4,
        "name": this.product.title,
        "item": `${process.env.PUBLIC_PATH}products/${this.product.slug}`,
      });
    }

    head_data.script.push({
      type: 'application/ld+json',
      json: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs
      }
    });

    // Product schema
    const offerList = this.product.offers.length > 0 ? this.product.offers.map(offer => ({
      "@type": "Offer",
      "price": offer.price.value,
      "priceCurrency": this.product.price.code,
      "priceValidUntil": formatDate(this.product.price.until),
      "availability": this.product.stock === 0 ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
      "url": `${process.env.PUBLIC_PATH}products/${this.product.slug}`,
      "eligibleQuantity": {
        "@type": "QuantitativeValue",
        "value": offer.from
      },
      "itemCondition": "https://schema.org/NewCondition"
    })) : [{
      "@type": "Offer",
      "price": this.product.price.value,
      "priceCurrency": this.product.price.code,
      "priceValidUntil": formatDate(this.product.price.until),
      "availability": this.product.stock === 0 ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
      "url": `${process.env.PUBLIC_PATH}products/${this.product.slug}`,
      "itemCondition": "https://schema.org/NewCondition",
      "eligibleQuantity": {
        "@type": "QuantitativeValue",
        "value": 1
      }
    }];

    const productSchema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "@id": `${process.env.PUBLIC_PATH}products/${this.product.slug}`,
      "name": this.product.title,
      "image": [
        this.product.main_image,
        ...(this.product.secondary_image && this.product.secondary_image !== "https://dev-srv.tlkeys.com/backend/media/svg/files/blank-image.svg"
          ? [this.product.secondary_image]
          : [])
      ],
      "description": this.product.meta.description,
      "sku": this.product.sku,
      "brand": {
        "@type": "Brand",
        "name": this.product.specifications.manufacturer ?? "-"
      },
      "offers": offerList
    };

    if (this.product.total_reviews > 0) {
      productSchema.review = this.product.rating.map(item => ({
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": item.rating.toFixed(2)
        },
        "author": {
          "@type": "Person",
          "name": item.user || "Anonymous"
        }
      }));
      productSchema.aggregateRating = {
        "@type": "AggregateRating",
        "ratingValue": this.product.avg_rating.toFixed(2),
        "reviewCount": this.product.total_reviews
      };
    }

    head_data.script.push({
      type: 'application/ld+json',
      json: productSchema
    });

    // FAQ schema
    if (this.product.frequently_asked_questions?.length > 0) {
      const faqItems = this.product.frequently_asked_questions
        .filter(item => item.length >= 2)
        .map(item => ({
          "@type": "Question",
          "name": item[0],
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item[1]
          }
        }));
      head_data.script.push({
        type: 'application/ld+json',
        json: {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqItems
        }
      });
    }

    // Video schema
    if (this.product.video_details?.length > 0) {
      this.product.video_details.forEach(video => {
        const thumbnailUrls = Object.values(video.thumbnailUrl).map(t => t.url);
        head_data.script.push({
          type: 'application/ld+json',
          json: {
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": video.name,
            "description": video.description,
            "thumbnailUrl": thumbnailUrls,
            "uploadDate": video.uploadDate,
            "duration": video.duration,
            "contentUrl": video.contentUrl,
            "embedUrl": video.embedUrl
          }
        });
      });
    }

    return head_data;
  },
  mounted: function () {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
    this.$Progress.finish();
    this.initializeObserver();
  },
  beforeMount: function(){
    this.$Progress.start();
  },

  beforeDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },

  computed:{
    ...mapGetters("language", ["getLang"]),
    ...mapGetters("header",["getCurrency"]),
  },
  methods: {
    getLink(route) {
      if (this.getLang === 'en') {
        return route; // Return the route as is without the language parameter
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    },
    initializeObserver() {
      this.observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting && !this.relatedProductsLoaded) {
            this.loadRelatedProducts();
            this.relatedProductsLoaded = true; // Prevent repeated requests
          }
        },
        { root: null, rootMargin: "0px", threshold: 0.1 }
      );

      if (this.$refs.relatedProducts) {
        this.observer.observe(this.$refs.relatedProducts);
      }
    },
    async loadRelatedProducts() {
      try {
        const { data } = await axios.get(`related-products`, {
          baseURL: process.env.API_BASE_URL,
          headers: {
            "Accept-Language": this.$i18n.locale,
            "Content-Type": "application/json",
            "currency": this.$cookies.get("currency") || "USD",
            "Accept": "application/json",
            "secret-key": process.env.SECRET_KEY,
            "api-key": process.env.API_KEY,
          },
          params: {
            sku: this.product.sku
          },
        });
        this.related_products = data.related_products;
      } catch (error) {
        console.error("Failed to load related products:", error);
      }
    }
  },
};
</script>
