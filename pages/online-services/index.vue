<template>
  <div class="container">
    <nav
      aria-label="breadcrumb"
      class="breadcrumb-nav"
    >
      <div class="container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <nuxt-link
              :to="getLink('/')"
              class="router-link-active">
              {{ $t("products.home") }}
            </nuxt-link>
          </li>
          <li
            aria-current="page"
            class="breadcrumb-item active"
          >
            {{ $t("online.onlineServices") }}
          </li>
        </ol>
      </div>
    </nav>
    <h1 class="text-center mt-lg-2">{{ $t("online.onlineServices") }}</h1>
    <div class="row online-services-products">
      <div
        v-for="item in products"
        :key="item.sku"
        class="col-7 col-sm-5 col-md-4 col-lg-3 col-xl-3 mb-2"
      >
        <pv-product-online-services :product="item" />
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import Api from "~/api";
import PvProductOnlineServices from "~/components/product/card/PvProductOnlineServices.vue";
export default {
  name: "index",
  components: {PvProductOnlineServices},
  computed: {
    ...mapGetters('rtlStore',['getIsAr']),
    ...mapGetters("language", ["getLang"]),
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
  mounted() {
    this.$Progress.start();
  },
  created() {
    this.getProduct();
  },
  methods : {
    getLink(route) {
      if (this.getLang === 'en') {
        return route; // Return the route as is without the language parameter
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    },
    getProduct() {
      this.viewType = null;
      Api.get(`search/online-services-products`).then((response) => {
        this.products = response.data;
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
  }
}
</script>

<style scoped>
@media screen and (max-width: 767px){
  .online-services-products{
    justify-content: center;
  }
}
</style>
