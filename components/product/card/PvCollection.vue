<template>
  <div v-if="products" data-nosnippet>
    <Carousel
      :slides-per-page="4"
      :show-dots='true'
      :autoplay-delay="11114"
      :gutter="20"
      :show-arrows="false"
      :peek-right="5"
      :peek-left="5"
      :responsive='[
        {
          maxWidth: 1200,
          slidesPerPage: 4,
        },
        {
          maxWidth: 876,
          slidesPerPage: 3
        },
        {
          maxWidth: 580,
          slidesPerPage: 2
        },
        {
          maxWidth: 350,
          slidesPerPage: 1
        }
      ]'
    >
        <pv-product
          v-for="product in products"
          :key="product.sku"
          :product="product"
          data-swiper-autoplay="5000"
          :isIndexPage="isIndexPage"
        />
    </Carousel>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import PvProduct from "~/components/product/card/PvProduct.vue";
export default {
  components: {
    Carousel: () => import("vue-ssr-carousel"),
    PvProduct,
  },
  props: {
    isIndexPage: Boolean,
    index:Object,
    products: Array,
    link:String,
    collectionTitle: String,
  },
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"])
  },
};
</script>
<style>
div.ssr-carousel-track{
  justify-content: start!important;
}
</style>
