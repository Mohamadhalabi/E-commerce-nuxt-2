  <template>
  <div class="container">
    <div class="my-5">
      <nav aria-label="breadcrumb" class="breadcrumb-nav">
        <div class="container">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <nuxt-link
                :to="getLink('/')">
                {{ $t("wishlist.home") }}
              </nuxt-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {{ $t("dashboard.cart") }}
            </li>
          </ol>
        </div>
      </nav>
    </div>
    <client-only>
      <pv-free-shipping-amount></pv-free-shipping-amount>
    </client-only>
    <div
      v-if="cartList.length > 0"
      key="noEmpty"
      class="row account-container">
      <div class="col-lg-8">
        <div class="table-responsive-sm">
          <table class="table table-bordered table-striped mt-0 mb-1"
                :class="{'text-right': getIsAr}">
            <thead class="thead-dark">
              <tr class="text-center bg-white vertical-align-middle">
                <th style="width: 10%">
                  {{ $t("cart.delete") }}
                </th>
                <th style="width: 30%">
                  {{ $t("cart.product") }}
                </th>
                <th style="width: 20%">
                  {{ $t("cart.price") }}
                </th>
                <th style="width: 20%" class="qty-col text-center">
                  {{ $t("cart.quantity") }}
                </th>
                <th style="width: 20%">
                  {{ $t("cart.Total") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(product, index) in cartList"
                :key="product.sku" :class="{ out_of_stock_class: outOfStockList.includes(product.sku) }">
                <td class="text-center vertical-align-middle" :class="{ border_top_red: outOfStockList.includes(product.sku) }">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 50 50">
                    <path d="M 21 0 C 19.355469 0 18 1.355469 18 3 L 18 5 L 10.1875 5 C 10.0625 4.976563 9.9375 4.976563 9.8125 5 L 8 5 C 7.96875 5 7.9375 5 7.90625 5 C 7.355469 5.027344 6.925781 5.496094 6.953125 6.046875 C 6.980469 6.597656 7.449219 7.027344 8 7 L 9.09375 7 L 12.6875 47.5 C 12.8125 48.898438 14.003906 50 15.40625 50 L 34.59375 50 C 35.996094 50 37.1875 48.898438 37.3125 47.5 L 40.90625 7 L 42 7 C 42.359375 7.003906 42.695313 6.816406 42.878906 6.503906 C 43.058594 6.191406 43.058594 5.808594 42.878906 5.496094 C 42.695313 5.183594 42.359375 4.996094 42 5 L 32 5 L 32 3 C 32 1.355469 30.644531 0 29 0 Z M 21 2 L 29 2 C 29.5625 2 30 2.4375 30 3 L 30 5 L 20 5 L 20 3 C 20 2.4375 20.4375 2 21 2 Z M 11.09375 7 L 38.90625 7 L 35.3125 47.34375 C 35.28125 47.691406 34.910156 48 34.59375 48 L 15.40625 48 C 15.089844 48 14.71875 47.691406 14.6875 47.34375 Z M 18.90625 9.96875 C 18.863281 9.976563 18.820313 9.988281 18.78125 10 C 18.316406 10.105469 17.988281 10.523438 18 11 L 18 44 C 17.996094 44.359375 18.183594 44.695313 18.496094 44.878906 C 18.808594 45.058594 19.191406 45.058594 19.503906 44.878906 C 19.816406 44.695313 20.003906 44.359375 20 44 L 20 11 C 20.011719 10.710938 19.894531 10.433594 19.6875 10.238281 C 19.476563 10.039063 19.191406 9.941406 18.90625 9.96875 Z M 24.90625 9.96875 C 24.863281 9.976563 24.820313 9.988281 24.78125 10 C 24.316406 10.105469 23.988281 10.523438 24 11 L 24 44 C 23.996094 44.359375 24.183594 44.695313 24.496094 44.878906 C 24.808594 45.058594 25.191406 45.058594 25.503906 44.878906 C 25.816406 44.695313 26.003906 44.359375 26 44 L 26 11 C 26.011719 10.710938 25.894531 10.433594 25.6875 10.238281 C 25.476563 10.039063 25.191406 9.941406 24.90625 9.96875 Z M 30.90625 9.96875 C 30.863281 9.976563 30.820313 9.988281 30.78125 10 C 30.316406 10.105469 29.988281 10.523438 30 11 L 30 44 C 29.996094 44.359375 30.183594 44.695313 30.496094 44.878906 C 30.808594 45.058594 31.191406 45.058594 31.503906 44.878906 C 31.816406 44.695313 32.003906 44.359375 32 44 L 32 11 C 32.011719 10.710938 31.894531 10.433594 31.6875 10.238281 C 31.476563 10.039063 31.191406 9.941406 30.90625 9.96875 Z"></path>
                  </svg>
                </td>
                <td class="vertical-align-middle" :class="{ border_top_red: outOfStockList.includes(product.sku) }">
                  <div class="row">
                    <div class="col-xl-4 col-lg-5 col-md-3 col-sm-12 col-12 m-auto">
                      <figure
                        class="product-image-container position-relative product-cart-image-container">
                        <div class="position-relative">
                          <nuxt-link
                            :to="getLink('/products/'+product.slug)"
                            class="product-image">
                            <img
                              class="ml-xl-2 ml-lg-2 ml-md-2 m-auto cart-image mix-blend-multiply"
                              width="100px"
                              height="100px"
                              :src="product.gallery[0]['s']['url']"
                              :alt="product.gallery[0]['l']['alt']"
                            />
                          </nuxt-link>
                        </div>
                      </figure>
                    </div>
                    <div class="col-xl-8 col-lg-7 col-md-9 col-sm-12 col-12 text-center text-md-left text-sm-left text-lg-left m-auto">
                      <span class="product-title m-auto">
                        <nuxt-link :to="getLink('/products/'+product.slug)">
                          {{ product.short_title }}
                          <div>
                            <span class="sku-color">
                          {{ $t("products.sku") }}: {{ product.sku }}</span>
                          </div>
                        </nuxt-link>
                      </span>
                    </div>
                  </div>
                </td>

                <td class="text-center font-weight-bold vertical-align-middle" style="color:red" :class="{ border_top_red: outOfStockList.includes(product.sku) }">
                  <div class="" v-if="isAuthenticated">
                    <span class="old-price mt-auto mb-auto" v-if="product.price_without_sale != product.sale_price.value">
                    </span>
                    <span>{{product.price.currency + product.sale_price.value}}</span>
                  </div>
                  <div v-else>
                    <div v-if="product.sale_price.value !='-'">
                      {{product.sale_price.value}}{{product.sale_price.currency}}
                    </div>
                    <div v-else>
                      {{product.price.value}}{{product.price.currency}}
                    </div>
                  </div>
                </td>

                <td class="text-center" style="vertical-align: middle" :class="{ border_top_red: outOfStockList.includes(product.sku) }">
                  <pv-quantity-input
                    :qty="product.quantity"
                    :has_token="product.has_token_input"
                    :product="product"
                    @changeQty="changeQuantity"
                  />
                </td>

                <td class="text-center font-weight-bold" style="vertical-align: middle" :class="{ border_top_red: outOfStockList.includes(product.sku) }">
                  <span class="subtotal-price">
                    {{
                      product.price.currency +
                      parseFloat(product.priceitem * product.quantity).toFixed(2)
                    }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
          <button
        @click="clearCart({ StateUser })"
        style="background-color: #892118;
        color: white;border-radius: 10px;
        padding: 15px"
        type="button"
        :outline="true"
        class="py-3 mb-1 font-weight-bold">
        <i style="color: white;" class="fa fa-trash remove-button"></i>
        Empty Cart
      </button>
      </div>
      <div class="col-lg-4">
        <div class="order-summary">
          <span style="border-bottom: 1px solid #ededed">{{ $t("cart.cartTotal") }}</span>
          <table class="table table-mini-cart ">
            <tbody v-if="cartList.length == 0">
              <p class="cart-empty-text ml-3">
                {{ $t("checkout.cardEmpty") }}
              </p>
            </tbody>
            <tfoot>
              <tr class="cart-subtotal">
                <td class="pt-4">
                  <span>{{ $t("checkout.subtotal") }}</span>
                </td>

                <td class="" style="vertical-align: middle;color: red;font-weight: bold;">
                  <span>{{
                    cartCurrency + cartPaymentPrice.toFixed(2)
                  }}</span>
                </td>
              </tr>
            </tfoot>
          </table>
          <span v-if="displayOutOfStock" class="text-danger lh-base">
            <i class="fa fa-exclamation-triangle"></i>
            {{ $t("cart.outOfStock") }} <span class="font-weight-bold" v-for="(outofstock,index) in outOfStockList" :key="index">
            {{outofstock}}
            </span> {{ $t("cart.notavailable") }} {{ $t('cart.weWillTry') }}
          </span>
          <base-button-icon1
            class="w-100 py-3 mt-1"
            @click="
              $router.push(
                getLink(`/checkout${
                  dataForm.coupon_code
                    ? `?coupon_code=${dataForm.coupon_code}`
                    : ''
                }`
              ))
            "
            type="button"
            v-if="isAuthenticated"
            :outline="true"
          >
            {{ $t("checkout.checkoutBtn") }}</base-button-icon1
          >

          <nuxt-link v-else
                     :to="getLink('/auth/login-register')"
          >
            <base-button-icon1 type="button" :outline="true" class="py-4 w-100">
              {{ $t("checkout.loginToGoToCheckout") }}
            </base-button-icon1>
          </nuxt-link>
        </div>
      </div>
    </div>

    <div v-else class="box-content">
      <table
        class="table-cart table-responsive"
        data-pagination="no"
        data-per-page="5"
        data-page="1"
        data-id
        data-token
        style="display: table;"
      >
        <thead class="d-none">
          <tr>
            <th class="product-thumbnail" />

            <th class="product-name">
              <span class="nobr">{{ $t("cart.products") }}</span>
            </th>

            <th class="product-price">
              <span class="nobr">{{ $t("cart.price") }}</span>
            </th>

            <th class="product-stock-status">
              <span class="nobr">{{ $t("cart.stockStatus") }}</span>
            </th>

            <th class="product-add-to-cart">
              <span class="nobr">{{ $t("cart.actions") }}</span>
            </th>
          </tr>
        </thead>

        <tbody class="cart-items-wrapper">
          <tr class="border-0 py-0">
            <td colspan="6" class="px-3 py-2 text-center">
              <i class="icon-bag-2 cart-empty" />
            </td>
          </tr>
          <tr class="border-0 py-0">
            <td colspan="6" class="px-3 py-2 text-center cart-empty">
              {{ $t("cart.NoProductsAdded") }}
            </td>
          </tr>
          <tr class="border-0 py-0">
            <td colspan="6" class="w-100 text-center">
              <base-button-icon-1
                :outline="true"
                style="width: 150px"
                class="py-4"
              >
                <nuxt-link style="color: white"
                           :to="getLink('/shop')"
                >
                  {{ $t("cart.GoShop") }}
                </nuxt-link>
              </base-button-icon-1>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    PvQuantitySelect: () => import("~/components/features/PvQuantitySelect.vue"),
    PvFreeShippingAmount:() => import("~/pages/PvFreeShippingAmount.vue"),
    PvQuantityInput: () => import("~/components/features/PvQuantityInput.vue"),
    BaseButtonIcon1: () => import("~/components/common/BaseButtonIcon1.vue"),
  },
  head() {
    return {
      title: "Cart | Techno Lock Keys Trading",
      link: [
        {
          rel: 'canonical',
          href: 'https://www.tlkeys.com/cart',
        },
      ],
      meta: [
        {
          "http-equiv": "content-language",
          content: this.$i18n.locale,
        },
        {
          name: 'description',
          content: "Shopping Cart | Techno Lock Keys Trading"
        },
        {
          name: "og:type",
          content: "website",
        },
        {
          name: "og:site_name",
          content: "Techno Lock Keys",
        },
        {
          name: "og:title",
          content: "Techno Lock Keys Trading | Automotive Locksmith Services",
        },
        {
          name: "og:description",
          content: "Techno Lock Keys provides a wide range of auto keys, remotes, diagnostics, cutting machines, programming devices, Fobs, transponder keys, and emulators"
        },
        {
          name: "og:url",
          content: "https://www.tlkeys.com/cart",
        },
        {
          name: "og:image",
          content: "https://dev-srv.tlkeys.com/storage/images/seo/og-image.jpg",
        },
        {
          name: "og:image:alt",
          content: this.$settings.seo.meta_image.l.alt,
        },
        {
          name: "og:image:height",
          content: "627",
        },
        {
          name: "og:image:width",
          content: "1200",
        },
        {
          name: "twitter:card",
          content: "summary",
        },
        {
          name: "twitter:site",
          content: `${this.$settings.social_media.twitter}`,
        },
        {
          name: "twitter:title",
          content: 'Cart | Techno Lock Keys Trading',
        },
        {
          name: "twitter:description",
          content: "Shopping Cart | Techno Lock Keys Trading"
        },
      ],
    }
  },
  data() {
    return {
      dataForm: {
        coupon_code: "",
      },
    };
  },
  computed: {
    ...mapGetters("language", ["getLang"]),
    ...mapGetters("shop", [
      "cartList",
      "cartCurrency",
      "cartPaymentPrice",
      "displayOutOfStock",
      "outOfStockList",
    ]),
    ...mapGetters("authentication", ["isAuthenticated","StateUser"]),
    ...mapGetters("rtlStore", ["getIsAr"]),
  },

  methods: {
    ...mapActions("shop", ["removeFromCart", "getCartList", "changeQuantity", "clearCart"]),
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
.free-shipping-minus-cart-total{
  color: #f8912d;
  font-weight: 600;
}
.free-shipping{
  font-size: 16px;
  color: #797979;
}
.free-shipping-span{
  font-weight: bold;
  color: black;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background-color: lightgray;
  border-radius: 5px;
  overflow: hidden;
}

.progress {
  height: 100%;
  border-radius: 5px;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(0, 0, 0, 0.2) 10px,
    rgba(0, 0, 0, 0.2) 20px
  );
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
@media screen and (max-width: 575px) {
  .cart-image {
    min-width: 100px;
  }
}
.vertical-align-middle{
  vertical-align: middle;
}
.mix-blend-multiply{
  mix-blend-mode: multiply;
}
.out_of_stock_class, .border_top_red{
  border:1px solid red!important;
}

@media screen and (max-width: 767px) {
  .table-responsive {
    border: none;
  }

  table.table {
    min-width: 700px; /* ensures scrolling on small screens */
  }
}
</style>
