<template>
  <div class="from-demo-26">
    <div class="bg-light-gray">
      <div class="container p-lg-3 text-center">
        <PvTopHeader />
      </div>
    </div>
    <header class="header">
      <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div class="container">
        <!-- Logo -->
       <a class="navbar-brand d-flex align-items-center" href="/">
        <nuxt-link :to="getLink('/')">
          <nuxt-img
          format="webp"
          class="logo-image p-2"
          sizes="sm:100vw md:50vw lg:400px"
          title="Techno lock logo" src="/images/logos/techno-lock-desktop-logo.webp" alt="tlk Logo" />
        </nuxt-link>
      </a>
        <!-- Search Bar & Category -->
        <pv-header-search
        @SearchInputClicked="SearchInputClicked" />
        <!-- Right Section -->
        <ul class="navbar-nav ms-auto align-items-center">
          <!-- Call Us -->
          <li class="nav-item d-none d-lg-block contact-widget">
            <p class="off-animatin mb-0 call-us-now text-center">
              {{ $t("auth.callNow") }}
            </p>
            <span class="ls-n-10 mb-0 text-center">
              <a
              :href="`tel:${$t('auth.PhoneNumber')}`">
              {{$t('auth.PhoneNumber') }}
            </a>
            </span>
          </li>

          <!-- Login/Register -->
          <li class="nav-item">
            <nuxt-link class="nav-link d-flex align-items-center" 
            :to="getLink('/auth/login-register')">
              <div class="header-user">
                <i class="fa fa-user"></i>
                <div class="welcome-login">
                  <span>
                    {{ $t("header.welcome") }}
                  </span>
                  <span class="font-weight-bold">
                    {{ $t("header.login") }}
                  </span>
                </div>
              </div>
            </nuxt-link>
          </li>

          <li class="nav-item p-2">
            <a class="header-icon position-relative cursor-pointer mt-auto mb-auto">
              <nuxt-img 
              width="32px" 
              height="32px"
              loading="lazy" 
              src="/images/icons/heart.svg"
              alt="Heart Icon" 
              @click="goToWishlist"
              />
              <span class="cart-count badge-circle">{{getWishlistCounts}}</span>
            </a>
          </li>
          <li class="nav-item p-2">
            <a class="header-icon position-relative cursor-pointer mt-auto mb-auto">
              <nuxt-img 
              width="32px" 
              height="32px"
              loading="lazy" 
              src="/images/icons/shuffle.svg"
              alt="Shuffle Icon" 
              @click="goToCompares"
              />
              <span class="cart-count badge-circle">{{getCounts}}</span>
            </a>
          </li>
          <li class="nav-item p-2">
            <pv-cart-menu />
          </li>
        </ul>
     </div>
   </nav>
   <div class="header-bottom sticky-header d-none d-lg-flex desktop-sticky box-shadow-none first-menu">
    <div class="container">
      <pv-main-menu />
    </div>
    </div>
    <div class="d-none header-bottom sticky-header desktop-sticky2 box-shadow-none second-menu" style="z-index: 999" ref="headerBottom">
        <div class="container">
          <!-- offers -->
          <nuxt-link class="d-flex align-items-center font-weight-bold m-auto" :to="getLink('/shop?offers')">
            <img src="/images/icons/offer.svg" class="second-menu-images" alt="Offer Icon" width="25px" />
            {{ $t("header.Offer") }}
          </nuxt-link>
          <!-- promotion -->
          <nuxt-link class="d-flex align-items-center font-weight-bold m-auto" :to="getLink('/shop?promotion')">
            <img src="/images/icons/gift.svg" class="second-menu-images" alt="Offer Icon" width="25px" />
            {{ $t("header.promotion") }}
          </nuxt-link>
          <!-- free shipping -->
          <nuxt-link class="d-flex align-items-center font-weight-bold m-auto" :to="getLink('/shop?free-shipping')">
            <img src="/images/icons/free-shipping.svg" class="second-menu-images" alt="Free Shipping" width="25px" />
            {{ $t("header.FreeShipping") }}
          </nuxt-link>
          <!-- Bundles -->
          <nuxt-link class="d-flex align-items-center font-weight-bold m-auto" :to="getLink('/shop?bundled')">
            <img src="/images/icons/bundles.svg" class="second-menu-images" alt="Bundles" width="25px" />
            {{ $t("header.Bundles") }}
          </nuxt-link>
          <!-- Online Services -->
          <nuxt-link class="d-flex align-items-center font-weight-bold m-auto" :to="getLink('/online-services')">
            <img src="/images/icons/wrench.svg" class="second-menu-images" alt="Online Services" width="25px" />
            {{ $t("header.OnlineServices") }}
          </nuxt-link>
          <!-- Unlock Remote Services -->
          <nuxt-link class="d-flex align-items-center font-weight-bold m-auto" :to="getLink('/unlock-remote-services')">
            <img src="/images/icons/unlock-services.svg" class="second-menu-images" alt="Unlock Remote Services" width="25px" />
            {{ $t("header.unlockService") }}
          </nuxt-link>
          <!-- New Arrival -->
          <nuxt-link class="d-flex align-items-center font-weight-bold m-auto" :to="getLink('/new-arrival')">
            <img src="/images/icons/new-arrival.svg" class="second-menu-images" alt="Unlock Remote Services" width="25px" />
            {{ $t("home.newarrivalproducts") }}
          </nuxt-link>
        </div>
      </div>
      <div class="header-bottom sticky-header second-menu d-none d-lg-flex justify-content-center">
        <div class="container">
          <!-- offers -->
          <nuxt-link class="d-flex align-items-center font-weight-bold m-auto" :to="getLink('/shop?offers')">
            <img src="/images/icons/offer.svg" class="second-menu-images" alt="Offer Icon" width="25px" />
            {{ $t("header.Offer") }}
          </nuxt-link>
          <!-- promotion -->
          <nuxt-link class="d-flex align-items-center font-weight-bold m-auto" :to="getLink('/shop?promotion')">
            <img src="/images/icons/gift.svg" class="second-menu-images" alt="Offer Icon" width="25px" />
            {{ $t("header.promotion") }}
          </nuxt-link>
          <!-- free shipping -->
          <nuxt-link class="d-flex align-items-center font-weight-bold m-auto" :to="getLink('/shop?free-shipping')">
            <img src="/images/icons/free-shipping.svg" class="second-menu-images" alt="Free Shipping" width="25px" />
            {{ $t("header.FreeShipping") }}
          </nuxt-link>
          <!-- Bundles -->
          <nuxt-link class="d-flex align-items-center font-weight-bold m-auto" :to="getLink('/shop?bundled')">
            <img src="/images/icons/bundles.svg" class="second-menu-images" alt="Bundles" width="25px" />
            {{ $t("header.Bundles") }}
          </nuxt-link>
          <!-- Online Services -->
          <nuxt-link class="d-flex align-items-center font-weight-bold m-auto" :to="getLink('/online-services')">
            <img src="/images/icons/wrench.svg" class="second-menu-images" alt="Online Services" width="25px" />
            {{ $t("header.OnlineServices") }}
          </nuxt-link>
          <!-- Unlock Remote Services -->
          <nuxt-link class="d-flex align-items-center font-weight-bold m-auto" :to="getLink('/unlock-remote-services')">
            <img src="/images/icons/unlock-services.svg" class="second-menu-images" alt="Unlock Remote Services" width="25px" />
            {{ $t("header.unlockService") }}
          </nuxt-link>
          <!-- New Arrival -->
          <nuxt-link class="d-flex align-items-center font-weight-bold m-auto" :to="getLink('/new-arrival')">
            <img src="/images/icons/new-arrival.svg" class="second-menu-images" alt="Unlock Remote Services" width="25px" />
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
    PvLoggedIn: () => import("~/components/common/header/PvLoggedIn.vue"),
    PvAuth: () => import("~/components/common/header/PvAuth.vue"),
    PvMainMenu: () => import("~/components/common/header/PvMainMenu"),
    PvCartMenu: () => import("~/components/common/header/PvCartMenu"),
    PvHeaderSearch: () => import("~/components/common/header/PvHeaderSearch.vue"),
  },
  data() {
    return {
      isMobile: false,
      isScrolling: false,
      searchQuery:"",
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
      if (window.scrollY >= 350) {
        this.$refs.headerBottom.classList.add('d-lg-flex');
      } else {
        this.$refs.headerBottom.classList.remove('d-lg-flex');
      }
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.checkScroll);
    window.removeEventListener('resize', this.checkMobile);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
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
    window.addEventListener('scroll', this.handleScroll, {passive:true});
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
    width: 350px
  }
}
@media screen and (max-width: 992px){
  .mobile-logo{
    max-width: 350px;
  }
}
@media screen and (max-width: 400px){
  .mobile-logo{
    max-width: 200px;
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
