<template>
  <div v-if="this.path !='/car-remote-and-transponder-key'">
    <img loading="lazy" :src="image" width="1374" height="474"  alt="" class="rounded-5 shadow mb-4 banners">
  </div>
</template>
<script>
import * as https from "https";

export default {
  data: function () {
    return {
      path: '',
    };
  },
  props: {
    image: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.path = this.$route.path
  },
  computed: {
    https() {
      return https;
    },
  },
};
</script>
<style>
@media screen and (max-width: 767px){
  .banners{
    display: none;
  }
}
img.banners{
  max-height: 474px;
}
</style>
