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
            {{ $t("products.clearance_sale") }}
          </li>
        </ol>
      </nav>
      <div class="container">
        <h1 class="promotion additional-product-items mb-3">{{ $t("products.clearance_sale") }}</h1>
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
  import axios from "axios";
  import { mapGetters } from 'vuex';
  import PvProduct from "~/components/product/card/PvProduct.vue";
  
  export default {
    async asyncData({ app, error }) {
      try {
        const { data } = await axios.get(`/clearance-sale`, {
          baseURL: process.env.API_BASE_URL,
          headers: {
            'Accept-Language': app.i18n.locale,
            'Content-Type': 'application/json',
            'currency': app.$cookies.get('currency') || 'USD',
            'Accept': 'application/json',
            'secret-key': process.env.SECRET_KEY,
            'api-key': process.env.API_KEY,
          },
        });
        return {
          products: data.data,
        };
      } catch (err) {
        console.error(err);
        error({ statusCode: err.response?.status || 500, message: err.message || 'Failed to load clearance sale products' });
      }
    },
    head() {
      return {
        title: this.$t("products.clearance_sale"),
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.$t("products.clearance_sale_description") || 'Explore great discounts on clearance sale items. Don’t miss out on these offers!',
          }
        ]
      };
    },
    components: {
      PvProduct,
    },
    data() {
      return {
        products: [],
      };
    },
    computed: {
      ...mapGetters('rtlStore', ['getIsAr'])
    },
    mounted() {
    },
  };
  </script>
  
  <style>
  .promotion {
    font-size: 32px !important;
  }
  </style>  