<template>
  <pv-collection
    :isIndexPage ="true"
    :products="bestSellingProducts2"
    :collectionTitle="$t('home.bestSellingProducts')"
  />
</template>
<script>
import getProducts, {productsQueries} from "~/utils/service";

export default {
  components: {
    PvCollection: () => import("~/components/product/card/PvCollection.vue")
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
}
</script>
