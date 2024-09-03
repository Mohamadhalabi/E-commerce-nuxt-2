<template>
  <nuxt-link :to="getLink('/auth/login')" class="header-icon mx-2" v-if="!isAuthenticated">
    <div class="header-user">
      <i class="fa fa-user" />
      <div
        class="header-userinfo d-lg-block desktop-only"
        :class="getIsAr ? 'text-right' : ''">
                    <span class="d-inline-block font2 line-height-1">
                      {{ $t("header.welcome") }}
                    </span>
        <p class="mb-0 font-weight-bold login-register">
          {{ $t("header.login") }}
        </p>
      </div>
    </div>
  </nuxt-link>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import img from "~/static/images/blank.png";
import api from "~/api";
export default {
  mounted(){
    if(this.isAuthenticated){
      api.post("user/auth/last-login", { userId: this.StateUser.id })
    }
  },
  computed: {
    ...mapGetters("authentication", ["isAuthenticated", "StateUser"]),
    ...mapGetters("language", ["getLang"]),
    ...mapGetters("rtlStore", ["getIsAr"]),
    availableCurrencies() {
      return this.$settings.currencies.filter((i) => i !== this.currency);
    },
  },
  methods: {
    ...mapActions("authentication", ["LogOut"]),
    defalutAvatar(e) {
      e.target.src = img;
    },
    getLink(route) {
      if (this.getLang === 'en') {
        return route; // Return the route as is without the language parameter
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    },
    myOrders() {
      this.$router.push({ path: "/account", query: { tab: "orders" } });
    },
    checkURL(url) {
      if (url) {
        return url;
      } else {
        return "https://cdn-icons-png.flaticon.com/512/7855/7855599.png";
      }
    },
  },
};
</script>
