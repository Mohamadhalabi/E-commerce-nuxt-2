<template>
  <main class="main skeleton-body">
    <div class="container">
      <nav
        aria-label="breadcrumb"
        class="breadcrumb-nav">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <nuxt-link to="/">
               {{ $t('shop.home') }}
            </nuxt-link>
          </li>
          <li class="breadcrumb-item">
            <nuxt-link to="/shop">
             {{ $t('shop.shop') }}
             </nuxt-link>
          </li>
          <li class="breadcrumb-item active">
            <h1 class="breadcrumb-item d-flex m-0">{{title}}</h1>
          </li>
        </ol>
      </nav>
      <div class="col-md-12">
        <ShopBanner v-if="category" :image="category.banner"/>
        <ShopBanner v-if="manufacturer" :image="manufacturer.banner"/>
      </div>
      <div class="row">
        <div class="col-lg-10">
          <pv-product-list
            :slug="slug"
            :slugtype="slugtype"
            @sort-by="sortBy"
            @direction-by="changeDirection"
            @filters="displayFilters"
          />
          <div class="category-desc mt-3">
            <div v-if="description" v-html="description"/>
          </div>
        </div>
        <div class="sidebar-shop col-lg-2 order-lg-first mobile-sidebar p-0" sticky-container>
          <div v-sticky="isSticky" sticky-offset="{top: 75}">
            <sidebar-filter v-if="category" :category="category.slug"/>
            <sidebar-filter v-if="manufacturer" :manufacturer="manufacturer.slug"/>
            <sidebar-filter v-if="brand" :brand="brand.slug"/>
          </div>
        </div>
      </div>
      <div class="filter-modal">
        <b-modal
          id="bv-modal-example2"
          v-model="openModal" hide-header hide-footer>
          <div class="sidebar-shop col-lg-2 order-lg-first p-4" sticky-container>
            <client-only>
              <div
                v-sticky="isSticky" sticky-offset="{top: 75}">
                <sidebar-filter v-if="category" :category="category.slug"/>
                <sidebar-filter v-if="manufacturer" :manufacturer="manufacturer.slug"/>
                <sidebar-filter v-if="brand" :brand="brand.slug"/>
              </div>
            </client-only>
          </div>
        </b-modal>
      </div>
    </div>
  </main>
</template>

<script>
import ShopBanner from '~/components/shop/PvShopBanner';
import PvProductList from "~/components/shop/PvProductList.vue";
import SidebarFilter from "~/components/shop/SidebarFilter.vue";
export default {
  name: 'ShopTemplate',
  components: {
    PvProductList,
    ShopBanner,
    SidebarFilter,
  },
  props: {
    category: {
      type: Object
    },
    manufacturer: {
      type: Object
    },
    brand: {
      type: Object
    }
  },
  data() {
    return {
      dataShop: {
        products: []
      },
      queryFilter: {
        sintax: '?',
        page: 1
      },
      isSticky: false,
      page: 1,
      pageCount: 1,
      selectedPage: 1,
      orderBy: 'created_at',
      directionBy: 'asc',
      slugtype: null,
      description: null,
      slug: null,
      title: null,
      openModal: false,
    };
  },
  created() {
    if (this.category) {
      this.slug = this.category.slug;
      this.description = this.category.description;
      this.slugtype = "category";
      this.title = this.category.title;

    } else if (this.manufacturer) {
      this.slug = this.manufacturer.slug;
      this.description = this.manufacturer.description;
      this.slugtype = "manufacturer";
      this.title = this.manufacturer.title;


    } else if (this.brand) {
      this.slug = this.brand.slug;
      this.description = this.brand.description;
      this.slugtype = "brand";
      this.title = this.brand.title;
    }

  },
  methods: {
    displayFilters(val){
      if(val){
        this.openModal = true
      }
    },
    sortBy(sortBy) {
      this.orderBy = sortBy;
      this.getProduct(this.slug);
    },
    changeDirection(directionBy) {
      this.directionBy = directionBy;
      this.getProduct(this.slug);
    }
  }
}
;
</script>

<style>
.category-desc {
  background-color: #FBFBFB;
  box-shadow: rgb(0 0 0 / 20%) 0px 1px 10px;
  padding: 30px;
  font-size: 1.7rem;
  line-height: 1.5;
}
#bv-modal-example2{
  display: flex!important;
}
@media screen and (max-width: 993px) {
  .mobile-sidebar {
    display: none;
  }
}
</style>
