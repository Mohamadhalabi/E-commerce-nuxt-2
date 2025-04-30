<template>
  <div>
    <NotFound v-if="products.length == 0 && show_not_found" />
    <div v-if="viewType == 'product'">
      <nav
        v-if="!products || (products && products.length > 0)"
        v-sticky class="toolbox sticky-header mobile-sticky"
        data-start-top="500"
        data-offset-top="60">
        <div class="filters d-flex d-lg-none">
        <button @click="clickedFilter()" class="btn btn-secondary ml-2 mb-2">Filters</button>
        </div>
        <div class="toolbox-left">
          <div class="row">
            <div class="col-6">
              <div class="toolbox-item toolbox-sort pl-1">
            <label>{{ $t("shop.sort_by") }}</label>
                <div class="select-custom">
                  <select
                    style="width:10vw;font-size:1.3rem"
                    v-model="ordering"
                    name="orderby"
                    class="form-control"
                    @change="changeOrder"
                  >
                    <option value="type">{{ $t("shop.type")}}</option>
                    <option value="title_a_to_z">
                      {{ $t("shop.title_a_to_z") }}
                    </option>
                    <option value="title_z_to_a">
                      {{ $t("shop.title_z_to_a") }}
                    </option>
                    <option value="price_high_low">
                      {{ $t("shop.price_high_low") }}
                    </option>
                    <option value="price_low_high">
                      {{ $t("shop.price_low_high") }}
                    </option>
                    <option value="oldest">{{ $t("shop.oldest") }}</option>
                    <option value="newest">{{ $t("shop.newest") }}</option>
                    <option value="priority">{{ $t("shop.priority") }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="toolbox-item toolbox-sort" style="float: inline-end;">
                <label>Per Page</label>
                <div class="mx-3 select-custom">
                    <select
                      style="font-size:1.3rem"
                      v-model="selectedNumber"
                      name="selectedNumber"
                      class="form-control"
                      @change="handleChange">
                      <option value="4">4</option>
                      <option value="12">12</option>
                      <option value="16">16</option>
                      <option value="20">20</option>
                      <option value="24">24</option>
                      <option value="8">All</option>
                    </select>
                  </div>
                  <i
                    @click="selectShowStyle('grid')"
                    style="cursor: pointer; font-size: 1.8rem"
                    :class="{ 'orange-1': isSelected }"
                    class="mx-2 icon-mode-grid"
                  />
                  <i
                    @click="selectShowStyle('list')"
                    style="cursor: pointer; font-size: 1.8rem"
                    :class="{ 'orange-1': !isSelected }"
                    class="mx-2 icon-mode-list"
                  />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div v-if="showStyle == 'grid'" class="row">
        <div
          v-for="item in products"
          :key="item.sku"
            class="col-6 col-sm-4 col-md-4 col-lg-4 col-xl-3 mb-2"
        >
          <pv-product :product="item" />
        </div>
        <div ref="scrollObserver"></div> <!-- Intersection observer trigger point -->
      </div>
      <template v-else class="row">
         <div
            v-for="item in products"
            :key="item.sku"
            class="col-12 mb-3"
          >
          <pv-list-product :product="item"></pv-list-product>
          </div>
          <div ref="scrollObserver"></div> <!-- Intersection observer trigger point -->
      </template>
      <div v-if="pageCount > 1 && selectedNumber !== 8">
        <pagination
        style="justify-content: center;"
        v-model="selectedPage"
        :records="total_products"
        :per-page="selectedNumber"
        :options="{ chunk: 5 , edgeNavigation: true, chunksNavigation: scroll,format:false, texts: {count:'', first: '<<', last: '>>', prev: '<', next: '>'} }"
        @paginate="changePage(parseInt(selectedPage))"
         />
      </div>
    </div>
  </div>
</template>

<script>
import { scrollTopHandler } from "~/utils";
import axios from "axios";
import Pagination from 'vue-pagination-2';

export default {
  components: {
    Pagination,
    BaseButtonIcon1: () => import("../common/BaseButtonIcon1.vue"),
    NotFound: () => import("~/components/shop/NotFound.vue"),
    PvCollection: () => import("~/components/product/card/PvCollection.vue"),
    PvProduct: () => import("~/components/product/card/PvProduct.vue"),
    PvListProduct: () => import("~/components/product/card/PvListProduct.vue"),
  },
//   head() {
//   return {
//     script: [
//       {
//         type: 'application/ld+json',
//         json: {
//           "@context": "https://schema.org",
//           "@type": "WebPage",
//           "products": this.products.map(product => {
//             const languagePrefix = this.$i18n.locale !== 'en' ? `/${this.$i18n.locale}` : '';
//             const productData = {
//               "@type": "Product",
//               "name": product.title,
//               "url": process.env.PUBLIC_PATH_WITHOUT_SLASH + languagePrefix + "/products/" + product.slug,
//               "description": product['seo_description'],
//               "brand": {
//                 "@type": "Brand",
//                 "name": product.manufacturer,
//               },
//               "image": product.gallery[0]['l']['url'],
//               "additionalImage": product.gallery[1]['l']['url'],
//               "sameAs": product.canonical,
//               "sku": product.sku,
//               "weight": product.weight,
//               "offers": {
//                 "@type": "Offer",
//                 "price": product.price.value,
//                 "salePrice": product.sale_price.value === product.price.value ? 0 : product.sale_price.value,
//                 "priceCurrency": product.price.code,
//                 "availability": product.stock === 0 ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
//                 "url": process.env.PUBLIC_PATH_WITHOUT_SLASH + languagePrefix + "/products/" + product.slug,
//               }
//             };
//             return productData;
//           })
//         }
//       },
//     ]
//   };
// },


  async fetch() {
    await this.fetchProducts();
  },

  props: {
    value: {
      type: Object,
      required: false,
    },
    category: {
      type: String,
      required: false,
      default: null,
    },
    manufacturer: {
      type: String,
      required: false,
      default: null,
    },
    brand: {
      type: String,
      required: false,
      default: null,
    },
    slugtype: {
      type: String,
      required: false,
      default: null,
    },
    slug: {
      type: String,
      required: false,
      default: null,
    },
  },

  data: function () {
    return {
      showStyle: "grid",
      viewType: null,
      selectedNumber: 16,
      show_not_found: false,
      products: [],
      direction: "asc",
      pageCount: 1,
      selectedPage: 1,
      total_products: 0,
      page: 1,
      type: {
        type: String,
        default: "grid",
      },
      orderBy: "created_at",
      ordering: "type",
    };
  },
  watch: {
    $route: function () {
      this.type = this.$route.query.list_view ? "list" : "grid";
      this.selectedPage = this.$route.query.page;
      this.fetchProducts();
    },

  },
  computed: {
    isSelected() {
      if (this.showStyle === "grid") {
        return true;
      } else if (this.showStyle === "list") {
        return false;
      }
    },
  },
  mounted() {
    this.selectedPage = parseInt(this.$route.query.page ?? this.selectedPage);
    // this.fetchProducts(); // Initial fetch
    this.scroll(); // Setup infinite scroll
  },
  methods: {
    async fetchProducts() {
      let tempQuery = "";
      let displayType = "normal";
      if (this.$route.query.hasOwnProperty("categories") || this.category) {
        displayType = "normal";
      }
      if (this.slugtype === "category") {
        tempQuery += `categories=${this.slug}`;
      } else if (this.slugtype === "manufacturer") {
        tempQuery += `manufacturers=${this.slug}`;
      } else if (this.slugtype === "brand") {
        tempQuery += `brands=${this.slug}`;
      }
      for (const property in this.$route.query) {
        tempQuery += `&${property}${this.$route.query[property] ? `=${this.$route.query[property]}` : ""}`;
      }
      switch (this.ordering) {
        case "type":
          this.orderBy = "type";
          this.direction = "desc";
          break;
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
      let query = `?${tempQuery}&disply_type=${displayType}&direction=${this.direction}&order-by=${this.orderBy}&length=${this.selectedNumber}`;
      if(this.selectedNumber == "8") query += `&page=${this.selectedPage}`;

      const { data } = await axios.get(`search/product${query}`, {
        baseURL: process.env.API_BASE_URL,
        headers: {
          'Accept-Language': this.$i18n.locale,
          'Content-Type': 'application/json',
          'currency': this.$cookies.get('currency') || 'USD',
          'Accept': 'application/json',
          'secret-key': process.env.SECRET_KEY,
          'api-key': process.env.API_KEY,
        }
      });
      this.total_products = data.total 
      if(this.selectedNumber == "8"){
        this.products.push(...data.products);
      }else{
        this.products = data.products;;
      }
      if (data.products.length === 0) {
        this.show_not_found = true;
      }
      if (data.products[0]["category"]) {
        this.viewType = "categories";
      } else {
        this.viewType = "product";
      }
      this.pageCount = data.total_pages;
    },
    scroll() {
      if(this.selectedNumber == "8"){
        let observer = new IntersectionObserver((entries) => {
          // Check if the scrollObserver is intersecting (visible)
          if (entries[0].isIntersecting) {
            this.selectedPage++;
            if (this.selectedPage <= this.pageCount) {
              this.fetchProducts();
            }
          }
        });
        // Observe the scrollObserver reference
        observer.observe(this.$refs.scrollObserver);
      }
    },
    clickedFilter(){
      this.$modal.show(
        () => import("~/components/shop/SidebarFilter.vue"),
        {
          adaptive: true,
          height:"500",
          class: "p-3",
        }
      );
    },
    selectShowStyle(style) {
      this.showStyle = style;
    },
    handleChange() {
      this.products = [];
      this.selectedPage = 1;
      this.scroll();
      this.fetchProducts();
      this.$router.push({ path: this.$route.path, query: {
            ...this.$route.query,
            page: 1,
          }, });
    },
    changeOrder() {
      this.selectedPage = 1;
      this.fetchProducts();
    },
    changeDirection() {
      this.selectedPage = 1;
      this.fetchProducts();
    },
    changePage(page) {
      if (page >= 1 && page <= this.pageCount) {
        this.selectedPage = page;
      this.$router.push({
        query: {
          ...this.$route.query,
          page: this.selectedPage,
        },
      });
      scrollTopHandler();
      
      }
    },
    showMore(category) {
      let query = {
        categories: category,
        page: 1,
        search: this.$route.query.search,
      };
      this.$router.push({ path: "shop", query: { ...query } });
    },

  },
};
</script>

<style scoped>
.filters{
  font-size: 16px;
}

@media screen and (max-width: 400px){
  .filters{
    width: 100%;
    margin-bottom: 15px;
    margin-top: 15px;
  }
}
@media screen and (max-width: 767px){
  .icon-mode-list{
    display: none;
  }
}
</style>
