<template>
  <div class="from-demo-26">
    <header class="header">
      <div class="header-top">
        <div class="container d-block">
          <div class="row align-items-center">
            <div
              class="large-screen-only col-xl-4 col-lg-4 col-md-5 col-sm-12 col-xs-12 d-flex flex-wrap justify-content-md-start justify-content-center align-items-center">
              <nuxt-img
                format="webp"
                height="90"
                sizes="lg:400px"
                alt="techno lock offer" src="/images/offers/best-deals-of-the-week.webp" loading="lazy" />
            </div>
            <div class="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 col-xs-12 d-flex justify-content-lg-end justify-content-md-center justify-content-sm-center currency-language ">
              <div class="d-flex align-items-center">
                <div class="header-dropdown m-0" style="margin-top: 3px!important;">
                  <a class="header-icons" href="javascript:;">{{ currency }}</a>
                  <div class="header-menu text-center">
                    <ul>
                      <li
                        v-for="currency in availableCurrencies"
                        :key="currency"
                        @click="setCurrency(currency)">
                        <a href="javascript:;">{{ currency }}</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="header-about-contact">
                  <nuxt-link :to="getLink('/about')">
                    {{ $t("header.about") }}
                  </nuxt-link>
                </div>
                <div class="header-about-contact">
                  <nuxt-link :to="getLink('/contact')">
                    {{ $t("header.contact") }}
                  </nuxt-link>
                </div>
              </div>
              <div class="contact-icons d-flex ml-2 mr-2">
                <div class="header-dropdown ml-2 mr-2 whatsapp-icon" @click="sendWhatsAppMessage">
                  <i class="fab fa-whatsapp"></i>
                </div>

                <div class="header-dropdown ml-2 mr-2 map-icon" @click="openGoogleMap">
                  <i class="fa fa-map-marker"></i>
                </div>

                <div class="header-dropdown ml-2 mr-2 phone-icon" @click="makePhoneCall">
                  <i class="fa fa-phone"></i>
                </div>
              </div>
              <pv-social-icons class="d-lg-flex social-icons ml-lg-5"/>
            </div>
          </div>
        </div>
      </div>

      <div class="header-middle sticky-header mobile-sticky">
        <div class="container justify-content-center">
          <div class="row justify-content-center w-100 py-2 main-menu">
            <!--Begin: Left Side -->
            <div
              class="d-flex align-items-center flex-md-row flex-lg-grow-1 ">
              <div>
                <button
                  class="mobile-menu-toggler"
                  type="button"
                  @click="showMobileMenu"
                >
                  <i class="fas fa-bars">
                    <div v-for="number in numbers" :key="number"></div>
                  </i>
                </button>
              </div>
              <nuxt-link :to="getLink('/')">
                <nuxt-img
                  v-if="!isMobile"
                  format="webp"
                  sizes="xs:100px sm:200px md:400px lg:500px xl:800px"
                  class="logo-image" title="Techno lock logo" src="/images/logos/techno-lock-desktop-logo.webp" alt="tlk Logo" />
                <nuxt-img
                  v-else
                  format="webp"
                  class="mobile-logo"
                  sizes="xs:300px sm:300px md:300px lg:500px xl:800px"
                  title="Techno lock logo" src="/images/logos/techno-lock-logo-mobile.webp" alt="tlk Logo" />
              </nuxt-link>
              <pv-header-search
                @SearchInputClicked="SearchInputClicked"
                class="d-sm-block" />
              <div class="small-devices-only d-flex">
                <div class="mb-auto mt-auto">
                  <a
                    class="header-icon position-relative mx-2 cursor-pointer"
                    title="search"
                    @click="openModal"
                  >
                    <i class="fa fa-search mt-auto"></i>
                  </a>
                </div>
                <b-modal v-model="modalOpen" class="modal-title" title="Find Your Product" hide-footer>
                  <div class="d-flex flex-column">
                    <div class="mb-2">
                      <label for="search-input" class="mr-2">Search:</label>
                      <input id="search-input" type="text" v-model="searchQuery" class="form-control w-100">
                    </div>
                    <div class="d-flex justify-content-start">
                      <button @click="search" class="search-button btn btn-primary ml-auto mr-auto">Search</button>
                    </div>
                  </div>
                </b-modal>
              </div>
            </div>
            <!-- End: Left Side -->

            <!--Begin: Right Side-->
            <div class="d-flex align-items-center">
              <div
                class="contact-widget d-none d-lg-flex flex-column"
                :class="getIsAr ? 'text-right' : ''">
                <p class="off-animatin mb-0 call-us-now text-center font-weight-bold">
                  {{ $t("auth.callNow") }}
                </p>
                <span class=" contact-phone ls-n-10 mb-0">
                  <a class="price-color font-weight-bold text-decoration-none"
                     :href="`tel:${$settings.contact.phone_primary}`">
                    {{ $settings.contact.phone_primary }}
                  </a>
                </span>
              </div>
              <no-ssr>
                <PvLoggedIn />
              </no-ssr>
              <no-ssr>
                <PvAuth />
              </no-ssr>


<!--              <nuxt-link v-else :to="getLink('/account')" class="header-icon desktop-only">-->
<!--                <div class="header-user">-->
<!--                  <i-->
<!--                    class=""-->
<!--                    :class="StateUser.avatar ? 'user-avatar' : 'sicon-user'">-->
<!--                    <nuxt-img-->
<!--                      format="webp"-->
<!--                      v-if="StateUser.avatar"-->
<!--                      :src="checkURL(StateUser.avatar)"-->
<!--                      @error="defalutAvatar"-->
<!--                      width="50"-->
<!--                      height="50"-->
<!--                      alt="Avatar"-->
<!--                    />-->
<!--                  </i>-->
<!--                  <template>-->
<!--                    <div class="header-dropdown">-->
<!--                      <p style="text-decoration: none !important;" href="javascript:;">-->
<!--                        {{ StateUser.name }}-->
<!--                      </p>-->
<!--                      <div class="header-menu border-0">-->
<!--                        <ul>-->
<!--                          <li>-->
<!--                            <span class="account-list" @click.prevent="myOrders">-->
<!--                                {{ $t("account.orders") }}-->
<!--                            </span>-->
<!--                          </li>-->
<!--                          <li>-->
<!--                            <span class="account-list" @click="LogOut">-->
<!--                                {{ $t("account.log_out") }}-->
<!--                            </span>-->
<!--                          </li>-->
<!--                        </ul>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </template>-->
<!--                  <div class="header-userinfo d-none d-lg-block">-->
<!--                    <span class="d-inline-block font2 line-height-1"> </span>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </nuxt-link>-->





              <div class="d-flex">
                <a
                  class="header-icon position-relative mx-2 cursor-pointer mt-auto mb-auto"
                  title="wishlist"
                >
                  <i class="fa fa-heart" @click="goToWishlist" />
                  <span class="cart-count badge-circle">{{getWishlistCounts}}</span>
                </a>

                <a
                  class="header-icon position-relative ComparesBtn mx-2 cursor-pointer mt-auto mb-auto"
                  title="Compares">
                  <i class="fa fa-shuffle" @click="goToCompares" />
                  <span class="cart-count badge-circle">{{ getCounts }}</span>
                </a>

                <a class="mx-2 cursor-pointer mt-auto mb-auto">
                  <pv-cart-menu />
                </a>
              </div>
            </div>
            <!-- End : Right Side -->
          </div>
        </div>
      </div>
      <div
        class="header-bottom sticky-header d-none d-lg-flex desktop-sticky box-shadow-none first-menu">
        <div class="container">
          <pv-main-menu />
        </div>
      </div>
      <div
        class="d-none header-bottom sticky-header desktop-sticky2 box-shadow-none second-menu"
        style="z-index: 999"
        ref="headerBottom">
        <div class="container">
          <div class="row text-center w-100">
            <div class="col-lg-9 mt-auto mb-auto text-left">
              <nuxt-link
                class="price-color font-weight-bold"
                :to="getLink('/shop?offers')">
                <i class="fa fa-percent">
                </i>
                <span class="ml-1 mr-lg-2"
                      :class="getIsAr ? 'ml-xl-5' : 'mr-xl-5'">
                  {{ $t("header.Offer") }}
                </span>
              </nuxt-link>
              <nuxt-link :to="getLink('/shop?free-shipping')">
                <i class="fas fa-shipping-fast"></i>
                <span class="ml-1 mr-lg-2"
                      :class="getIsAr ? 'ml-xl-5' : 'mr-xl-5'">
                  {{ $t("header.FreeShipping") }}
                </span>
              </nuxt-link>
              <nuxt-link :to="getLink('/shop?bundled')">
                <i class="fa fa-boxes"></i>
                <span class="ml-1  mr-lg-2"
                      :class="getIsAr ? 'ml-xl-5' : 'mr-xl-5'">
                  {{ $t("header.Bundles") }}
                </span>
              </nuxt-link>
              <nuxt-link :to="getLink('/online-services')">
                <i class="fa fa-wrench"></i>
                <span class="header-icons online-services ml-1  mr-lg-2"
                      :class="getIsAr ? 'ml-xl-5' : 'mr-xl-5'">
                  {{ $t("header.OnlineServices") }}
                </span>
              </nuxt-link>
              <nuxt-link :to="getLink('/unlock-remote-services')">
                <i class="fa fa-lock"></i>
                <span class="header-icons online-services ml-1 mr-lg-2"
                      :class="getIsAr ? 'ml-xl-5' : 'mr-xl-5'">
                  {{ $t("header.unlockService") }}
                </span>
              </nuxt-link>
            </div>
            <div class="col-lg-3 d-flex">
              <i class="fa fa-search m-auto search-icon" @click="openModal">
              </i>
              <div class="header-dropdown m-auto">
                <a class="header-icons" href="javascript:;">{{ currency }}</a>
                <div class="header-menu text-center">
                  <ul>
                    <li
                      v-for="currency in availableCurrencies"
                      :key="currency"
                      @click="setCurrency(currency)">
                      <a href="javascript:;">{{ currency }}</a>
                    </li>
                  </ul>
                </div>
              </div>
              <!--              <div class="header-dropdown m-auto">-->
              <!--                <a class="header-icons" href="javascript:;">{{-->
              <!--                    currentLocale.shortName-->
              <!--                  }}</a>-->
              <!--                <div class="header-menu">-->
              <!--                  <ul>-->
              <!--                    <li-->
              <!--                      v-for="locale in availableLocales"-->
              <!--                      :key="locale"-->
              <!--                      class="cursor-pointer"-->
              <!--                      @click="setLocale(locale[0])">-->
              <!--                      <a href="javascript:;" class="text-uppercase">{{ locale[0]}}</a>-->
              <!--                    </li>-->
              <!--                  </ul>-->
              <!--                </div>-->
              <!--              </div>-->
              <a
                class="header-icon position-relative m-auto mt-1 ml-lg-3 cursor-pointer"
                title="wishlist"
              >
                <i class="fa fa-heart" @click="goToWishlist" />
                <span class="cart-count badge-circle">{{
                    getWishlistCounts
                  }}</span>
              </a>
              <a
                class="header-icon position-relative ComparesBtn m-auto mt-1 ml-lg-3 cursor-pointer"
                title="Compares">
                <i class="fa fa-shuffle" @click="goToCompares" />
                <span class="cart-count badge-circle">{{ getCounts }}</span>
              </a>
              <a class="m-auto mt-1 ml-lg-3 cursor-pointer">
                <pv-cart-menu />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="d-lg-flex d-none header-bottom sticky-header desktop-sticky3 box-shadow-none second-menu">
        <div class="container">
          <div class="row text-center w-100">
            <div class="row text-center w-100">
              <div class="col-lg-2 m-auto">
                <nuxt-link :to="getLink('/shop?offers')"
                           class="price-color font-weight-bold"
                >
                  <i class="fa fa-percent">
                  </i>
                  <span class="ml-1">
                  {{ $t("header.Offer") }}
                </span>
                </nuxt-link>
              </div>
              <div class="col-lg-2 m-auto">
                <nuxt-link :to="getLink('/shop?free-shipping')">
                  <i class="fas fa-shipping-fast"></i>
                  <span class="ml-1">
                  {{ $t("header.FreeShipping") }}
                </span>
                </nuxt-link>
              </div>
              <div class="col-lg-2 m-auto">
                <nuxt-link :to="getLink('/shop?bundled')">
                  <i class="fa fa-boxes"></i>
                  <span class="ml-1">
                  {{ $t("header.Bundles") }}
                </span>
                </nuxt-link>
              </div>
              <div class="col-lg-2 m-auto services">
                <nuxt-link :to="getLink('/online-services')" class="m-auto">
                  <i class="fa fa-wrench"></i>
                  <span class="header-icons online-services ml-1">
                  {{ $t("header.OnlineServices") }}
                </span>
                </nuxt-link>
              </div>
              <div class="col-lg-2 m-auto services">
                <nuxt-link :to="getLink('/unlock-remote-services')">
                  <i class="fa fa-lock"></i>
                  <span class="header-icons online-services ml-1">
                   {{ $t("header.unlockService") }}
                </span>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>
<script>
import PvMainMenu from "~/components/common/header/PvMainMenu";
import PvCartMenu from "~/components/common/header/PvCartMenu";
import PvHeaderSearch from "~/components/common/header/PvHeaderSearch";
import PvSocialIcons from "~/components/common/PvSocialIcons";
import { mapActions, mapGetters, mapMutations } from "vuex";
import api from "~/api";
import img from "~/static/images/blank.png";
import Api from "~/api";
import PvAuth from "~/components/common/header/PvAuth.vue";
import PvLoggedIn from "~/components/common/header/PvLoggedIn.vue";
export default {
  components: {
    PvLoggedIn,
    PvAuth,
    PvMainMenu,
    PvCartMenu,
    PvHeaderSearch,
    PvSocialIcons,
  },
  data() {
    return {
      isMobile: false,
      isScrolling: false,
      searchQuery:"",
      modalOpen: false,
      showModal: false,
      inputValue: "",
      defCurrency: "USD",
      numbers: [1, 2, 3],
      isSearchVisible: false,
      searchKey:'',
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "StateUser"]),
    ...mapGetters("fav", ["getWishlistCounts"]),
    ...mapGetters("compare", ["getCounts"]),
    ...mapGetters("currency", ["currency"]),
    ...mapGetters("rtlStore", ["getIsAr"]),
    ...mapGetters("language", ["getLang"]),
    setLogo() {
      return this.$settings.website.system_logo_black.l.url;
    },

    currentLocale() {
      return this.$i18n.locales.find((i) => i.code === this.$i18n.locale);
    },

    availableLocales() {
      return Object.entries(this.$settings.languages);
    },

    currentCurrency() {
      return this.$settings.currencies.find((i) => i === this.currency);
    },


    availableCurrencies() {
      return this.$settings.currencies.filter((i) => i !== this.currency);
    },
  },
  methods: {
    ...mapMutations("currency", ["setCurrencyValue"]),
    ...mapMutations("rtlStore", ["setLan"]),
    ...mapActions("compare", ["fetchList"]),
    ...mapActions("fav", ["fetchWishlist"]),
    ...mapActions("auth", ["LogOut"]),
    ...mapActions("language",["updateLanguageCode"]),
    ...mapMutations("header", ["changeCurrency"]),

    sendWhatsAppMessage() {
      // Replace '1234567890' with the desired WhatsApp number
      const whatsappNumber = '+971504429045';
      const whatsappMessage = 'Hello';

      // Create the WhatsApp link
      const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`;

      // Open the WhatsApp link
      window.location.href = whatsappLink;
    },

    openGoogleMap() {
      // Replace 'https://www.google.com/maps' with the desired Google Maps link
      const mapLink = 'https://www.google.com/maps/place/Techno+Lock+Keys+Trading+(+%D8%AA%D9%83%D9%86%D9%88+%D9%84%D9%88%D9%83+%D9%84%D8%AA%D8%AC%D8%A7%D8%B1%D8%A9+%D8%A7%D9%84%D9%85%D9%81%D8%A7%D8%AA%D9%8A%D8%AD+)%E2%80%AD/@25.3199127,55.407002,15z/data=!4m5!3m4!1s0x0:0xc1d5d1a7ec3407f9!8m2!3d25.3199127!4d55.407002?coh=164777&entry=tt&shorturl=1';

      // Open the Google Maps link
      window.location.href = mapLink;
    },

    makePhoneCall() {
      // Replace '1234567890' with the desired phone number
      const phoneNumber = '+971504429045';

      // Create the phone call link
      const phoneLink = `tel:${phoneNumber}`;

      // Open the phone call link
      window.location.href = phoneLink;
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
    openModal() {
      this.modalOpen = true;
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

    closeModal(){
      this.showModal = false;
    },

    searchProduct() {
      if (this.searchKey =='') {
        this.productsBySearch = [];
      } else {
        let query = `?search=${this.searchKey}`;
        if (this.selectedCategory != null) {
          query = `?search=${this.searchKey}&categories=${this.selectedCategory}`;
        }
        Api.get(`shop${query}`)
          .then((response) => {
            this.productsBySearch = response.data.products;
            this.totalProduct = response.data.total;
          })
          .catch((error) => ({ error: JSON.stringify(error) }));
      }
    },
    goToShop() {
      if (!this.searchKey && !this.selectedCategory) return;
      let query = "";
      if (this.searchKey && this.selectedCategory == null) {
        query = `?page=1&search=${this.searchKey}&`;
      } else {
        query = `?categories=${this.selectedCategory}&page=1&search=${this.searchKey}&`;
      }
      this.$router.push({ path: "shop", query: { filter: query } });
    },

    checkURL(url) {
      if (url) {
        return url;
      } else {
        return "https://cdn-icons-png.flaticon.com/512/7855/7855599.png";
      }
    },

    myOrders() {
      this.$router.push({ path: "/account", query: { tab: "orders" } });
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


    setLocale(locale) {
      api.defaults.headers["Accept-Language"] = locale;
      this.$i18n.setLocale(locale);
      this.updateLanguageCode(locale)
      this.setLan(locale);
    },

    setCurrency(currency) {
      api.defaults.headers["currency"] = currency;
      this.setCurrencyValue(currency);
      localStorage.setItem("currency",currency)
      this.changeCurrency(currency);
      // window.location.href = window.location.origin + this.$route.fullPath;
    },


    defalutAvatar(e) {
      e.target.src = img;
    },

    toggleSearchInput() {
      this.showSearchInput = !this.showSearchInput;
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
.search-icon:hover{
  cursor: pointer;
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
    width: 450px
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
</style>
