<template>
  <pv-collection
    :isIndexPage ="true"
    :products="topSelling"
    :collectionTitle="collectionTitle"
    :link="link"
  />
</template>
<script>
import Api from "~/api";
import PvCollection from "~/components/product/card/PvCollection.vue";
import {mapGetters} from "vuex";
export default {
  components: {
    PvCollection,
  },
  computed: {
    ...mapGetters("header",["getCurrency"])
  },
  async fetch() {
        const topSellingProducts =  await Api.get("products/top-selling-products");
        this.topSelling = topSellingProducts.data.top_selling
  },
  props: {
    isIndexPage: Boolean,
    collectionTitle: String,
    link: String,
  },
  data: function () {
    return {
      topSelling: null,
    };
  },
  watch: {
    getCurrency() {
      Api.get("products/top-selling-products").then((response) => {
        this.topSelling = response.data.top_selling;
      })
    },
  }
}
</script>
