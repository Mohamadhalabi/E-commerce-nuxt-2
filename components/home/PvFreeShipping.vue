<template>
  <pv-small-collection
      :products="isFreeShippingProducts"
      :collection-title="$t('home.freeshoppingproducts')"
      :animation-delay="'200'"
      :link="link"
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
  props: {
    link: String,
  },
  async fetch() {
      const getFreeShippingProducts = await Api.get("shop?is_free_shipping=1&length=3");
      this.isFreeShippingProducts = getFreeShippingProducts.data.products;
  },
  data: function () {
    return {
      isFreeShippingProducts: null,
    };
  },
  watch: {
    getCurrency() {
      Api.get("shop?is_free_shipping=1&length=3").then((response) => {
        this.isFreeShippingProducts = response.data.products;
      })
    },
  }
}
</script>
