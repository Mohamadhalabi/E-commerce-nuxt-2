<template>
  <pv-small-collection
    :products="onSaleProducts"
    :collection-title="$t('home.onSaleProduct')"
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
    const getOnSaleProducts = await Api.get("shop?on_sale=1&length=3");
    this.onSaleProducts = getOnSaleProducts.data.products;
  },
  data: function () {
    return {
      onSaleProducts: null,
    };
  },
}
</script>
