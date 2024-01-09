<template>
  <div :dir="$dir()" :class="$i18n.locale === 'ar' ? 'ltrClass' : ''" @click="hideMobileSearch">
    <vue-progress-bar />
    <div class="page-wrapper position-relative">
      <!--<client-only>-->
      <pv-top-notice class="top-notice" />
      <!--</client-only>-->
      <client-only>
        <pv-header @isClicked="isClicked" />
      </client-only>
      <nuxt />
      <pv-footer/>
      <div class="wishlist-popup">
        <div class="wishlist-popup-msg">Product added!</div>
      </div>
    </div>
    <pv-app-popup class="minipopup-area minipopup-top-area" />
    <pv-product-popup
      class="minipopup-area" />
    <pv-error-message class="minipopup-area" />
    <pv-compare-popup class="minipopup-area" />
    <pv-wishlist-popup class="minipopup-area" />

    <a id="scroll-top" href="javascript:;" title="Top" role="button" @click="scrollToTop">
      <i class="icon-angle-up" />
    </a>
    <client-only>
      <pv-mobile-menu />
    </client-only>
  </div>
</template>

<script>
import api from "~/api";
import "static/css/ltrStyle.css";
import {
  resizeHandler,
  scrollTop,
  showScrollTopHandler,
  stickyHeaderHandler
} from "~/utils";
import {mapActions, mapGetters, mapMutations} from "vuex";
export default {
  components: {
    PvTopNotice:() =>import("~/components/common/header/PvTopNotice"),
    PvHeader:() =>import("~/components/common/header/PvHeader.vue"),
    PvFooter:() => import("~/components/common/PvFooter"),
    PvAppPopup:() => import("~/components/popups/PvAppPopup"),
    PvProductPopup:() => import("~/components/popups/PvProductPopup"),
    PvMobileMenu:() => import("~/components/common/header/PvMobileMenu"),
    PvErrorMessage:() => import("~/components/popups/PvErrorMessage.vue"),
    PvComparePopup:() =>import("~/components/popups/PvComparePopup.vue"),
    PvWishlistPopup:() => import("~/components/popups/PvWishlistPopup.vue"),
  },
  head() {
    return {

    }
  },
  watch: {
    $route: function() {
      resizeHandler();
      this.$modal.hideAll();
      document.getElementById("search_term").value = "";
    },
  },
  data() {
    return {
      isSearchInputClicked: false,
      ScrollToFooter: false,
      currencyValue:"",
    };
  },

  computed: {
    ...mapGetters("auth", ["isAuthenticated", "StateUser"]),
  },
  mounted: function() {
    // if(localStorage.getItem("version") !== process.env.version) {
    //   const state = { 'busy': false , 'loggedIn':true, 'strategy':"local", 'token':null , 'user':null};
    //   this.LOGOUT(state)
    // }
    if(process.client) {
      // const localStorageObject = localStorage;
      // const authToken = localStorageObject.getItem('auth._token.local');
      // if(authToken != null)
      // {
      //   api.defaults.headers.common['Authorization'] = authToken;
      // }
      // else {
      //   localStorage.setItem("tokenEnded", 1);
      //   api.defaults.headers.common['Authorization'] = authToken;
      // }
      if (!localStorage.getItem("tokenEnded")) {
        localStorage.setItem("tokenEnded", 1);
      }
      document.querySelector("body").classList.add("loaded");
    }
    this.$store.dispatch('rtlStore/setLanguageFromURL');
    this.updateLanguageCode(this.$i18n.locale)
    api.defaults.headers["Accept-Language"] = this.$i18n.locale;
    if (this.isAuthenticated) {
      this.getCartList();
      this.fetchList();
      this.fetchWishlist();
    }


    window.addEventListener("scroll", stickyHeaderHandler, { passive: true });
    window.addEventListener("scroll", showScrollTopHandler, { passive: true });
    window.addEventListener("resize", stickyHeaderHandler);
    window.addEventListener("resize", resizeHandler);
  },

  unmounted: function() {
    window.removeEventListener("scroll", showScrollTopHandler, { passive: true });
    window.removeEventListener("scroll", stickyHeaderHandler, { passive: true });
    window.removeEventListener("resize", stickyHeaderHandler);
    window.removeEventListener("resize", resizeHandler);
  },

  methods: {
    ...mapActions("shop", ["getCartList"]),
    ...mapActions("compare", ["fetchList"]),
    ...mapActions("fav", ["fetchWishlist"]),
    ...mapActions("language",["updateLanguageCode"]),
    ...mapMutations("auth", ["LOGOUT"]),

    isClicked(val){
      this.isSearchInputClicked = val
    },
    scrollToTop: function() {
      scrollTop(false);
    },
    hideMobileSearch: function() {
      if (document.querySelector(".header-search.header-search-inline")) {
        let headerSearch = document.querySelector(".header-search.header-search-inline");
        headerSearch.classList.remove("show");
        headerSearch.querySelector(".header-search-wrapper").classList.remove("show");

      }
      if (document.querySelector(".search-suggests")) {
        if (this.isSearchInputClicked == true) {
          document.querySelector(".search-suggests").setAttribute("style", "display: block");
        }
        if(this.isSearchInputClicked == false)
        {
          document.querySelector(".search-suggests").setAttribute("style", "display: none");
        }
      }
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

body{
  width:100%;
  overflow-x:hidden;
  overflow-y:hidden;
}
@media screen and (max-width: 992px){
  .top-notice{
    display: none!important;
  }
}
</style>
