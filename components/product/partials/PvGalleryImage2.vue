<template>
  <div @mouseenter="mouseEntered" @mouseleave="mouseLeft">
    <!-- Your existing code here -->
    <ImageMagnifier
      :image="image"
      :size="size"
      :isMouseInside="isMouseInside"
    />
  </div>
</template>

<script>
import ImageMagnifier from './ImageMagnifier.vue';

export default {
  components: {
    ImageMagnifier
  },
  props: {
    className: String,
    image: Object,
    size: {
      type: String,
      default: 'l'
    }
  },
  data() {
    return {
      isMouseInside: false
    };
  },
  methods: {
    mouseEntered() {
      this.isMouseInside = true;
    },
    mouseLeft() {
      this.isMouseInside = false;
    }
  }
};
</script>
