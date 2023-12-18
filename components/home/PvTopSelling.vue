<template>
  <pv-collection
    :isIndexPage ="true"
    :products="topSelling"
    :collectionTitle="collectionTitle"
  />
</template>
<script>
import Api from "~/api";
import PvCollection from "~/components/product/card/PvCollection.vue";
export default {
  components: {
    PvCollection,
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
