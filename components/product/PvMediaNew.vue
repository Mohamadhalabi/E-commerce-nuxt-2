<template>
  <div>
    <div class="product-default">
      <pv-label-group :singeleProduct="true" :product="product" />
    </div>

    <ImageMagnifier
      style="width: 100%; height: auto;"
      :image="product.gallery"
      :currentIndex="currentIndex"
      size="l"
      :isMouseInside="isMouseInside"
    />

    <Carousel
      v-if="product && product.gallery.length > 1"
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
        :loading="index === 0 ? 'eager' : 'lazy'"
        :fetchpriority="index === 0 ? 'high' : undefined"
        :preload="index === 0"
        sizes="sm:150px md:150px lg:150px"
        format="webp"
        width="150"
        height="150"
        class="rounded-5"
        :src="image['s'].url"
        :alt="getAltText(image['s'].url)"
        style="border: 1px solid #e7e7e6!important; object-fit: contain;"
      />
      </div>

      <!-- Replace font-awesome arrows with SVG -->
      <template #back-arrow="{ disabled }">
        <svg
          class="prevButton"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L6.707 7l4.647 4.646a.5.5 0 0 1-.708.708l-5-5a.5.5 0 0 1 0-.708l5-5a.5.5 0 0 1 .708 0z"
          />
        </svg>
      </template>

      <template #next-arrow="{ disabled }">
        <svg
          class="nextButton"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l5 5a.5.5 0 0 1 0 .708l-5 5a.5.5 0 0 1-.708-.708L9.293 7 4.646 2.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </template>
    </Carousel>
  </div>
</template>

<script>
import ImageMagnifier from "~/components/product/partials/ImageMagnifier.vue";
import PvLabelGroup from "~/components/product/partials/PvLabelGroup.vue";

export default {
  name: "MediaNew",
  components: {
    PvLabelGroup,
    ImageMagnifier,
    Carousel: () => import('vue-ssr-carousel'),
  },
  props: {
    product: Object,
  },
  data() {
    return {
      highlightImage: false,
      isMouseInside: false,
      currentIndex: 0,
    };
  },
  methods: {
    getAltText(url) {
      const fileName = url.split("/").pop();
      return fileName.replace(/-+/g, " ").replace(/\.[^/.]+$/, "");
    },
    gotoMainCarousel(index) {
      this.currentIndex = index;
      this.highlightImage = true;
    },
    mouseEntered() {
      this.isMouseInside = true;
    },
    mouseLeft() {
      this.isMouseInside = false;
    },
  },
};
</script>