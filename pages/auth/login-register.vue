<template>
    <main class="main">
      <nav aria-label="breadcrumb" class="breadcrumb-nav container product-breadcrumb mb-3">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <nuxt-link :to="getLink('/')">
              {{ $t("products.home") }}
            </nuxt-link>
          </li>
          <li class="breadcrumb-item">
            <nuxt-link :to="getLink('/auth/login-register')">
              {{ $t("header.login") }}
            </nuxt-link>
          </li>
        </ol>
      </nav>
      <div class="container login-container">
        <div class="row">
          <div class="col-lg-5 col-md-12">
            <h2 class="additional-product-items pl-0">{{ $t("login.title") }}</h2>
            <pv-login />
          </div>
          <div class="col-lg-2 col-md-12 d-lg-flex flex-column align-items-center position-relative or-container">
            <div class="vertical-line"></div>
            <div class="horizontal-line"></div>
            <div class="circle-or" style="text-transform: uppercase">{{ $t("privacypolicy.or") }}</div>
          </div>
          <div class="col-lg-5 col-md-12">
            <h2 class="additional-product-items pl-0">{{ $t("login.registerNow") }}</h2>
            <pv-register />
          </div>
        </div>
      </div>
      <br><br>
    </main>
  </template>
  
  <script>
  import { mapGetters } from "vuex";
  import PvLogin from '~/components/auth/PvLogin';
  import PvRegister from '~/components/auth/PvRegister.vue';
  
  export default {
    components: {
      PvLogin,
      PvRegister
    },
    computed: {
      ...mapGetters("language", ["getLang"]),
    },
    methods: {
      getLink(route) {
        if (this.getLang === 'en') {
          return route; // Return the route as is without the language parameter
        } else {
          return `/${this.getLang}${route}`; // Include the language parameter
        }
      },
    },
    head() {
      return {
        title: this.$t('auth.loginRegisterTitle'),
        meta: [
          { name: 'description', content: this.$t('auth.loginRegisterDescription') },
          { property: 'og:title', content: this.$t('auth.loginRegisterTitle') },
          { property: 'og:description', content: this.$t('auth.loginRegisterDescription') },
          { property: 'og:type', content: 'website' },
          { property: 'og:url', content: this.$route.fullPath }
        ]
      }
    }
  };
  </script>
  
  <style scoped>
  .vertical-line {
    border-left: 1px solid #ccc;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
  }
  
  .circle-or {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: white;
    border: 2px solid #ccc;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #333;
  }
  
  .horizontal-line {
    display: none;
  }
  
  @media (max-width: 992px) {
    .vertical-line {
      display: none;
    }
  
    .horizontal-line {
      display: block;
      border-top: 1px solid #ccc;
      width: 100%;
      position: relative;
      top: 20px;
      margin-top: 20px;
    }
  
    .or-container {
      position: relative;
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 20px;
      margin-bottom: 20px;
    }
  
    .circle-or {
      position: relative;
      top: 0;
      transform: none;
    }
  }
  </style>  