<template>
  <div ref="onSaleWrapper" class="col-xl-3 col-lg-6 col-md-6 col-12">
    <pv-small-collection
      v-if="onSaleProducts"
      :products="onSaleProducts"
      :collection-title="$t('home.onSaleProduct')"
      :animation-delay="'200'"
      :link="link"
    />
  </div>
</template>

<script>
import axios from "axios";
export default {
  components: {
    PvSmallCollection: () => import("~/components/product/card/PvSmallCollection.vue"),
  },
  props: {
    link: String,
  },
  data() {
    return {
      onSaleProducts: null,
    };
  },
  mounted() {
    // Set up Intersection Observer after the component is mounted
    this.setupIntersectionObserver();
  },
  methods: {
    async fetchOnSaleProducts() {
      try {
        const getOnSaleProducts = await axios.get("products/on-sale-products", {
          baseURL: process.env.API_BASE_URL,
          headers: {
            'Accept-Language': this.$i18n.locale,
            'Content-Type': 'application/json',
            'currency': this.$cookies.get('currency') || 'USD',
            'Accept': 'application/json',
            'secret-key': process.env.SECRET_KEY,
            'api-key': process.env.API_KEY,
          },
        });
        this.onSaleProducts = getOnSaleProducts.data.products;
      } catch (error) {
        console.error("Error fetching on-sale products:", error);
      }
    },
    setupIntersectionObserver() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.fetchOnSaleProducts();
            observer.disconnect(); // Disconnect after the first load
          }
        });
      });

      // Use the wrapper ref for the observer
      const element = this.$refs.onSaleWrapper;
      if (element) {
        observer.observe(element);
      } else {
        console.error('Wrapper element not found for intersection observer');
      }
    },
  },
};
</script>