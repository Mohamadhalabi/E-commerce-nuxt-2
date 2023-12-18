<template>
  <pv-collection
    :isIndexPage ="true"
    :products="latestProducts2"
    :collectionTitle="$t('home.latestProducts')"
  />
</template>
<script>
import getProducts, {productsQueries} from "~/utils/service";
import PvCollection from "~/components/product/card/PvCollection.vue";

export default {
  components: {
    PvCollection
  },
  async fetch() {
    this.latestProducts2 = await getProducts(productsQueries.latest_products, 12);
  },
  props: {
    isIndexPage: Boolean,
    collectionTitle: String,
  },
  data: function () {
    return {
      latestProducts2: null,
    };
  },
}
</script>
