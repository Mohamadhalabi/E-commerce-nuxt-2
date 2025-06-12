<template>
  <!-- <nuxt-link
    v-if="isWishlisted"
    to="/wishlist"
    :class="{'add-wishlist': parent === 'products-detail'}"
    class="btn-icon-wish added-wishlist"
    :title="$t('products.goToWishlist')"
  >
    <img src="/images/icons/heart.svg" alt="wishlist" />
    <span v-if="parent === 'products-detail'">{{$t('products.goToWishlist')}}</span>
  </nuxt-link>

  <a
    v-else
    href="javascript:;"
    :class="{'add-wishlist': parent === 'products-detail'}"
    class="btn-icon-wish"
    :title="$t('products.addWishlist')"
    @click="addToWishlist(product)"
  >
    <img src="/images/icons/heart.svg" alt="wishlist" />
    <span class="v-if="parent === 'products-detail'">{{$t('products.addWishlist')}}</span>
  </a> -->
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
  props: {
    product: Object,
    parent: String
  },
  computed: {
    ...mapGetters('fav', ['getWishlistList']),
    isWishlisted: function() {
      if(this.getWishlistList.findIndex(item => item.sku === this.product.sku) > -1)
        return true;
      return false;
    }
  },
  created() {

  },
  methods: {
    ...mapActions('fav', ['addToWishlist' , 'fetchWishlist']),

  }
};
</script>
