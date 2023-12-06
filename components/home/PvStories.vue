<template>
  <div class="from-demo-37">
    <div class="stories header-bottom">
      <div class="container">
        <pv-carousel
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
        </pv-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import PvCarousel from '~/components/features/PvCarousel';
import Api from '~/api';

export default {
  components: {
    PvCarousel
  },
  data: function() {
    return {
      stories: [],
      storiesSlider: {
        spaceBetween: 20,
        autoplay: false,
        slidesPerView: 16,
        breakpoints: {
          320: {slidesPerView: 3},
          400: {slidesPerView: 4},
          480: {slidesPerView: 5},
          576: {slidesPerView: 6},
          650: {slidesPerView: 7},
          768: {slidesPerView: 8},
          850: {slidesPerView: 9},
          992: {slidesPerView: 10},
          1200: {slidesPerView: 11},
          1435: {slidesPerView: 13}
        }
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
      console.log(this.clickedStoryIndices);
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
