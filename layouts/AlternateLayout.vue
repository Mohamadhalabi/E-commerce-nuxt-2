<!--<template>-->
<!--  <div :dir="$dir()" :class="$i18n.locale === 'ar' ? 'ltrClass' : ''" @click="hideMobileSearch">-->
<!--    <vue-progress-bar />-->


<!--    <div class="page-wrapper position-relative">-->
<!--      <pv-custom-header />-->
<!--      <nuxt />-->
<!--      <pv-footer />-->
<!--      <div class="wishlist-popup">-->
<!--        <div class="wishlist-popup-msg">Product added!</div>-->
<!--      </div>-->
<!--    </div>-->

<!--    <pv-app-popup class="minipopup-area minipopup-top-area" />-->
<!--    <pv-product-popup-->

<!--      class="minipopup-area" />-->
<!--    <pv-error-message class="minipopup-area" />-->

<!--    <a id="scroll-top" href="javascript:;" title="Top" role="button" @click="scrollToTop">-->
<!--      <i class="icon-angle-up" />-->
<!--    </a>-->

<!--    <pv-mobile-menu />-->

<!--    <pv-sticky-footer />-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import api from "~/api";-->
<!--import PvTopNotice from "~/components/common/header/PvTopNotice";-->
<!--import PvHeader from "~/components/common/header/PvHeader";-->
<!--import PvFooter from "~/components/common/PvFooter";-->
<!--import PvAppPopup from "~/components/popups/PvAppPopup";-->
<!--import PvProductPopup from "~/components/popups/PvProductPopup";-->
<!--import PvMobileMenu from "~/components/common/header/PvMobileMenu";-->
<!--import PvStickyFooter from "~/components/common/header/PvStickyFooter";-->
<!--import PvErrorMessage from "~/components/popups/PvErrorMessage.vue";-->

<!--import "static/css/ltrStyle.css";-->
<!--import {-->
<!--  resizeHandler,-->
<!--  scrollTop,-->
<!--  showScrollTopHandler,-->
<!--  stickyHeaderHandler-->
<!--} from "~/utils";-->
<!--import { mapActions, mapGetters, mapState } from "vuex";-->
<!--import PvCustomHeader from "~/components/common/customHeader/PvCustomHeader.vue";-->

<!--export default {-->
<!--  name: "AlternateLayout",-->
<!--  components: {-->
<!--    PvCustomHeader,-->
<!--    PvTopNotice,-->
<!--    PvHeader,-->
<!--    PvFooter,-->
<!--    PvAppPopup,-->
<!--    PvProductPopup,-->
<!--    PvMobileMenu,-->
<!--    PvStickyFooter,-->
<!--    PvErrorMessage,-->
<!--  },-->

<!--  head() {-->
<!--    return {-->
<!--      titleTemplate: JSON.parse(this.$settings.seo.meta_title)[this.$i18n.locale],-->
<!--      title: JSON.parse(this.$settings.seo.meta_title)[this.$i18n.locale],-->
<!--      link: [-->
<!--        {-->
<!--          rel: "icon",-->
<!--          type: "image/x-icon",-->
<!--          href: this.$settings.website.system_logo_icon.s.url,-->
<!--        },-->
<!--      ],-->
<!--      meta: [-->
<!--        {-->
<!--          hid: "theme-color",-->
<!--          name: "theme-color",-->
<!--          content: "#f07905",-->
<!--        },-->
<!--        { charset: "utf-8" },-->
<!--        {-->
<!--          hid: "description",-->
<!--          name: "description",-->
<!--          content: JSON.parse(this.$settings.seo.meta_description)[this.$i18n.locale],-->
<!--        },-->
<!--        {-->
<!--          hid: "keywords",-->
<!--          name: "keywords",-->
<!--          content: JSON.parse(this.$settings.seo.keywords),-->
<!--        },-->
<!--        {-->
<!--          hid: "og:site_name",-->
<!--          name: "og:site_name",-->
<!--          content: JSON.parse(this.$settings.seo.meta_title)[this.$i18n.locale],-->
<!--        },-->
<!--        {-->
<!--          hid: "og:description",-->
<!--          name: "og:description",-->
<!--          content: JSON.parse(this.$settings.seo.meta_description)[this.$i18n.locale],-->
<!--        },-->
<!--        {-->
<!--          hid: "og:title",-->
<!--          name: "og:title",-->
<!--          content: JSON.parse(this.$settings.seo.meta_title)[this.$i18n.locale],-->
<!--        },-->
<!--        {-->
<!--          hid: "og:type",-->
<!--          name: "og:type",-->
<!--          content: "website.store",-->
<!--        },-->
<!--        {-->
<!--          hid: "og:url",-->
<!--          name: "og:url",-->
<!--          content: process..env.API_BASE_URL,-->
<!--        },-->
<!--        {-->
<!--          hid: "og:image",-->
<!--          name: "og:image",-->
<!--          content: this.$settings.seo.meta_image.l.url,-->
<!--        },-->
<!--        {-->
<!--          hid: "og:image:alt",-->
<!--          name: "og:image:alt",-->
<!--          content: this.$settings.seo.meta_image.l.alt,-->
<!--        },-->
<!--        {-->
<!--          hid: "og:image:height",-->
<!--          name: "og:image:height",-->
<!--          content: this.$settings.seo.meta_image.l.height,-->
<!--        },-->
<!--        {-->
<!--          hid: "og:image:width",-->
<!--          name: "og:image:width",-->
<!--          content: this.$settings.seo.meta_image.l.width,-->
<!--        },-->
<!--        {-->
<!--          hid: "twitter:card",-->
<!--          name: "twitter:card",-->
<!--          content: "summary_large_image",-->
<!--        },-->
<!--        {-->
<!--          hid: "twitter:site",-->
<!--          name: "twitter:site",-->
<!--          content: `@${this.$settings.social_media.twitter.split("/").pop()}`,-->
<!--        },-->
<!--        {-->
<!--          hid: "twitter:creator",-->
<!--          name: "twitter:creator",-->
<!--          content: `@${this.$settings.social_media.twitter.split("/").pop()}`,-->
<!--        },-->
<!--        {-->
<!--          hid: "twitter:title",-->
<!--          name: "twitter:title",-->
<!--          content: JSON.parse(this.$settings.seo.meta_title)[this.$i18n.locale],-->
<!--        },-->
<!--        {-->
<!--          hid: "twitter:description",-->
<!--          name: "twitter:description",-->
<!--          content: JSON.parse(this.$settings.seo.meta_description)[this.$i18n.locale],-->
<!--        },-->
<!--        {-->
<!--          rel: "icon",-->
<!--          type: "image/png",-->
<!--          sizes: "16x16",-->
<!--          href: "https://tlk.esg-s.com/storage//thumbnail/logo/technolock_logo.jpg",-->
<!--        },-->
<!--        {-->
<!--          rel: "shortcut icon",-->
<!--          href: "https://tlk.esg-s.com/storage//thumbnail/logo/technolock_logo.jpg",-->
<!--        },-->
<!--        {-->
<!--          rel: "apple-touch-icon",-->
<!--          sizes: "180x180",-->
<!--          href: "https://tlk.esg-s.com/storage//thumbnail/logo/technolock_logo.jpg",-->
<!--        },-->
<!--        {-->
<!--          "http-equiv": "content-language",-->
<!--          content: this.$i18n.locale,-->
<!--        },-->
<!--        {-->
<!--          "http-equiv": "X-UA-Compatible",-->
<!--          content: "IE=edge",-->
<!--        },-->
<!--        {-->
<!--          name: "viewport",-->
<!--          content: "width=device-width, initial-scale=1",-->
<!--        },-->
<!--      ],-->
<!--    };-->
<!--  },-->

<!--  watch: {-->
<!--    $route: function() {-->
<!--      resizeHandler();-->
<!--      this.$modal.hideAll();-->
<!--      document.getElementById("search_term").value = "";-->
<!--    },-->
<!--  },-->

<!--  data() {-->
<!--    return {-->
<!--      isSearchInputClicked: false,-->
<!--    };-->
<!--  },-->

<!--  computed: {-->
<!--    ...mapGetters("auth", ["isAuthenticated", "StateUser"]),-->
<!--    ...mapState(["toast"]),-->
<!--    /*  ...mapGetters('rtlStore', ['getLan']), */-->
<!--    mobileComponent() {-->
<!--      // Return the component name to render on mobile screens-->
<!--      return 'PvMobileHeader';-->
<!--    },-->
<!--    desktopComponent() {-->
<!--      // Return the component name to render on large screens-->
<!--      return ['PvTopNotice','PvHeader'];-->
<!--    }-->
<!--  },-->

<!--  created: function() {-->
<!--    api.defaults.headers["Accept-Language"] = this.$i18n.locale;-->
<!--    if (this.isAuthenticated) {-->
<!--      this.getCartList();-->
<!--      this.fetchList();-->
<!--      this.fetchWishlist();-->
<!--    }-->
<!--    if (!localStorage.getItem("tokenEnded")) {-->
<!--      localStorage.setItem("tokenEnded", 1);-->
<!--    }-->

<!--    /* document.title = this.$settings.website.system_name[this.getLan]; */-->
<!--  },-->

<!--  mounted: function() {-->
<!--    window.addEventListener("scroll", stickyHeaderHandler, { passive: true });-->
<!--    window.addEventListener("scroll", showScrollTopHandler, { passive: true });-->
<!--    window.addEventListener("resize", stickyHeaderHandler);-->
<!--    window.addEventListener("resize", resizeHandler);-->
<!--  },-->

<!--  unmounted: function() {-->
<!--    window.removeEventListener("scroll", showScrollTopHandler, { passive: true });-->
<!--    window.removeEventListener("scroll", stickyHeaderHandler, { passive: true });-->
<!--    window.removeEventListener("resize", stickyHeaderHandler);-->
<!--    window.removeEventListener("resize", resizeHandler);-->
<!--  },-->

<!--  methods: {-->
<!--    ...mapActions("shop", ["getCartList"]),-->
<!--    ...mapActions("compare", ["fetchList"]),-->
<!--    ...mapActions("fav", ["fetchWishlist"]),-->

<!--    handleClickedInput(val){-->
<!--      this.isSearchInputClicked = val-->
<!--    },-->

<!--    scrollToTop: function() {-->
<!--      scrollTop(false);-->
<!--    },-->

<!--    showToast() {-->
<!--      this.$notify({-->
<!--        group: "custom-notify",-->
<!--        type: "error",-->
<!--        text: "Toast with action link",-->
<!--      });-->
<!--    },-->

<!--    hideMobileSearch: function() {-->
<!--      if (document.querySelector(".header-search.header-search-inline")) {-->
<!--        let headerSearch = document.querySelector(".header-search.header-search-inline");-->
<!--        headerSearch.classList.remove("show");-->
<!--        headerSearch.querySelector(".header-search-wrapper").classList.remove("show");-->

<!--      }-->
<!--      if (document.querySelector(".search-suggests")) {-->
<!--        if (this.isSearchInputClicked === true) {-->
<!--          document.querySelector(".search-suggests").setAttribute("style", "display: block");-->
<!--        } else {-->
<!--          document.querySelector(".search-suggests").setAttribute("style", "display: none");-->
<!--        }-->
<!--      }-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->
<!--<style>-->
<!--@media screen and (max-width: 767px) {-->
<!--  .mobile-only {-->
<!--    display: block;-->
<!--  }-->

<!--  .desktop-only {-->
<!--    display: none;-->
<!--  }-->
<!--}-->
<!--@media screen and (min-width: 768px) {-->
<!--  .mobile-only {-->
<!--    display: none;-->
<!--  }-->

<!--  .desktop-only {-->
<!--    display: contents;-->
<!--  }-->
<!--}-->
<!--</style>-->
