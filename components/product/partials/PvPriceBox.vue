<template>
  <div class="price-box" style="">
    <template v-if="product.is_sale==1 && (product.price.value != product.sale_price.value)">
      <span
        :class="{ 'highlighted': hasDuplicate(product.sale_price.value) }"
        class="product-price price-color font-weight-bold mt-0">
        {{ product.sale_price.currency + product.sale_price.value }}
      </span>
      <span
        v-if="!gridPrice"
        class="old-price mt-auto mb-auto"
        :class="{ 'highlighted': hasDuplicate(product.price.value) }"
      >
        {{ product.price.currency + product.price.value }}
      </span>
      <span
        v-else
        class="old-price mt-1"
        :class="{ 'highlighted': hasDuplicate(product.price.value) }"
      >
        {{ product.price.currency + product.price.value }}
      </span>
    </template>

    <template v-else>
      <span class="product-price price-color mb-2"
            :class="{ 'highlighted': hasDuplicate(product.price.value), 'homePageSearch': homePageSearch === true }"
      >
        {{ product.price.currency + product.price.value }}
      </span>
    </template>
  </div>
</template>
<script>
import { isEmpty } from "lodash";
import {mapGetters} from "vuex";

export default {
  props: {
    product: Object,
    gridPrice: Boolean,
    highlightCommon: Boolean,
    homePageSearch: Boolean,
  },
  data: function () {
    return {
      isEmpty
    };
  },
  methods:{
    hasDuplicate(status){
      if(this.highlightCommon) {
        const count = this.getList.filter(product => product.is_free_shipping === status).length;
        return count >=2 ;
      }
    },
  },
  computed:{
    ...mapGetters("compare", ["getList"]),
  }
};
</script>
<style>
.highlighted {
  background-color: yellow!important;
}
.homePageSearch{
  font-size: 16px;

}
</style>
