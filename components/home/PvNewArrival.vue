<template>
  <pv-small-collection
      :products="isNewArrivalProducts"
      :collection-title="$t('home.newarrivalproducts')"
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
      const getNewArrivalProducts = await Api.get("shop?is_new_arrival=1&length=3");
      this.isNewArrivalProducts = getNewArrivalProducts.data.products;
  },
  data: function () {
    return {
      isNewArrivalProducts: null,
    };
  },
  watch: {
    getCurrency() {
      Api.get("shop?is_new_arrival=1&length=3").then((response) => {
        this.isNewArrivalProducts = response.data.products;
      })
    },
  }
}
</script>
