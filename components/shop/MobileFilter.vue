<template>
  <div class="sidebar-wrapper">
    <!-- Header with back and total results -->
    <div class="p-0 pb-2 border-bottom">
      <div @click="goToPreviousPage()" class="mb-1">
        <i class="fa fa-chevron-left"></i>
        <span class="previous-page">Back To Previous Page</span>
      </div>

      <div class="d-flex align-items-center justify-content-between">
        <span style="color: #f07905; text-decoration: underline; cursor: pointer">
          ({{ total }}) {{ $t('shop.results') }}
        </span>
        <nuxt-link :to="getLink('/shop')">
          <base-button-icon-1 v-if="$route.fullPath != '/shop'" :outline="true">
            {{ $t('shop.clear_all') }}
          </base-button-icon-1>
        </nuxt-link>
      </div>

      <!-- Active filter pills -->
      <ul class="my-2 d-flex align-items-center flex-wrap">
        <li
          v-for="item in checked_items"
          :key="item.slug"
          class="border p-1 shadow-sm rounded-2 filtergroup d-flex"
        >
          <img
            src="/images/icons/icons8-x-button.svg"
            style="margin-left: 3px; margin-right: 5px"
            width="20px"
            @click="filterQuery({ slug: item.slug, type: item.group })"
          />
          {{ item.name }}
        </li>
      </ul>
    </div>

    <!-- Horizontal filter buttons -->
    <div class="filter-scroll-wrapper d-flex overflow-auto gap-2 py-2 px-1">
        <!-- Normal filters -->
        <button
        v-for="(item, index) in Object.entries(filter)"
        v-if="typeof item[1] !== 'number' && item[0] !== 'checked_items' && item[0] !== 'attributes'"
        :key="item[0]"
        class="btn btn-outline-orange rounded-pill px-3 py-1 text-nowrap"
        @click="openFilterModal(item[1], item[0])"
        >
        {{ item[1].group_name }}
        </button>

        <!-- Attribute filters -->
        <button
        v-if="attributeFilters?.items"
        class="btn btn-outline-orange rounded-pill px-3 py-1 text-nowrap"
        @click="openAllAttributesModal"
        >
        Attributes
        </button>
    </div>

    <!-- Modal for filter options -->
    <div v-if="activeFilter" class="filter-modal-backdrop" @click.self="activeFilter = null">
    <div class="filter-modal">
        <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="m-0">{{ activeFilter.group_name }}</h5>
        <button @click="activeFilter = null" class="btn btn-sm btn-light">Close</button>
        </div>

        <!-- ✅ Show content only if items exist -->
        <div v-if="activeFilter.items && activeFilter.items.length">
        <MobileFilterItem
            :item="activeFilter"
            :name="activeFilterKey"
            :slugtype="slugtype"
            :attributeFilters="attributeFilters"
            :selectedCategory="selected_category"
            :selectedManufacture="selected_manufacture"
            @filter-query="filterQuery"
        />
        </div>
        <div v-else>
        <p>No filters available for this group.</p>
        </div>
    </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { scrollTopHandler } from "~/utils";
import axios from "axios";
import MobileDetect from "mobile-detect";

// ✅ Track cancel tokens so we can abort previous requests
let cancelTokenSource = null;

export default {
  name: "SidebarFilter",
  components: {
    MobileFilterItem: () => import("~/components/shop/MobileFilterItem.vue"),
    BaseButtonIcon1: () => import("../common/BaseButtonIcon1.vue"),
  },
  props: {
    category: String,
    manufacturer: String,
    brand: String,
  },
  data() {
    return {
      slugtype: "",
      total: 0,
      checked_items: [],
      filter: [],
      attributeFilters: null,
      selected_category: null,
      selected_manufacture: null,
      activeFilter: null,
      activeFilterKey: "",
    };
  },
  watch: {
    '$route.query': {
      deep: true,
      immediate: true,
      handler(newQuery, oldQuery) {
        // ✅ Skip if only the "page" query changed
        if (oldQuery && Object.keys(newQuery).length === Object.keys(oldQuery).length) {
          const onlyPageChanged =
            Object.keys(newQuery).every(key => 
              key === 'page' || newQuery[key] === oldQuery[key]
            );

          if (onlyPageChanged) return; // 🔹 Don't call filters API
        }

        // Otherwise update filters
        this.explodeFilter(newQuery);
      }
    }
  },
  computed: {
    ...mapGetters("language", ["getLang"]),
  },
  methods: {
    openAllAttributesModal() {
      const attrFilter = {
        group: "attributes",
        group_name: "Attributes",
        type: "checkbox",
      };
      this.activeFilter = attrFilter;
      this.activeFilterKey = "attributes";
    },

    goToPreviousPage() {
      this.$router.go(-1);
    },

    getLink(route) {
      return this.getLang === "en" ? route : `/${this.getLang}${route}`;
    },

    openFilterModal(item, key) {
      this.activeFilter = item;
      this.activeFilterKey = key;
    },

    async explodeFilter(query) {
      // ✅ Cancel previous pending request
      if (cancelTokenSource) {
        cancelTokenSource.cancel("Route changed - cancelling previous filter request");
      }
      cancelTokenSource = axios.CancelToken.source();

      // ✅ Mobile-only logic stays
      let isMobile = false;
      if (process.server && this.$ssrContext?.req) {
        const userAgent = this.$ssrContext.req.headers["user-agent"];
        const md = new MobileDetect(userAgent);
        isMobile = !!md.mobile() || !!md.tablet();
      }
      if (process.client && window.innerWidth < 993) {
        isMobile = true;
      }
      if (!isMobile) return; // mobile only

      // Determine slug_type
      let slug_type = this.category
        ? "category"
        : this.brand
        ? "brand"
        : this.manufacturer
        ? "manufacturer"
        : "";
      this.slugtype = slug_type;

      // Prepare payload
      let dataForm = {
        categories: this.category,
        brands: this.brand,
        manufacturers: this.manufacturer,
        attributes: query,
        slug_type,
        language: this.getLang,
        main_manufacturer: this.manufacturer,
      };

      for (const property in query) {
        dataForm[property] = query[property]
          ? query[property].split(",").toString()
          : true;
      }

      const currency = this.$cookies.get("currency") || "USD";
      const axiosConfig = {
        baseURL: process.env.API_BASE_URL,
        headers: {
          "Accept-Language": this.$i18n.locale,
          "Content-Type": "application/json",
          currency,
          Accept: "application/json",
          "secret-key": process.env.SECRET_KEY,
          "api-key": process.env.API_KEY,
        },
        cancelToken: cancelTokenSource.token,
      };

      try {
        const response = await axios.post("/search/filter", dataForm, axiosConfig);
        this.filter = response.data;
        this.total = response.data.total;
        this.checked_items = response.data.checked_items.items;
        this.attributeFilters = response.data.attributes;
        this.selected_category = response.data.categories?.selected || null;
        this.selected_manufacture = response.data.manufacturers?.selected || null;
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Previous mobile filter request cancelled");
        } else {
          console.error("Mobile filter request failed", err);
        }
      }
    },

    filterQuery(data) {
      scrollTopHandler();
      let tempQuery = { ...this.$route.query };
      let selector = "";
      const queryParameters = [
        "manufacturer",
        "brands",
        "category",
        "manufacturer-type",
      ];
      const hasQuery = queryParameters.some((param) =>
        this.$route.query.hasOwnProperty(param)
      );

      const path = this.$route.path;
      const parts = path.split("/");
      const firstPart = parts[1] || "";

      if (data.type === "others_filter") {
        if (tempQuery.hasOwnProperty(data.slug)) {
          delete tempQuery[data.slug];
        } else {
          tempQuery[data.slug] = null;
        }
      } else if (data.type === "manufacturers") {
        if (data.slug === tempQuery.manufacturers) {
          delete tempQuery.manufacturers;
        }
      } else {
        selector = tempQuery[data.type] ? tempQuery[data.type].split(",") : [];
        const index = selector.indexOf(data.slug);
        if (index > -1) {
          selector.splice(index, 1);
          if (!selector.length) {
            if (tempQuery.brands === tempQuery[data.type]) {
              Object.keys(tempQuery).forEach((key) => delete tempQuery[key]);
            }
            delete tempQuery[data.type];
          } else {
            tempQuery[data.type] = selector.toString();
          }
        } else {
          selector.push(data.slug);
          tempQuery[data.type] = selector.toString();
        }
      }

      tempQuery["page"] = 1;

      if (data.slug === firstPart) {
        if (hasQuery) {
          this.$router.push({ path: "/shop?" + firstPart });
        } else {
          this.$router.push({ path: "/shop" });
        }
      } else {
        this.$router.push({
          path: this.$route.path,
          query: { ...tempQuery },
        });
      }
    },
  },
};
</script>

<style>
.filter-scroll-wrapper {
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}
.filter-scroll-wrapper::-webkit-scrollbar {
  display: none;
}
.btn-outline-orange {
  border: 1px solid #f07905;
  color: #f07905;
  background-color: white;
}
.btn-outline-orange:active,
.btn-outline-orange.active {
  background-color: #f07905;
  color: white;
}
.filter-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}
.filter-modal {
  background: white;
  padding: 20px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  border-radius: 12px;
}

</style>
