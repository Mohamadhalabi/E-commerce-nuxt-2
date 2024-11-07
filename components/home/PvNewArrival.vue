<template>
  <div ref="newArrivalWrapper" class="col-xl-3 col-lg-6 col-md-6 col-12">
    <pv-small-collection
        v-if="isNewArrivalProducts"
        :products="isNewArrivalProducts"
        :collection-title="$t('home.newarrivalproducts')"
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
      isNewArrivalProducts: null,
    };
  },
  mounted() {
    // Set up the Intersection Observer after mounting
    this.setupIntersectionObserver();
  },
  methods: {
    async fetchNewArrivalProducts() {
      try {
        const new_arrival = await axios.get("products/new-arrival-three", {
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
        this.isNewArrivalProducts = new_arrival.data.new_arrival;
      } catch (error) {
        console.error("Error fetching new arrival products:", error);
      }
    },
    setupIntersectionObserver() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.fetchNewArrivalProducts();
            observer.disconnect(); // Disconnect after the first load
          }
        });
      });

      // Use the wrapper ref for the observer
      const element = this.$refs.newArrivalWrapper;
      if (element) {
        observer.observe(element);
      } else {
        console.error('Wrapper element not found for intersection observer');
      }
    },
  },
};
</script>