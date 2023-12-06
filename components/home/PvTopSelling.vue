<template>
  <pv-collection
    :isIndexPage ="true"
    :products="topSelling"
    :collectionTitle="collectionTitle"
  />
</template>
<script>
import Api from "~/api";
export default {
  components: {
    PvCollection: () => import("~/components/product/card/PvCollection.vue")
  },
  async fetch() {
        const topSellingProducts =  await Api.get("products/top-selling-products");
        this.topSelling = topSellingProducts.data.top_selling
  },
  props: {
    isIndexPage: Boolean,
    collectionTitle: String,
  },
  data: function () {
    return {
      topSelling: null,
    };
  },
}
</script>
