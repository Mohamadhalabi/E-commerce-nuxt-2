<template>
  <div v-if="slides.length > 0">
    <section class="intro-section container">
      <div class="row">
        <div key="intro-1" class="col-12 mt-1">
          <Carousel
            :show-arrows="true"
            :loop="true"
            :autoplay-delay="4"
            :show-dots="false"
            :pagination-enabled="true"
          >
            <div
              v-for="(slide, index) in slides"
              :key="index"
              class="swiper-slide"
              :class="`boxed-slide-${index}`"
            >
              <a :href="slide.link" target="_blank" aria-label="Sliders">
                <nuxt-img
                  style="border-radius: 10px;"
                  format="webp"
                  class="w-100 round-10"
                  sizes="sm:400px md:768px lg:1024px xl:1280px xxl:1536 2xl:1800px"
                  width="1800px"
                  height="454px"
                  :src="slide.image"
                  alt="Slider"
                  :open_graph="slide.open_graph"
                  :scal="slide.scal"
                  loading="lazy"
                  :description="slide.description"
                />
              </a>
            </div>
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

<style scoped>
.custom-arrow {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #000;
  transition: color 0.3s ease;
}

.custom-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.carousel .carousel__pagination {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  gap: 8px;
}

.carousel .carousel__pagination-button {
  width: 10px;
  height: 10px;
  background-color: #ccc;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.carousel .carousel__pagination-button--active {
  background-color: #000;
}
</style>