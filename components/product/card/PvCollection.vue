<template>
  <div class="products-section position-relative">
    <div v-if="products" class="mb-2">
      <pv-section-title
        :title="collectionTitle"
        :link="link"
      ></pv-section-title>
    </div>
    <pv-carousel
      :ShowNavigation="true"
      :isIndexPage="isIndexPage"
      ref="carousel"
      v-if="products && products.length > 0"
      class="products-slider dots-small mb-0 border-0"
      :options="brandSliderConfig">
      <pv-product
        v-for="product in products"
        :key="product.sku"
        :product="product"
        class="swiper-slide"
        data-swiper-autoplay="5000"
      />
    </pv-carousel>
  </div>
</template>

<script>
import PvProduct from '~/components/product/card/PvProduct';
import PvCarousel from '~/components/features/PvCarousel';
import PvSectionTitle from '~/components/common/PvSectionTitle.vue';
import {mapGetters} from "vuex";
export default {
  components: {
    PvProduct,
    PvCarousel,
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
        speed: 2000,
        spaceBetween: 30,
        autoplay: true,
        slidesPerView: 5,
        slidesPerGroup: 5,
        breakpoints: {
          350: { slidesPerView: 1,  slidesPerGroup: 1},
          425: { slidesPerView: 2,   slidesPerGroup: 2},
          650: { slidesPerView: 2,   slidesPerGroup: 2},
          768: { slidesPerView: 3 , slidesPerGroup: 3},
          992: { slidesPerView: 3 , slidesPerGroup: 3},
          1200: { slidesPerView: 3 , slidesPerGroup: 3},
        },
        pagination: {
          el: '.swiper-dots',
          clickable: true,
        },
        nav: true,
        navigation: {
          nextEl: this.getIsAr ? '.swiper-nav .swiper-prev' : '.swiper-nav .swiper-next',
          prevEl: this.getIsAr ? '.swiper-nav .swiper-next' : '.swiper-nav .swiper-prev',
        },
      }
      else{
        return {
          speed: 1000,
          spaceBetween: 30,
          autoplay: true,
          slidesPerView: 5,
          slidesPerGroup: 5,
          breakpoints: {
            425: { slidesPerView: 1, spaceBetween: 30 , slidesPerGroup: 1},
            768: { slidesPerView: 2 , slidesPerGroup: 2},
            992: { slidesPerView: 3 , slidesPerGroup: 3},
            1200: { slidesPerView: 3 , slidesPerGroup: 3},
          },
          pagination: {
            el: '.swiper-dots',
            clickable: true,
          },
        }
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
