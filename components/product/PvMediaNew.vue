<template>
  <div>
    <agile main ref="main" :options="options1" :as-nav-for="asNavFor1">
      <div v-for="(image, index) in product.gallery" style="padding: 5px" :key="index" :class="`slide--${index}`" class="slide">
        <pv-gallery-image2
          :class-name="'products-single-image'"
          :image="image"
          size="l"
          class="rounded-10"
          />
      </div>
    </agile>
    <no-ssr>
      <agile thumbnails ref="thumbnails" :isSSR="true" :options="options2" :as-nav-for="asNavFor2">
        <div v-for="(image, index) in product.gallery" :key="index" style="padding: 5px" class="thumbnail-image" :class="`slide--${index} slide--thumbniail`" @click="$refs.thumbnails.goTo(index)">
          <img :src="image['s'].url" style="border: 1px solid #e7e7e6!important;min-height: 120px;max-height: 120px;max-width: 105px">
        </div>
        <template slot="prevButton">
          <i class="fas fa-chevron-left"></i>
        </template>
        <template slot="nextButton">
          <i class="fas fa-chevron-right"></i>
        </template>
      </agile>
    </no-ssr>
  </div>


</template>

<script>
import PvGalleryImage2 from "~/components/product/partials/PvGalleryImage2.vue";
import ImageMagnifier from "~/components/product/partials/ImageMagnifier.vue";

export default {
  name: 'Example4',
  components: {ImageMagnifier, PvGalleryImage2},
  props: {
    product: Object,
  },
  methods: {
    mouseEntered() {
      this.isMouseInside = true;
    },
    mouseLeft() {
      this.isMouseInside = false;
    }
  },
  data () {
    return {
      asNavFor1: [],
      asNavFor2: [],
      options1: {
        dots: false,
        fade: true,
        navButtons: false
      },
      isMouseInside: false,
      options2: {
        autoplay: false,
        centerMode: true,
        dots: false,
        navButtons: false,
        slidesToShow: 3,
        responsive: [
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 5
            }
          },

          {
            breakpoint: 1000,
            settings: {
              navButtons: true
            }
          }
        ]

      },

      slides: [
        'https://images.unsplash.com/photo-1453831362806-3d5577f014a4?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
        'https://images.unsplash.com/photo-1496412705862-e0088f16f791?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
        'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
        'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
        'https://images.unsplash.com/photo-1472926373053-51b220987527?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
        'https://images.unsplash.com/photo-1497534547324-0ebb3f052e88?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ'
      ]
    }
  },

  mounted () {
    this.asNavFor1.push(this.$refs.thumbnails)
    this.asNavFor2.push(this.$refs.main)
  }
}
</script>

<style lang="sass">

</style>
