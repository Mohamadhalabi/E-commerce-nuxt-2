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
              :rondomProduct="rondomProduct[5]"
              v-animate
              background-image-url='"../images/home/backgrounds/background-1.webp"'
            ></pv-banner-card>
            <pv-banner-card
              class="d-none d-lg-block"
              :height="250"
              :width="250"
              :rondomProduct="rondomProduct[2]"
              v-animate
              background-image-url='"../images/home/backgrounds/background-2.webp"'
              :fourth_item="true"
            ></pv-banner-card>
            <pv-banner-card
              class="d-none d-lg-block mb-4"
              :height="250"
              :width="250"
              :rondomProduct="rondomProduct[1]"
              v-animate
              background-image-url='"../images/home/backgrounds/background-3.webp"'
              :fourth_item="true"
            >
            </pv-banner-card>
          </div>
          <div class="col-xl-4 col-lg-4 align-content-center mt-auto mb-auto large-screen-only">
            <Carousel
              class="rounded-5"
              :show-dots='true'
              :autoplay-delay='3'
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
            </Carousel>
          </div>

          <div class="d-flex flex-column align-items-center justify-content-between col-xl-4 col-lg-4 col-md-8 ml-auto mr-auto">
            <pv-banner-card
              class="d-none d-lg-block mt-1"
              :height="250"
              :width="250"
              :rondomProduct="rondomProduct[3]"
              v-animate
              background-image-url='"../images/home/backgrounds/background-1.webp"'
            ></pv-banner-card>
            <pv-banner-card
              class="d-none d-lg-block"
              :height="250"
              :width="250"
              :rondomProduct="rondomProduct[0]"
              v-animate
              background-image-url='"../images/home/backgrounds/background-2.webp"'
              :fourth_item="true"
            ></pv-banner-card>
            <pv-banner-card
              class="d-none d-lg-block mb-4"
              :height="250"
              :width="250"
              :rondomProduct="rondomProduct[4]"
              v-animate
              background-image-url='"../images/home/backgrounds/background-3.webp"'
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
// import { baseSlider6 } from "~/utils/data/carousel";
import Api from "~/api";
import {mapGetters} from "vuex";
import Carousel from 'vue-ssr-carousel';

export default {
  components: {
    PvBannerCard: () => import("../product/card/PvBannerCard.vue"),
    Carousel,
  },
  computed: {
    ...mapGetters("header",["getCurrency"]),
  },
  data: function () {
    return {
      slides: [],
      // baseSlider6,
      rondomProduct: [],
    };
  },
  async fetch() {
    const responseBanner = await Api.get("sliders?type=banner");
    this.slides = responseBanner.data.result;

    const response = await Api.get("products/random-products");
    this.rondomProduct = response.data.products;
  },
  watch: {
    getCurrency(newValue, oldValue) {
      Api.get("products/random-products").then((response) => {
        this.rondomProduct = response.data.products;
      })
    },
  }
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
<style lang="sass">
// VueAgile styles
.agile
  &__nav-button
    background: transparent
    border: none
    color: #fff
    cursor: pointer
    font-size: 24px
    height: 100%
    position: absolute
    top: 0
    transition-duration: .3s
    width: 80px

    &:hover
      background-color: rgba(#000, .5)
      opacity: 1

    &--prev
      left: 0

    &--next
      right: 0

  &__dots
    margin-top: 5px

  &__dot
    margin: 0 10px

    button
      background-color: transparent
      border: 1px solid #535250
      border-radius: 50%
      cursor: pointer
      display: block
      height: 13px
      font-size: 0
      line-height: 0
      margin: 0
      padding: 5px
      transition-duration: .3s
      width: 13px

    &--current,
    &:hover
      button
        background: #535250
</style>
