<template>
  <div v-if="slides.length > 0">
    <section class="intro-section">
      <div class="row">
        <!-- Begin: Left Side -->
        <div key="intro-1" class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <Carousel
            :show-arrows='true'
            :loop='true'
            :autoplay-delay='5'
          >
            <div
              v-for="(slide, index) in slides"
              :key="index"
              class="swiper-slide"
              :class="`boxed-slide-${index}`">
              <a :href="slide.link" target="_blank" aria-label="Sliders">
                <nuxt-img
                  format="webp"
                  class="w-100"
                  sizes="sm:400px md:768px lg:1024px xl:1280px xxl:1536 2xl:1800px"
                  width="1800px"
                  height="454px"
                  :src="slide['image']"
                  alt="Slider"
                  :open_graph="slide['open_graph']"
                  :scal="slide['scal']"
                  loading="lazy"
                  :description="slide['description']" />
              </a>
            </div>
            <template #back-arrow='{ disabled }'>
              <i class="prevButton fa fa-chevron-left"></i>
            </template>

            <template #next-arrow='{ disabled }'>
              <i class="nextButton fa fa-chevron-right"></i>
            </template>
          </Carousel>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  components: {
    Carousel: () => import("vue-ssr-carousel"),
  },
  async fetch() {
    try {
      const response = await axios.get(`sliders`,{
      baseURL: process.env.API_BASE_URL,
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'secret-key': process.env.SECRET_KEY,
        'api-key': process.env.API_KEY,
      }
    });
      this.slides = response.data.result;
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  },
  data: function () {
    return {
      slides: [],
    };
  },
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
  },
};
</script>
