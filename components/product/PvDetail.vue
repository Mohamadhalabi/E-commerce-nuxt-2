<template>
  <div>
    <!-- Product H1 Title  -->
    <div class="d-none d-md-flex d-lg-flex title-prev-next-products">
      <h1 class="product-title">
        {{ product.title }}
      </h1>
      <!-- Next And Previous Products  -->
      <div>
        <pv-product-nav
          v-if="isProductNav"
          :prev-product="prevProduct"
          :next-product="nextProduct"
        ></pv-product-nav>
      </div>
    </div>
    <!-- Product Summary Name  -->
    <div v-if="product.summary_name != product.title" class="product-desc">
      <h2 class="summary-name" style="font-size: 18px">{{ product.summary_name }}</h2>
    </div>
    <!-- Product Note  -->
    <div v-if="product.note" class="pb-4">
      <span class="product_note">* {{ product.note }}</span>
    </div>
    <hr>
    <!-- Product Reviews  -->
    <pv-rating :product="product" :hide-reviews="false"/>
    <!-- Product Details  -->
    <div class="row">
      <div class="col">
        <div v-if="product.categories[0].slug == 'pin-code-offline' ||  (product.categories[0].slug == 'Online-Services' && product.price.value != 0 )">
          <pv-price-box class="" :product="product" />
        </div>
        <pv-price-box :productPage="true" v-if="product.hide_price == 0" :product="product"/>
        <div v-else class="d-flex">
          <img src="/images/icons/whatsapp-logo.svg" @click="goToWhatsApp(product)" width="20px" />
          <span
          class="d-inline-block p-2 font-weight-bold"
          @click="goToWhatsApp(product)"
          style="position: relative; color: #f52020; cursor: pointer;font-size: 14px"
          >
          To order this product, please click on the WhatsApp icon and contact us.
        </span>
      </div>
      <div
      class="mt-1"
      v-if="product.discount && product.offers && product.discount.until && product.stock">
      <span class="daily-deal-title font-weight-bold">{{ $t("products.discountEndsIn") }}:</span>
        <pv-count-down
          class="product-countdown countdown-compact m-"
          :until="product.discount.until"
          :label-short="true"
        />
      </div>

      <ul class="m-0">
        <li class="sku-color mt-1">
          {{ $t("products.sku") }}: {{ product.sku }}
        </li>

        <li class="mt-1">
          {{ $t("products.category") }}:
          <strong>
            <i>
              <a
                :href="getLink('https://www.tlkeys.com/'+product.categories[product.categories.length - 1].slug)"
              >
                <strong>
                  <div
                    :class="{ 'text-right': getIsAr }" class="d-inline-flex">
                    {{ product.categories[product.categories.length - 1].name }}
                  </div>
                </strong>
              </a>
            </i>
          </strong>
        </li>

        <li v-if="models" class="mt-1">
          {{ $t("products.cars") }}:
          <span v-for="(model, index) in models.split(',')">
          <a
            :href="getLink('https://www.tlkeys.com/' + model.trim().toLowerCase().replace(/\s+/g, '-'))"
            :key="index"
          >
            <strong>
              <i>
                {{ model.trim() }}
              </i>
            </strong>
          </a>
          <span v-if="index < models.split(',').length - 1">, </span>
        </span>
        </li>
        <li v-if="product.specifications.manufacturer" class="mt-1">
          {{ $t("products.MANUFACTURER") }}:
          <a :href="getLink('https://www.tlkeys.com/' + product.specifications.manufacturer.toLowerCase().replace(/\s+/g, '-'))">
            <strong>
            <i>
              {{ product.specifications.manufacturer }}
            </i>
          </strong>
          </a>
          <span v-for="(other_man,index) in product.specifications.other_manufacturers.toString().split(',')">
            <nuxt-link
              :to="getLink('/' + other_man.trim().toLowerCase().replace(/\s+/g, '-'))"
              :key="index"
            >
              <strong>
                <i>
                  {{ other_man.replace(/-/g, '') }}
                </i>
              </strong>
            </nuxt-link>
          </span>
        </li>
      </ul>
      </div>
      </div>
      <!-- Add to Cart and Buy More Pay Less (Vertical Stack) -->

      <div class="row add-to-cart">
        <div class="col-lg-6">
          <div class="product-action" v-if="!product.has_token_input || product.specifications.manufacturer === 'TMPRO'" data-nosnippet>
            <div class="product-single-qty mb-3">
              <div
                v-if="product.hide_price == 0"
                class="input-group w-100 bootstrap-touchspin bootstrap-touchspin-injected justify-content-center"
              >
                <span>
                  Quantity :
                  <button
                    class="quantity-button"
                    type="button"
                    aria-label="minus"
                    :disabled="product.hide_price != '0'"
                    @click="minusQty"
                    :style="getIsAr ? 'border-radius: 0px 6px 6px 0px' : 'border-radius:6px 0px 0px 6px ;'"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 96 960 960" width="18">
                      <path d="M200 606v-60h560v60H200Z" />
                    </svg>
                  </button>
                </span>

                <input
                  v-model.number="qty"
                  class="horizontal-quantity form-control bg-transparent text-center"
                  type="text"
                  aria-label="quantity"
                  :max="product.stock"
                  :min="qty"
                  :disabled="product.hide_price != '0'"
                  @change="changeQty($event)"
                />

                <span class="input-group-btn input-group-append">
                  <button
                    :style="getIsAr ? 'border-radius:6px 0px 0px 6px' : 'border-radius:0px 6px 6px 0px !important;'"
                    class="quantity-button"
                    type="button"
                    aria-label="plus"
                    :disabled="product.hide_price != '0'"
                    @click="plusQty"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 96 960 960" width="18">
                      <path d="M450 856V606H200v-60h250V296h60v250h250v60H510v250h-60Z" />
                    </svg>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div v-if="product.offers && product.offers.length > 0">
            <!-- <h5 class="text-center font-weight-bold mb-2">{{ $t("common.buyMorePayLess") }}</h5> -->
            <div id="product-offers-content" class="text-center">
              <pv-offers :product="product" />
            </div>
          </div>
        </div>
        <div v-if="!product.has_token_input">
            <div class="product-custom-buttons mb-lg-2" v-if="product.hide_price == 0">
            <!-- <base-button-icon-1
              @click="product.quantity = qty; AddProductToCart(product);"
              :outline="true"
              style="width: 200px;background:#f4b700;border: 1px solid orange;"
              class="mx-2 py-2">

              <svg id='E_Commerce_Buy_48' class="pt-2" width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><rect width='48' height='48' stroke='none' fill='#000000' opacity='0'/>
              <g transform="matrix(1.83 0 0 1.83 24 24)" >
              <g style="" >
              <g transform="matrix(1 0 0 1 -6 -2.75)" >
              <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" translate(-6, -9.25)" d="M 6 8.5 L 5.5 8.5 C 5.361928812542302 8.5 5.25 8.6119288125423 5.25 8.75 L 5.25 9.75 C 5.25 9.8880711874577 5.361928812542302 10 5.5 10 L 6 10 C 6.414213562373095 10 6.75 9.664213562373096 6.75 9.25 C 6.75 8.835786437626904 6.414213562373095 8.5 6 8.5 Z" stroke-linecap="round" />
              </g>
              <g transform="matrix(1 0 0 1 -6 -5.75)" >
              <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" translate(-6, -6.25)" d="M 6 5.5 L 5.5 5.5 C 5.361928812542302 5.5 5.25 5.611928812542302 5.25 5.75 L 5.25 6.75 C 5.25 6.888071187457698 5.361928812542302 7 5.5 7 L 6 7 C 6.414213562373095 7 6.75 6.664213562373095 6.75 6.25 C 6.75 5.835786437626905 6.414213562373095 5.5 6 5.5 Z" stroke-linecap="round" />
              </g>
              <g transform="matrix(1 0 0 1 0 -4.25)" >
              <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" translate(-12, -7.75)" d="M 14 12.76 C 14.375796382812945 12.381960602196166 14.886955415349147 12.16957762388887 15.42 12.17 L 15.5 12.17 C 15.760688123612614 12.169991424704934 16.018863485668913 12.220947088268677 16.26 12.32 L 19.770000000000003 13.77 C 19.831772174231762 13.789887021875213 19.898227825768245 13.789887021875213 19.960000000000004 13.77 C 22.84026194068293 12.597115045399189 24.48620284690223 9.548366489368126 23.886613810356852 6.496799522885153 C 23.287024773811474 3.44523255640218 20.60991176234979 1.245901942663071 17.5 1.25 L 6.5 1.25 C 2.9101491260998427 1.25 0 4.160149126099842 0 7.75 C 0 11.339850873900158 2.9101491260998427 14.25 6.5 14.25 L 13.17 14.25 C 13.233666581796562 14.252708138363879 13.29579646691616 14.229985122487706 13.34269304716558 14.186840268658239 C 13.389589627415 14.143695414828773 13.417402397977462 14.083671187477453 13.42 14.02 C 13.45683607697748 13.544258790551039 13.662549868910405 13.097363311524337 14 12.76 Z M 15.75 4.76 C 15.75 4.345786437626905 16.085786437626904 4.01 16.5 4.01 C 16.914213562373096 4.01 17.25 4.345786437626905 17.25 4.76 L 17.25 6.26 C 17.25 6.950355937288491 17.80964406271151 7.51 18.5 7.51 C 19.19035593728849 7.51 19.75 6.950355937288491 19.75 6.26 L 19.75 4.75 C 19.75 4.335786437626905 20.085786437626904 4 20.5 4 C 20.914213562373096 4 21.25 4.335786437626905 21.25 4.75 L 21.25 6.25 C 21.24934668537048 7.413538937220923 20.516495613700762 8.450743459420146 19.42 8.84 C 19.319182977372833 8.87718385641929 19.251627215426755 8.97255669681375 19.25 9.08 L 19.25 10.75 C 19.25 11.164213562373096 18.914213562373096 11.5 18.5 11.5 C 18.085786437626904 11.5 17.75 11.164213562373096 17.75 10.75 L 17.75 9.08 C 17.748372784573245 8.97255669681375 17.680817022627167 8.87718385641929 17.58 8.84 C 16.483504386299238 8.450743459420146 15.750653314629519 7.413538937220923 15.749999999999998 6.25 Z M 8.25 9.26 C 8.24449446274174 10.498733662115054 7.238745896642159 11.500012234587524 6 11.5 L 4.5 11.5 C 4.088037936375392 11.4946141876919 3.7553858123081003 11.161962063624609 3.75 10.75 L 3.75 4.75 C 3.7553858123081003 4.338037936375392 4.088037936375391 4.0053858123081 4.5 4 L 6 4 C 6.852237131521237 4 7.631329147943627 4.481505346512728 8.01246117974981 5.243769410125094 C 8.393593211555993 6.006033473737459 8.311342278912742 6.918210294783011 7.800000000000001 7.6 C 7.729799919935936 7.6876798718974975 7.729799919935936 7.812320128102502 7.8 7.8999999999999995 C 8.091455589892501 8.289803611463714 8.249282305035772 8.763283756893527 8.25 9.25 Z M 9.85 9.209999999999999 L 9.85 4.7 C 9.85 4.285786437626905 10.185786437626904 3.95 10.6 3.95 C 11.014213562373095 3.95 11.35 4.285786437626905 11.35 4.7 L 11.35 9.2 C 11.35 9.614213562373095 11.685786437626904 9.95 12.1 9.95 C 12.514213562373095 9.95 12.85 9.614213562373095 12.85 9.2 L 12.85 4.7 C 12.85 4.285786437626905 13.185786437626904 3.95 13.6 3.95 C 14.014213562373095 3.95 14.35 4.285786437626905 14.35 4.7 L 14.35 9.2 C 14.35 10.442640687119285 13.342640687119285 11.45 12.1 11.45 C 10.857359312880714 11.45 9.85 10.442640687119285 9.85 9.2 Z" stroke-linecap="round" />
              </g>
              <g transform="matrix(1 0 0 1 7.44 6.23)" >
              <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" translate(-19.44, -18.23)" d="M 22.29 22.46 C 22.477766599905557 22.6493126508231 22.73336246362944 22.755798324341672 23 22.755798324341672 C 23.26663753637056 22.755798324341672 23.522233400094443 22.6493126508231 23.71 22.46 C 23.8993126508231 22.272233400094443 24.005798324341672 22.01663753637056 24.005798324341672 21.75 C 24.005798324341672 21.48336246362944 23.8993126508231 21.227766599905554 23.71 21.04 L 20.71 18.09 C 20.653264994978503 18.027761734840166 20.627556953237278 17.94329245483329 20.64 17.86 C 20.657047048314446 17.7788331763599 20.713237837918896 17.711404228834557 20.79 17.68 L 21.869999999999997 17.22 C 22.05106742683005 17.138195491359703 22.168142422804415 16.958680497532338 22.169999999999998 16.759999999999998 C 22.174693495982478 16.5564355419161 22.05044095622848 16.372060805506944 21.86 16.299999999999997 L 15.57 13.709999999999997 C 15.507458951030399 13.695832712369251 15.4425410489696 13.695832712369251 15.38 13.709999999999997 C 15.247396139588986 13.708383452440689 15.120280334809479 13.76286165448905 15.030000000000001 13.859999999999998 C 14.880581965816688 13.99736664151506 14.836222642271169 14.215130593465796 14.920000000000002 14.399999999999999 L 17.51 20.689999999999998 C 17.58541896008677 20.891455613011495 17.78565572431473 21.018136014870002 18 21 L 18 21 C 18.19868049753234 20.998142422804417 18.378195491359705 20.88106742683005 18.46 20.7 L 18.92 19.619999999999997 C 18.95140422883456 19.543237837918895 19.0188331763599 19.487047048314444 19.1 19.47 C 19.183292454833293 19.457556953237276 19.267761734840168 19.4832649949785 19.330000000000002 19.54 Z" stroke-linecap="round" />
              </g>
              </g>
              </g>
              </svg>
              
              Buy Now
            </base-button-icon-1>  -->
             <base-button-icon-1
              v-if="product.hide_price == 0"
              @click="product.quantity = qty; AddProductToCart(product);"
              :outline="true"
              style="width: 200px;"
              class="mx-2 py-2">
              <svg id="Fast_Cart_32" width="32" height="32" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <rect width="48" height="48" stroke="none" fill="#000000" opacity="0"/>
                <g transform="matrix(1 0 0 1 24 24)">
                  <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" translate(-23.99, -24)" d="M 3.5 6 C 2.9590461251336433 5.992349565681768 2.4558779531425827 6.2765629442539925 2.1831684177702146 6.743809274571492 C 1.9104588823978466 7.211055604888992 1.9104588823978463 7.788944395111007 2.183168417770214 8.256190725428507 C 2.4558779531425827 8.723437055746007 2.959046125133643 9.007650434318231 3.4999999999999996 9 L 6.2558594 9 C 6.9837923 9 7.5905865 9.5029243 7.7285156 10.21875 L 8.0234375 11.765625 C 8.0242629 11.770214 8.0245217 11.774711 8.0253906 11.779297 L 8.8300781 16 L 11.884766 16 L 11.3125 13 L 42.6875 13 L 39.800781 28.154297 C 39.487781 29.803297 38.040328 31 36.361328 31 L 17.638672 31 C 15.960672 31 14.512219 29.803297 14.199219 28.154297 L 14.169922 28 L 11.115234 28 L 11.253906 28.716797 C 11.836906 31.777797 14.522672 34 17.638672 34 L 36.361328 34 C 39.479328 34 42.165047 31.777797 42.748047 28.716797 L 45.974609 11.779297 C 46.057609 11.341297 45.94025 10.888922 45.65625 10.544922 C 45.37125 10.199922 44.947 10 44.5 10 L 10.740234 10 L 10.675781 9.6582031 C 10.272657 7.5455321 8.4069705 6 6.2558594 6 L 3.5 6 z M 3.5 18 C 2.9590461251336433 17.992349565681767 2.4558779531425827 18.276562944253993 2.1831684177702146 18.743809274571493 C 1.9104588823978466 19.211055604888994 1.9104588823978463 19.788944395111006 2.183168417770214 20.256190725428507 C 2.4558779531425827 20.723437055746007 2.959046125133643 21.007650434318233 3.4999999999999996 21 L 16.5 21 C 17.040953874866357 21.007650434318233 17.544122046857417 20.723437055746007 17.816831582229785 20.256190725428507 C 18.089541117602153 19.788944395111006 18.089541117602153 19.211055604888994 17.816831582229785 18.743809274571493 C 17.544122046857417 18.276562944253993 17.040953874866357 17.992349565681767 16.5 18 L 3.5 18 z M 5.5 23 C 4.959046125133644 22.992349565681767 4.455877953142583 23.276562944253993 4.183168417770215 23.743809274571493 C 3.9104588823978466 24.211055604888994 3.9104588823978466 24.788944395111006 4.183168417770214 25.256190725428507 C 4.455877953142583 25.723437055746007 4.959046125133643 26.007650434318233 5.499999999999999 26 L 18.5 26 C 19.040953874866357 26.007650434318233 19.544122046857417 25.723437055746007 19.816831582229785 25.256190725428507 C 20.089541117602153 24.788944395111006 20.089541117602153 24.211055604888994 19.816831582229785 23.743809274571493 C 19.544122046857417 23.276562944253993 19.040953874866357 22.992349565681767 18.5 23 L 5.5 23 z M 20 36 C 18.34314575050762 36 17 37.34314575050762 17 39 C 17 40.65685424949238 18.34314575050762 42 20 42 C 21.65685424949238 42 23 40.65685424949238 23 39 C 23 37.34314575050762 21.65685424949238 36 20 36 z M 34 36 C 32.34314575050762 36 31 37.34314575050762 31 39 C 31 40.65685424949238 32.34314575050762 42 34 42 C 35.65685424949238 42 37 40.65685424949238 37 39 C 37 37.34314575050762 35.65685424949238 36 34 36 z" stroke-linecap="round" />
                </g>
              </svg>
              {{ $t("products.addCart") }}
            </base-button-icon-1>            
            </div>

            <div v-else class="d-flex justify-content-center align-items-center mb-3">
              <img src="/images/whatsapp-button.png" width="200px" @click="goToWhatsApp(product)" />
            </div>
        </div>
      </div>

    <!-- <div v-if="product.has_cover">
      <AutoComplate
        v-model="selectedBrand"
        placeholder="Please Select a brand for the cover"
        :options="selectBrands"
        @setValue="
            $event
              ? (selectedBrand = $event.name)
              : (selectedBrand = null)
          "
      />
    </div> -->

    <div v-if="ProductStatus !== null && ProductSKU === product.sku">
      <div class="alert alert-danger" role="alert" v-html="ProductStatus" />
    </div>
    <PvInputToken
      :product="product"
      v-if="product.has_token_input && !product.hide_price"/>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import AutoComplate from "~/components/common/AutoComplate.vue";

export default {
  components: {
    AutoComplate,
    PvRating: () => import ("~/components/product/partials/PvRating.vue"),
    PvPriceBox: () => import ("~/components/product/partials/PvPriceBox.vue"),
    PvProductNav: () => import ("~/components/product/partials/PvProductNav.vue"),
    PvWishlistButton: () => import ("~/components/product/partials/PvWishlistButton.vue"),
    PvInputToken: () => import("~/components/product/partials/PvInputToken.vue"),
    PvCountDown: () => import("~/components/product/partials/PvCountDown.vue"),
    BaseButtonIcon1: () => import("../common/BaseButtonIcon1.vue"),
    PvOffers: () => import("./tabs/PvOffers.vue"),
    PvCompareButton: () => import("./partials/PvCompareButton.vue"),
  },
  props: {
    product: Object,
    prevProduct: Object,
    nextProduct: Object,
    isProductNav: {
      type: Boolean,
      default: true,
    },
  },
  data: function () {
    return {
      qty: 1,
      models: null,
      showDismissibleAlert: true,
      minPurchaseQty:0,
      selectBrands: [],
      selectedBrand: null,
    };
  },
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
    ...mapGetters("language", ["getLang"]),
    ...mapGetters("shop", ["ProductStatus"]),
    ...mapGetters("shop", ["ProductSKU"]),

  },
  mounted() {
    this.qty = this.product.min_purchase_qty
    this.minPurchaseQty = this.product.min_purchase_qty;
    let dataModels = [];
    for (const item of this.product.brands) {
      if (!dataModels.some(model => model.value === item.brand)) {
        dataModels.push({ name: item.brand, value: item.brand });
      }
    }
    if (dataModels.length > 0) {
      this.models = dataModels.map(model => model.value).join(',');
    } else {
      this.models = null;
    }
    this.selectBrands = dataModels;
  },
  methods: {
    ...mapActions("shop", ["addToCart"]),
    ...mapActions("compare", ["fetchList", "addToList"]),

    AddProductToCart(product){
      if(this.selectedBrand == null && this.product.has_cover){
        this.$notify({
          group: 'errorMessage',
          type: 'error',
          text:  this.$t("alerts.chooseCover"),
        });
      }
      else{
        product["cover_model"] = this.selectedBrand;
        this.addToCart(product)
      }
    },

    getLink(route) {
      if (this.getLang === 'en') {
        return route;
      } else {
        return `/${this.getLang}${route}`;
      }
    },
    handleWhatsAppClick(product) {
      this.goToWhatsApp(product);
    },

    goToWhatsApp() {
      if(this.product.id == 6822){
        window.open(
        `https://api.whatsapp.com/send?phone=+905531468475&text=Could I have more details about the product ${this.product.title}`,
        "_blank"
        );     
      }
      else{
        window.open(
        `https://api.whatsapp.com/send?phone=${this.$settings.contact.whatsapp}&text=Could I have more details about the product ${this.product.title}`,
        "_blank"
        );
      }
    },

    plusQty: function () {
        this.qty++;
    },
    minusQty: function () {
      if (this.qty > this.minPurchaseQty)
        this.qty--;
    },
    changeQty(e) {
      if(this.qty < this.minPurchaseQty){
        this.qty = this.minPurchaseQty
      }
    },
  },
};
</script>
<style>
.summary-name{
  font-size: 18px;
  font-weight: bold;
  color: #556b2f; 
  letter-spacing: -.01em;
  line-height: 30px;
  width: calc( 100% - 70px );
}
.product_note{
  font-size:18px;
  color:#f52020;
  font-weight: bold;
}
.title-prev-next-products{
  flex-direction: row;
}

@media screen and (max-width: 993px){
  .title-prev-next-products{
    flex-direction: column-reverse;
  }
}
</style>