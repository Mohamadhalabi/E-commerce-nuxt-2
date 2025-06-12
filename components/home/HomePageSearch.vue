<template>
<div class="search-bar-wrapper py-2 shadow-sm">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 d-flex flex-wrap justify-content-center gap-2 p-2">

        <!-- Brand Select -->
        <div class="flex-grow-1" style="min-width: 150px; max-width: 200px;">
          <select
            class="form-select"
            v-model="brand"
            @change="getModelsByBrand"
          >
            <option :value="null" disabled selected>{{ $t('home.selectBrand') }}</option>
            <option v-for="item in brands" :key="item.slug" :value="item.slug">
              {{ item.brand }}
            </option>
          </select>
        </div>

        <!-- Model Select -->
        <div class="flex-grow-1" style="min-width: 150px; max-width: 200px;">
          <select
            class="form-select"
            v-model="model"
            @change="getYears"
          >
            <option :value="null" disabled selected>{{ $t('home.selectModel') }}</option>
            <option v-for="item in models" :key="item.slug" :value="item.slug">
              {{ item.name }}
            </option>
          </select>
        </div>

        <!-- Year Select -->
        <div class="flex-grow-1" style="min-width: 150px; max-width: 200px;">
          <select
            class="form-select"
            v-model="year"
            @change="goToShop"
          >
            <option :value="null" disabled selected>{{ $t('home.selectYear') }}</option>
            <option v-for="item in years" :key="item.slug" :value="item.slug">
              {{ item.name }}
            </option>
          </select>
        </div>

        <!-- Search Button -->
        <div style="min-width: 100px;">
          <base-button-icon-1
            @click="goToShop"
            :icon="true"
            :innerText="$t('home.Search')"
            class="w-100 h-100"
          >
            <i class="icon sicon-magnifier"></i>
          </base-button-icon-1>
        </div>

      </div>
    </div>
  </div>
</div>
</template>
<script>
import Api from "~/api";
import {mapGetters} from "vuex";
export default {
  name: "HomePageSearch",
  components: {
    PvPriceBox: () => import("~/components/product/partials/PvPriceBox.vue"),
    BaseButtonIcon1: () => import("~/components/common/BaseButtonIcon1.vue"),
    PvPriceBox: () => import("~/components/product/partials/PvPriceBox.vue"),

  },
  data: function () {
    return {
      availableItems: [],
      getProductsBySearchArrayLength: 5,
      slides: [],
      brands: [],
      models: [],
      years: [],
      brand: null,
      model: null,
      year: null,
      searchKey: null,
      productsBySearch: [],
      timer: null,
    };
  },
  computed: {
    ...mapGetters('rtlStore', ['getIsAr']),
    ...mapGetters("language", ["getLang"]),
  },
  mounted: function () {
    this.getBrands();
  },
  methods: {
    onEnter(searchKey){
      if(this.getLang =="en"){
        this.$router.push('shop?search='+searchKey)
      }
      else{
        this.$router.push(this.getLang+'/shop?search='+searchKey)
      }
    },
    goToShop: function () {
      let url = "/";
      if (this.brand != null) {
        url+="car-remote-and-transponder-key"
        url += "?brands=" + this.brand ;
        if (this.model != null) {
          url += "&models=" + this.model ;
        }
        if (this.year != null) {
          url += "&years=" + this.year ;
        }
        if (this.searchKey != null) {
          url += "&search_attributes=" + this.searchKey;
        }
        this.$router.push(url);
      } else {
        if (this.searchKey)
          this.$router
              .push(`/shop?search_attributes=` + this.searchKey)
            .then(() => {
              // this.$Progress.finish();
            });
      }
    },
    getBrands() {
      Api.get("brands/get-brands")
        .then((response) => {
          this.brands = response.data.brands;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
    },

    getModelsByBrand() {
      if (!this.brand) {
        this.models = [];
      } else {
        Api.post("brands/get-models", { slug: this.brand })
          .then((response) => {
            this.models = response.data.models;
            this.years = [];
            this.model = null;
            this.year = null;
          })
          .catch((error) => ({ error: JSON.stringify(error) }));
      }
    },
    getYears() {
      Api.post("brands/get-years", { slug: this.model })
        .then((response) => {
          this.years = response.data.years;
          this.year = null;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
    },

    searchProduct() {
      if (!this.searchKey || this.searchKey == "") {
        this.productsBySearch = [];
        this.getProductsBySearchArrayLength = 0;
      } else {
        if (this.timer) {
          clearTimeout(this.timer); // delay time befor searching
          this.timer = null; // delay time befor searching
          // this.$Progress.finish();
        }
        if (this.searchKey.length >= 3) {
          this.timer = setTimeout(() => {
            if (!this.searchKey || this.searchKey == " ") {
              this.productsBySearch = [];
              return;
            }
            // this.$Progress.start();
            Api.get(`/shop?search_attributes=${this.searchKey}`)
              .then((response) => {
                this.productsBySearch = response.data.products;
                this.getProductsBySearchArrayLength = response.data.total;
                this.availableItems = this.productsBySearch.slice(0, 5);
                // this.$Progress.finish();
              })
              .catch((error) => ({error: JSON.stringify(error)}));
          }, 500);
          // this.$Progress.finish();
        }
      }
    },
  },
}
</script>
<style>
@media screen and (max-width: 767px){
  .fcc-part-search-input{
    height: 35px;
  }
  .search-by-car{
    padding:3px;
  }
}
</style>
