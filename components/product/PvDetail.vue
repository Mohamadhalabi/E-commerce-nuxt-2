<template>
  <div>
    <!-- Product H1 Title  -->
    <div class="d-flex title-prev-next-products">
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
      <h2 class="summary-name">{{ product.summary_name }}</h2>
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
          <pv-price-box class="mb-2" :product="product" />
        </div>
        <pv-price-box class="mb-2" v-if="product.hide_price == 0" :product="product"/>
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
      v-if="product.discount && product.offers && product.discount.until && product.stock">
      <h5 class="daily-deal-title">{{ $t("products.discountEndsIn") }}:</h5>
        <pv-count-down
          class="product-countdown countdown-compact"
          :until="product.discount.until"
          :label-short="true"
        />
      </div>

      <ul>
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
      <div class="col-lg-12">
      <!-- Begin:offer table -->
      <h4 v-if="product.offers.length > 0" class="w-100 mb-1">
        {{ $t("common.buyMorePayLess") }}
      </h4>
      <div
        v-if="product.offers.length > 0"
        id="product-offers-content"
        class="mb-3"
      >
        <pv-offers :product="product"/>
      </div>
      <!-- End:offer table -->
      </div>
    </div>
    <div
      class="product-action d-lg-flex  align-items-center"
      v-if="!product.has_token_input || product.specifications.manufacturer =='TMPRO'"
      data-nosnippet
    >
      <div class="product-single-qty">
        <div
          v-if="product.hide_price == 0"
          class="input-group w-100 bootstrap-touchspin bootstrap-touchspin-injected">
          <span>
            <button
              class="quantity-button"
              type="button"
              aria-label="minus"
              :disabled="product.hide_price != '0'"
              @click="minusQty"
              :style="getIsAr ? 'border-radius: 0px 6px 6px 0px' : 'border-radius:6px 0px 0px 6px ;'"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18"
                viewBox="0 96 960 960"
                width="18"
              >
                <path d="M200 606v-60h560v60H200Z"/>
              </svg>
            </button>
          </span>

          <input
            v-model.number="qty"
            class="horizontal-quantity form-control bg-transparent"
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18"
                viewBox="0 96 960 960"
                width="18"
              >
                <path
                  d="M450 856V606H200v-60h250V296h60v250h250v60H510v250h-60Z"
                />
              </svg>
            </button>
          </span>
        </div>
      </div>
      <base-button-icon-1
        v-if="product.hide_price == 0"
        @click="product.quantity = qty;
          AddProductToCart(product);
        "
        :outline="true"
        class="mx-2 py-4"
      >
        {{ $t("products.addCart") }}</base-button-icon-1>
      <div v-else class="d-flex align-items-center">
        <img src="/images/whatsapp-button.png" width="200px" @click="goToWhatsApp(product)"  />
      </div>

      <div class="d-flex flex-column p-3 button-container">
        <pv-wishlist-button class="p-0" :product="product" :parent="'products-detail'" />
        <pv-compare-button class="p-0 mt-1" :product="product" parent="product-detail"></pv-compare-button>
      </div>
    </div>
    <div v-if="product.has_cover">
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
    </div>

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
  font-size: 22px;
  font-weight: bold;
  color: #556b2f; 
  letter-spacing: -.01em;
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