<template>
  <div class="from-demo-26">
    <div class="bg-light-gray">
      <div class="container text-center">
        <PvTopHeader />
      </div>
    </div>

    <header class="header">
      <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div class="container d-block">
          
          <!-- ✅ Mobile Sticky-on-Scroll Wrapper -->
          <div :class="['d-lg-none', 'mobile-scroll-wrapper', { 'fixed-on-scroll': isScrolled }]">
            <!-- Mobile Header -->
            <div :class="['d-flex justify-content-between align-items-center w-100', { 'px-4 py-4': isScrolled }]">
              <!-- Hamburger -->
              <svg @click="showMobileMenu" id='menu-2_32' width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><rect width='32' height='32' stroke='none' fill='#000000' opacity='0'/>
                <g transform="matrix(1.33 0 0 1.33 16 16)" >
                <g style="" >
                  <g transform="matrix(1 0 0 1 0 0)" >
                  <path style="stroke: none; stroke-width: 2; stroke-dasharray: none; stroke-linecap: round; stroke-dashoffset: 0; stroke-linejoin: round; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;" transform=" translate(-12, -12)" d="M 0 0 L 24 0 L 24 24 L 0 24 z" stroke-linecap="round" />
                  </g>
                  <g transform="matrix(1 0 0 1 0 -6)" >
                  <line style="stroke: rgb(33,33,33); stroke-width: 2; stroke-dasharray: none; stroke-linecap: round; stroke-dashoffset: 0; stroke-linejoin: round; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;" x1="-8" y1="0" x2="8" y2="0" />
                  </g>
                  <g transform="matrix(1 0 0 1 0 0)" >
                  <line style="stroke: rgb(33,33,33); stroke-width: 2; stroke-dasharray: none; stroke-linecap: round; stroke-dashoffset: 0; stroke-linejoin: round; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;" x1="-8" y1="0" x2="8" y2="0" />
                  </g>
                  <g transform="matrix(1 0 0 1 0 6)" >
                  <line style="stroke: rgb(33,33,33); stroke-width: 2; stroke-dasharray: none; stroke-linecap: round; stroke-dashoffset: 0; stroke-linejoin: round; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;" x1="-8" y1="0" x2="8" y2="0" />
                  </g>
                </g>
                </g>
              </svg>
              <!-- Logo -->
              <nuxt-link :to="getLink('/')">
                <nuxt-img
                  format="webp"
                  class="logo-image mobile-logo"
                  sizes="sm:100vw md:50vw lg:400px"
                  title="Techno lock logo"
                  src="/images/logos/techno-lock-desktop-logo.webp"
                  alt="tlk Logo"
                />
              </nuxt-link>

              <!-- Login & Cart -->
              <div class="d-flex align-items-center gap-2">
                <nuxt-link v-if="!this.StateUser" :to="getLink('/auth/login-register')" class="d-flex align-items-center">
                  <nuxt-img loading="lazy" src="/images/icons/avatar.png" class="person-icon" width="30" height="30" ></nuxt-img>
                </nuxt-link>
                <nuxt-link v-else :to="getLink('/account?tab=dashboard')" class="d-flex align-items-center">
                  <nuxt-img loading="lazy" src="/images/icons/avatar.png" class="person-icon" width="30" height="30" ></nuxt-img>
                </nuxt-link>
                <div style="min-width: 36px;">
                  <pv-cart-menu />
                </div>
              </div>
            </div>

            <!-- Mobile Search -->
            <div class="w-100 px-2 py-2 border-top">
              <pv-header-search @SearchInputClicked="SearchInputClicked" />
            </div>
          </div>

          <!-- Desktop Header Layout (screens >= 992px) -->
          <div class="row d-none d-lg-flex align-items-center w-100">
            <div class="col-lg-3">
              <nuxt-link :to="getLink('/')">
                <nuxt-img
                  format="webp"
                  class="logo-image p-2"
                  sizes="sm:100vw md:50vw lg:400px"
                  title="Techno lock logo"
                  src="/images/logos/techno-lock-desktop-logo.webp"
                  alt="tlk Logo"
                />
              </nuxt-link>
            </div>
            <div class="col-lg-6">
              <pv-header-search @SearchInputClicked="SearchInputClicked" />
            </div>
            <div class="col-lg-3 d-flex align-items-center" v-if="!this.StateUser">
              <nuxt-link class="nav-link d-flex align-items-center me-3" :to="getLink('/auth/login-register')">
                <div class="header-user">
                  <nuxt-img loading="lazy" src="/images/icons/avatar.png" class="person-icon" width="32px" height="32px" ></nuxt-img>
                  <div class="welcome-login">
                    <p>{{ $t("header.welcome") }}</p>
                    <p class="font-weight-bold">{{ $t("header.login") }}</p>
                  </div>
                </div>
              </nuxt-link>
              <div class="p-2 cart-border">
                <pv-cart-menu />
              </div>
            </div>
            <div class="col-lg-3 d-flex align-items-center" v-else>
              <nuxt-link class="nav-link d-flex align-items-center me-3" :to="getLink('/auth/login-register')">
                <div class="header-user">
                  <PvAuth />
                </div>
              </nuxt-link>
              <div class="p-2 cart-border">
                <pv-cart-menu />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <!-- Menus below header -->
      <div class="header-bottom sticky-header d-none d-lg-flex desktop-sticky box-shadow-none first-menu">
        <div class="container">
          <pv-main-menu />
        </div>
      </div>
      <div class="header-bottom sticky-header second-menu d-none d-lg-flex justify-content-center shadow-sm">
        <div class="container">
          <nuxt-link class="d-flex align-items-center font-weight-bold m-auto" :to="getLink('/shop?offers')">
            <nuxt-img
              src="/images/icons/offer.svg"
              alt="Offer Icon"
              class="second-menu-images"
              width="25"
              height="25"
              format="webp"
            />
            {{ $t("header.Offer") }}
          </nuxt-link>
          <nuxt-link class="d-flex align-items-center font-weight-bold m-auto" :to="getLink('/shop?promotion')">
            <nuxt-img
              src="/images/icons/gift.svg"
              alt="Promotion Icon"
              class="second-menu-images"
              width="25"
              height="25"
              format="webp"
            />
            {{ $t("header.promotion") }}
          </nuxt-link>
          <nuxt-link class="d-flex align-items-center font-weight-bold m-auto" :to="getLink('/shop?free-shipping')">
            <nuxt-img
              src="/images/icons/free-shipping.svg"
              alt="Free Shipping"
              class="second-menu-images"
              width="25"
              height="25"
              format="webp"
            />
            {{ $t("header.FreeShipping") }}
          </nuxt-link>
          <nuxt-link class="d-flex align-items-center font-weight-bold m-auto" :to="getLink('/shop?bundled')">
            <nuxt-img
              src="/images/icons/bundles.svg"
              alt="Bundles"
              class="second-menu-images"
              width="25"
              height="25"
              format="webp"
            />
            {{ $t("header.Bundles") }}
          </nuxt-link>
          <nuxt-link class="d-flex align-items-center font-weight-bold m-auto" :to="getLink('/online-services')">
            <nuxt-img
              src="/images/icons/wrench.svg"
              alt="Online Services"
              class="second-menu-images"
              width="25"
              height="25"
              format="webp"
            />
            {{ $t("header.OnlineServices") }}
          </nuxt-link>
          <nuxt-link class="d-flex align-items-center font-weight-bold m-auto" :to="getLink('/unlock-remote-services')">
            <nuxt-img
              src="/images/icons/unlock-services.svg"
              alt="Unlock Remote Services"
              class="second-menu-images"
              width="25"
              height="25"
              format="webp"
            />
            {{ $t("header.unlockService") }}
          </nuxt-link>
          <nuxt-link class="d-flex align-items-center font-weight-bold m-auto" :to="getLink('/shop?new-arrival')">
            <nuxt-img
              src="/images/icons/new-arrival.svg"
              alt="New Arrival"
              class="second-menu-images"
              width="25"
              height="25"
              format="webp"
            />
            {{ $t("home.newarrivalproducts") }}
          </nuxt-link>
        </div>
      </div>
    </header>
  </div>
</template>


<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import api from "~/api";
export default {
  components: {
    PvTopHeader: () => import("~/components/common/header/PvTopHeader.vue"),
    PvHeaderSearch: () => import("~/components/common/header/PvHeaderSearch.vue"),
    PvAuth: () => import("~/components/common/header/PvAuth.vue"),
    PvMainMenu: () => import("~/components/common/header/PvMainMenu"),
    PvCartMenu: () => import("~/components/common/header/PvCartMenu"),
  },
  data() {
    return {
      isMobile: false,
      isScrolled: false,
      searchQuery:"",
      numbers: [1, 2, 3],
    };
  },
  computed: {
    ...mapGetters("authentication", ["StateUser"]),
    ...mapGetters("fav", ["getWishlistCounts"]),
    ...mapGetters("compare", ["getCounts"]),
    ...mapGetters("currency", ["currency"]),
    ...mapGetters("rtlStore", ["getIsAr"]),
    ...mapGetters("language", ["getLang"]),

    availableCurrencies() {
      return this.$settings.currencies.filter((i) => i !== this.currency);
    },
  },
  methods: {
    ...mapActions("authentication", ["LogOut"]),
    ...mapMutations("currency", ["setCurrencyValue"]),
    ...mapActions("language",["updateLanguageCode"]),
    ...mapMutations("header", ["changeCurrency"]),
    ...mapActions("shop",["afterLogOutCart"]),
    checkURL(url) {
      if (url) {
        return url;
      } else {
        return "https://cdn-icons-png.flaticon.com/512/7855/7855599.png";
      }
    },

    SearchInputClicked(val){
      this.$emit('isClicked',val)
    },
    getLink(route) {
      if (this.getLang === 'en') {
        return route; // Return the route as is without the language parameter
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    },

    search(){
      window.location.href = "shop?page=1&search=" + this.searchQuery;
    },
    checkMobile() {
      this.isMobile = window.innerWidth <= 992;
    },
    checkScroll() {
      this.isScrolling = window.scrollY > 300;
    },
    goToWishlist() {
      this.$router.push("/wishlist");
    },

    goToCompares() {
      this.$router.push("/compares");
    },

    showMobileMenu: function () {
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("mySidenav2").style.width = "0";
      document.getElementById("mySidenav3").style.width = "0";
      document.getElementById("mySidenav4").style.width = "0";
      document.getElementById("mySidenav5").style.width = "0";
      document.getElementById("mySidenav6").style.width = "0";
      document.querySelector("body").classList.add("mmenu-active");
    },
    setCurrency(currency) {
      api.defaults.headers["currency"] = currency;
      this.$cookies.set('currency',currency,{
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      });
      this.setCurrencyValue(currency)
      this.$nuxt.refresh();
    },

    handleScroll() {
      if (window.scrollY > 50) {
        this.isScrolled = true;
      } else {
        this.isScrolled = false;
      }
    },
  },
  destroyed() {
    window.removeEventListener('scroll', this.checkScroll);
    window.removeEventListener('resize', this.checkMobile);
  },
  mounted() {
    if(process.client) {
      let currency = localStorage.getItem("currency")
      if (currency != null) {
        this.changeCurrency(currency);
        api.defaults.headers["currency"] = currency;
        this.setCurrencyValue(currency);
      }
    }
    this.checkMobile();
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    window.addEventListener('resize', this.checkMobile);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.checkMobile);
  },
};
</script>

<style scoped>
@media (max-width: 991px) {
  .currency-language {
    justify-content: center;
  }
}
.second-menu-images{
  margin-right: 5px;
}
@media screen and (min-width: 992px)
{
  .contact-icons{
    display: none!important;
  }
}

.header-top{
  background-color: #f6f6f6;
}
.header-icons{
  font-size: 14px!important;
}
.online-services{
  font-size: 14px!important;
  color: #892118!important;
  font-weight: 900;
}

@media screen and (min-width: 992px) {
  .small-devices-only{
    display: none!important;
  }
}
@media screen and (max-width: 993px){
  .contact-icons{
    justify-content: end;
    font-size: 16px;
  }
}
@media screen and (max-width: 767px){
  .contact-icons{
    justify-content: center;
  }
}


@media screen and (max-width: 1200px) {
  .services {
    display: contents!important;
  }
}

@media screen and (min-width:1200px) {
  .main-menu {
    display: contents;
  }
}
.login-register{
  font-size: 13px;
}
@media screen and (min-width: 993px){
  .logo-image{
  }
}
@media screen and (max-width: 992px){
  .mobile-logo{
    max-width: 280px;
  }
}
@media screen and (max-width: 500px){
  .mobile-logo{
    max-width: 200px;
  }
}

@media screen and (max-width: 350px){
  .mobile-logo{
    max-width: 150px;
  }
}
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.pulse-animation-end-of-year {
  display: inline-block;
  animation: pulse 1.5s infinite ease-in-out;
}
@media (max-width: 991px) {
  .mobile-scroll-wrapper {
    background-color: white;
    transition: all 0.3s ease;
  }

  .fixed-on-scroll {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1050;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .from-demo-26 {
    padding-top: 0; /* Start with no padding */
  }

  .fixed-on-scroll ~ * {
    margin-top: 130px; /* Offset rest of page when header becomes fixed */
  }
}
.hamburger-button {
  all: unset; /* resets Safari default styles */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 22px;
  height: 20px;
  cursor: pointer;
  padding: 0;
  background: transparent;
  border: none;
}

.hamburger-button span {
  display: block;
  width: 100%;
  height: 3px;
  background-color: #333 !important; /* force visibility */
  border-radius: 2px;
  transition: all 0.3s ease;
}
.hamburger-button span {
  background-color: #333 !important;
  background-color: rgba(51, 51, 51, 1) !important;
}
.hamburger-button {
  -webkit-appearance: none;
}
</style>
