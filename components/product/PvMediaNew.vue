<template>
  <div>
    <div class="product-default">
      <pv-label-group :singeleProduct="true" :product="product" />
    </div>
    <ImageMagnifier :image="product.gallery" :currentIndex="currentIndex" size="l" :isMouseInside="isMouseInside" />
    <Carousel
      thumbnails
      ref="thumbnails"
      :slides-per-page="4"
      :show-arrows="true"
      :loop="true"
    >
      <div
        v-for="(image, index) in product.gallery"
        :key="index"
        style="padding: 10px"
        class="thumbnail-image"
        @click="gotoMainCarousel(index)"
      >
        <nuxt-img
        sizes="sm:150px md:150px lg:150px"
        format="webp"
        width="150"
        height="150"
        class="rounded-5"
        :src="image['s'].url"
        :alt="getAltText(image['s'].url)"
        style="border: 1px solid #e7e7e6!important;"
        loading="lazy"
        />
      </div>
      <template #back-arrow="{ disabled }">
        <i class="prevButton fa fa-chevron-left"></i>
      </template>
      <template #next-arrow="{ disabled }">
        <i class="nextButton fa fa-chevron-right"></i>
      </template>
    </Carousel>
  </div>
</template>

<script>
import ImageMagnifier from "~/components/product/partials/ImageMagnifier.vue";
import Carousel from "vue-ssr-carousel";
import PvLabelGroup from "~/components/product/partials/PvLabelGroup.vue";

export default {
  name: "Media New",
  components: { PvLabelGroup, ImageMagnifier, Carousel },
  props: {
    product: Object,
  },
  data() {
    return {
      highlightImage: false,
      isMouseInside: false,
      currentIndex: 0, // Track the current index for the main image
    };
  },
  methods: {
    getAltText(url) {
      // Get the last part of the URL after the last '/'
      const fileName = url.split('/').pop();
      // Remove the file extension and replace hyphens with spaces
      const altText = fileName.replace(/-+/g, ' ').replace(/\.[^/.]+$/, '');
      return altText;
    },
    gotoMainCarousel(index) {
      this.currentIndex = index; // Update the main image when a thumbnail is clicked
      this.highlightImage = true;
    },
    mouseEntered() {
      this.isMouseInside = true;
    },
    mouseLeft() {
      this.isMouseInside = false;
    }
  },
};
</script>
