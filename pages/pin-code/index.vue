<template>
  <main class="main">
    <nav aria-label="breadcrumb" class="breadcrumb-nav container product-breadcrumb mb-3">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <nuxt-link to="/">
            {{ $t("products.home") }}
          </nuxt-link>
        </li>
        <li class="breadcrumb-item">
          {{ $t("pincode.pincode") }}
        </li>
      </ol>
    </nav>
      <div class="container mt-3">
        <div class="brandsConatiner">
          <div class="row">
            <div class="col-xl-4 col-lg-4 col-md-12">
              <h3 class="cart-total-price text-center">
                {{ $t("pincode.pincodeoffline") }}
              </h3>
              <div class="row justify-content-md-center justify-content-lg-start justify-content-sm-center justify-content-center">
                <div
                  v-for="(brand,index) in brands"
                  :key="index"
                  class="brandClass col-xl-3 col-lg-3 mx-3 col-md-2 mx-xl-4 col-sm-3 mb-2 col-3"
                  @click="selectBrand(brand)"
                >
                  <nuxt-link
                  :to="'pin-code/'+ brand.slug"
                  >
                  <img
                    :src="brand.icon.s.url"
                    class="img-thumbnail mx-auto mt-1"

                    :open_graph="brand.icon.s['open_graph']"
                    :scal="brand.icon.s['scal']"
                    :description="brand.icon.s['description']"
                  >
                  <h6 class="text-center my-1">
                    {{brand.brand}}
                  </h6>
                  <b class="text-center d-block">
                    {{brand.pin_code_price.value + brand.pin_code_price.currency}}
                  </b>
                  </nuxt-link>
                </div>
              </div>
            </div>
            <div class="col-xl-8 col-lg-8 col-md-12 mb-5 mt-md-5 mt-lg-0">
              <h3 class="text-center cart-total-price mx-1">
                {{ $t("pincode.pincodeonline") }}
              </h3>
              <iframe height="90%" width="100%" src="https://vin.prokeytools.com/login" style="border: none;" __idm_frm__="452">
              </iframe>
              <h4 class="text-center">
                {{ $t("pincode.togetpincode") }}
              </h4>
            </div>
          </div>
        </div>
      </div>
    <div class="container mt-5 pin-code">
      <div class="row">
        <div
          v-for="item in products"
          :key="item.sku"
          class="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-3 mt-lg-0"
        >
          <pv-product :product="item" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Api from '~/api';
import { mapGetters } from 'vuex';
import PvProduct from "~/components/product/card/PvProduct.vue";
export default {
  components: {
    PvProduct,
  },
  data() {
    return {
      products: [],
      sortBy:"newest",
      directionBy:"asc",
      brands: [],
      selectedBrand: null,
      serial_number: '',
      selected: 'email',
      contactValue: '',
      phonenumberinput: '',
      contactPlaceHolder: this.$t('brand.enterEmail'),
      serialNumberError: [],
      emailError: [],

      checkIsValidPayment: false

    };
  },
  watch: {
    selected: function(val) {
      if(val == 'whatsapp') {
        this.contactPlaceHolder = this.$t('brand.enterWhatsApp');
      } else if(val == 'email') {
        this.contactPlaceHolder = this.$t('brand.enterEmail') ;
      } else {
        this.contactPlaceHolder = this.$t('brand.enterPhone');
      }

    },
    serial_number(val) {
      if(val.length != 17) {
        this.serialNumberError.push('Serial number will be 17 charactor');
      } else {
        this.serialNumberError = [];
        this.checkIsValidPayment = true;
      }
    },
    contactValue(val) {
      if(this.serial_number.length == 17 && val) {
        this.checkIsValidPayment = true;
      } else {
        this.checkIsValidPayment = false;
      }
    }
  },
  computed: {
    ...mapGetters('rtlStore',['getIsAr'])
  },
  mounted() {
    this.$Progress.start();
    if(process.client){
      let fullDomain = window.location.href;
      if(fullDomain !=="https://www.tlkeys.com/pin-code"){
        window.location = "https://www.tlkeys.com/pin-code"
      }
    }
  },
  created() {
    this.getProduct();
    this.getBrands();
  },
  methods: {
    getProduct() {
      // this.$Progress.start();
      this.viewType = null;
      let tempQuery = "";
      let displayType = "categories";
      if (this.$route.query.hasOwnProperty("categories") || this.category) {
        displayType = "normal";
      }
      if (this.slugtype == "category") {
        tempQuery += `categories=${this.slug}`;
      } else if (this.slugtype == "manufacturer") {
        tempQuery += `manufacturers=${this.slug}`;
      } else if (this.slugtype == "brand") {
        tempQuery += `brands=${this.slug}`;
      }
      for (const property in this.$route.query) {
        // if(checkQueryArray.includes(property)) {
        tempQuery += `&${property}${
          this.$route.query[property] ? `=${this.$route.query[property]}` : ""
        }`;
        // }
      }
      switch (this.ordering) {
        case "title_a_to_z":
          this.orderBy = "title";
          this.direction = "asc";
          break;
        case "title_z_to_a":
          this.orderBy = "title";
          this.direction = "desc";
          break;
        case "price_low_high":
          this.orderBy = "price";
          this.direction = "asc";
          break;
        case "price_high_low":
          this.orderBy = "price";
          this.direction = "desc";
          break;
        case "oldest":
          this.orderBy = "created_at";
          this.direction = "asc";
          break;
        case "newest":
          this.orderBy = "created_at";
          this.direction = "desc";
          break;
        case "priority":
          this.orderBy = "created_at";
          this.direction = "desc";
          break;
      }

        let query = `?categories=pin-code&disply_type=categories&direction=desc&order-by=created_at&length=12`;

      Api.get(`search/product${query}`).then((response) => {
        console.log(response)
        if (response.data.products.length > 0) {

          if (response.data.products[0]["category"]) {
            this.viewType = "categories";
          } else {
            this.viewType = "product";
          }
          // this.$Progress.finish();
        }
        this.products = response.data.products;

        if (this.md != response.data.md5 && this.md != "") {
          this.selectedPage = 1;

          this.md = response.data.md5;
        }
        if (this.md == "") {
          this.md = response.data.md5;
        }
        this.pageCount = response.data.total_pages;
        this.$Progress.finish();
      });
    },
    getBrands() {
      // this.$Progress.start();
      Api.get('pin-code/price')
        .then(response => {
          this.brands = response.data.brands;
        })
        .catch(error => ({ error: JSON.stringify(error) }));
      // this.$Progress.finish();
    },
    selectBrand(brand) {
      const element = document.getElementsByTagName('head');
      element[0].removeChild(element[0].children[0]);
      this.selectedBrand = brand;

    }
  }
};
</script>

<style>
    .brandClass{
        background: #fff;
        border-radius: 7px;
        box-shadow: 0px 0px 7px 0px #a8a8a8;
        transition: all 0.2s ease-in-out;
        cursor: pointer;
    }
    .brandClass:hover{
        transform: scale(1.05);
    }
    .notValidInput{
      border: 2px solid #ee1313  !important;
    }
    .VuePhoneNumberInputClass .input-tel__input ,.VuePhoneNumberInputClass .country-selector__input {
  height: 48px;
}
    .brandClass:last-child{
      display: flex;
      justify-content: left;
    }

    @media screen and (max-width: 400px){
      .pin-code{
        margin-top: 100px!important;
      }
    }
</style>
