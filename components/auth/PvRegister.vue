<template>
  <div :class="{ container: insideModal }" class="registerFoem">
    <div class="col-lg-12 col-md-12">
      <form id="registerForm"
        action="#"
        :class="{ 'mb-0': insideModal }"
        @submit.prevent="submit">
        <div class="row" :class="{ 'text-right': getIsAr }">
          <div class="col-lg-12 col-md-12" style="display: contents">
            <div class="col-lg-6 col-md-12 pr-3">
              <label for="register-name">
                {{ $t("auth.fullName") }}
                <span class="required">*</span>
              </label>
              <input
              id="register-name"
              v-model="form.name"
              class="form-input form-wide"
              type="text"
              :class="{ 'mb-2': insideModal }"
              required
              />
              <pv-error :error-msg="errorMsg.name" />
            </div>
            <div class="col-lg-6 col-md-12 pr-3">
              <label for="acc-phone">
                {{ $t("account.phone") }}
                <span class="required">*</span>
              </label>
              <input
                v-model="form.mobile"
                class="form-input form-wide"
                type="text"
                :class="{'mb-2':insideModal}" />
            </div>

            <div class="col-lg-6 col-md-12 pr-3 mt-lg-3">
              <label for="register-email">
                {{ $t("auth.emailAddress") }}
                <span class="required">*</span>
              </label>
              <input
                id="register-email"
                v-model="form.email"
                class="form-input form-wide"
                type="email"
                :class="{ 'mb-2': insideModal }"
                required
              />
              <pv-error :error-msg="errorMsg.email" />
            </div>

            <div class="col-lg-6 col-md-12 pr-3 mt-lg-3">
              <label for="register-password">
                {{ $t("auth.password") }}
                <span class="required">*</span>
              </label>
              <input
                id="register-password"
                v-model="form.password"
                class="form-input form-wide"
                type="password"
                :class="{ 'mb-2': insideModal }"
                required
              />
              <pv-error :error-msg="errorMsg.password" />
            </div> 
          </div>

          <div class="col-lg-12">
            <div class="mt-1 mt-lg-3 col-lg-9 col-md-12 mr-auto ml-auto">
              <base-button-icon-1
                :outline="true"
                :class="insideModal ? 'btn-block' : 'w-100'"
                class="py-4 register-button">
                {{ $t("auth.register") }}
              </base-button-icon-1>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import AutoComplate from "~/components/common/AutoComplate.vue";
import PvError from "~/components/common/ErrorMessage.vue";
import BaseButtonIcon1 from "../common/BaseButtonIcon1.vue";
import Api from "~/api";

export default {
  components: {
    AutoComplate,
    PvError,
    BaseButtonIcon1,
  },
  props: {
    insideModal: {
      type: Boolean,
      default: false,
    },
  },
  data: function () {
    return {
      phoneFormated: null,
      avatar: null,
      avatarLink: "https://tlkeys.com/static/images/user.png",
      companyInfoSecrion: true,
      form: {
        name: "",
        email: "",
        password: "",
        mobile: "",
        city: "",
        confirm_password: "",
        country_id: null,
        state: "",
        street: "",
        address: "",
        postal_code: "",
        company_name: "",
        website_url: "",
        PreferredLanguage:"",
      },
      alertMessage: "",
      alertClass: "",
      errorMsg: [],
      countries: [],
      token: null,
    };
  },
  created() {
    this.getCountries();
  },
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
    availableLocales() {
      const currentLocale = this.$i18n.locale;
      const locales = Object.entries(this.$settings.languages);
      return locales.filter(([locale,]) => locale !== currentLocale);
    }
  },
  mounted() {
  },
  methods: {
    ...mapActions("authentication", ["LogIn"]),
    submit: async function () {
      await this.Register(this.form);
    },

    async Register() {
      let registerForm = document.getElementById('registerForm');
      if (!registerForm) {
        return this.$notify({
          group: "errorMessage",
          type: "error",
          text: "Register form not found",
        });
      }

      let formData = new FormData(registerForm);
      formData.append("phone", this.form.mobile);
      formData.append("name", this.form.name);
      formData.append("email", this.form.email);
      formData.append("city", this.form.city);
      formData.append("password", this.form.password);
      formData.append("confirm_password", this.form.confirm_password);
      formData.append("country_id", this.form.country_id);
      formData.append("state", this.form.state);
      formData.append("street", this.form.street);
      formData.append("address", this.form.address);
      formData.append("postal_code", this.form.postal_code);
      formData.append("company_name", this.form.company_name);
      formData.append("website_url", this.form.website_url);
      formData.append("avatar", this.avatar);
      formData.append("language", this.form.PreferredLanguage);

      try {
        const response = await Api.post("/user/auth/register", formData);
        this.$notify({
          group: "custom-notify",
          type: "success",
          text: response.data.data.message,
        });
        const user = { email: this.form.email, password: this.form.password };
        await this.LogIn(user);
      } catch (error) {
        let errorObj = error.response?.data?.data || {};
        let message = Object.keys(errorObj).length
          ? errorObj[Object.keys(errorObj)[0]][0]
          : error.response?.data?.message || "An error occurred";
        
        this.$notify({
          group: "errorMessage",
          type: "error",
          text: message,
        });
      }
    },


    getCountries() {
      Api.post("/countries")
        .then((response) => {
          this.countries = response.data.result;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
    },
  },
};
</script>
<style>
button.noselect.py-4.register-button.outline.w-100{
  background-color: #25262b;
  color: white;
}
.input-tel__input , .country-selector__input {
  min-height: 50px!important;
}
</style>
