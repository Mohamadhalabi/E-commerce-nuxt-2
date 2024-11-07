<template>
  <div ref="latestProductsWrapper">
    <pv-collection
      v-if="latestProducts2"
      :isIndexPage="true"
      :products="latestProducts2"
      :collectionTitle="$t('home.latestProducts')"
      :link="link"
    />
  </div>
</template>

<script>
import axios from "axios";
export default {
  components: {
    PvCollection: () => import("~/components/product/card/PvCollection.vue"),
  },
  props: {
    isIndexPage: Boolean,
    collectionTitle: String,
    link: String,
  },
  data() {
    return {
      latestProducts2: null,
    };
  },
  mounted() {
    // Set up Intersection Observer after the component is mounted
    this.setupIntersectionObserver();
  },
  methods: {
    async fetchLatestProducts() {
      try {
        const new_arrival = await axios.get("products/new-arrival2", {
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
        this.latestProducts2 = new_arrival.data.new_arrival;
      } catch (error) {
        console.error("Error fetching latest products:", error);
      }
    },
    setupIntersectionObserver() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.fetchLatestProducts(); // Trigger the API call when the element is in view
            observer.disconnect(); // Disconnect after the first load
          }
        });
      });

      // Use the wrapper ref for the observer
      const element = this.$refs.latestProductsWrapper;
      if (element) {
        observer.observe(element);
      } else {
        console.error('Wrapper element not found for intersection observer');
      }
    },
  },
};
</script>