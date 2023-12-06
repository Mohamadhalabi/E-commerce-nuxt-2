<template>
  <div :class="{'d-none': isHide}">
    <div class="d-flex">
      <div class="text-center pl-6 pr-6 container top-notice-container top-n" :class="{'text-right': getIsAr}">
        <p class="mb-auto mt-auto welcome-text">{{$t('common.WelcomeTo')}}</p>
        <section class="top-notice-animation">
          <div class="first-top-notice"><div>{{$t('common.tlkeys')}}</div></div>
          <div class="second-top-notice"><div>{{$t('common.tlkeys')}}</div></div>
        </section>
      </div>
      <i @click="hideTopNotice" class="sicon-close top-notice-close-button mx-3 mt-auto mb-auto"></i>
    </div>
  </div>
</template>

<script>
import {setCookie, getCookie} from '~/utils';

export default {
  data: function() {
    return {
      isHide: false
    };
  },
  watch: {
    $route: function() {
      this.isHide = getCookie('topNotice');
    }
  },
  mounted: function() {
    this.isHide = getCookie('topNotice');
  },
  methods: {
    hideTopNotice: function() {
      this.isHide = true;
      setCookie('topNotice', false);
    }
  }
};
</script>