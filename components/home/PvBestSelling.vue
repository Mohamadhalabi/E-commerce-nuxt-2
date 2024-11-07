<template>
  <div ref="bestSellingProductsWrapper">
    <pv-collection
      v-if="bestSellingProducts2"
      style="padding: 25px;"
      :isIndexPage="true"
      :products="bestSellingProducts2"
      :collectionTitle="$t('home.bestSellingProducts')"
      :link="link"
    />
  </div>
</template>

<script>
import axios from "axios";
export default {
  components: {
    PvCollection: () => import ("~/components/product/card/PvCollection.vue"),
  },
  props: {
    isIndexPage: Boolean,
    collectionTitle: String,
    link: String,
  },
  data() {
    return {
      bestSellingProducts2: null,
    };
  },
  mounted() {
    // Set up Intersection Observer after the component is mounted
    this.setupIntersectionObserver();
  },
  methods: {
    async fetchBestSellingProducts() {
      try {
        const best_seller = await axios.get("products/best-seller2", {
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
        this.bestSellingProducts2 = best_seller.data.best_seller;
      } catch (error) {
        console.error("Error fetching best selling products:", error);
      }
    },
    setupIntersectionObserver() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.fetchBestSellingProducts(); // Trigger the API call when the element is in view
            observer.disconnect(); // Disconnect after the first load
          }
        });
      });

      // Use the wrapper ref for the observer
      const element = this.$refs.bestSellingProductsWrapper;
      if (element) {
        observer.observe(element);
      } else {
        console.error('Wrapper element not found for intersection observer');
      }
    },
  },
};
</script>