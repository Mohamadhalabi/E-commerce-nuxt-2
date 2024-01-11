<template>
  <div :class="{ 'float-right' : getIsAr }" class="titleWrapper w-100 mb-1">
    <div class="row">
      <div class="col-lg-12 additional-product-items d-flex">
        <h3 class="m-0 home-page-title">
          <span>
            <nuxt-link :to="UrlLink">
              {{ title }}
            </nuxt-link>
          </span>
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "PvSectionTitle",
  props: ["title","link"],
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
  },
  data() {
    return {
      UrlLink: 'shop?' + this.link,
    };
  },
};
</script>
