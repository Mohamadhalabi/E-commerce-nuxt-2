<template>
  <div class="col-12 d-flex align-items-center justify-content-between flex-column" data-nosnippet>
    <h3 class="section-sub-title px-2 w-100">
      <nuxt-link :to="UrlLink">
        {{collectionTitle}}
      </nuxt-link>
    </h3>
    <pv-small-product
      v-for="product in products"
      :key="product.sku"
      :product="product"
    />
  </div>
</template>

<script>
export default {
  components: {
    PvSmallProduct: () => import("~/components/product/card/PvSmallProduct")
  },
  props: {
    products: Array,
    collectionTitle: String,
    animationDelay: String,
    link: String,
  },
  data: function() {
    return {
      UrlLink: 'shop?' + this.link,
    };
  }
};
</script>
