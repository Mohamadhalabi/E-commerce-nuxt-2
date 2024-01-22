<template>
  <pv-collection
    :isIndexPage ="true"
    :products="bestSellingProducts2"
    :collectionTitle="$t('home.bestSellingProducts')"
    :link="link"
  />
</template>
<script>
import getProducts, {productsQueries} from "~/utils/service";
import {mapGetters} from "vuex";
import PvCollection from "~/components/product/card/PvCollection.vue";
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
    link:String,
  },
  data: function () {
    return {
      bestSellingProducts2: null,
    };
  },
  watch: {
    getCurrency() {
      getProducts(productsQueries.latest_products, 12).then((response) => {
        this.bestSellingProducts2 = response;
      })
    },
  }
}
</script>
