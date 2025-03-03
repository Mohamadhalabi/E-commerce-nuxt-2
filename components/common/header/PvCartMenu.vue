  <template>
    <div class="dropdown cart-dropdown">
      <a
        href="javascript:;"
        title="Cart"
        class="dropdown-toggle cart-toggle"
        role="button"
        @click="showCartMenu">
        <nuxt-img width="32px" height="32px" loading="lazy" src="/images/icons/cart-1.svg" alt="Cart Icon" />
        <span class="cart-count badge-circle">{{ cartCount }}</span>
      </a>
      <div class="cart-overlay" @click="hideCartMenu" />
      <div
        style="z-index: 99999!important;position: fixed"
        class="dropdown-menu mobile-cart"
        :class="{
          'left-0': getIsAr,
          'transform-reverse': getIsAr,
          'right-auto': getIsAr,
        }">
        <div class="dropdownmenu-wrapper custom-scrollbar">
          <div class="dropdown-cart-header">
            <div class="second" v-if="cartList.length > 0">
              <span class="">
                {{ $t("header.shipping_cart") }}
              </span>
            </div>
          </div>
          <template v-if="cartList && cartList.length > 0">
            <div class="dropdown-cart-products">
              <div
                v-for="(product, index) in cartList"
                :key="product.sku"
                class="product mb-1 position-relative">
                <button
                    title="Close (Esc)"
                    type="button"
                    @click="removeFromCart({ product, index })"
                    class="position-absolute close-button">
                    ×
                  </button>
                <div class="mx-1">
                  <figure>
                    <nuxt-link :to="getLink('/products/'+product.slug)">
                      <nuxt-img
                        loading="lazy"
                        width="150"
                        class="side-cart-images"
                        height="150"
                        :src="product.gallery[0]['s']['url']"
                        :alt="product.short_title">
                      </nuxt-img>
                    </nuxt-link>
                  </figure>
                </div>
                <div
                  class="product-details m-0 p-0 mx-1"
                  :class="{ 'text-right': getIsAr }">
                  <h4 class="product-title m-0 p-0" style="max-width: 75%">
                    <nuxt-link :to="getLink('/products/'+product.slug)">
                      {{ product.short_title }}
                    </nuxt-link>
                  </h4>
                    <div class="col-lg-12 sku-color mt-1"> {{$t('products.sku')}} :{{ product.sku }}</div>
                    <pv-quantity-input
                          :qty="product.quantity"
                          :has_token="product.has_token_input"
                          :product="product"
                          class="mt-1"
                          @changeQty="changeQuantity"
                      />
                      <span class="price-color p-4">
                          {{product.price.currency + parseFloat(product.priceitem * product.quantity).toFixed(2) }}
                      </span>
                  <div class="w-100 d-flex align-items-center">
                  </div>
                </div>
              </div>
            </div>
            <div :class="{'side-bar-cart-bottom-div': true, 'position-absolute': cartList.length <= 4}">
            <div class="dropdown-cart-total">
              <div>
                <span class="font-weight-bold">{{ $t("header.subtotal") }}:</span>
              </div>
              <div class="side-bar-price">
                <span class="cart-total-price mx-1">
                  {{ cartCurrency}} {{ cartPaymentPrice.toFixed(2) }}
              </span>
              </div>
            </div>
              <div class="dropdown-cart-action">
              <nuxt-link
                @click.native="hideCartMenu"
                :to="getLink('/cart')">
                <base-button-icon-1
                  class="py-3 my-1 w-100 view-cart-button"
                  :outline="true"
                  >{{ $t("header.view_cart") }}</base-button-icon-1
                >
              </nuxt-link>
              <nuxt-link
                @click.native="hideCartMenu"
                v-if="isAuthenticated" :to="getLink('/checkout')">
                <base-button-icon-1
                  class="w-100 py-3 mt-1 checkout-button"
                  :outline="true">
                  {{ $t("header.checkout") }}</base-button-icon-1>
              </nuxt-link>

              <nuxt-link
                @click.native="hideCartMenu"
                v-else :to="getLink('/auth/login-register')">
                 <base-button-icon1
                  :outline="true"
                  class="w-100 py-3 mt-1 checkout-button"
                  type="button"
                >
                  {{ $t("checkout.loginToGoToCheckout") }}
                  </base-button-icon1
                >
              </nuxt-link>
            </div>
            </div>
          </template>
          <p v-else class="cart-empty-text" :class="getIsAr ? 'text-right' : ''">
            {{ $t("header.no_product_in_cart") }}
          </p>
        </div>
      </div>
    </div>
  </template>

  <script>
  import { mapGetters, mapActions } from "vuex";
  export default {
    components: {
      PvQuantityInput: () => import("~/components/features/PvQuantityInput.vue"),
      BaseButtonIcon1: () => import("../BaseButtonIcon1.vue"),

    },
    computed: {
      ...mapGetters("authentication", ["isAuthenticated","StateUser"]),
      ...mapGetters("shop", [
        "cartCount",
        "cartList",
        "cartCurrency",
        "cartPaymentPrice",
      ]),
      ...mapGetters("rtlStore", ["getIsAr"]),
      ...mapGetters("language", ["getLang"]),
    },
    data() {
      return {
        qty: 1
      };
    },
    mounted() {
      this.getCartList();
    },
    methods: {
      ...mapActions("shop", ["removeFromCart", "getCartList", "changeQuantity","clearCart"]),
      minusQty(product) {
        if(product.quantity > 1){
          product.quantity --;
        }
      },
      changeQty(e) {
      },
      getLink(route) {
        if (this.getLang === 'en') {
          this.getLang ="";
          return route; // No need to modify route for English
        } else {
          return `/${this.getLang}${route}`; // Include the language parameter
        }
      },
      showCartMenu: function () {
        if (localStorage.getItem("tokenEnded") == 1) {
          document.querySelector("body").classList.add("cart-opened");
        } else if (this.$route.path !== "/cart")
          document.querySelector("body").classList.add("cart-opened");
      },
      hideCartMenu: function () {
        document.querySelector("body").classList.remove("cart-opened");
      },
    },
  };
  </script>
