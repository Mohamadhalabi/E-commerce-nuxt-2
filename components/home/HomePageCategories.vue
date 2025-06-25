<template>
  <div class="container">
    <div class="col-lg-12 additional-product-items d-flex">
      <h3 class="m-0 home-page-title">
            {{ $t('home.popularCategories') }}
      </h3></div>
    <div class="row text-center">
      <div class="col-6 col-md-4 col-lg-2 mt-4" v-for="(item, index) in categories_data" :key="index">
        <nuxt-link :to="getLinkk(item.link)" class="circle-link">
          <div class="circle-image-wrapper">
            <img :src="item.image" :alt="item.name" class="circle-image" />
          </div>
          <div class="circle-title mt-1">{{ item.name }}</div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      categories_data: [],
    };
  },
  async fetch() {
    try {
      const response = await this.$axios.get('/get-categories', {
        headers: {
          'Accept-Language': this.$i18n.locale,
          'Content-Type': 'application/json',
          'currency': this.$cookies.get('currency') || 'USD',
          'Accept': 'application/json',
          'secret-key': process.env.SECRET_KEY,
          'api-key': process.env.API_KEY,
        },
      });

      this.categories_data = response.data.category_data || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  },
  computed: {
    ...mapGetters("language", ["getLang"]),
  },
  methods: {
    getLinkk(route) {
      if (this.getLang === 'en') {
        return route; // Return the route as is without the language parameter
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    },
  },
};
</script>

<style>
.circle-image-wrapper {
  width: 120px;
  height: 120px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.circle-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  transform: scale(0.9);
}

.circle-link:hover .circle-image-wrapper {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.circle-title {
  font-weight: 500;
  font-size: 15px;
  color: #333;
  transition: all 0.3s ease;
}

.circle-link:hover .circle-title {
  color: #000;
  font-weight: 600;
}
</style>