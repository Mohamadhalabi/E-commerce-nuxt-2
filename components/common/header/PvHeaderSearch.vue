<template>
  <div class="d-flex flex-column position-relative w-100">
    <!-- Unified Search Input with Category Select -->
    <div class="position-relative">
      <div class="d-flex w-100">
        <!-- Select dropdown with fixed width -->
        <!-- <div class="select-wrapper">
          <select
            class="form-select select-category border-end-0 rounded-start"
            v-model="selectedCategory"
          >
            <option :value="defaultCategoryLabel">{{ $t('home.selectCategory') }}</option>
            <option
              v-for="category in categories"
              :key="category.slug"
              :value="category.slug"
            >
              {{ category[`name_${$i18n.locale}`] }}
            </option>
          </select>
        </div> -->

        <!-- Search input that grows -->
        <div class="flex-grow-1">
          <input
            ref="searchInput"
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
        <div v-if="searchKey.length >= 2 && availableItems.length" class="live-search-list bg-white shadow rounded-bottom custom-scroll-mobile" ref="searchDropdown">
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
              <div class="d-flex align-items-center gap-2 w-100 flex-wrap flex-md-nowrap">
                <!-- Image -->
                <div class="flex-shrink-0 text-center" style="width: 60px;">
                  <nuxt-img
                    format="webp"
                    :src="product.gallery[0]?.s?.url"
                    :alt="product.short_title"
                    class="search-image"
                    style="max-width: 100%; max-height: 60px;"
                  />
                </div>

                <!-- Title + SKU -->
                <div class="flex-grow-1">
                  <p class="mb-1" v-html="highlightSearchKey(product.title + ' ' + product.summary_name, searchKey)"></p>
                  <small class="sku-color d-block" v-html="highlightSearchKey(product.sku, searchKey)"></small>
                </div>

                <!-- Price or WhatsApp -->
                <div class="text-lg-end flex-shrink-0" style="min-width: 100px;">
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
              v-if="getProductsBySearchArrayLength > visibleSearchLimit"
              class="list-group-item text-center border-top"
            >
              <nuxt-link
                class="notHover text-decoration-none"
                :to="getLink(
                  '/shop' +
                    (
                      selectedCategory &&
                      selectedCategory !== defaultCategoryLabel
                        ? `?categories=${selectedCategory}&search=${searchKey}`
                        : `?search=${searchKey}`
                    )
                )"
              >
                <base-button-icon-1 class="w-100 py-3" :outline="true">
                  see ({{ getProductsBySearchArrayLength - visibleSearchLimit }}) product more..
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
    BaseButtonIcon1,
  },
  data() {
    return {
      isInputClicked: false,
      defaultCategoryLabel: "Select a category",
      selectedCategory: "Select a category",
      searchKey: "",
      timer: null,
      categories: [],
      productsBySearch: [],
      availableItems: [],
      getProductsBySearchArrayLength: 5,
      visibleSearchLimit: 5, // 👈 used for responsive item count
      typingPlaceholder: "",
      fullPlaceholder: "I'm searching for ...",
      typingIndex: 0,
      typingTimer: null,
    };
  },
  computed: {
    ...mapGetters("language", ["getLang"]),
  },
  mounted() {
    this.startTypewriterEffect();

    if (process.client) {
      this.visibleSearchLimit = window.innerWidth <= 576 ? 3 : 5;
      
      document.addEventListener("click", this.handleClickOutside);
    }
  },
  beforeDestroy() {
    if (this.typingTimer) clearInterval(this.typingTimer);

    document.removeEventListener("click", this.handleClickOutside);
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
    handleClickOutside(event) {
      const inputEl = this.$refs.searchInput;
      const dropdownEl = this.$refs.searchDropdown;

      if (
        inputEl &&
        !inputEl.contains(event.target) &&
        dropdownEl &&
        !dropdownEl.contains(event.target)
      ) {
        this.isInputClicked = false;
        this.searchKey = ""; // ✅ Only clear if clicked outside both
      }
    },
    RemoveSearchKey() {
      this.searchKey = "";
      this.productsBySearch = [];
      this.availableItems = [];
    },
    getLink(route) {
      return this.getLang === "en" ? route : `/${this.getLang}${route}`;
    },
    highlightSearchKey(text, searchKey) {
      const lowerText = text.toLowerCase();
      const lowerSearchKey = searchKey.toLowerCase();

      const startIndex = lowerText.indexOf(lowerSearchKey);
      if (startIndex === -1) return text;

      const endIndex = startIndex + searchKey.length;
      const highlighted = `<mark style="background-color: #fdb585">${text.slice(startIndex, endIndex)}</mark>`;
      return `${text.slice(0, startIndex)}${highlighted}${text.slice(endIndex)}`;
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

        const str = this.searchKey.trim().replace(/ +(?= )/g, "");
        const search_key = str.replace(/# +/g, "");

        if (this.timer) clearTimeout(this.timer);

        this.timer = setTimeout(() => {
          let query = `?search=${search_key}`;
          if (
            this.selectedCategory &&
            this.selectedCategory !== "shop" &&
            this.selectedCategory !== this.defaultCategoryLabel
          ) {
            query += `&categories=${this.selectedCategory}`;
          }
          axios
            .get(`shop${query}`, {
              baseURL: process.env.API_BASE_URL,
              headers: {
                "Accept-Language": this.$i18n.locale,
                "Content-Type": "application/json",
                currency: this.$cookies.get("currency") || "USD",
                Accept: "application/json",
                "secret-key": process.env.SECRET_KEY,
                "api-key": process.env.API_KEY,
              },
            })
            .then((response) => {
              this.$Progress.finish();
              this.productsBySearch = response.data.products;
              this.getProductsBySearchArrayLength = response.data.total;

              this.availableItems = this.productsBySearch.slice(
                0,
                this.visibleSearchLimit
              );
            })
            .catch((error) => {
              this.$Progress.fail();
              console.error("Search error:", error);
            });
        }, 500);
      } else {
        this.productsBySearch = [];
        this.availableItems = [];
      }
    },
    removeInputText() {
      this.searchKey = "";
    },
    goToShop() {
      if (!this.searchKey && (!this.selectedCategory || this.selectedCategory === "Select a category")) return;

      const query = {
        ...(this.searchKey ? { search: this.searchKey } : {}),
        ...(this.selectedCategory && this.selectedCategory !== "Select a category"
          ? { categories: this.selectedCategory }
          : {}),
        page: 1,
      };

      this.$router.push({ path: "/shop", query });
      this.removeInputText();
      this.productsBySearch = [];
    }
  },
};
</script>

<style>
.live-search-list {
  position: absolute;
  top: 100%;
  z-index: 1030;
  background: #fff;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 10px 10px;
  overflow-y: auto;
  max-height: 8 00px;
  overflow-y: auto;
  display: block;
  padding: 0;
  margin-top: 0;
  transition: max-height 0.3s ease;
}

.search-image {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

  .custom-scroll-mobile {
    max-height: 60vh; /* Adjust as needed */
    overflow-y: auto;
    -webkit-overflow-scrolling: touch; /* smooth scrolling on iOS */
    border-radius: 0 0 10px 10px;
  }
  .select-wrapper{
    display: none!important;
  }
  .search-input{
    border-left: 1px solid rgba(83,82,80,.14)!important;
    border-bottom-left-radius: 10px!important;
    border-top-left-radius: 10px!important;
  }


</style>