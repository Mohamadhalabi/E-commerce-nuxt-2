<template>
  <pv-collection
    :isIndexPage ="true"
    :products="topSelling"
    :collectionTitle="collectionTitle"
    :link="link"
  />
</template>
<script>
import {mapGetters} from "vuex";
import axios from "axios";
export default {
  components: {
    PvCollection : () => import("~/components/product/card/PvCollection.vue"),
  },
  computed: {
    ...mapGetters("header",["getCurrency"])
  },
  async fetch() {
        const topSellingProducts = await axios.get("products/top-selling-products2",{
          baseURL: process.env.API_BASE_URL,
          headers:{
            'Accept-Language': this.$i18n.locale,
            'Content-Type': 'application/json',
            'currency': this.$cookies.get('currency') || 'USD',
            'Accept': 'application/json',
            'secret-key': process.env.SECRET_KEY,
            'api-key': process.env.API_KEY,
          }
        });
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
}
</script>
