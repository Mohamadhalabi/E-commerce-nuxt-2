<template>
  <div ref="topSellingWrapper">
    <pv-collection
      v-if="topSelling"
      :isIndexPage="true"
      :products="topSelling"
      :collectionTitle="collectionTitle"
      :link="link"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  components: {
    PvCollection: () => import("~/components/product/card/PvCollection.vue"),
  },
  computed: {
    ...mapGetters("header", ["getCurrency"]),
  },
  props: {
    isIndexPage: Boolean,
    collectionTitle: String,
    link: String,
  },
  data() {
    return {
      topSelling: null,
    };
  },
  mounted() {
    // Set up Intersection Observer after the component is mounted
    this.setupIntersectionObserver();
  },
  methods: {
    async fetchTopSellingProducts() {
      try {
        const topSellingProducts = await axios.get("products/top-selling-products2", {
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
        this.topSelling = topSellingProducts.data.top_selling;
      } catch (error) {
        console.error("Error fetching top selling products:", error);
      }
    },
    setupIntersectionObserver() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.fetchTopSellingProducts(); // Trigger the API call when the element is in view
            observer.disconnect(); // Disconnect after the first load
          }
        });
      });

      // Use the wrapper ref for the observer
      const element = this.$refs.topSellingWrapper;
      if (element) {
        observer.observe(element);
      } else {
        console.error('Wrapper element not found for intersection observer');
      }
    },
  },
  async fetch() {
    // You can call the fetchTopSellingProducts method here if you want it to load on page load too
    await this.fetchTopSellingProducts();
  },
};
</script>