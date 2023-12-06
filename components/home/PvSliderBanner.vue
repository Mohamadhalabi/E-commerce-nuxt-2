<template>
  <div>
    <section class="intro-section">
      <div class="container">
        <div class="row">
          <div
            v-if="rondomProduct.length > 0"
            class="d-flex flex-column align-items-center justify-content-between col-xl-4 col-lg-4 col-md-8 ml-auto mr-auto">
            <pv-banner-card
              class="mt-lg-1 left-banner"
              v-animate
              :width="350"
              :height="350"
              :rondomProduct="rondomProduct[2]"
              background-image-url='../images/abstract/abstract-gray.jpg'
              :secondBackround="true"
              :left="true"
            ></pv-banner-card>

            <pv-banner-card
              class="mb-lg-4 left-banner"
              v-animate
              :width="350"
              :height="350"
              :rondomProduct="rondomProduct[3]"
              background-image-url='../images/abstract/orange-abstract2.webp'
              :secondBackround="true"
              :left="true"
            ></pv-banner-card>
          </div>

          <div class="col-xl-4 col-lg-4 align-content-center mt-auto mb-auto large-screen-only">
            <pv-carousel
              class="rounded-5"
              :options="baseSlider6"
              v-animate
            >
              <div
                v-for="(slide, index) in slides"
                :key="index"
                class="swiper-slide boxed-slide rounded-5"
                :class="`boxed-slide-${index}`"
              >
                <a :href="slide.link" target="_blank">
                    <nuxt-img
                      format="webp"
                      loading="lazy"
                      class="slide-bg rounded-5 ml-auto mr-auto mt-1"
                      :src="slide.image"
                      width="450"
                      height="650"
                      alt="banner"
                      :open_graph="slide['open_graph']"
                      :scal="slide['scal']"
                      :description="slide['description']"
                    />
                </a>
              </div>
            </pv-carousel>
          </div>

          <div v-if="rondomProduct.length > 0" class="d-flex flex-column align-items-center justify-content-between col-xl-4 col-lg-4 col-md-8 ml-auto mr-auto">
            <pv-banner-card
              class="d-none d-lg-block mt-1"
              :height="250"
              :width="250"
              :rondomProduct="rondomProduct[4]"
              v-animate
              background-image-url='"../images/abstract/orange-abstract.jpg"'
              :third_item="true"
            ></pv-banner-card>
            <pv-banner-card
              class="d-none d-lg-block"
              :height="250"
              :width="250"
              :rondomProduct="rondomProduct[0]"
              v-animate
              background-image-url='"../images/abstract/gray-abstract-2.webp"'
              :fourth_item="true"
            ></pv-banner-card>
            <pv-banner-card
              class="d-none d-lg-block mb-4"
              :height="250"
              :width="250"
              :rondomProduct="rondomProduct[1]"
              v-animate
              background-image-url='../images/abstract/abstract-yellow.jpg'
              :fourth_item="true"
            >

            </pv-banner-card>
            <pv-banner-card
              class="d-lg-none"
              :height="350"
              :width="350"
              :rondomProduct="rondomProduct[1]"
              v-animate
              background-image-url='"../images/test22.avif"'
              :custom_color="true"
            ></pv-banner-card>
            <pv-banner-card
              class="d-lg-none"
              :height="350"
              :width="350"
              :rondomProduct="rondomProduct[3]"
              v-animate
              background-image-url='../images/background1.webp'
            ></pv-banner-card>
            <pv-banner-card
              class="d-lg-none"
              :height="350"
              :width="350"
              :rondomProduct="rondomProduct[4]"
              v-animate
              background-image-url='"../images/test22.avif"'
              :custom_color="true"
            ></pv-banner-card>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import PvCarousel from "~/components/features/PvCarousel";
import { baseSlider6 } from "~/utils/data/carousel";
import Api from "~/api";
import PvBannerCard from "../product/card/PvBannerCard.vue";
export default {
  components: {
    PvCarousel,
    PvBannerCard,
  },
  data: function () {
    return {
      slides: [],
      baseSlider6,
      rondomProduct: [],
    };
  },
  async fetch() {
    await this.getSlides();
    await this.getRandomProduct();
  },
  methods: {
    async getSlides() {
      try {
        const response = await Api.get("sliders?type=banner");
        this.slides = response.data.result;
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    },
    async getRandomProduct() {
      try {
        const response = await Api.get("products/random-products");
        this.rondomProduct = response.data.products;
      } catch (error) {
        console.error("Error fetching random products:", error);
      }
    },
  },
};
</script>
<style scoped>
@media screen and (max-width: 992px)
{
  .large-screen-only{
    display: none;
  }
}
</style>
