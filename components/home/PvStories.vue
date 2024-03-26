<template>
  <div class="from-demo-37" v-if="stories.length > 0">
    <div class="stories header-bottom">
      <div class="container">
        <Carousel
          :slides-per-page='16'
          :gutter='5'
          :responsive='[
          {
            maxWidth: 319,
            slidesPerPage: 3,
          },
          {
            minWidth: 320,
            maxWidth: 399,
            slidesPerPage: 4,
          },
          {
            minWidth: 400,
            maxWidth: 479,
            slidesPerPage: 5,
          },
          {
            minWidth: 480,
            maxWidth: 575,
            slidesPerPage: 6,
          },
          {
            minWidth: 576,
            maxWidth: 649,
            slidesPerPage: 7,
          },
          {
            minWidth: 650,
            maxWidth: 767,
            slidesPerPage: 8,
          },
          {
            minWidth: 768,
            maxWidth: 849,
            slidesPerPage: 9,
          },
          {
            minWidth: 850,
            maxWidth: 991,
            slidesPerPage: 10,
          },
          {
            minWidth: 992,
            maxWidth: 1199,
            slidesPerPage: 11,
          },
          {
            minWidth: 1200,
            maxWidth: 1434,
            slidesPerPage: 13,
          },
          {
            minWidth: 1435,
            slidesPerPage: 16,
          }
        ]'


          class="products-slider dots-top dots-small mb-0 border-0"
          :options="storiesSlider">
          <div
            v-for="story in stories"
            :key="story.id"
            class="swiper-slide stories"
            :class="{ 'thumb-item': clickedStoryIndices.includes(story.id), 'thumb-item2': !clickedStoryIndices.includes(story.id) }">
            <a
              :href="story.type === 'link' ? story.value : 'javascript:;'"
              :target="story.type === 'link' ? '_blank' : '_self'"
              class="has-preview"
              @click="story.type === 'link' ? storeIdInSession(story.id) : openStory(story),storeIdInSession(story.id)"
            >
              <nuxt-img
                format="webp"
                loading="lazy"
                width="75"
                height="75"
                alt="stories"
                :src="story.image"
                class="thumb-info-image"
                :open_graph="story['open_graph']"
                :scal="story['scal']"
                :description="story['description']"
              />
            </a>
          </div>
        </Carousel>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '~/api';
export default {
  components: {
    Carousel: () => import("vue-ssr-carousel"),
  },
  data: function() {
    return {
      stories: [],
      test:true,
      storiesSlider: {
        autoplay: false,
        navButtons:false,
        timing: 'ease',
        dots: false,
        slidesToShow: 16,
        speed:0,
      },
      clickedStoryIndices: []
    };
  },
  async fetch() {
      const response = await Api.get('status');
      this.stories = response.data.result;
  },
  methods: {
    openStory: function(story) {
      this.$modal.show(
        () => import('~/components/home/PvStoryModal'), {story}, {
          adaptive: true,
          class: story.type == 'image' ? 'image-modal-container' : 'video-modal-container'
        }
      );
    },
    storeIdInSession: function(index) {
      this.clickedStoryIndices = JSON.parse(sessionStorage.getItem('clickedStoryIndex')) || [];
      if (!this.clickedStoryIndices.includes(index)) {
        this.clickedStoryIndices.push(index);
        sessionStorage.setItem('clickedStoryIndex', JSON.stringify(this.clickedStoryIndices));
      }
    }
  },
  mounted() {
    if(process.client){
      this.clickedStoryIndices = JSON.parse(sessionStorage.getItem('clickedStoryIndex')) || [];
    }
  }
};
</script>
<style>
@media screen and (max-width: 767px){
  .stories{
    margin-top: 15px;
  }
}
@media screen and (max-width: 992px){
  .from-demo-37{
    display: none;
  }
}
</style>
