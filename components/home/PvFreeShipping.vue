<template>
  <div ref="freeShippingWrapper" class="col-xl-3 col-lg-6 col-md-6 col-12">
    <pv-small-collection
      v-if="isFreeShippingProducts"
      :products="isFreeShippingProducts"
      :collection-title="$t('home.freeshoppingproducts')"
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
      isFreeShippingProducts: null,
    };
  },
  mounted() {
    // Set up Intersection Observer after the component is mounted
    this.setupIntersectionObserver();
  },
  methods: {
    async fetchFreeShippingProducts() {
      try {
        const getFreeShippingProducts = await axios.get("products/free-shipping-three", {
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
        this.isFreeShippingProducts = getFreeShippingProducts.data.products;
      } catch (error) {
        console.error("Error fetching free shipping products:", error);
      }
    },
    setupIntersectionObserver() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.fetchFreeShippingProducts();
            observer.disconnect(); // Disconnect after the first load
          }
        });
      });

      // Use the wrapper ref for the observer
      const element = this.$refs.freeShippingWrapper;
      if (element) {
        observer.observe(element);
      } else {
        console.error('Wrapper element not found for intersection observer');
      }
    },
  },
};
</script>