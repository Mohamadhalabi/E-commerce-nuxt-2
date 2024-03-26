<template>
  <div v-if="products" class="">
    <div class="mb-2">
      <pv-section-title
        :title="collectionTitle"
        :link="link"
      ></pv-section-title>
    </div>
    <Carousel
      :slides-per-page="5"
      :show-dots='true'
      :autoplay-delay="4"
      :gutter="20"
      :show-arrows="true"
      :peek-right="5"
      :peek-left="5"
      :responsive='[
        {
          maxWidth: 1200,
          slidesPerPage: 4,
        },
        {
          maxWidth: 876,
          slidesPerPage: 3
        },
        {
          maxWidth: 580,
          slidesPerPage: 2
        },
        {
          maxWidth: 350,
          slidesPerPage: 1
        }
      ]'
    >
        <pv-product
          v-for="product in products"
          :key="product.sku"
          :product="product"
          data-swiper-autoplay="5000"
          :isIndexPage="isIndexPage"
        />
    </Carousel>
  </div>
</template>

<script>
import PvProduct from '~/components/product/card/PvProduct';
// import PvCarousel from '~/components/features/PvCarousel';
import PvSectionTitle from '~/components/common/PvSectionTitle.vue';
import {mapGetters} from "vuex";
import Carousel from "vue-ssr-carousel";
export default {
  components: {
    PvProduct,
    Carousel,
    PvSectionTitle,
  },
  props: {
    isIndexPage: Boolean,
    index:Object,
    products: Array,
    link:String,
    collectionTitle: String,
    viewType: {
      type: String,
      default: 'product'
    },
  },
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
    brandSliderConfig() {
      if(this.isIndexPage)
      return {
        slidesToShow: 4,
        centerMode: true,
        swipeDistance: 0,
        spaceBetween: 50,
        // speed: 2000,
        // spaceBetween: 30,
        // autoplay: false,
        // slidesPerView: 5,
        // slidesPerGroup: 5,
        // breakpoints: {
        //   350: { slidesPerView: 1,  slidesPerGroup: 1},
        //   425: { slidesPerView: 2,   slidesPerGroup: 2},
        //   650: { slidesPerView: 2,   slidesPerGroup: 2},
        //   768: { slidesPerView: 3 , slidesPerGroup: 3},
        //   992: { slidesPerView: 3 , slidesPerGroup: 3},
        //   1200: { slidesPerView: 3 , slidesPerGroup: 3},
        // },
        // pagination: {
        //   el: '.swiper-dots',
        //   clickable: true,
        // },
        // nav: true,
        // navigation: {
        //   nextEl: this.getIsAr ? '.swiper-nav .swiper-prev' : '.swiper-nav .swiper-next',
        //   prevEl: this.getIsAr ? '.swiper-nav .swiper-next' : '.swiper-nav .swiper-prev',
        // },
      }
      else{
        // return {
        //   speed: 1000,
        //   spaceBetween: 30,
        //   autoplay: true,
        //   slidesPerView: 5,
        //   slidesPerGroup: 5,
        //   breakpoints: {
        //     425: { slidesPerView: 1, spaceBetween: 30 , slidesPerGroup: 1},
        //     768: { slidesPerView: 2 , slidesPerGroup: 2},
        //     992: { slidesPerView: 3 , slidesPerGroup: 3},
        //     1200: { slidesPerView: 3 , slidesPerGroup: 3},
        //   },
        //   pagination: {
        //     el: '.swiper-dots',
        //     clickable: true,
        //   },
        // }
      }
    }
  },
  data: function() {
    return {
      loadedType: false
    };
  },
};
</script>
