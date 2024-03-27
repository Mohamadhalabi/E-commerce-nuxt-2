<template>
  <div>
    <Carousel main ref="main" :loop="false" :peek-left="10" :peek-right="10" :paginate-by-slide="true">
      <div v-for="(image, index) in product.gallery" :key="index" class="slide rounded-5"
           @mouseenter="mouseEntered" @mouseleave="mouseLeft"
      >
        <ImageMagnifier
          :image="image"
          size="l"
          :isMouseInside="isMouseInside"
          :highlightImage="highlightImage"
          />
      </div>
    </Carousel>
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
        :class="`slide--${index} slide--thumbniail`"
        @click="gotoMainCarousel(index)"
      >
        <img
          class="rounded-5"
          :src="image['s'].url"
          style="border: 1px solid #e7e7e6!important;"
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
import PvGalleryImage2 from "~/components/product/partials/PvGalleryImage2.vue";
import ImageMagnifier from "~/components/product/partials/ImageMagnifier.vue";
import Carousel from "vue-ssr-carousel";

export default {
  name: "Example4",
  components: { ImageMagnifier, PvGalleryImage2, Carousel },
  props: {
    product: Object,
  },
  data() {
    return {
      highlightImage: false,
      isMouseInside:false
    };
  },
  methods: {
    gotoMainCarousel(index) {
      this.$refs.main.goto(index);
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
