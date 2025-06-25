<template>
  <nuxt-link :to="getLink('/account')" class="header-icon" v-if="isAuthenticated">
    <div class="header-user">
      <img
        src="/images/icons/avatar.png"
        class="person-icon"
        width="32px"
        height="32px"
      />
      <template>
        <div class="header-dropdown">
          <p class="desktop-only" style="text-decoration: none !important;" href="javascript:;">
            {{ StateUser.name }}
          </p>
          <div class="header-menu border-0">
            <ul class="account-menu-ul">
              <li class="account-menu-li text-center">
                <nuxt-link :to="getLink('/account?tab=dashboard')">
                  {{ $t("dashboard.dashboard") }}
                </nuxt-link>
              </li>
              <hr class="logged-in-menu" />

              <li class="account-menu-li text-center">
                <nuxt-link :to="getLink('/account?tab=account-details')">
                  {{ $t("dashboard.accountDetails") }}
                </nuxt-link>
              </li>
              <hr class="logged-in-menu" />

              <li class="account-menu-li text-center">
                <nuxt-link :to="getLink('/account?tab=orders')">
                  {{ $t("account.orders") }}
                </nuxt-link>
              </li>
              <hr class="logged-in-menu" />

              <li class="account-menu-li text-center">
                <nuxt-link :to="getLink('/account?tab=addresses')">
                  {{ $t("dashboard.myAddresses") }}
                </nuxt-link>
              </li>
              <hr class="logged-in-menu" />

              <li class="account-menu-li text-center pt-1">
                <span class="account-list" @click="LogOut">
                  {{ $t("account.log_out") }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </template>
      <div class="header-userinfo d-none d-lg-block">
        <span class="d-inline-block font2 line-height-1"> </span>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import img from "~/static/images/blank.png";

export default {
  computed: {
    ...mapGetters("authentication", ["isAuthenticated", "StateUser"]),
    ...mapGetters("language", ["getLang"]),
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
      return this.getLang === 'en' ? route : `/${this.getLang}${route}`;
    },
    myOrders() {
      this.$router.push({ path: this.getLink("/account"), query: { tab: "orders" } });
    },
    checkURL(url) {
      return url || "https://cdn-icons-png.flaticon.com/512/7855/7855599.png";
    },
  },
};
</script>

<style>
.account-menu-ul {
  padding: 10px !important;
  margin-bottom: 10px;
}
.logged-in-menu{
  margin: 0;
  border-top: 2px dotted #b8b8b8;
  padding-top: 2px;
  padding-bottom: 2px;
}
</style>