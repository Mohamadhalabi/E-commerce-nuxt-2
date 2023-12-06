<template>
  <div :class="{ 'float-right' : getIsAr }" class="titleWrapper w-100 mb-1">
    <div class="row">
      <div class="col-lg-12 additional-product-items d-flex">
        <h3 class="m-0 home-page-title">
          <span>{{title}}</span>
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "PvSectionTitle",
  props: ["title"],
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
  }
};
</script>
