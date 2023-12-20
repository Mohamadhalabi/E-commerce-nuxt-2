<template>
  <div v-if="rondomProduct.length > 0">
    <section class="intro-section">
      <div class="container">
        <div class="row">
          <div class="d-flex flex-column align-items-center justify-content-between col-xl-4 col-lg-4 col-md-8 ml-auto mr-auto">
            <pv-banner-card
                class="d-none d-lg-block mt-1"
                :height="250"
                :width="250"
                :rondomProduct="rondomProduct[0]"
                v-animate
                background-image-url='"../images/home/backgrounds/1-min.png"'
            ></pv-banner-card>
            <pv-banner-card
                class="d-none d-lg-block"
                :height="250"
                :width="250"
                :rondomProduct="rondomProduct[1]"
                v-animate
                background-image-url='"../images/home/backgrounds/2-min.jpg"'
                :fourth_item="true"
            ></pv-banner-card>
            <pv-banner-card
                class="d-none d-lg-block mb-4"
                :height="250"
                :width="250"
                :rondomProduct="rondomProduct[2]"
                v-animate
                background-image-url='"../images/home/backgrounds/3-min.jpg"'
                :fourth_item="true"
            >
            </pv-banner-card>
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

          <div class="d-flex flex-column align-items-center justify-content-between col-xl-4 col-lg-4 col-md-8 ml-auto mr-auto">
            <pv-banner-card
              class="d-none d-lg-block mt-1"
              :height="250"
              :width="250"
              :rondomProduct="rondomProduct[3]"
              v-animate
              background-image-url='"../images/home/backgrounds/1-min.png"'
            ></pv-banner-card>
            <pv-banner-card
              class="d-none d-lg-block"
              :height="250"
              :width="250"
              :rondomProduct="rondomProduct[4]"
              v-animate
              background-image-url='"../images/home/backgrounds/2-min.jpg"'
              :fourth_item="true"
            ></pv-banner-card>
            <pv-banner-card
              class="d-none d-lg-block mb-4"
              :height="250"
              :width="250"
              :rondomProduct="rondomProduct[5]"
              v-animate
              background-image-url='"../images/home/backgrounds/3-min.jpg"'
              :fourth_item="true"
            >
            </pv-banner-card>
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
    const responseBanner = await Api.get("sliders?type=banner");
    this.slides = responseBanner.data.result;

    const response = await Api.get("products/random-products");
    this.rondomProduct = response.data.products;
  },
  methods: {
    // async getSlides() {
    //   try {
    //     const response = await Api.get("sliders?type=banner");
    //     this.slides = response.data.result;
    //   } catch (error) {
    //     console.error("Error fetching slides:", error);
    //   }
    // },
    // async getRandomProduct() {
    //   try {
    //     const response = await Api.get("products/random-products");
    //     this.rondomProduct = response.data.products;
    //   } catch (error) {
    //     console.error("Error fetching random products:", error);
    //   }
    // },
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
