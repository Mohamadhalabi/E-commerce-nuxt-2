<template>
  <div class="order-content">
    <div class="row">
      <div class="col-lg-9">
        <h3 class="account-sub-title  d-md-block mt-0 pt-1 ml-1">
          <i class="orange-1 icon-bag-2 cart-empty align-middle mx-2 pr-1" />
          {{
            $t("cart.shipping_cart")
          }}
        </h3>
      </div>
      <div class="col-lg-3 float-right" v-if="cartList.length > 0">
        <base-button-icon1
          class="py-2 float-right w-75 checkout-button"
          @click="
              $router.push(
                `/checkout${
                  dataForm.coupon_code
                    ? `?coupon_code=${dataForm.coupon_code}`
                    : ''
                }`
              )
            "
          type="button"
          :outline="true"
        >
          {{ $t("checkout.checkoutBtn") }}</base-button-icon1
        >
      </div>
    </div>
    <div class="container">
      <div v-if="cartList.length > 0" key="noEmpty">
        <div class="">
          <div class="">
            <table class="table table-responsive table-striped table-bordered shadow" :class="{ 'text-right': getIsAr }">
              <thead>
                <tr class="bg-white text-center">
                  <th>
                    {{ $t("common.delete")}}
                  </th>
                  <th class="text-center" style="width: 25%">
                    {{ $t("cart.product") }}
                  </th>
                  <th class="text-center">
                    {{ $t("cart.Sku") }}
                  </th>
                  <th class=" text-center">
                    {{ $t("cart.price") }}
                  </th>
                  <th class="text-center">
                    {{ $t("cart.quantity") }}
                  </th>
                  <th class="text-center">
                    {{ $t("cart.Subtotal") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(product, index) in cartList"
                  :key="product.sku"
                  class="product-row"
                >
                  <td class="text-center" style="vertical-align: middle">
                    <div @click="removeFromCart({product, index})" >
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 50 50">
                        <path d="M 21 0 C 19.355469 0 18 1.355469 18 3 L 18 5 L 10.1875 5 C 10.0625 4.976563 9.9375 4.976563 9.8125 5 L 8 5 C 7.96875 5 7.9375 5 7.90625 5 C 7.355469 5.027344 6.925781 5.496094 6.953125 6.046875 C 6.980469 6.597656 7.449219 7.027344 8 7 L 9.09375 7 L 12.6875 47.5 C 12.8125 48.898438 14.003906 50 15.40625 50 L 34.59375 50 C 35.996094 50 37.1875 48.898438 37.3125 47.5 L 40.90625 7 L 42 7 C 42.359375 7.003906 42.695313 6.816406 42.878906 6.503906 C 43.058594 6.191406 43.058594 5.808594 42.878906 5.496094 C 42.695313 5.183594 42.359375 4.996094 42 5 L 32 5 L 32 3 C 32 1.355469 30.644531 0 29 0 Z M 21 2 L 29 2 C 29.5625 2 30 2.4375 30 3 L 30 5 L 20 5 L 20 3 C 20 2.4375 20.4375 2 21 2 Z M 11.09375 7 L 38.90625 7 L 35.3125 47.34375 C 35.28125 47.691406 34.910156 48 34.59375 48 L 15.40625 48 C 15.089844 48 14.71875 47.691406 14.6875 47.34375 Z M 18.90625 9.96875 C 18.863281 9.976563 18.820313 9.988281 18.78125 10 C 18.316406 10.105469 17.988281 10.523438 18 11 L 18 44 C 17.996094 44.359375 18.183594 44.695313 18.496094 44.878906 C 18.808594 45.058594 19.191406 45.058594 19.503906 44.878906 C 19.816406 44.695313 20.003906 44.359375 20 44 L 20 11 C 20.011719 10.710938 19.894531 10.433594 19.6875 10.238281 C 19.476563 10.039063 19.191406 9.941406 18.90625 9.96875 Z M 24.90625 9.96875 C 24.863281 9.976563 24.820313 9.988281 24.78125 10 C 24.316406 10.105469 23.988281 10.523438 24 11 L 24 44 C 23.996094 44.359375 24.183594 44.695313 24.496094 44.878906 C 24.808594 45.058594 25.191406 45.058594 25.503906 44.878906 C 25.816406 44.695313 26.003906 44.359375 26 44 L 26 11 C 26.011719 10.710938 25.894531 10.433594 25.6875 10.238281 C 25.476563 10.039063 25.191406 9.941406 24.90625 9.96875 Z M 30.90625 9.96875 C 30.863281 9.976563 30.820313 9.988281 30.78125 10 C 30.316406 10.105469 29.988281 10.523438 30 11 L 30 44 C 29.996094 44.359375 30.183594 44.695313 30.496094 44.878906 C 30.808594 45.058594 31.191406 45.058594 31.503906 44.878906 C 31.816406 44.695313 32.003906 44.359375 32 44 L 32 11 C 32.011719 10.710938 31.894531 10.433594 31.6875 10.238281 C 31.476563 10.039063 31.191406 9.941406 30.90625 9.96875 Z"></path>
                      </svg>
                    </div>
                  </td>
                  <td style="vertical-align: middle!important;">
                    <div class="row">
                      <div class="col-xl-4 col-lg-4 col-md-9 col-sm-9 m-auto col-12 m-auto">
                        <figure class="product-image-container position-relative product-cart-image-container"
                        >
                          <div class="position-relative">
                            <nuxt-link
                              :to="getLink('/products/'+product.slug)"
                            >
                              <pv-gallery-image
                                :key="product.gallery[0].m.id"
                                :image="product.gallery[0]"
                                class="m-auto cart-image"
                                width="80"
                                height="80"
                              />
                            </nuxt-link>
                          </div>
                        </figure>
                      </div>
                      <div class="col-xl-8 col-lg-8 col-md-12 text-center text-lg-left mt-auto mb-auto text-left ml-auto mr-auto">
                        <p class="product-title px-2 m-0 text-xl-left text-center font-weight-bold">
                          <nuxt-link :to="getLink('/products/'+product.slug)">
                            {{ product.short_title }}
                          </nuxt-link>
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="sku-color text-center" style="vertical-align: middle">
                    {{ product.sku }}
                  </td>

                  <td class="text-center font-weight-bold" style="vertical-align: middle;color:red">
                    {{ product.price.currency + product.price.value }}
                  </td>

                  <td class="text-center" style="vertical-align: middle">
                    <pv-quantity-input
                      :qty="product.quantity"
                      :product="product"
                      @changeQty="changeQuantity"
                    />
                  </td>

                  <td class="text-center font-weight-bold" style="vertical-align: middle;color:red">
                    <span class="subtotal-price">
                      {{
                        product.price.currency +
                        (product.price.value * product.quantity).toFixed(2)
                      }}
                    </span>
                  </td>
                </tr>
              <tr>
                <td class="bg-white border-0"></td>
                <td class="bg-white border-0"></td>
                <td class="bg-white border-0"></td>
                <td class="bg-white border-0"></td>
                <td class="text-center font-weight-bold" style="vertical-align: middle">{{ $t("checkout.total") }}</td>
                <td class="text-center" style="vertical-align: middle">
                  <h4 class="total-price price-color m-0">
                    {{ cartCurrency + cartPaymentPrice }}
                  </h4>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div v-else class="box-content">
        <table
          class="table-cart"
          data-pagination="no"
          data-per-page="5"
          data-page="1"
          data-id
          data-token
        >
          <thead class="d-none">
            <tr>
              <th class="product-thumbnail" />

              <th class="product-name">
                <span class="nobr">{{ $t("checkout.products") }}</span>
              </th>

              <th class="product-price">
                <span class="nobr">price</span>
              </th>

              <th class="product-stock-status">
                <span class="nobr">Stock status</span>
              </th>

              <th class="product-add-to-cart">
                <span class="nobr">Actions</span>
              </th>
            </tr>
          </thead>

          <tbody class="cart-items-wrapper">

            <tr class="border-0 py-0">
              <td colspan="6" class="px-3 py-2 text-center cart-empty">
               {{ $t('common.Noproductsaddedtothecart') }}
              </td>
            </tr>
            <tr class="border-0 py-0">
              <td colspan="6" class="px-3 text-center">

                <nuxt-link
                  :to="getLink('/shop')"
                >
                  <base-button-icon1 style="width: 150px;" :outline="true" class="py-4">{{ $t("cart.GoShop") }}</base-button-icon1>
                </nuxt-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PvGalleryImage from "~/components/product/partials/PvGalleryImage";
import PvQuantityInput from "~/components/features/PvQuantityInput";
import BaseButtonIcon1 from "../common/BaseButtonIcon1.vue";
export default {
  components: {
    PvGalleryImage,
    PvQuantityInput,
    BaseButtonIcon1,
  },
  data() {
    return {
      dataForm: {
        address: "",
        payment_method: "stripe",
        card_name: "",
        card_id: "",
        card_exp_month: "",
        card_exp_year: "",
        card_cvc: "",
        coupon_code: "",
        shipping_method: "ups",
      },
    };
  },
  created() {
    this.getCartList();
  },
  beforeCreate() {
  },
  head() {
    return {
      titleTemplate: JSON.parse(this.$settings.seo.meta_title)[this.$i18n.locale],
      title: JSON.parse(this.$settings.seo.meta_title)[this.$i18n.locale],
    }
  },
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
    ...mapGetters("language", ["getLang"]),
    ...mapGetters("shop", [
      "cartCount",
      "cartList",
      "cartProductsPrice",
      "cartCurrency",
      "cartTotalDiscount",
      "cartPaymentPrice",
    ]),
  },
  methods: {
    ...mapActions("shop", ["removeFromCart", "getCartList", "changeQuantity"]),
    getLink(route) {
      if (this.getLang === 'en') {
        return route; // Return the route as is without the language parameter
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    },
  },
};
</script>
<style>
.cart-image{
  mix-blend-mode: multiply;
}
.cart-table{
  display: table;
}
@media screen and (max-width: 992px) {
  .checkout-button {
    width: 25% !important;
  }
}
.remove-button{
  color: #3e3e3e;
  cursor: pointer;
  font-size: 20px;
  transition: 0.5s;
}
.remove-button:hover{
  color: #212121;
}
</style>
