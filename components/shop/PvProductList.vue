<template>
  <div>
    <NotFound v-if="products.length == 0 && show_not_found" />
    <div v-if="viewType == 'product'">
      <nav
        v-if="!products || (products && products.length > 0)"
        v-sticky class="toolbox">

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
                    @change="changeOrder">
                    <option value="type">{{ $t("shop.type")}}</option>
                    <option value="title_a_to_z">{{ $t("shop.title_a_to_z") }}</option>
                    <option value="title_z_to_a">{{ $t("shop.title_z_to_a") }}</option>
                    <option value="price_high_low">{{ $t("shop.price_high_low") }}</option>
                    <option value="price_low_high">{{ $t("shop.price_low_high") }}</option>
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
                    <option :value="4">4</option>
                    <option :value="12">12</option>
                    <option :value="16">16</option>
                    <option :value="20">20</option>
                    <option :value="24">24</option>
                    <option :value="8">All</option>
                  </select>
                </div>
                <i @click="selectShowStyle('grid')" style="cursor: pointer; font-size: 1.8rem" :class="{ 'orange-1': isSelected }" class="mx-2 icon-mode-grid" />
                <i @click="selectShowStyle('list')" style="cursor: pointer; font-size: 1.8rem" :class="{ 'orange-1': !isSelected }" class="mx-2 icon-mode-list" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div v-if="showStyle == 'grid'" class="row">
        <div
          v-for="item in products"
          :key="item.sku"
          class="col-6 col-sm-4 col-md-4 col-lg-4 col-xl-3">
          <pv-product :product="item" />
        </div>
        <div ref="scrollObserver"></div>
      </div>

      <template v-else class="row">
        <div
          v-for="item in products"
          :key="item.sku"
          class="col-12 mb-3">
          <pv-list-product :product="item" />
        </div>
        <div ref="scrollObserver"></div>
      </template>

      <div v-if="pageCount > 1 && selectedNumber !== 8" class="d-flex justify-content-center mt-4">
        <nav>
          <ul class="pagination flex-wrap justify-content-center">
            <!-- First -->
            <li class="page-item first-last" :class="{ disabled: selectedPage === 1 }">
              <a class="page-link" href="#" @click.prevent="changePage(1)">«</a>
            </li>

            <!-- Prev -->
            <li class="page-item" :class="{ disabled: selectedPage === 1 }">
              <a class="page-link" href="#" @click.prevent="changePage(selectedPage - 1)">‹</a>
            </li>

            <!-- Page numbers -->
            <li
              v-for="page in visiblePages"
              :key="page"
              class="page-item"
              :class="{ active: selectedPage === page, disabled: page === '...' }"
            >
              <a
                class="page-link"
                :class="{ 'bg-orange text-white border-0': selectedPage === page }"
                href="#"
                @click.prevent="typeof page === 'number' && changePage(page)"
              >
                {{ page }}
              </a>
            </li>

            <!-- Next -->
            <li class="page-item" :class="{ disabled: selectedPage === pageCount }">
              <a class="page-link" href="#" @click.prevent="changePage(selectedPage + 1)">›</a>
            </li>

            <!-- Last -->
            <li class="page-item first-last" :class="{ disabled: selectedPage === pageCount }">
              <a class="page-link" href="#" @click.prevent="changePage(pageCount)">»</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { scrollTopHandler } from "~/utils";

// ✅ Keep a global cancel token for products
let cancelTokenSource = null;

export default {
  components: {
    BaseButtonIcon1: () => import("../common/BaseButtonIcon1.vue"),
    NotFound: () => import("~/components/shop/NotFound.vue"),
    PvCollection: () => import("~/components/product/card/PvCollection.vue"),
    PvProduct: () => import("~/components/product/card/PvProduct.vue"),
    PvListProduct: () => import("~/components/product/card/PvListProduct.vue"),
  },

  async fetch() {
    await this.fetchProducts();
  },

  props: {
    value: Object,
    category: String,
    manufacturer: String,
    brand: String,
    slugtype: String,
    slug: String,
  },

  data() {
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
      type: "grid",
      orderBy: "created_at",
      ordering: "type",
    };
  },

  watch: {
    "$route.fullPath"() {
      this.fetchProducts();
      this.type = this.$route.query?.list_view ? "list" : "grid"; // ✅ safe
      this.selectedPage = parseInt(this.$route.query.page ?? 1);
    }
  },


  computed: {
    isSelected() {
      return this.showStyle === "grid";
    },
    visiblePages() {
      const total = this.pageCount;
      const current = parseInt(this.selectedPage);
      const pages = [];

      if (current > 4) {
        pages.push(1, "...");
      }
      for (let i = current - 1; i <= current + 1; i++) {
        if (i > 0 && i <= total) {
          pages.push(i);
        }
      }
      if (current < total - 1) {
        pages.push("...", total);
      }
      return pages;
    },
  },

  mounted() {
    this.selectedPage = parseInt(this.$route.query.page ?? this.selectedPage);
    this.scroll();
  },

  methods: {
    async fetchProducts() {
      // ✅ Cancel any previous pending request
      if (cancelTokenSource) {
        cancelTokenSource.cancel("Route changed - cancelling previous product request");
      }
      cancelTokenSource = axios.CancelToken.source();

      let tempQuery = "";
      let displayType = "normal";

      if (this.slugtype === "category") {
        tempQuery += `categories=${this.slug}`;
      } else if (this.slugtype === "manufacturer") {
        tempQuery += `manufacturers=${this.slug}`;
      } else if (this.slugtype === "brand") {
        tempQuery += `brands=${this.slug}`;
      }

      for (const property in this.$route.query) {
        tempQuery += `&${property}${
          this.$route.query[property] ? `=${this.$route.query[property]}` : ""
        }`;
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
      if (this.selectedNumber == "8") query += `&page=${this.selectedPage}`;

      try {
        const { data } = await axios.get(`search/product${query}`, {
          baseURL: process.env.API_BASE_URL,
          headers: {
            "Accept-Language": this.$i18n.locale,
            "Content-Type": "application/json",
            currency: this.$cookies.get("currency") || "USD",
            Accept: "application/json",
            "secret-key": process.env.SECRET_KEY,
            "api-key": process.env.API_KEY,
          },
          cancelToken: cancelTokenSource.token,
        });

        this.total_products = data.total;

        if (this.selectedNumber == "8") {
          this.products.push(...data.products);
        } else {
          this.products = data.products;
        }

        this.show_not_found = data.products.length === 0;
        this.viewType = data.products[0]?.category ? "categories" : "product";
        this.pageCount = data.total_pages;
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Previous product request cancelled");
        } else {
          console.error("Product request failed", err);
        }
      }
    },

    scroll() {
      if (this.selectedNumber == "8") {
        let observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            this.selectedPage++;
            if (this.selectedPage <= this.pageCount) {
              this.fetchProducts();
            }
          }
        });
        observer.observe(this.$refs.scrollObserver);
      }
    },

    selectShowStyle(style) {
      this.showStyle = style;
    },

    handleChange() {
      this.products = [];
      this.selectedPage = 1;
      this.scroll();
      this.fetchProducts();
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, page: 1 },
      });
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
      if (page === this.selectedPage) return;
      if (page >= 1 && page <= this.pageCount) {
        this.$router.push({ query: { ...this.$route.query, page } });
      }
    },

    showMore(category) {
      this.$router.push({
        path: "shop",
        query: { categories: category, page: 1, search: this.$route.query.search },
      });
    },
  },
};
</script>

<style scoped>
.filters {
  font-size: 16px;
}
@media screen and (max-width: 400px) {
  .filters {
    width: 100%;
    margin-bottom: 15px;
    margin-top: 15px;
  }
  .first-last{
    display: none;
  }
}
@media screen and (max-width: 767px) {
  .icon-mode-list {
    display: none;
  }
}
.pagination.flex-wrap {
  flex-wrap: wrap;
  row-gap: 0.25rem;
}
.bg-orange {
  background-color: #ff6600 !important;
}

.page-item.active .page-link {
  background-color: #ff6600 !important;
  color: white !important;
  border: none !important;
}

</style>
