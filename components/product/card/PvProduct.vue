<template >
  <div
    style="max-width: 400px;"
    class="mb-2 product-default bg-white inner-quickview pt-2 position-relative card-main-wrapper border shadow-sm rounded-10" data-nosnippet>
    <figure class="img-effect shadow">
      <nuxt-link :to="getLink('/products/'+product.slug)">
        <template v-for="image in product.gallery.slice(0, 2)">
          <pv-gallery-image
            :key="image.id"
            :image="image"
            class="rounded-10"
          />
        </template>
      </nuxt-link>

      <pv-label-group :product="product" />

      <div class="btn-icon-group">
<!--        <pv-cart-button :products="products" :parent="'products-card'" />-->
      </div>
      <div
        v-if="product.discount && product.discount.until "
        style="background-color: rgba(0, 57, 74, 0.8)"
        class="product-countdown-container w-100"
      >
        <span class="product-countdown-title">{{ $t("products.discountEndsIn") }}</span>
        <pv-count-down
          class="product-countdown countdown-compact"
          :until="product.discount.until"
          :compact="true"
        />
      </div>
    </figure>

    <div class="position-relative px-3 py-1 d-flex flex-column"
         :class="{'product-card-information' : !isIndexPage, 'product-card-information-index' : isIndexPage}"
    >
      <div class="row">
        <div class="col-lg-12 mb-lg-0 mb-md-0 mb-1">
          <div
            :class="{'text-right': getIsAr }"
            :style="'display: inline-block;'"
          >
            <nuxt-link
              class="categoryLink"
              :to="getLink('/'+product.categories['slug'])"
            >
            {{ truncateTitle(product.categories['title'], 28) }}
            </nuxt-link>
          </div>
          <div v-if="product.categories.length > 1">
            <nuxt-link
              class="categoryLink"
              :to="getLink('/' + product.categories[1].slug)"
            >
            {{ truncateTitle(product.categories[1].name, 10) }}
            </nuxt-link>
          </div>
        </div>
        <div class="col-lg-12">
          <div class="sku-color product-sku">{{ product.sku }}</div>
        </div>
        <div class="col-lg-12 product-short-title" :class="{'product-short-title-index': isIndexPage, 'product-short-title': !isIndexPage }">
          <nuxt-link :to="getLink('/products/'+product.slug)">
            <span class="product-span" style="">{{ truncateTitle(product.title, 70) }}</span>
          </nuxt-link>
        </div>
<!--        col-lg-12 text-center mt-lg-1 mt-4 mt-md-1 mt-sm-2 mt-xl-2-->
        <!-- <div class="col-lg-12">
        </div> -->
        <!-- <div class="col-lg-12">
          <pv-price-box
            class="m-0"
            v-if="product.hide_price == 0"
            :product="product"
            :gridPrice="true"
          />
          <div v-else style="display: flex;position: relative;bottom: 5px">
            <img src="/images/icons/whatsapp-logo.svg" width="20px" @click="goToWhatsApp(product)" />
            <span
              class="d-inline-block p-1 font-weight-bold"
              @click="goToWhatsApp(product)"
              style="position: relative; color: #f52020; cursor: pointer;font-size: 14px"
            >
            {{ $t("products.ContactUsToSendYouThePrice") }}
            </span>
          </div>
        </div> -->
      </div>
    </div>


      <div class="px-3 mt-3">
                  <pv-rating :product="product" />
        <pv-price-box
          v-if="product.hide_price == 0"
          :product="product"
          :gridPrice="true"
        />
        <div v-else style="display: flex; position: relative; bottom: 5px">
          <img src="/images/icons/whatsapp-logo.svg" width="20px" @click="goToWhatsApp(product)" />
          <span
            class="d-inline-block p-1 font-weight-bold"
            @click="goToWhatsApp(product)"
            style="position: relative; color: #f52020; cursor: pointer; font-size: 14px"
          >
            {{ $t("products.ContactUsToSendYouThePrice") }}
          </span>
        </div>
      </div>

    <!-- Begin:Buttons -->
    <div class="d-lg-flex align-items-streach justify-content-center py-2">
      <button
      v-if="product.hide_price != 0 || product.categories.slug == 'Online-Services'"
      class="w-100 mx-1 whatsapp-button"
      @click="handleWhatsAppClick(product)"
      >
        <!-- <i
          style="font-size: larger"
          class="py-2 px-5 rounded-3 fab fa-whatsapp"
        ></i> -->
        <img src="/images/icons/whatsapp-logo.svg" width="20px" />
        {{ $t("products.ContactUsToSendYouThePrice") }}
      </button>
      
      <base-button-icon-1
        v-else-if="!product.has_token && !product.has_cover"
        class="px-2 py-2 mx-1 w-100"
        @click="addToCart(product)"
        :outline="true"
      >{{ $t("wishlist.addToCart") }}
      </base-button-icon-1>
      <base-button-icon-1
        v-else
        class="px-2 py-2 mx-1 w-100"
        @click="$router.push({ path: `/products/${product.slug}` })"
        :outline="true"
      >{{ $t("wishlist.addToCart") }}
      </base-button-icon-1>

      <base-button-icon-1
        class="px-2 py-2 mx-1 w-100 mt-1 mt-lg-0"
        @click="openQuickview"
        :outline="true"
      >{{ $t("wishlist.QuickView") }}
      </base-button-icon-1>
    </div>

    <!-- End:Buttons -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    PvGalleryImage : () => import("~/components/product/partials/PvGalleryImage.vue"),
    PvLabelGroup: () => import("~/components/product/partials/PvLabelGroup.vue"),
    PvCartButton: () => import("~/components/product/partials/PvCartButton.vue"),
    PvCountDown: () => import("~/components/product/partials/PvCountDown.vue"),
    PvRating: () => import("~/components/product/partials/PvRating.vue"),
    PvPriceBox: () => import("~/components/product/partials/PvPriceBox.vue"),
    BaseButtonIcon1: () => import ("~/components/common/BaseButtonIcon1.vue"),
  },
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
    ...mapGetters("language", ["getLang"])
  },
  props: {
    product: Object,
    isIndexPage: Boolean,
  },
  methods: {
    ...mapActions("shop", ["addToCart"]),
    getLink(route) {
      if (this.getLang === 'en') {
        return route; // Return the route as is without the language parameter
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    },
    truncateTitle(title, maxLength) {
      if (title.length > maxLength) {
        return title.slice(0, maxLength) + '...';
      } else {
        return title;
      }
    },
    handleWhatsAppClick(product) {
      this.goToWhatsApp(product);
    },
    goToWhatsApp() {
      window.open(
        `https://api.whatsapp.com/send?phone=971544179287&text=Could I please have the price of the ${this.product.short_title}`,
        "_blank"
      );
    },
    openQuickview: function () {
      this.$modal.show(
        () => import("~/components/product/PvQuickview"),
        { slug: this.product.slug },
        {
          width: "931",
          height: "auto",
          adaptive: true,
          class: "quickview-modal",
        }
      );
    },
  },
};
</script>

<style scoped>

.rounded-10 {
  border-radius: 10px;
}

.position-relative .category-list a {
  transition: all 0.1s ease-in;
}

.position-relative .category-list a:hover {
  color: red !important;
}

.categoryLink {
  text-decoration: underline;
  font-size: 0.8rem;
  font-weight: bold;
  color: #727272;
  transition: all 0.1s ease-in;
}

@media screen and (max-width: 767px){
  .categoryLink{
    font-size: 16px;
  }
}

.categoryLink:hover {
  color: #ff6800 !important;
  text-decoration: underline;

}
.product-card-information, .product-card-information-index{
  height: 90px;
}

@media screen and (max-width:1400px){
  .product-card-information, .product-card-information-index{
    height: 120px;
  }
}

.product-short-title, .product-sku{
  margin-top: 5px;
  /* height: 80px; */
}
/* .product-short-title{
  font-weight: 900;
  height: 90px;
} */
/* .product-short-title-index{
  height: 80px;
} */

@media screen and (max-width:1400px){
  /* .product-short-title{
    height: 100px;
  } */
}
@media screen and (max-width:1200px){
  /* .product-short-title{
    height: 90px;
  } */
}

/* .product-short-title:hover{
  text-decoration: underline;
} */

.whatsapp-button{
  background-color: #2ba968;
  border: 1px solid #2ba968;
  border-radius: 6px;
  transition: all 0.2s ease-in;
  font-size: 1em;
  font-weight: 500;
  color: white;
  transition: all 0.2s ease-out;
  box-shadow: 0px 1px 2px #2ba968;
  display: flex;
  align-items: center;
  justify-content: center;
}
.product-span{
  font-size: 0.9rem;
  font-weight: bold;
  line-break: anywhere;
}
@media screen and (max-width:767px){
  .product-span{
    font-size: 16px;
  }
  .product-card-information, .product-card-information-index{
    height: 160px;
  }
}
@media screen and (max-width:575px){
  /* .product-short-title{
    height: 90px;
  } */
  .product-card-information, .product-card-information-index{
    /* height: 200px; */
  }
}
@media screen and (max-width:380px){
    .product-card-information, .product-card-information-index{
    height: 230px;
  }
  /* .product-short-title{
    height: 100px;
  } */
}
@media screen and (max-width:320px){
  /* .product-short-title{
    height: 120px;
  } */
}
</style>
