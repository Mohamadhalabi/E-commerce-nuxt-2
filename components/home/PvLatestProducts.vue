<template>
  <pv-collection
    :isIndexPage ="true"
    :products="latestProducts2"
    :collectionTitle="$t('home.latestProducts')"
    :link="link"
  />
</template>
<script>
import getProducts, {productsQueries} from "~/utils/service";
import {mapGetters} from "vuex";

export default {
  components: {
    PvCollection: () => import("~/components/product/card/PvCollection.vue"),
  },
  computed: {
    ...mapGetters("header",["getCurrency"])
  },
  async fetch() {
    this.latestProducts2 = await getProducts(productsQueries.latest_products, 12);
  },
  props: {
    isIndexPage: Boolean,
    collectionTitle: String,
    link: String,
  },
  data: function () {
    return {
      latestProducts2: null,
    };
  },
  watch: {
    getCurrency() {
      getProducts(productsQueries.latest_products, 12).then((response) => {
        this.latestProducts2 = response;
      })
    },
  }
}
</script>
