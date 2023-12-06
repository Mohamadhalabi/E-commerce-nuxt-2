<template>
  <pv-collection
    :isIndexPage ="true"
    :products="latestProducts2"
    :collectionTitle="$t('home.latestProducts')"
  />
</template>
<script>
import getProducts, {productsQueries} from "~/utils/service";

export default {
  components: {
    PvCollection: () => import("~/components/product/card/PvCollection.vue")
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
