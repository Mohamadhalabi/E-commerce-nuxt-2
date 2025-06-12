<template>
  <div class="d-flex flex-column position-relative w-100">
    <!-- Unified Search Input with Category Select -->
    <div class="position-relative">
      <div class="d-flex w-100">
        <!-- Select dropdown with fixed width -->
        <div style="" class="">
          <select
            class="form-select select-category border-end-0 rounded-start"
            v-model="selectedCategory"
          >
            <option value="Select a category">{{ $t('home.selectCategory') }}</option>
            <option
              v-for="category in categories"
              :key="category.slug"
              :value="category.slug"
            >
              {{ category[`name_${$i18n.locale}`] }}
            </option>
          </select>
        </div>

        <!-- Search input that grows -->
        <div class="flex-grow-1">
          <input
            v-model="searchKey"
            class="form-control search-input border-start-0 rounded-end w-100"
            type="text"
            name="search_term"
            :placeholder="typingPlaceholder"
            autocomplete="off"
            @input="searchProduct(); isInputClicked = true"
            @focus="isInputClicked = true; searchProduct()"
            @blur="handleBlur"
            @keyup.enter="goToShop"
          />
        </div>
      </div>

      <!-- Search Result List -->
      <div
        v-if="availableItems.length"
        class="live-search-list bg-white shadow rounded-bottom"
      >
        <ul class="list-group list-group-flush">
          <li
            v-for="(product, index) in availableItems"
            :key="index"
            class="list-group-item pruductSearch align-items-center justify-content-between"
          >
            <nuxt-link
              class="p-0 notHover d-block text-decoration-none text-dark"
              @click.native="RemoveSearchKey"
              :to="getLink('/products/' + product.slug)"
            >
              <div class="row align-items-center">
                <div class="col-2 m-auto text-center">
                  <nuxt-img
                    format="webp"
                    :src="product.gallery[0]?.s?.url"
                    :alt="product.short_title"
                    class="search-image m-auto"
                  />
                </div>
                <div
                  :class="{
                    'col-xl-8 col-lg-8': product.hide_price == 0,
                    'col-xl-7 col-lg-7': product.hide_price !== 0
                  }"
                >
                  <p
                    v-html="highlightSearchKey(product.title + ' ' + product.summary_name, searchKey)"
                  ></p>
                  <small class="sku-color d-block" v-html="highlightSearchKey(product.sku, searchKey)"></small>
                </div>
                <div
                  :class="{
                    'col-xl-2 col-lg-2': product.hide_price == 0,
                    'col-xl-3 col-lg-3': product.hide_price !== 0
                  }"
                  class="text-end"
                >
                  <pv-price-box
                    v-if="product.hide_price == 0"
                    :product="product"
                  />
                  <div v-else class="d-flex justify-content-end align-items-center">
                    <i
                      class="fab fa-whatsapp"
                      style="font-size: 20px; color: rgb(43, 169, 104); cursor: pointer;"
                      @click="goToWhatsApp(product)"
                    ></i>
                    <small
                      class="px-2"
                      @click="goToWhatsApp(product)"
                      style="color: rgb(43, 169, 104); cursor: pointer; font-size: 15px"
                    >
                      {{ $t("products.ContactUsToSendYouThePrice") }}
                    </small>
                  </div>
                </div>
              </div>
            </nuxt-link>
          </li>

          <!-- Show More -->
          <li
            v-if="getProductsBySearchArrayLength > 5"
            class="list-group-item text-center border-top"
          >
            <nuxt-link
              class="notHover text-decoration-none"
              :to="getLink('/shop' + (selectedCategory ? `?categories=${selectedCategory}&search=${searchKey}` : `?search=${searchKey}`))"
            >
              <base-button-icon-1 class="w-100 py-3" :outline="true">
                see ({{ getProductsBySearchArrayLength - 5 }}) product more..
              </base-button-icon-1>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import axios from "axios";
import PvPriceBox from "~/components/product/partials/PvPriceBox.vue";
import BaseButtonIcon1 from "../BaseButtonIcon1.vue";
export default {
    components: {
    PvPriceBox,
    BaseButtonIcon1
  },
  data() {
    return {
      isInputClicked: false,
      selectedCategory: "Select a category",
      searchKey: "",
      timer: null,
      categories: [],
      productsBySearch: [],
      availableItems: [],
      getProductsBySearchArrayLength: 5,
      typingPlaceholder: "",
      fullPlaceholder: "I'm searching for ...",
      typingIndex: 0,
      typingTimer: null
    };
  },
  computed: {
    ...mapGetters("language", ["getLang"]),
  },
  mounted() {
    this.getCategoriesWithTranslate();
    this.startTypewriterEffect();
  },
  beforeDestroy() {
    if (this.typingTimer) clearInterval(this.typingTimer);
  },
  methods: {
    handleBlur() {
      setTimeout(() => {
        this.isInputClicked = false;
      }, 150);
    },
    startTypewriterEffect() {
      this.typingPlaceholder = "";
      this.typingIndex = 0;

      const typeWriter = () => {
        if (this.typingIndex < this.fullPlaceholder.length) {
          this.typingPlaceholder += this.fullPlaceholder[this.typingIndex];
          this.typingIndex++;
        } else {
          clearInterval(this.typingTimer);
          setTimeout(() => {
            this.typingPlaceholder = "";
            this.typingIndex = 0;
            this.typingTimer = setInterval(typeWriter, 100);
          }, 2000);
        }
      };

      this.typingTimer = setInterval(typeWriter, 100);
    },

    RemoveSearchKey() {
      this.searchKey = "";
      this.productsBySearch = [];
      this.availableItems = [];
    },

    getLink(route) {
      if (this.getLang === "en") {
        this.getLang = "";
        return route;
      } else {
        return `/${this.getLang}${route}`;
      }
    },

    highlightSearchKey(shortTitle, searchKey) {
      const lowerShortTitle = shortTitle.toLowerCase();
      const lowerSearchKey = searchKey.toLowerCase();

      const startIndex = lowerShortTitle.indexOf(lowerSearchKey);
      const endIndex = startIndex + searchKey.length;

      if (startIndex === -1) return shortTitle;

      const highlightedPart = `<mark style="background-color: #fdb585">${shortTitle.slice(startIndex, endIndex)}</mark>`;
      const remainingPart = shortTitle.slice(endIndex);

      return `${shortTitle.slice(0, startIndex)}${highlightedPart}${remainingPart}`;
    },

    goToWhatsApp(product) {
      window.open(
        `https://api.whatsapp.com/send?phone=971504429045&text=Could I please have the price of the ${product.title}`,
        "_blank"
      );
    },

    searchProduct() {
      if (this.searchKey.length >= 3) {
        this.$Progress.start();

        let str = this.searchKey.trim().replace(/ +(?= )/g, "");
        let search_key = str.replace(/# +/g, "");

        console.log("Searching for:", search_key); // ✅ LOG THIS

        if (this.timer) clearTimeout(this.timer);

        this.timer = setTimeout(() => {
          let query = `?search=${search_key}`;
          if (
            this.selectedCategory &&
            this.selectedCategory !== "shop" &&
            this.selectedCategory !== "Select a category"
          ) {
            query += `&categories=${this.selectedCategory}`;
          }


          console.log("Final query:", query); // ✅ LOG QUERY

          axios.get(`shop${query}`, {
            baseURL: process.env.API_BASE_URL,
            headers: {
              "Accept-Language": this.$i18n.locale,
              "Content-Type": "application/json",
              currency: this.$cookies.get("currency") || "USD",
              Accept: "application/json",
              "secret-key": process.env.SECRET_KEY,
              "api-key": process.env.API_KEY,
            },
          }).then((response) => {
            this.$Progress.finish();
            console.log("Search result:", response.data); // ✅ LOG RESPONSE

            this.productsBySearch = response.data.products;
            this.getProductsBySearchArrayLength = response.data.total;
            this.availableItems = this.productsBySearch.slice(0, 5);
          }).catch((error) => {
            this.$Progress.fail();
            console.error("Search error:", error); // ✅ LOG ERROR
          });
        }, 500);
      } else {
        this.productsBySearch = [];
        this.availableItems = [];
      }
    },


    getCategoriesWithTranslate() {
      this.categories = this.$settings.categories.map((category) => {
        let categoryNameLang = category.name;
        for (const key in categoryNameLang) {
          category[`name_${key}`] = categoryNameLang[key];
        }
        return category;
      });
    },

    removeInputText() {
      this.searchKey = "";
    },

    goToShop() {
      if (!this.searchKey && !this.selectedCategory) return;

      const query = {
        ...(this.searchKey ? { search: this.searchKey } : {}),
        ...(this.selectedCategory ? { categories: this.selectedCategory } : {}),
        page: 1,
      };

      this.$router.push({ path: "/shop", query });
      this.removeInputText();
      this.productsBySearch = [];
    },
  },
};
</script>

<style>
.live-search-list {
  position: absolute;
  top: 100%;
  background: #fff;
  z-index: 1050;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 10px 10px;
  padding: 0;
  margin-top: 0;
  display: block;
}
</style>