<template>
  <pv-small-collection
    :products="onSaleProducts"
    :collection-title="$t('home.onSaleProduct')"
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
  props:{
    link:String,
  },
  async fetch() {
    const getOnSaleProducts = await Api.get("shop?on_sale=1&length=3");
    this.onSaleProducts = getOnSaleProducts.data.products;
  },
  data: function () {
    return {
      onSaleProducts: null,
    };
  },
  watch: {
    getCurrency() {
      Api.get("shop?on_sale=1&length=3").then((response) => {
        this.onSaleProducts = response.data.products;
      })
    },
  }
}
</script>
