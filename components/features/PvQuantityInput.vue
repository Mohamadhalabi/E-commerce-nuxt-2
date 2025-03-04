<template>
  <div class="product-single-qty">

    <div class="input-group bootstrap-touchspin bootstrap-touchspin-injected">
      <div v-if="product.hide_price == 0 && !has_token" class="input-group w-100 bootstrap-touchspin bootstrap-touchspin-injected">
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
            class="horizontal-quantity form-control bg-transparent"
            type="number"
            style="text-align: center;font-size: 13px;padding:5px;border: 1px solid #892118!important;"
            :value="currentQty"
            :max="product.stock"
            @change="changeQty($event)"
            readonly
          />
          <span class="input-group-btn input-group-append">
            <button
              :style="getIsAr ? 'border-radius:6px 0px 0px 6px' : 'border-radius:0px 6px 6px 0px !important;'"
              class="quantity-button"
              type="button"
              style="transition: none !important"
              :disabled="getDisplay"
              @click="plusQty($event)"
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
  </div>

</template>

<script>
import {mapGetters} from "vuex";

export default {
  props: {
    qty: Number,
    product: Object,
    has_token: Boolean
  },

  data: function () {
    return {
      currentQty: this.qty,
      minPurchaseQty:0,
    };
  },

  watch: {
    qty: function () {
      this.currentQty = this.qty;
    },
  },
  computed: {
    ...mapGetters("shop", ["getDisplay"]),
    ...mapGetters('rtlStore', ['getIsAr']),
  },

  methods: {
    changeQty: function (e) {
      if (e.srcElement.valueAsNumber < 1) this.currentQty = 1;
      this.$emit("changeQty", {quantity: this.currentQty, product: this.product});
    },

    plusQty: function () {
      // if (this.currentQty < this.product.stock)
      this.currentQty++;
      let dataForm = {
        quantity: this.currentQty,
        product: this.product,
      };
      this.$emit("changeQty", dataForm);
    },

    minusQty: function () {
      if (this.currentQty <= this.product.min_purchase_qty) {
        this.currentQty = this.product.min_purchase_qty;
      } else {
        this.currentQty--;
      }

      // Ensure currentQty doesn't go below 1
      if (this.currentQty < 1) {
        this.currentQty = 1;
      }

      let dataForm = {
        quantity: this.currentQty,
        product: this.product,
      };

      this.$emit("changeQty", dataForm);
    },
  },
};
</script>

