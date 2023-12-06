<template>
  <pv-small-collection
      :products="isNewArrivalProducts"
      :collection-title="$t('home.newarrivalproducts')"
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
      const getNewArrivalProducts = await Api.get("shop?is_new_arrival=1&length=3");
      this.isNewArrivalProducts = getNewArrivalProducts.data.products;
  },
  data: function () {
    return {
      isNewArrivalProducts: null,
    };
  },
}
</script>
