<template>
  <nuxt-link
  :to="getLink('/products/'+rondomProduct.slug)"
  class="top-notice-image"
  :style="getBackgroundImageStyle()">
    <div class="postiton-relative d-flex align-items-center flex-column">
      <div class="row home-page-slider" :style="{ 'flex-direction': is_left ? 'row' : 'row-reverse' }">
        <div class="col-xl-6 col-lg-6 mt-auto mb-auto">
          <h2 class="w-100 h5-home-page text-center mb-0">
            <p class="m-0 white-color">
              {{ rondomProduct["short_title"] }}
            </p>
            <span class="" v-if="rondomProduct.offer && rondomProduct.offer.length !=0">
              <span class="product-price price-color">
                {{(rondomProduct.price.value  - rondomProduct.offer.value).toFixed(2)}}{{rondomProduct.price.currency}}
              </span>
              <span class="old-price">
              {{rondomProduct['price'].value}}{{rondomProduct['price'].currency}}
              </span>
            </span>

            <span class="product-price price-color" v-else-if="rondomProduct['sale_price'].value == rondomProduct['price'].value">
              {{rondomProduct['price'].value}}{{rondomProduct['price'].currency}}
            </span>


            <span class="" v-else>
              <span class="product-price price-color">
                {{rondomProduct['sale_price'].value}}{{rondomProduct['sale_price'].currency}}
              </span>
              <span class="old-price">
              {{rondomProduct['price'].value}}{{rondomProduct['price'].currency}}
              </span>
            </span>
          </h2>
        </div>
        <div class="col-xl-6 col-lg-6 m-auto">
          <nuxt-img
            format="webp"
            loading="lazy"
            :alt="rondomProduct['png_image'][0]['s'].alt"
            :src="getImageUrl()"
            :style="computedStyle"
            :class="[
              is_left ? 'ml-auto mr-0' : 'ml-0 mr-auto',
              'product_image',
              'image-with-effect'
            ]"
          />
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  props: {
    rondomProduct: Object,
    width: Number,
    height: Number,
    backgroundImageUrl: String,
    secondBackround: Boolean,
    left: Boolean,
    is_left:Boolean,
    third_item:Boolean,
    fourth_item:Boolean,
  },
  computed:{
    ...mapGetters("language", ["getLang"]),
      computedStyle() {
      // if (this.left && window.innerWidth > 1400) {
      //   return { marginLeft: '35px !important' };
      // }
      return {};
    },
  },
  methods: {
    getLink(route) {
      if (this.getLang === 'en') {
        return route; // Return the route as is without the language parameter
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    },
    getImageUrl() {
      return this.rondomProduct.png_image[0]['m']['url'];
      // if (this.width === 350 && this.height === 350) {
      //   return this.rondomProduct.png_image[0]['l']['url'];
      // }
      // else if (this.width === 250 && this.height === 250) {
      //   return this.rondomProduct.png_image[0]['m']['url'];
      // } else {
      //   return '';
      // }
    },
    getBackgroundImageStyle() {
      return `background-image: url(${this.backgroundImageUrl});` +
          'background-repeat: no-repeat;'+
          'background-size: 100% 200px'
    },
  },
};
</script>

<style lang="scss" scoped>

.home-page-slider{
    height: 200px;
  }

@media screen and (max-width: 992px) {
  img.mx-auto.rounded-5.shadow.border {
    height: 350px;
    width: 350px;
  }
}

.top-notice-image{
  border: 1px solid #DEE2EB;
  border-radius: 10px;
  background-repeat: no-repeat;
  background-size: cover;
}

img.image-with-effect {
  --s: 15px;  /* size of the frame */
  --b: 2px;   /* border thickness */
  --w: 200px; /* width of the image */
  --c: #c7cbd3;

  aspect-ratio: 1;
  object-fit: cover;
  padding: calc(2 * var(--s));
  --_g: var(--c) var(--b), #0000 0, calc(100% - var(--b)), var(--c) 0;
  outline-offset: calc(var(--w) / -2 - 2 * var(--s));
  transition: 0.4s;
  cursor: pointer;
  padding: 15px;
}

img.image-with-effect:hover {

  background:
    linear-gradient(var(--_g)) 50%/100% var(--_i, 100%) no-repeat,
    linear-gradient(90deg, var(--_g)) 50%/var(--_i, 100%) 100% no-repeat;
  outline: var(--b) solid var(--c);
  outline-offset: calc(var(--s) / -2);
  --_i: calc(100% - 2 * var(--s));
}

.custom-class {
  background-size: 450px 200px;
}

@media screen and (max-width: 993px){
  img.image-with-effect{
    width: 250px;
    height: 250px;
  }
}
.text-underline {
  text-decoration: underline;
}

.text-underline-offset-2 {
  text-underline-offset: 7px;
}

.h5-home-page{
  font-size: 15px;
  padding: 15px;
}
@media screen and (max-width :1200px){
  .h5-home-page{
    font-size:12px;
  }
}
.white-color{
  color: white;
}
</style>
