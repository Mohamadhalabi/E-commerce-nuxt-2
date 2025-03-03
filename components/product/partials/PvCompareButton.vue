<template>
  <nuxt-link
    v-if="isComparedList"
    to="/compares"
    class="d-flex"
    :title="$t('products.goToCompare')"

  >
  <img src="/images/icons/shuffle.svg" alt="wishlist" />
  <span style="margin-top: 4px;">{{
      $t("products.goToCompare")
    }}</span>
  </nuxt-link>

  <a
  v-else
  href="javascript:;"
  class="btn-icon-wish d-flex"
  :title="$t('products.addCompare')"
  @click="addToList(product)"
  >
  <img src="/images/icons/shuffle.svg" alt="wishlist" />
  <span style="margin-top: 4px;">{{
      $t("products.addCompare")
    }}</span>
  </a>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    product: Object,
    parent: String,
  },
  computed: {
    ...mapGetters("compare", ["getList"]),
    isComparedList: function () {
       if (
        this.getList.findIndex(
          (item) => item.sku === this.product.sku
        ) > -1
      )
        return true;
      return false;
    },
  },

  methods: {
    ...mapActions("compare", ["addToList", "fetchList"])
  }
};
</script>

<style scoped>
.red{
    color: #da5555;
}
span{
    font-size: 1.2rem;
      font-weight: 700;
      text-transform: uppercase;
}
.fa{
    font-size: 1.4rem;
}
</style>
