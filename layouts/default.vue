<template>
  <div :dir="$dir()" :class="$i18n.locale === 'ar' ? 'ltrClass' : ''" @click="hideMobileSearch">
    <noscript v-html="iFrameCode" />
    <pv-header @isClicked="isClicked" />
    <nuxt keep-alive />
    <pv-footer />
    <pv-app-popup class="minipopup-area minipopup-top-area" />
    <pv-product-popup class="minipopup-area" />
    <pv-error-message class="minipopup-area" />
    <pv-compare-popup class="minipopup-area" />
    <pv-wishlist-popup class="minipopup-area" />
    <div v-if="isMobile" class="mobile-only">
      <pv-mobile-menu />
    </div>
  </div>
</template>

<script>
import {
  stickyHeaderHandler
} from "~/utils";

export default {
  components: {
    PvHeader: () => import("~/components/common/header/PvHeader.vue"),
    PvFooter: () => import("~/components/common/PvFooter.vue"),
    PvAppPopup: () => import("~/components/popups/PvAppPopup"),
    PvProductPopup: () => import("~/components/popups/PvProductPopup"),
    PvErrorMessage: () => import("~/components/popups/PvErrorMessage.vue"),
    PvComparePopup: () => import("~/components/popups/PvComparePopup.vue"),
    PvWishlistPopup: () => import("~/components/popups/PvWishlistPopup.vue"),
  },
  data() {
    return {
      isSearchInputClicked: false,
      isMobile: false,
      iFrameCode: '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PWSSMVC7" height="0" width="0" style="display:none;visibility:hidden"></iframe>',
    };
  },
  mounted() {
    window.addEventListener("scroll", stickyHeaderHandler, { passive: true });
    this.checkIfMobile();
    window.addEventListener('resize', this.checkIfMobile);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", stickyHeaderHandler, { passive: true });
    window.removeEventListener('resize', this.checkIfMobile);
  },
  methods: {
    async checkIfMobile() {
      this.isMobile = window.innerWidth <= 767;
      if (this.isMobile) {
        const { default: PvMobileMenu } = await import("~/components/common/header/PvMobileMenu");
        this.$options.components.PvMobileMenu = PvMobileMenu;
        this.$forceUpdate();
      }
    },
    isClicked(val) {
      this.isSearchInputClicked = val;
    },
    hideMobileSearch() {
      if (document.querySelector(".header-search.header-search-inline")) {
        let headerSearch = document.querySelector(".header-search.header-search-inline");
        headerSearch.classList.remove("show");
        headerSearch.querySelector(".header-search-wrapper").classList.remove("show");
      }
      if (document.querySelector(".search-suggests")) {
        document.querySelector(".search-suggests").style.display = this.isSearchInputClicked ? 'block' : 'none';
      }
    },
  },
  watch: {
    $route() {
      document.getElementById("search_term").value = "";
    },
  },
};
</script>

<style>
@media screen and (max-width: 767px) {
  .mobile-only {
    display: block;
  }

  .desktop-only {
    display: none;
  }
}
@media screen and (min-width: 768px) {
  .mobile-only {
    display: none;
  }

  .desktop-only {
    display: contents;
  }
}

@media screen and (max-width: 992px) {
  .top-notice {
    display: none!important;
  }
}
</style>