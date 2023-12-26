<template>
  <pv-small-collection
    :products="topSellingThreeProducts"
    :collection-title="$t('home.topSellingProduct')"
    :animation-delay="'200'"
  />
</template>
<script>
import Api from "~/api";
import {mapGetters} from "vuex";

export default {
  components: {
    PvSmallCollection: () => import("~/components/product/card/PvSmallCollection.vue"),
  },
  computed: {
    ...mapGetters("header",["getCurrency"])
  },
  async fetch() {
      const topSellingProducts =  await Api.get("products/top-selling-products");
      this.topSellingThreeProducts = topSellingProducts.data.top_selling.slice(0,3);
  },
  data: function () {
    return {
      topSellingThreeProducts: null,
    };
  },
  watch: {
    getCurrency() {
      Api.get("products/top-selling-products").then((response) => {
        this.topSellingThreeProducts = response.data.top_selling.slice(0,3);
      })
    },
  }
}
</script>
