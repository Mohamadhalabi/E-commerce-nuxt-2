<template>
  <section v-if="manufacturers.length > 0" ref="manufacturersWrapper">
    <div class="container mb-0">
      <h4 class="section-title mt-0" style="border-bottom: 1px solid #32323224">
        {{ $t("home.shopByBrand") }}
      </h4>
      <Carousel
        :slides-per-page="8"
        :autoplay-delay="3"
        :paginate-by-slide="true"
        :responsive="[
          { maxWidth: 1200, slidesPerPage: 6 },
          { maxWidth: 876, slidesPerPage: 5 },
          { maxWidth: 580, slidesPerPage: 3 },
          { maxWidth: 375, slidesPerPage: 2 }
        ]"
      >
        <div
          v-for="manufacturer in manufacturers"
          :key="manufacturer.slug"
          class="swiper-slide px-3"
          style="max-width: 100% !important; max-height: 100%  !important;"
        >
          <nuxt-link :to="`${manufacturer.slug}`">
            <nuxt-img
              loading="lazy"
              format="webp"
              width="200px"
              height="200px"
              :src="manufacturer.image.s.url"
              :title="manufacturer.image.s.description"
              :alt="manufacturer.image.s.alt"
              :open_graph="manufacturer.image.s.open_graph"
              :scal="manufacturer.image.s.scal"
              :description="manufacturer.image.s.description"
              class="manufacture-images"
            />
          </nuxt-link>
        </div>
      </Carousel>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import Api from "~/api";

export default {
  components: {
    Carousel: () => import("vue-ssr-carousel"),
  },
  async fetch() {
    try {
      const response = await Api.get("/manufacturers_menu");
      this.manufacturers = response.data.data.menu.main_menu.manufacturers.items;
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  },
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
  },
  data() {
    return {
      manufacturers: [],
    };
  },
  mounted() {
    // Set up the IntersectionObserver after the component is mounted
    this.setupIntersectionObserver();
  },
  methods: {
    async fetchManufacturers() {
      try {
        const response = await Api.get("/manufacturers_menu");
        this.manufacturers = response.data.data.menu.main_menu.manufacturers.items;
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    },
    setupIntersectionObserver() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.fetchManufacturers(); // Trigger the API call when the element is in view
            observer.disconnect(); // Disconnect after the first load
          }
        });
      });

      // Use the wrapper ref for the observer
      const element = this.$refs.manufacturersWrapper;
      if (element) {
        observer.observe(element);
      } else {
        console.error("Wrapper element not found for intersection observer");
      }
    },
  },
};
</script>

<style>
.manufacture-images {
  margin-bottom: 10px;
}

img.manufacture-images {
  filter: grayscale(100%);
  transition: transform 0.3s, filter 0.3s;
}

img.manufacture-images:hover {
  transform: scale(1.1);
  filter: none;
}

.carousel-container {
  position: relative;
}

.manufactureresContainer {
  width: 90%;
}
</style>