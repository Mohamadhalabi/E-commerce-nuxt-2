<template>
  <div>
    <div class="col-lg-12">
      <h1 class="home-page-h1 font-weight-bold m-0">{{ $t("home.keyandremote") }}</h1>
    </div>
    <div class="box-shadow-none third-menu">
      <div class="row d-flex home-page-search mb-3 mb-lg-0">
        <div class="col-xl-5 col-lg-12 col-12 mt-lg-0 mt-2 col-md-12 d-lg-flex justify-content-xl-end justify-content-center align-center text-center" style="align-items: center;">
          <span class="search-by-fcc mr-2">
            {{ $t("home.SearchFCCID") }} {{ $t("home.orSearchPartNumber")}}
          </span>
          <div>
            <div class="searchProductStyle p-3">
              <form class="nosubmit"
                    @submit.prevent="onEnter(searchKey)"
              >
                <input
                  v-model="searchKey"
                  type="search"
                  class="w-100"
                  :placeholder="$t('common.search')"
                  @input="searchProduct"
                  :style=" getIsAr
                            ? 'background-position: 96% ;'
                            : 'background-position: 5px ;'
                        "
                />
              </form>
              <b-list-group
                v-if="productsBySearch.length > 0"
                class="home-page-search-items"
              >
                <b-list-group-item
                  v-for="(product, index) in availableItems"
                  :key="index"
                  class="pruductSearch p-1 pt-2"
                  @click="$router.push(`products/${product['slug']}`)">
                  <nuxt-img
                    format="webp"
                    loading="lazy"
                    :src="product['gallery'][0]['s']['url']"
                    :alt="product['short_title']"
                    width="50"
                    class="d-inline-block mx-1"
                  />
                  <div>
                    <span style="color: #535250;font-size: 14px;">{{ product["short_title"] }}</span>
                    <div class="sku-color" style="margin-bottom: 5px;">Sku:{{ product.sku }}</div>

                    <pv-price-box
                      class="m-0"
                      :homePageSearch="true"
                      v-if="product.hide_price == 0"
                      :product="product"
                    />

                    <div
                      v-else
                      style="text-align: start; display: flex">
                      <i
                        class="fab fa-sm fa-whatsapp mx-1"
                        style="
                                    font-size: 20px;
                                    color: #4fce5d;
                                    cursor: pointer;
                                  "
                        @click="goToWhatsApp"
                      />
                      <small
                        class="d-inline-block px-2"
                        @click="goToWhatsApp(product)"
                        style="
                                    width: 100%;
                                    position: relative;
                                    color: #4fce5d;
                                    cursor: pointer;
                                  ">
                        {{ $t("product.ContactUsToSendYouThePrice") }}
                      </small>
                    </div>
                  </div>
                </b-list-group-item>
                <b-list-group-item
                  v-if="getProductsBySearchArrayLength > 5"
                  class="text-center border">
                  <nuxt-link class="notHover" to="/shop">
                    <base-button-icon-1
                      class="w-100 py-3"
                      :outline="true"
                    >
                      see ({{ getProductsBySearchArrayLength - 5 }})
                      product more..
                    </base-button-icon-1>
                  </nuxt-link>
                </b-list-group-item>
              </b-list-group>
            </div>
          </div>
        </div>
        <div class="col-xl-7 col-lg-12 m-auto pl-5 pr-5 mb-2">
          <div class="" action="#" method="get">
            <div class="row d-lg-flex justify-content-center d-block home-page-search">
              <div class="mt-auto mb-auto text-center">
                <span class="search-by-fcc mt-2 mt-lg-0 mr-2">
                  {{ $t('home.searchByCar') }}
                </span>
              </div>
              <div class="ml-lg-2 mb-1 mb-lg-0 mt-1 mt-lg-0">
                <AutoComplate
                  v-model="brand"
                  :placeholder="$t('home.selectBrand')"
                  :options="brands"
                  class="search-by-car-input"
                  :item-text="'brand'"
                  @setValue="$event ? (brand = $event.slug) : (brand = null),getModelsByBrand()"/>
              </div>
              <div class="ml-lg-2 mb-1 mb-lg-0">
                <AutoComplate
                  v-model="model"
                  :placeholder="$t('home.selectModel')"
                  :options="models"
                  class="search-by-car-input"
                  :item-text="'name'"
                  @setValue="$event ? (model = $event.slug) : (model = null),getYears()"/>
              </div>
              <div class="ml-lg-2 mb-1 mb-lg-0">
                <AutoComplate
                  v-model="year"
                  :placeholder="$t('home.selectYear')"
                  :options="years"
                  class="search-by-car-input"
                  :item-text="'name'"
                  @setValue="$event ? (year = $event.slug) : (year = null), goToShop()"
                />
              </div>
              <div class="ml-lg-2 mb-1 mb-lg-0">
                <base-button-icon-1
                  @click="goToShop"
                  :icon="true"
                  :innerText="$t('home.Search')"
                  class="py-3 w-100">
                  <i class="icon sicon-magnifier"></i>
                </base-button-icon-1>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Api from "~/api";
import {mapGetters} from "vuex";
import PvPriceBox from "~/components/product/partials/PvPriceBox.vue";
import AutoComplate from "~/components/common/AutoComplate.vue";
import BaseButtonIcon1 from "~/components/common/BaseButtonIcon1.vue";
export default {
  name: "HomePageSearch",
  components: {
    PvPriceBox,
    AutoComplate,
    BaseButtonIcon1
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
    this.getSlides();
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
    getSlides: function () {
      Api.get("sliders")
        .then((response) => {
          this.slides = response.data.result;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
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
              this.$Progress.finish();
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
          this.$Progress.finish();
        }

        if (this.searchKey.length >= 3) {
          this.timer = setTimeout(() => {
            if (!this.searchKey || this.searchKey == " ") {
              this.productsBySearch = [];
              return;
            }
            this.$Progress.start();
            Api.get(`/shop?search_attributes=${this.searchKey}`)
              .then((response) => {
                this.productsBySearch = response.data.products;
                this.getProductsBySearchArrayLength = response.data.total;
                this.availableItems = this.productsBySearch.slice(0, 5);
                this.$Progress.finish();
              })
              .catch((error) => ({error: JSON.stringify(error)}));
          }, 500);

          this.$Progress.finish();
        }
      }
    },
  },
}
</script>
<style scoped>
.selectBoxStyle .multiselect__tags {
  border-radius: 22px;
}

.selectBoxStyle .multiselect__element,
.selectBoxStyle .multiselect__input,
.selectBoxStyle .multiselect__single {
  font-size: 14px;
}
form.nosubmit {
  color: #555;
  display: flex;
  padding: 2px;
  border: 1px solid currentColor;
  border-radius: 5px;
  margin: 0px 6px 8px 0px;
}
form.nosubmit input[type="search"] {
  margin: 0;
  padding: 9px ;
  font-size: 14px;
  color: inherit;
  border: 1px solid transparent;
  border-radius: inherit;
}

.searchProductStyle{
  margin-top: 8px;
}

form.nosubmit input[type="search"]::placeholder {
  color: #bbb;
}

form.nosubmit input[type="search"]:focus {
  box-shadow: 0 0.12rem 0.2rem #ff6800 !important;
  border-color: #ff6800;
  outline: none;
}

form.nosubmit {
  border: none;
  padding: 0;
  position: sticky;
  top: -0px;
  background: white;
}

input.nosubmit {
  border: 1px solid #555;
  width: 100%;
  /*  padding: 12px 3px 12px 39px !important; */
  background: transparent
  url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E")
  no-repeat center;
}
form.nosubmit [type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
  appearance: none;
  height: 10px;
  width: 10px;
  background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjEyMy4wNXB4IiBoZWlnaHQ9IjEyMy4wNXB4IiB2aWV3Qm94PSIwIDAgMTIzLjA1IDEyMy4wNSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTIzLjA1IDEyMy4wNTsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZD0iTTEyMS4zMjUsMTAuOTI1bC04LjUtOC4zOTljLTIuMy0yLjMtNi4xLTIuMy04LjUsMGwtNDIuNCw0Mi4zOTlMMTguNzI2LDEuNzI2Yy0yLjMwMS0yLjMwMS02LjEwMS0yLjMwMS04LjUsMGwtOC41LDguNQ0KCQljLTIuMzAxLDIuMy0yLjMwMSw2LjEsMCw4LjVsNDMuMSw0My4xbC00Mi4zLDQyLjVjLTIuMywyLjMtMi4zLDYuMSwwLDguNWw4LjUsOC41YzIuMywyLjMsNi4xLDIuMyw4LjUsMGw0Mi4zOTktNDIuNGw0Mi40LDQyLjQNCgkJYzIuMywyLjMsNi4xLDIuMyw4LjUsMGw4LjUtOC41YzIuMy0yLjMsMi4zLTYuMSwwLTguNWwtNDIuNS00Mi40bDQyLjQtNDIuMzk5QzEyMy42MjUsMTcuMTI1LDEyMy42MjUsMTMuMzI1LDEyMS4zMjUsMTAuOTI1eiIvPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=");
  background-size: 10px 10px;
}
.search-by-fcc{
  font-size: 16px;
  font-weight: bold;
  vertical-align: middle;
}
@media screen and (max-width: 767px){
  .search-by-fcc {
    font-size: 14px;
  }
  .home-page-search{
    padding: 3px
  }
}
@media screen and (min-width: 1200px){
  .search-by-car-input{
    width: 150px;
  }
}
.home-page-search-items{
  cursor: pointer;
  position: absolute;
  overflow: auto;
  z-index: 100 !important;
  margin-top: 3px;
  padding-right: 15px;
  width: 90%;
}
</style>
