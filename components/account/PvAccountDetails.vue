<template>
  <div>
    <h3 class="account-sub-title  d-md-block mt-0 pt-1 ml-1">
      {{
        $t("account.account_details")
      }}
    </h3>
    <div class="account-content">
      <form id="detailsForm" action="#" class="custom-form" @submit.prevent="updateUserDetails">
        <div class="row">
          <div class="col-md-12 order-md-0 order-1">
            <!-- Name -->
            <div class="form-group mt-lg-0  mt-3">
              <label for="name">
                {{ $t("account.name") }}
                <span class="required">*</span>
              </label>
              <input
                id="acc-u-name"
                v-model="profile.name"
                class="form-control"
                type="text"
                name="name"
                required
              />
            </div>

            <div class="col-lg-12 col-md-12 mb-3 p-0">
              <label>{{ $t("auth.Language")}}</label>
                <select
                  class="form-select"
                  v-model="profile.preferred_language"
                >
                  <option disabled value="">{{ profile.preferred_language || 'Select language' }}</option>
                  <option value="en">English</option>
                  <option value="fr">French</option>
                  <option value="es">Spanish</option>
                  <option value="de">German</option>
                  <option value="ru">Russian</option>
                </select>
            </div>

            <!-- Company -->
            <div class="form-group">
              <label for="acc-company-name">
                {{ $t("account.company_name") }}
              </label>
              <input
                id="acc-company-name"
                v-model="profile.company_name"
                class="form-control"
                type="text"
                name="acc-company-name"
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12 mt-md-2">
            <!-- Email Address  -->
            <div class="form-group">
              <label for="acc-u-email">
                {{ $t("account.email_address") }}
                <span class="required">*</span>
              </label>

              <input
                id="acc-u-email"
                v-model="profile.email"
                class="form-control"
                type="email"
                name="acc-u-email"
                required
              />
            </div>
          </div>

          <div class="col-md-6">
            <!-- PhoneNumber -->
            <div class="form-group  VuePhoneNumberInputClass">
              <label for="acc-phone">
                {{ $t("account.phone") }}
                <span class="required">*</span>
              </label>
              <input
                v-model="profile.phone"
                class="form-control"
                />
<!--              <VuePhoneNumberInput-->
<!--                @update="typePhoneNum"-->
<!--                :default-country-code="countryCode"-->
<!--                v-model="profile.phone"-->
<!--              />-->
            </div>
          </div>

          <div class="col-md-6">
            <!-- Website -->
            <div class="form-group">
              <label for="acc-website-url">
                {{ $t("account.website") }}
              </label>
              <input
                id="acc-website-url"
                v-model="profile.website_url"
                class="form-control"
                type="url"
                name="acc-website-url"
              />
            </div>
          </div>

          <div class="col-md-12">
            <!-- Type of Business -->
            <div class="form-group mb-0">
              <label for="acc-type-of-business">
                {{ $t("account.type_of_business") }}
              </label>
              <input
                id="acc-type-of-business"
                v-model="profile.type_of_business"
                class="form-control"
                type="text"
                name="acc-type-of-business"
              />
            </div>
          </div>
        </div>

        <div class="form-footer mt-1">
          <base-button-icon-1
            @click="changePassword"
            class="py-3 px-5 mx-2"
            :outline="true"
          >
            {{ $t("account.change_password") }}
          </base-button-icon-1
          >
          <base-button-icon-1
            :disabled="loadingSave"
            class="py-3 px-5 mx-2"
            :outline="true"
            type="submit"
          >
            <span v-if="!loadingSave">
              {{ $t("account.save_changes") }}
            </span>
            <b-spinner v-else
            />
          </base-button-icon-1>

        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {scrollTopHandler} from "~/utils";
import Api from "~/api";
import BaseButtonIcon1 from "../common/BaseButtonIcon1.vue";
import {mapActions} from "vuex";
import AutoComplate from "~/components/common/AutoComplate.vue";
import api from "~/api";
export default {
  data: function () {
    return {
      profile: {
        name: "",
        email: "",
        phone: "",
        avatar: "",
        company_name: "",
        website_url: "",
        type_of_business: "",
        avataFile: "",
        preferred_language: "",
      },
      loadingSave: false,
      avatar: null,
    };
  },
  components: {
    AutoComplate,
    BaseButtonIcon1,
  },

  watch: {
    $route: function () {
      if (this.$route.query.tab === "account-details") this.getUserDetails();
    },
  },

  mounted() {
    this.getUserDetails();
  },

  methods: {
    ...mapActions('authentication', ['setNewData']),
    ...mapActions('language',['updateLanguageCode']),

    // typePhoneNum(phoneObj) {
    //   this.phoneFormated = phoneObj.formattedNumber;
    // },

    onFileChange(e) {
      const file = e.target.files[0];
      if (file == undefined) {
        this.profile.avatar = file;
        this.profile.avataFile = file;
      } else this.profile.avatar = URL.createObjectURL(file);
    },

    removeUserAvatar() {
      this.profile.avatar = "";
    },


    updateUserDetails: async function () {
      // this.$Progress.start();
      this.loadingSave = true;
      let formData = new FormData(document.getElementById('detailsForm'));
      formData.append("name", this.profile.name);
      formData.append("email", this.profile.email);
      formData.append("phone", this.profile.phone);
      formData.append("type_of_business", this.profile.type_of_business);
      formData.append("company_name", this.profile.company_name);
      formData.append("website_url", this.profile.website_url);
      formData.append("avatar", this.avatar);
      formData.append("language", this.profile.preferred_language);

      await Api.post("/user/profile", formData)
        .then((response) => {
          let preffered_language = this.profile.preferred_language;
          api.defaults.headers["Accept-Language"] = preffered_language;
          this.$i18n.locale = preffered_language;
          this.$cookies.set('locale',preffered_language,{
            path: '/',
            maxAge: 60 * 60 * 24 * 7
          });
          this.updateLanguageCode(preffered_language);

          if(preffered_language ==='en'){
            this.$router.push(`/account?tab=account-details`);
          }
          else{
            this.$router.push(`/${preffered_language}/account?tab=account-details`);
          }

          scrollTopHandler();
          this.$notify({
            group: "custom-notify",
            type: "success",
            text: this.$t("common.updatedProfile"),
          });
        })
        .catch((error) => {
          let errorObj = error.response.data.data;
          this.$notify({
            group: "errorMessage",
            type: "error",
            text: error.response.data.data[Object.keys(errorObj)[0]][0],
          });
        })
        .finally(() => {
          this.loadingSave = false;
        });

      this.setNewData()

      // this.$Progress.finish();
    },

    getUserDetails: function () {
      // this.$Progress.start();
      Api.get("/user/profile")
        .then((response) => {
          const user = response.data.user_info;
          this.profile.name = user.name;
          this.profile.email = user.email;
          this.profile.phone = user.phone;
          this.profile.avatar = user.avatar;
          this.profile.preferred_language = user.preffered_language;

          this.setNewData()
          if(user.company_name !== "null") {
            this.profile.company_name = user.company_name;
          }
          if(user.website_url !== "null")
          this.profile.website_url = user.website_url;
          this.profile.type_of_business = user.type_of_business;
          scrollTopHandler();
        })
        .catch((error) => ({error: JSON.stringify(error)}));
      // this.$Progress.finish();
    },
    head() {
      return {
        titleTemplate: JSON.parse(this.$settings.seo.meta_title)[this.$i18n.locale],
        title: JSON.parse(this.$settings.seo.meta_title)[this.$i18n.locale],
      }
    },
    changePassword() {
      this.$router.push({
        path: "/account",
        query: {tab: "change-password"},
      });
    },
  },
};
</script>
<style>
.VuePhoneNumberInputClass .input-tel__input,
.VuePhoneNumberInputClass .country-selector__input {
  height: 48px;
}
</style>
