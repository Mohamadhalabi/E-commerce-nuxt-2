<template>
  <div class="ratings-container">
    <div class="product-ratings">
      <!-- Loop through the stars and apply filled, half-filled, or empty classes -->
      <span
        v-for="(star, index) in stars"
        :key="index"
        class="star"
        :class="{
          filled: index < fullStars, 
          half: index === fullStars && hasHalfStar, 
          empty: index >= fullStars + (hasHalfStar ? 1 : 0)
        }"
      />
    </div>
    <a
      v-if="!hideReviews"
      class="rating-link mx-2"
      @click="$router.push('?reviews=true')"
    >
      ({{ product.total_reviews > 0 ? `${product.total_reviews} Reviews` : $t('common.thereisnoreviewyet') }})
    </a>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    product: Object,
    hideReviews: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
    stars() {
      // Array for 5 stars
      return new Array(5).fill(0);
    },
    fullStars() {
      // Calculate the number of full stars based on the average rating
      return Math.floor(this.product.avg_rating); // Get the whole number part
    },
    hasHalfStar() {
      // Check if there should be a half star (e.g., if rating has a decimal like .5)
      return this.product.avg_rating % 1 >= 0.5;
    },
  },
};
</script>