<template>
  <pv-small-collection
      :products="isFreeShippingProducts"
      :collection-title="$t('home.freeshoppingproducts')"
      :animation-delay="'200'"
  />
</template>
<script>
import Api from "~/api";
export default {
  components: {
    PvSmallCollection: () => import("~/components/product/card/PvSmallCollection.vue"),
  },
  async fetch() {
      const getFreeShippingProducts = await Api.get("shop?is_free_shipping=1&length=3");
      this.isFreeShippingProducts = getFreeShippingProducts.data.products;
  },
  data: function () {
    return {
      isFreeShippingProducts: null,
    };
  },
}
</script>
