<template>
  <div class="row">
    <!-- Left Side (Rotating Messages) -->
    <div class="d-lg-flex col-lg-6">
      <div class="top-notice-container" :class="{ 'text-right': getIsAr }">
        <transition name="fade" mode="out-in">
          <p class="mb-auto mt-auto welcome-text" :key="currentMessageIndex">
            {{ rotatingMessages[currentMessageIndex] }}
          </p>
        </transition>
      </div>
    </div>

    <!-- Right Side (WhatsApp + Currency + Language) -->
    <div class="col-lg-6 col-12 d-flex flex-wrap justify-content-center align-items-center p-lg-1 gap-2 gap-lg-3">
      <div class="vertical-divider"></div>
      <!-- WhatsApp -->
      <div class="whatsapp-link">
        <a class="font-weight-bold d-flex align-items-center gap-1" :href="whatsappLink" target="_blank" rel="noopener" title="Contact via WhatsApp">
          <svg width="20" height="20" viewBox="0 0 32 32" fill="green" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 0C7.164 0 0 7.164 0 16c0 2.824.737 5.577 2.137 7.99L0 32l8.262-2.126A15.886 15.886 0 0 0 16 32c8.836 0 16-7.164 16-16S24.836 0 16 0zm0 29.867c-2.565 0-5.061-.676-7.246-1.957l-.519-.309-4.9 1.26 1.289-4.775-.336-.545A13.858 13.858 0 0 1 2.133 16C2.133 8.728 8.728 2.133 16 2.133S29.867 8.728 29.867 16 23.272 29.867 16 29.867zM23.52 19.364c-.387-.195-2.288-1.129-2.643-1.258-.355-.13-.615-.195-.874.195-.26.39-1.002 1.258-1.23 1.512-.228.26-.455.293-.843.098-.387-.195-1.637-.602-3.12-1.922-1.152-1.026-1.93-2.297-2.155-2.684-.228-.39-.024-.6.17-.79.176-.175.39-.455.584-.682.195-.228.26-.39.39-.65.13-.26.065-.487-.033-.682-.098-.195-.874-2.11-1.198-2.89-.313-.755-.633-.652-.874-.652H9.68c-.26 0-.682.098-1.04.487-.355.39-1.365 1.333-1.365 3.254s1.397 3.77 1.59 4.029c.195.26 2.74 4.18 6.63 5.86.928.4 1.652.637 2.217.815.93.293 1.777.252 2.447.153.746-.11 2.288-.934 2.61-1.84.322-.905.322-1.68.228-1.84-.098-.163-.355-.26-.74-.455z"/>
          </svg>
          {{ $t("auth.PhoneNumber") }}
        </a>
      </div>
      <div class="vertical-divider"></div>
      <!-- Currency -->
      <div class="header-dropdown m-0 currency-dropdown">
        <a class="header-icons" href="javascript:;">{{ currency }}</a>
        <div class="header-menu text-center">
          <ul>
            <li
              v-for="currency in availableCurrencies"
              :key="currency"
              @click="setCurrency(currency)"
            >
              <a href="javascript:;">{{ currency }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="vertical-divider"></div>
      <!-- Language -->
      <div class="header-dropdown m-0 language-dropdown">
        <a href="javascript:;">
          <img :src="currentLocale.flag" alt="Flag" width="20px" />
          {{ currentLocale.shortName }}
        </a>
        <div class="header-menu">
          <ul>
            <li
              v-for="locale in availableLocales"
              :key="locale[0]"
              style="cursor: pointer"
              @click="setLocale(locale[0])"
            >
              <a href="javascript:;">
                <img :src="locale[1].flag" alt="Flag" width="20px" />
                {{ locale[1].language }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import api from "~/api";

export default {
  data() {
    return {
      currentMessageIndex: 0,
      messageInterval: null
    };
  },
  computed: {
    ...mapGetters("currency", ["currency"]),
    ...mapGetters("language", ["getLang"]),
    availableCurrencies() {
      return this.$settings.currencies.filter((i) => i !== this.currency);
    },
    currentLocale() {
      return this.$i18n.locales.find((i) => i.code === this.$i18n.locale);
    },
    availableLocales() {
      const currentLocale = this.$i18n.locale;
      const locales = Object.entries(this.$settings.languages);
      return locales.filter(([locale]) => locale !== currentLocale);
    },
    rotatingMessages() {
      const msgs = this.$t("common.rotatingMessages");
      return Array.isArray(msgs) ? msgs : [];
    },
    whatsappLink() {
      const phoneNumber = this.$t("auth.PhoneNumber").replace(/\D/g, '');
      const message = encodeURIComponent("Hello, I have a question about your products.");
      return `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    }
  },
  methods: {
    ...mapMutations("rtlStore", ["setLan"]),
    ...mapMutations("currency", ["setCurrencyValue"]),
    ...mapActions("language", ["updateLanguageCode"]),
    setCurrency(currency) {
      api.defaults.headers["currency"] = currency;
      this.$cookies.set("currency", currency, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7
      });
      this.setCurrencyValue(currency);
      this.$nuxt.refresh();
    },
    getLink(route) {
      return this.getLang === "en" ? route : `/${this.getLang}${route}`;
    },
    setLocale(locale) {
      api.defaults.headers["Accept-Language"] = locale;
      this.$i18n.setLocale(locale);
      this.$i18n.locale = locale;
      this.$cookies.set("locale", locale, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7
      });
      this.updateLanguageCode(locale);
    }
  },
  mounted() {
    const currency = this.$cookies.get("currency");
    if (currency !== undefined) {
      this.setCurrencyValue(currency);
    }
    this.messageInterval = setInterval(() => {
      if (this.rotatingMessages.length > 0) {
        this.currentMessageIndex =
          (this.currentMessageIndex + 1) % this.rotatingMessages.length;
      }
    }, 5000);
  },
  beforeDestroy() {
    clearInterval(this.messageInterval);
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.currency-dropdown,
.language-dropdown {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 6px 12px;
}

.vertical-divider {
  width: 1px;
  height: 24px;
  background-color: #ccc;
}

.whatsapp-link {
  display: flex;
  align-items: center;
  gap: 6px;
}

@media screen and (max-width: 993px) {
  .vertical-divider ,.whatsapp-link{
    display: none;
  }
}
</style>