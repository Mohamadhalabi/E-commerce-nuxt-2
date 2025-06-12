<template>
  <div :dir="$dir()" :class="$i18n.locale === 'ar' ? 'ltrClass' : ''" @click="hideMobileSearch">
    <vue-progress-bar/>
    <noscript v-html="iFrameCode" />
    <pv-header @isClicked="isClicked" />
    <nuxt/>
    <pv-footer/>
    <pv-app-popup class="minipopup-area minipopup-top-area"/>
    <pv-product-popup class="minipopup-area"/>
    <pv-error-message class="minipopup-area"/>
    <pv-compare-popup class="minipopup-area"/>
    <pv-wishlist-popup class="minipopup-area"/>
    <component
      v-if="isMobile"
      :is="mobileMenuComponent"
      class="mobile-only"
    />


    <!-- Modal -->
    <!-- <b-modal
      v-model="showModal"
      centered
      title="Welcome"
      hide-footer
      hide-header
      @hidden="onModalHidden"
    >
      <nuxt-link to="/shop?offers">
        <a @click="closeModal">
          <img class="modal-image-popup" src="https://www.tlkeys.com/images/70-percent-discount-popup.jpg">      
        </a>
      </nuxt-link>
 
    </b-modal>
      <button
      v-if="this.showModal"
      title="Close (Esc)"
      type="button"
      class="close-image-modal"
      @click="closeModal"
      >
      X
    </button> -->
  </div>
</template>

<script>
import { stickyHeaderHandler } from "~/utils";

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
  // add no follow,noindex to the page if there are query params in the URL
  // this is to prevent search engines from indexing the page with query params
  head() {
    const hasQueryParams = Object.keys(this.$route.query).length > 0;
    return hasQueryParams
      ? {
          meta: [
            {
              hid: 'robots',
              name: 'robots',
              content: 'noindex, nofollow',
            },
          ],
        }
      : {};
    },
  data() {
    return {
      isSearchInputClicked: false,
      isMobile: false,
      mobileMenuComponent: null,
      showModal: false,
      iFrameCode: '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PWSSMVC7" height="0" width="0" style="display:none;visibility:hidden"></iframe>',
    };
  },
  mounted() {
    window.addEventListener("scroll", stickyHeaderHandler, { passive: true });
    this.checkIfMobile();
    window.addEventListener('resize', this.checkIfMobile);

    // Check the cookie and set modal visibility
    const hasSeenModal = this.$cookies.get('hasSeenModal');
    if (!hasSeenModal) {
      this.showModal = true;
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", stickyHeaderHandler, { passive: true });
    window.removeEventListener('resize', this.checkIfMobile);
  },
  methods: {
    async checkIfMobile() {
      this.isMobile = window.innerWidth <= 993;
      if (this.isMobile && !this.mobileMenuComponent) {
        const { default: PvMobileMenu } = await import("~/components/common/header/PvMobileMenu.vue");
        this.mobileMenuComponent = PvMobileMenu;
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
    onModalHidden() {
      // Set a cookie to indicate the modal has been shown
      this.$cookies.set('hasSeenModal', true, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
    },
    closeModal() {
      this.showModal = false;
      this.onModalHidden();
    },
  },
  // watch: {
  //   $route() {
  //     document.getElementById("search_term").value = "";
  //   },
  // },
};
</script>
<style>
@media screen and (min-width:993px){
.modal-image-popup{
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  z-index: 9999999999;
  min-width:720px;
  max-width: 720px;
  }
}
@media screen and (max-width: 993px){
  .modal-body{
    padding:0!important;
  }
}
</style>