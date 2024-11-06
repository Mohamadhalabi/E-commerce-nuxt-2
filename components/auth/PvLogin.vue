<template>
  <div :class="{ container: insideModal }">
    <div v-if="insideModal" class="heading mb-1">
      <h2 class="title">
        {{ $t("login.title") }}
      </h2>
    </div>

    <form
      action="#"
      :class="{ 'text-right': getIsAr }"
      @submit.prevent="submit"
    >
      <label for="login-email">
        {{ $t("common.email") }}
        <span class="required">*</span>
      </label>
      <input
        id="login-email"
        v-model="form.email"
        type="email"
        class="form-input form-wide"
        :class="{ 'mb-2': insideModal }"
        required
      />

      <label for="login-password">
        {{ $t("common.password") }}
        <span class="required">*</span>
      </label>
      <input
        id="login-password"
        v-model="form.password"
        type="password"
        class="form-input form-wide"
        :class="{ 'mb-2': insideModal }"
        required
      />

      <b v-if="this.token === ''" class="text-danger">
        {{ $t("common.pleaseCheckRecaptch") }}
      </b>

      <div
        class="form-footer d-flex align-items-center justify-content-between"
        :class="{ 'flex-row-reverse': getIsAr }"
      >
        <div class="custom-control custom-checkbox m-0 p-0 d-flex align-items-center">
          <input id="remember-me" type="checkbox" class="mx-1" />
          <label class="m-0" for="remember-me">
            {{ $t("login.rememberMe") }}
          </label>
        </div>
        <nuxt-link to="/auth/forgot-password" class="forget-password text-dark">
          <a @click="ResetPasswordEmail(form.email)">
            {{ $t("login.forgotPassword") }}
          </a>
        </nuxt-link>
      </div>

      <div class="text-center">
        <base-button-icon-1
          :outline="true"
          class="py-4"
          type="submit"
          style="background-color: #25262b; border-color: #25262b"
          :class="insideModal ? 'btn-block' : 'w-100'"
          >{{ $t("login.title") }}
        </base-button-icon-1>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import BaseButtonIcon1 from "../common/BaseButtonIcon1.vue";

export default {
  components: { BaseButtonIcon1 },
  props: {
    insideModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      token: null,
    };
  },
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
  },
  methods: {
    ...mapActions("authentication", ["LogIn", "ResetPasswordEmail"]),
    ...mapMutations("authentication", ["SET_USER", "SET_TOKEN"]),
    ...mapActions("shop", ["getCartList", "addToCart"]),
    ...mapActions("compare", ["fetchList", "addToList"]),
    ...mapActions("fav", ["afterLogOutWishlist", "fetchWishlist", "addToWishlist"]),

    submit: async function () {
      try {
        // Make a request to the login endpoint
        const response = await this.$axios.post('/user/auth/login', this.form);
        
      
        // Save the token in cookies
        this.$cookies.set('authToken', response.data.authorisation.token, {
          path: '/', // Available throughout the entire site
          maxAge: 60 * 60 * 24 * 7, // 1 week
        });
        // Save user data in cookies
        this.$cookies.set('userData', JSON.stringify(response.data.user), {
          path: '/', // Available throughout the entire site
          maxAge: 60 * 60 * 24 * 7, // 1 week
        });
        // this.SET_TOKEN(res.data.authorisation.token);
        this.SET_USER(response.data.user);

        // Set the token for axios globally
        this.$axios.setToken(response.data.token, 'Bearer');

        
        this.fetchDatafronLocalStorage();

        // Redirect to the original page or the home page
        const redirectTo = this.$route.query.redirectTo || '/';
        this.$router.push(redirectTo);

      } catch (error) {
        // Handle error (e.g., show a notification)
        this.$notify({
          group: "errorMessage",
          type: "error",
          text: error.response.data.message,
        });
      }
    },

    
    fetchDatafronLocalStorage() {
      // Logic for syncing local storage data with Vuex or backend
      let cartListLocalStorge = JSON.parse(localStorage.getItem("card"));
      if (cartListLocalStorge && cartListLocalStorge.length > 0) {
        for (let index = 0; index < cartListLocalStorge.length; index++) {
          this.addToCart(cartListLocalStorge[index]);
        }
        localStorage.removeItem("card");
      }

      let washListLocalStorge = JSON.parse(localStorage.getItem("wash"));
      if (washListLocalStorge && washListLocalStorge.length > 0) {
        for (let index = 0; index < washListLocalStorge.length; index++) {
          this.addToWishlist(washListLocalStorge[index]);
        }
        localStorage.removeItem("wash");
      }

      let compareListLocalStorge = JSON.parse(localStorage.getItem("compare"));
      if (compareListLocalStorge && compareListLocalStorge.length > 0) {
        for (let index = 0; index < compareListLocalStorge.length; index++) {
          this.addToList(compareListLocalStorge[index]);
        }
        localStorage.removeItem("compare");
      }

      this.getCartList();
      this.fetchList();
      this.fetchWishlist();
    },
  },
};
</script>
