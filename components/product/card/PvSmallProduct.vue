<template>
  <div
    class="scalling product-default
     left-details product-widgetborder d-flex flex-column
     align-items-start p-2 pb-0 w-100 h-100 border rounded-5 shadow-sm mb-2"
  >
    <div class="w-100">
      <div class="row">
        <div class="col-3 col-xl-4 col-lg-3 col-sm-4 m-auto" >
            <nuxt-link :to="getLink('/products/'+product.slug)">
              <nuxt-img
                format="webp"
                loading="lazy"
                width="150"
                height="150"
                :src="product.gallery[0]['m']['url']"
                alt=""
                class="ml-lg-2"
                style="min-width: 50px"
              />
            </nuxt-link>

        </div>
        <div class="col-9 col-xl-8 col-lg-9 col-sm-8 m-auto">
          <div class="row ">
            <div class="col-12 float-left">
              <pv-price-box smallProducts="true" class="m-0" v-if="product.hide_price == 0" :product="product" />
              <span v-else style="color: #556b2f">
                <i
                  class="fab fa-sm fa-whatsapp"
                  style="font-size: 16px; color: #556b2f; cursor: pointer"
                  @click="goToWhatsApp(product)"
                />
                <small @click="goToWhatsApp(product)">{{
                    $t("products.ContactUsToSendYouThePrice")
                  }}</small>
              </span>
            </div>
            <div class="col-12">
              <p class="product-title two-line-ellipsis" style="font-size: 14px; font-weight: bold;">
                <nuxt-link :to="getLink('/products/' + product.slug)">
                  {{ product.short_title }}
                </nuxt-link>
              </p>
            </div>
            <div class="col-12">
              <span class="d-block sku-color" style="font-size: 14px"
              >SKU:{{ product.sku }}</span
              >
            </div>
            <div class="col-12">
              <pv-rating :product="product" class="m-0 p-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PvGalleryImage from "~/components/product/partials/PvGalleryImage";
import PvRating from "~/components/product/partials/PvRating";
import PvPriceBox from "~/components/product/partials/PvPriceBox";
import {mapGetters} from "vuex";

export default {
  components: {
    PvGalleryImage,
    PvRating,
    PvPriceBox,
  },
  computed : {
    ...mapGetters("language", ["getLang"])
  },
  props: {
    product: Object,
  },
  methods: {
    getLink(route) {
      if (this.getLang === 'en') {
        return route; // Return the route as is without the language parameter
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    },
    goToWhatsApp(product) {
      window.open(
        `https://api.whatsapp.com/send?phone=971544179287&text=Could I please have the price of the ${product.short_title}`,
        "_blank"
      );
    },
  },
};
</script>
<style lang="css" scoped>
.two-line-ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 2.8em;
}
</style>