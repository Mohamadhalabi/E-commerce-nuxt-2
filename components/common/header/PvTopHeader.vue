<template>
  <div class="row">
    <div class="col-6">
      <div class="text-center pl-6 pr-6 container top-notice-container top-n" :class="{'text-right': getIsAr}">
        <p class="mb-auto mt-auto welcome-text">{{$t('common.WelcomeTo')}}
          <span class="second-top-notice">{{$t('common.tlkeys')}}</span>
        </p>
      </div>
    </div>
    <div class="col-3">
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
    </div>
    <div class="col-3">
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


</template>
<script>
import {mapGetters, mapMutations} from "vuex";
import PvSocialIcons from "~/components/common/PvSocialIcons.vue";
import api from "~/api";

export default {
  components: {
    PvSocialIcons

  },
  computed:{
    ...mapGetters("currency", ["currency"]),
    availableCurrencies() {
      return this.$settings.currencies.filter((i) => i !== this.currency);
    },
  },
  methods: {
    ...mapMutations("currency", ["setCurrencyValue"]),
    ...mapMutations("header", ["changeCurrency"]),

    setCurrency(currency) {
      api.defaults.headers["currency"] = currency;
      this.setCurrencyValue(currency);
      localStorage.setItem("currency",currency)
      this.changeCurrency(currency);
    },

    getLink(route) {
      if (this.getLang === 'en') {
        return route; // Return the route as is without the language parameter
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    },
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
  }
}
</script>
<style scoped>

</style>
