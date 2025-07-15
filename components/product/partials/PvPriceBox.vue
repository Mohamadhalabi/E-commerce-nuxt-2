<template>
  <div class="price-box d-flex align-items-center">
    <!-- Discount: Fixed -->
    <template v-if="product.discount && product.discount.length !== 0">
      <span
        v-if="product.discount.type === 'fixed'"
        :class="[priceClass(product.discount.value)]"
        v-html="formatPrice(
          product.price.value - product.discount.value * product.price.exchange_rate,
          product.price.currency
        )"
      ></span>

      <!-- Discount: Percentage -->
      <span
        v-else
        :class="[priceClass(product.discount.value)]"
        v-html="formatPrice(
          product.price.value - (product.price.value * product.discount.value) / 100,
          product.price.currency
        )"
      ></span>

      <!-- Old price -->
      <span
        class="old-price"
        :class="{ highlighted: hasDuplicate(product.discount.value), '': gridPrice }"
        v-html="formatOldPrice(product.price.value, product.price.currency)"
      ></span>
    </template>

    <!-- Sale Price -->
    <template v-else-if="product.is_sale === 1 && product.price.value !== product.sale_price.value">
      <span
        :class="[priceClass(product.sale_price.value)]"
        v-html="formatPrice(product.sale_price.value, product.sale_price.currency)"
      ></span>

      <span
        class="old-price"
        :class="{ highlighted: hasDuplicate(product.price.value) }"
        v-html="formatOldPrice(product.price.value, product.price.currency)"
      ></span>
    </template>

    <!-- Regular Price -->
    <template v-else>
      <span
        :class="[
          smallProducts ? 'small-price-color' : productPage ? 'product-detail-price' : 'price-color',
          { highlighted: hasDuplicate(product.price.value), homePageSearch: homePageSearch === true }
        ]"
        v-html="formatPrice(product.price.value, product.price.currency)"
      ></span>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    product: Object,
    gridPrice: Boolean,
    highlightCommon: Boolean,
    homePageSearch: Boolean,
    additionalProductItems: Boolean,
    smallProducts: Boolean,
    productPage: Boolean,
  },
  computed: {
    ...mapGetters("compare", ["getList"]),
  },
  methods: {
    hasDuplicate(status) {
      if (this.highlightCommon) {
        const count = this.getList.filter((product) => product.is_free_shipping === status).length;
        return count >= 2;
      }
      return false;
    },
    priceClass(value) {
      return [
        this.smallProducts
          ? "small-price-color"
          : this.productPage
          ? "product-detail-price"
          : "price-color",
        "font-weight-bold",
        { highlighted: this.hasDuplicate(value) },
      ];
    },
    currencySymbol(currency) {
      if (currency === "AED") {
        return `<img src="/images/currencies/uae_currency.webp" alt="AED" style="height: 32px; display: inline-block; vertical-align: middle; margin-right: 4px;" />`;
      }
      return `${currency}`;
    },
    currencySymbolSmall(currency) {
      if (currency === "AED") {
        return `<img src="/images/currencies/uae_currency_gray.webp" alt="AED" style="height: 22px; display: inline-block; vertical-align: middle; margin-right: 4px;" />`;
      }
      return `${currency}`;
    },
    formatPrice(value, currency) {
      const formatted = Number(value).toFixed(2);
      if (currency === "AED") {
        return `${this.currencySymbol(currency)}${formatted}`;
      }
      return `${currency}${formatted}`;
    },
    formatOldPrice(value, currency) {
      const formatted = Number(value).toFixed(2);
      if (currency === "AED") {
        return `${this.currencySymbolSmall(currency)}${formatted}`;
      }
      return `${currency}${formatted}`;
    },
  },
};
</script>

<style scoped>
.highlighted {
  background-color: yellow !important;
}
.homePageSearch {
  font-size: 16px;
}
.price-box img {
  vertical-align: middle;
}
</style>