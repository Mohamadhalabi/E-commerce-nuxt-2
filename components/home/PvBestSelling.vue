<template>
  <pv-collection
    :isIndexPage ="true"
    :products="bestSellingProducts2"
    :collectionTitle="$t('home.bestSellingProducts')"
  />
</template>
<script>
import getProducts, {productsQueries} from "~/utils/service";
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
    this.bestSellingProducts2 = await getProducts(productsQueries.best_selling_products, 12);
  },
  props: {
    isIndexPage: Boolean,
    collectionTitle: String,
  },
  data: function () {
    return {
      bestSellingProducts2: null,
    };
  },
  watch: {
    getCurrency(newValue, oldValue) {
      getProducts(productsQueries.latest_products, 12).then((response) => {
        this.bestSellingProducts2 = response;
      })
    },
  }
}
</script>
