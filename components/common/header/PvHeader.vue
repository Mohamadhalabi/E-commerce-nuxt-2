<template>
  <div class="from-demo-26">
    <div class="bg-light-gray">
      <div class="container text-center">
        <PvTopHeader />
      </div>
    </div>
    <header class="header">
      <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div class="container">
          <!-- Mobile Header Layout (screens < 992px) -->
          <div class="d-flex d-lg-none justify-content-between align-items-center w-100 px-2 py-2">
            <!-- Hamburger -->
            <button class="hamburger-btn" @click="showMobileMenu" aria-label="Toggle mobile menu">
              <span></span>
              <span></span>
              <span></span>
            </button>

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
              <nuxt-link :to="getLink('/auth/login-register')" class="d-flex align-items-center">
                <img src="/images/icons/avatar.png" class="person-icon" width="30" height="30" />
              </nuxt-link>
              <div style="min-width: 36px;">
                <pv-cart-menu />
              </div>
            </div>
          </div>

          <!-- Mobile Search Bar -->
          <div class="d-lg-none w-100 mt-2 px-2">
            <pv-header-search @SearchInputClicked="SearchInputClicked" />
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
                  <img src="/images/icons/avatar.png" class="person-icon" width="32px" height="32px" />
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
            <img src="/images/icons/offer.svg" class="second-menu-images" alt="Offer Icon" width="25px" />
            {{ $t("header.Offer") }}
          </nuxt-link>
          <nuxt-link class="d-flex align-items-center font-weight-bold m-auto" :to="getLink('/shop?promotion')">
            <img src="/images/icons/gift.svg" class="second-menu-images" alt="Offer Icon" width="25px" />
            {{ $t("header.promotion") }}
          </nuxt-link>
          <nuxt-link class="d-flex align-items-center font-weight-bold m-auto" :to="getLink('/shop?free-shipping')">
            <img src="/images/icons/free-shipping.svg" class="second-menu-images" alt="Free Shipping" width="25px" />
            {{ $t("header.FreeShipping") }}
          </nuxt-link>
          <nuxt-link class="d-flex align-items-center font-weight-bold m-auto" :to="getLink('/shop?bundled')">
            <img src="/images/icons/bundles.svg" class="second-menu-images" alt="Bundles" width="25px" />
            {{ $t("header.Bundles") }}
          </nuxt-link>
          <nuxt-link class="d-flex align-items-center font-weight-bold m-auto" :to="getLink('/online-services')">
            <img src="/images/icons/wrench.svg" class="second-menu-images" alt="Online Services" width="25px" />
            {{ $t("header.OnlineServices") }}
          </nuxt-link>
          <nuxt-link class="d-flex align-items-center font-weight-bold m-auto" :to="getLink('/unlock-remote-services')">
            <img src="/images/icons/unlock-services.svg" class="second-menu-images" alt="Unlock Remote Services" width="25px" />
            {{ $t("header.unlockService") }}
          </nuxt-link>
          <nuxt-link class="d-flex align-items-center font-weight-bold m-auto" :to="getLink('/shop?new-arrival')">
            <img src="/images/icons/new-arrival.svg" class="second-menu-images" alt="New Arrival" width="25px" />
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
      isScrolling: false,
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

    // handleScroll() {
    //   if (window.scrollY >= 350) {
    //     this.$refs.headerBottom.classList.add('d-lg-flex');
    //   } else {
    //     this.$refs.headerBottom.classList.remove('d-lg-flex');
    //   }
    // }
  },
  destroyed() {
    window.removeEventListener('scroll', this.checkScroll);
    window.removeEventListener('resize', this.checkMobile);
  },
  beforeDestroy() {
    // window.removeEventListener('scroll', this.handleScroll);
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
    window.addEventListener('scroll', this.checkScroll, {passive:true});
    window.addEventListener('resize', this.checkMobile);
    // window.addEventListener('scroll', this.handleScroll, {passive:true});
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
    max-width: 350px;
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
.logged-in-menu{
  margin: 0;
  border-top: 2px dotted #E6E6E6;
  padding-top: 2px;
  padding-bottom: 2px;
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
</style>
