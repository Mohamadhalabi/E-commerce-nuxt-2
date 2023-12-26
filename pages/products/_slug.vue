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
          <li v-if="loaded" class="breadcrumb-item active" aria-current="page">
            {{ product.short_title }}
          </li>
        </ol>
<!--        <div class="mt-auto">-->
<!--          <client-only>-->
<!--            <PvBtnShare :url="urlLink" />-->
<!--          </client-only>-->
<!--        </div>-->
      </nav>
      <div class="product-single-container container product-single-default">
        <div v-if="product" class="row">
          <div class="col-xl-5 col-lg-6 col-md-6 col-12 product-single-gallery">
            <pv-media :product="product" />
          </div>
          <div class="col-xl-7 col-lg-6 col-md-5 col-sm-12 col-12 product-single-details">
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
        <pv-description
          v-if="product"
          :product="product"
          class="container"
        />
      </div>

      <pv-collection
        :products="related_products"
        :collection-title="$t('products.relatedProducts')"
        class="container"
      />
      <hr class="mt-0 m-b-5 container" />

      <div
        class="product-widgets-container container mx-auto row pb-2"
      >
        <div class="container">
          <div class="product-widgets-container row pb-2">
            <pv-on-sale-products
              :collection-title="$t('home.onSaleProduct')"
              :animation-delay="'200'"
            />
            <pv-top-selling-three-products
              :collection-title="$t('home.topSellingProduct')"
              :animation-delay="'500'"
            />
            <pv-new-arrival
              :collection-title="$t('home.newarrivalproducts')"
              :animation-delay="'800'"
            />
            <pv-free-shipping
              :collection-title="$t('home.freeshoppingproducts')"
              :animation-delay="'1100'"
            />
          </div>
        </div>
      </div>
      </div>
    </div>
  </main>
</template>

<script>
import PvDetail from "~/components/product/PvDetail";
import PvDescription from "~/components/product/PvDescription";
import PvCollection from "~/components/product/card/PvCollection";
import PvMedia from "~/components/product/PvMedia.vue";
import Api from "~/api";
import {mapGetters} from "vuex";
import PvFreeShipping from "~/components/home/PvFreeShipping.vue";
import PvNewArrival from "~/components/home/PvNewArrival.vue";
import PvTopSellingThreeProducts from "~/components/home/PvTopSellingThreeProducts.vue";
import PvOnSaleProducts from "~/components/home/PvOnSaleProducts.vue";

export default {
  components: {
    PvOnSaleProducts,
    PvTopSellingThreeProducts,
    PvNewArrival,
    PvFreeShipping,
    PvMedia,
    PvDescription,
    PvCollection,
    PvDetail
  },
  async asyncData({ params }) {
    const { data } = await Api.get(`products/${params.slug}`);
    return {
      product: data.product,
      tokens: data.tokens,
    };
  },
  data: function () {
    return {
      product: null,
      tokens: null,
      featuredProducts: null,
      bestSellingProducts: null,
      isNewArrivalProducts: null,
      isFreeShippingProducts: null,
      related_products: null,
      featured_products: null,
      best_selling_products: null,
      latest_products: null,
      top_rated_products: null,
      prev_product: null,
      next_product: null,
      loaded: false,
      latestProducts: null,
      topRatedProducts: null,
      latestProducts2: null,
      bestSellingProducts2: null,
      urlLink: null,
      parentCategoryLink: null,
      SubCategory: null,
      SubCategoryLink: null,
      short_tile: null,
      images: [],
      carBrands: [],
      childCategory: null,
      ParentCategory: null,
      isSalePriceEqualToPrice:null,
      currency:"",
    };
  },
  head() {
    return {
      titleTemplate: this.product.meta.title
        ? this.product.meta.title
        : this.product.title,
      title: this.product.meta.title
        ? this.product.meta.title
        : this.product.title,
      meta: [
        {
          "http-equiv": "content-language",
          content: this.$i18n.locale,
        },
        {
          name: "description",
          content: this.product.meta.description,
        },
        {
          name:"og:title",
          content: this.product.meta.title
        },
        {
          name: "og:description",
          content: this.product.meta.description,
        },
        {
          property: "og:image",
          content: this.product.open_graph,
        },
        {
          property: "og:type",
          content: "product",
        },
        {
          property: "og:site_name",
          content: "Techno Lock Keys"
        },
        {
          property: "og:url",
          content: this.urlLink,
        },
        {
          property:"twitter:card",
          content: "summary",
        },
        {
          property: "twitter:site",
          content: "Techno Lock Keys",
        },
        {
          property: "twitter:description",
          content: this.product.meta.description
        },
        {
          property: "twitter:title",
          content: this.product.title
        },
        {
          property: "twitter:url",
          content: this.urlLink,
        },
        {
          property: "twitter:image",
          content: this.product.twitter_image,
        }
      ],
      script: [
        {
          type: 'application/ld+json',
          json: {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
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
                "name": this.ParentCategory,
                "item": `${process.env.PUBLIC_PATH}${this.parentCategoryLink}`,
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": this.childCategory,
                "item": `${process.env.PUBLIC_PATH}${this.SubCategoryLink}`,
              },
              {
                "@type": "ListItem",
                "position": 5,
                "name": this.product.title,
                "item": `${process.env.PUBLIC_PATH}products/${this.product.slug}`,
              }
            ]
          }
        },
        {
          type: 'application/ld+json',
          json: {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": this.product.title,
            "image": [
              this.images
            ],
            "description": this.product.meta.description,
            "sku": this.product.sku,
            "brand": {
              "@type": "Brand",
              "name": this.product.specifications.manufacturer ?? "-"
            },
            "offers": {
              "@type": "Offer",
              "price": this.product.price,
              "salePrice": this.isSalePriceEqualToPrice,
              // "priceCurrency": this.product.price.code
            },
            "review": {
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": 4,
                "bestRating": 5
              },
              "author": {
                "@type": "Organization",
                "name": "Techno Lock Keys"
              }
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": 4.4,
              "reviewCount": 89
            },
          }
        }
      ]
    };
    // else
    //   return {
    //     titleTemplate: this.product.meta.title
    //       ? this.product.meta.title
    //       : this.product.title,
    //     title: this.product.meta.title
    //       ? this.product.meta.title
    //       : this.product.title,
    //     meta: [
    //       {
    //         "http-equiv": "content-language",
    //         content: this.$i18n.locale,
    //       },
    //       {
    //         name: "description",
    //         content: this.product.meta.description,
    //       },
    //       {
    //         name:"og:title",
    //         content: this.product.meta.title
    //       },
    //       {
    //         name: "og:description",
    //         content: this.product.meta.description,
    //       },
    //       {
    //         property: "og:image",
    //         content: this.product.open_graph,
    //       },
    //       {
    //         property: "og:type",
    //         content: "product",
    //       },
    //       {
    //         property: "og:site_name",
    //         content: "Techno Lock Keys"
    //       },
    //       {
    //         property: "og:url",
    //         content: this.urlLink,
    //       },
    //       {
    //         property:"twitter:card",
    //         content: "summary",
    //       },
    //       {
    //         property: "twitter:site",
    //         content: "Techno Lock Keys",
    //       },
    //       {
    //         property: "twitter:description",
    //         content: this.product.meta.description
    //       },
    //       {
    //         property: "twitter:title",
    //         content: this.product.title
    //       },
    //       {
    //         property: "twitter:url",
    //         content: this.urlLink,
    //       },
    //       {
    //         property: "twitter:image",
    //         content: this.product.twitter_image,
    //       }
    //     ],
    //     script: [
    //       {
    //         type: 'application/ld+json',
    //         json: {
    //           "@context": "https://schema.org",
    //           "@type": "BreadcrumbList",
    //           "itemListElement": [
    //             {
    //               "@type": "ListItem",
    //               "position": 1,
    //               "name": this.$i18n.t("products.home"),
    //               "item": process.env.PUBLIC_PATH,
    //             },
    //             {
    //               "@type": "ListItem",
    //               "position": 2,
    //               "name": this.$i18n.t("products.shop"),
    //               "item": `${process.env.PUBLIC_PATH}shop`,
    //             },
    //             {
    //               "@type": "ListItem",
    //               "position": 3,
    //               "name": this.ParentCategory,
    //               "item": `${process.env.PUBLIC_PATH}${this.parentCategoryLink}`,
    //             },
    //             {
    //               "@type": "ListItem",
    //               "position": 4,
    //               "name": this.product.title,
    //               "item": `${process.env.PUBLIC_PATH}products/${this.product.slug}`,
    //             }
    //           ]
    //         }
    //       },
    //       {
    //         type: 'application/ld+json',
    //         json: {
    //           "@context": "https://schema.org/",
    //           "@type": "Product",
    //           "name": this.product.title,
    //           "image": [
    //             this.images
    //           ],
    //           "description": this.product.description,
    //           "sku": this.product.sku,
    //           "brand": {
    //             "@type": "Brand",
    //             "name": this.carBrands
    //           },
    //           "review": {
    //             "@type": "Review",
    //             "reviewRating": {
    //               "@type": "Rating",
    //               "ratingValue": 4,
    //               "bestRating": 5
    //             },
    //             "author": {
    //               "@type": "Organization",
    //               "name": "Techno Lock Keys"
    //             }
    //           },
    //           "aggregateRating": {
    //             "@type": "AggregateRating",
    //             "ratingValue": 4.4,
    //             "reviewCount": 89
    //           },
    //           "offers": {
    //             "@type": "AggregateOffer",
    //             "offerCount": 5,
    //             "lowPrice": 119.99,
    //             "highPrice": 199.99,
    //             "priceCurrency": "USD"
    //           }
    //         }
    //       }
    //     ]
    //   };
  },
  mounted: function () {
    this.urlLink = window.location.origin + this.$route.fullPath;
    if(parseFloat(this.product.price.value) === this.product.sale_price.value){
      this.isSalePriceEqualToPrice ='-'
    }
    else{
      this.isSalePriceEqualToPrice = this.product.sale_price;
    }

    this.getProduct();
    // this.getTopSelling();
    this.product.gallery.forEach((item) => {
      if (item.m && item.m.url) {
        this.images.push(item.m.url);
      }
    });
    this.product.brands.forEach((item) => {
      this.carBrands.push(item.brand)
    })
    const uniqueCarBrandsSet = new Set(this.carBrands);
    this.carBrands = Array.from(uniqueCarBrandsSet);
    if(this.product.categories[0] && this.product.categories[0].name){
      this.ParentCategory = this.product.categories[0].name;
      this.parentCategoryLink = this.product.categories[0].slug;
    }
    if(this.product.categories[1] && this.product.categories[1].name){
      this.childCategory = this.product.categories[1].name;
      this.SubCategoryLink = this.product.categories[1].slug;
    }
  },
  computed:{
    ...mapGetters("language", ["getLang"]),
    ...mapGetters("header",["getCurrency"]),
  },
  methods: {
    getProduct: function () {
      this.loaded = false;
      Api.get(`products/${this.$route.params.slug}`)
        .then((response) => {
          this.product = response.data.product;
          let productsArr =
            JSON.parse(localStorage.getItem("lastProductsVisited")) || [];
          productsArr.push(this.product);
          this.related_products = response.data.related_products;
          this.featured_products = response.data.featured_products;
          this.best_selling_products = response.data.best_selling_products;
          this.latest_products = response.data.latest_products;
          this.top_rated_products = response.data.top_rated_products;
          this.prev_product = response.data.next_previous_products[0];
          this.next_product = response.data.next_previous_products[1];
          this.loaded = true;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
    },
    getLink(route) {
      if (this.getLang === 'en') {
        return route; // Return the route as is without the language parameter
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    },
  },
  watch: {
    getCurrency() {
      this.getProduct();
    },
  }
};
</script>
