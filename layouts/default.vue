<template>
  <div :dir="$dir()" :class="$i18n.locale === 'ar' ? 'ltrClass' : ''" @click="hideMobileSearch">
    <vue-progress-bar/>
    <noscript v-html="iFrameCode" />
    <pv-header @isClicked="isClicked" />
    <nuxt />
    <pv-footer/>
    <pv-app-popup class="minipopup-area minipopup-top-area"/>
    <pv-product-popup class="minipopup-area"/>
    <pv-error-message class="minipopup-area"/>
    <pv-compare-popup class="minipopup-area"/>
    <pv-wishlist-popup class="minipopup-area"/>
    <component v-if="isMobile" :is="mobileMenuComponent" class="mobile-only" />

    <!-- 🎁 Floating Discount Promo -->
    <transition name="fade">
      <div v-if="showPromo" class="coupon-ticket">
        <div class="coupon-left">
          <span>{{ $t('coupon.label') }}</span>
        </div>
        <div class="coupon-right">
          <div class="coupon-header">{{ $t('coupon.title') }}</div>
          <div class="coupon-center">
            <div class="coupon-code-label">{{ $t('coupon.useCode') }}</div>
            <div class="coupon-code">
              <span class="code-pill animated-pill" @click="copyCoupon">WELCOME10</span>
            </div>
            <div class="coupon-note">{{ $t('coupon.note') }}</div>
          </div>
        </div>
        <button class="coupon-close" @click="dismissPromo">×</button>
      </div>
    </transition>
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
      showPromo: false,
      iFrameCode: '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PWSSMVC7" height="0" width="0" style="display:none;visibility:hidden"></iframe>',
    };
  },
  mounted() {
    window.addEventListener("scroll", stickyHeaderHandler, { passive: true });
    this.checkIfMobile();
    window.addEventListener("resize", this.checkIfMobile);

    const hasSeenPromo = this.$cookies.get("hasSeenPromo");
    if (!hasSeenPromo) {
      this.showPromo = true;
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", stickyHeaderHandler, { passive: true });
    window.removeEventListener("resize", this.checkIfMobile);
  },
  methods: {
    copyCoupon() {
      navigator.clipboard.writeText("WELCOME10");
    },
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
      const headerSearch = document.querySelector(".header-search.header-search-inline");
      if (headerSearch) {
        headerSearch.classList.remove("show");
        headerSearch.querySelector(".header-search-wrapper").classList.remove("show");
      }
      const searchSuggests = document.querySelector(".search-suggests");
      if (searchSuggests) {
        searchSuggests.style.display = this.isSearchInputClicked ? "block" : "none";
      }
    },
    dismissPromo() {
      this.showPromo = false;
      this.$cookies.set("hasSeenPromo", true, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
    },
  },
};
</script>

<style scoped>
.coupon-ticket {
  position: fixed;
  bottom: 90px;
  right: 20px;
  display: flex;
  background: #d32f2f;
  color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.25);
  width: 260px;
  z-index: 9999;
  font-family: 'Arial', sans-serif;
  animation: slide-in 0.4s ease;
}

.coupon-left {
  background: #b71c1c;
  padding: 12px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 11px;
  text-transform: uppercase;
  writing-mode: vertical-rl;
  border-right: 2px dashed #fff;
  letter-spacing: 1px;
}

.coupon-right {
  flex: 1;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

.coupon-header {
  font-size: 12px;
  font-weight: 600;
  margin: 10px;
  text-align: center;
  line-height: 1.4;
}

.coupon-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.coupon-code-label {
  font-size: 12px;
  margin-bottom: 4px;
  text-align: center;
}

.coupon-code {
  margin-bottom: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.code-pill {
  background: #4caf50; /* Green */
  color: #fff;
  font-weight: bold;
  padding: 5px 14px;
  border-radius: 20px;
  font-size: 13px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  cursor: pointer;
}

.animated-pill {
  animation: pulse 1.5s infinite;
  transition: transform 0.2s;
}

.animated-pill:hover {
  transform: scale(1.05);
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.5);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(76, 175, 80, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
  }
}

.coupon-note {
  font-size: 11px;
  color: #f5f5f5;
  text-align: center;
  margin-top: 4px;
}

.coupon-close {
  position: absolute;
  top: 6px;
  right: 8px;
  background: none;
  border: none;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  line-height: 1;
}

@keyframes slide-in {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Hide on mobile */
@media screen and (max-width: 992px) {
  .coupon-ticket {
    display: none !important;
  }
}
</style>