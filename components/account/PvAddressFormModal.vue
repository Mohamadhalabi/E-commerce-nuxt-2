<template>
  <div v-if="buttonPressed == true">
    <div class="modal-wrapper custom-modal-form p-2" :class="$i18n.locale == 'ar' ? 'ltrClass' : ''">
      <div class="container">
        <div class="d-flex align-items-center w-100 justify-content-between mb-3" :class="{ 'flex-row-reverse': getIsAr }">
          <h2 class="title m-0 mt-2">
            {{ typeForm == "edit" ? "Update Address" : "Create Address" }}
          </h2>
        </div>
        <form action="#" class="custom-form mb-0" @submit.prevent="submit">
          <div class="row classFormRtl">
            <div class="col-md-6">
              <div class="form-group">
                <label>
                  {{ $t("orders.country") }}
                </label>
                <span class="required">*</span>
                <select
                  class="form-control"
                  style="font-size: 16px;"
                  v-model="form.country_id"
                  required>
                  <option 
                    v-for="country in countries" 
                    :key="country.id"
                    :value="country.id">
                    {{ country.name }}
                  </option>
                </select>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group mb-3">
                <label for="city">
                  {{ $t("orders.city") }}
                </label>
                <span class="required">*</span>
                <input
                  id="city"
                  v-model="form.city"
                  class="form-control"
                  type="text"
                  name="city"
                  required
                />
              </div>
            </div>

            <div class="col-md-4">
              <div class="form-group mb-3">
                <label for="street">
                  {{ $t("orders.street") }}
                </label>
                <input
                  id="street"
                  v-model="form.street"
                  class="form-control"
                  type="text"
                  name="street"
                />
              </div>
            </div>

            <div class="col-md-4">
              <div class="form-group mb-3">
                <label for="state">
                  {{ $t("orders.state") }}
                </label>
                <input
                  id="state"
                  v-model="form.state"
                  class="form-control"
                  type="text"
                  name="state"
                />
              </div>
            </div>

            <div class="col-md-4">
              <div class="form-group mb-3">
                <label for="postal_code">
                  {{ $t("orders.postal_code") }}
                </label>
                <span class="required">*</span>
                <input
                  id="postal_code"
                  v-model="form.postal_code"
                  class="form-control"
                  type="text"
                  name="postal_code"
                  required
                />
              </div>
            </div>

            <div class="col-12">
              <div class="form-group mb-3 VuePhoneNumberInputClass">
                <label for="phone">
                  {{ $t("orders.phone") }}
                </label>
                <span class="required">*</span>
                <input
                  type="text"
                  class="form-control"
                  v-model="form.phone"
                  name="phone Number"
                  required
                />
              </div>
            </div>

            <div class="col-12">
              <div class="form-group mb-3">
                <label for="address">
                  {{ $t("account.address") }}
                </label>
                <span class="required">*</span>
                <input
                  id="address"
                  v-model="form.address"
                  class="form-control"
                  name="address"
                  required
                />
              </div>
            </div>

            <div class="row">
              <div class="col-12">
                <label class="tlk-custom-switch">
                  <input v-model="form.default" type="checkbox" />
                  <span class="slider" />
                  <span class="tlk-custom-switch-label">{{$t("account.use_default_address")}}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="mt-2 mb-1 text-center">
            <base-button-icon-1
              class="py-4 checkout-buttons text-center mr-lg-2 mb-2 address-buttons"
              :outline="true"
              type="submit">{{ $t("account.save_changes") }}</base-button-icon-1>
              <base-button-icon-1
                class="py-4 checkout-buttons text-center mb-2 address-buttons"
                @click="CloseAddressModal()"
                :outline="true"
              > Close</base-button-icon-1
              >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import AutoComplate from "~/components/common/AutoComplate.vue";
import { scrollTopHandler } from "~/utils";
import Api from "~/api";
import { mapGetters } from "vuex";
import BaseButtonIcon1 from "../common/BaseButtonIcon1.vue";

export default {
  components: {
    AutoComplate,
    BaseButtonIcon1,
  },

  props: {
    displayAddressFormInCheckout:{
      type: Boolean,
      required: false
    },
    checkout: {
      type: Object,
      required: false
    },
    addressInfo: {
      type: Object,
      default: () => ({}),
      required: false
    },
    typeForm: {
      type: String,
      default: "add",
      required: true
    },
  },
  data: function () {
    return {
      buttonPressed: false,
      phoneFormated: null,
      form: {
        country_id: "",
        city: "",
        phone: this.addressInfo.phone,
        state: "",
        street: "",
        address: "",
        postal_code: "",
        default: 0,
        id: null,
      },
      countries: [],
    };
  },
  watch: {
    addressInfo: function (val) {
      this.fetchAddresInfo(val);
    },
    displayAddressFormInCheckout(newValue){
      this.buttonPressed = newValue;
    },
  },
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
  },
  created: function () {
    this.getCountries();
    this.getUserDetails();
  },
  methods: {
    CloseAddressModal(){
      this.buttonPressed = false;
      this.$emit("formClosed",this.buttonPressed)
    },
    fetchAddresInfo(value) {
      if (this.typeForm == "edit") {
        this.form.city = value.city;
        this.form.country_id = value.country.id;
        this.form.postal_code = value.postal_code;
        this.form.state = value.state;
        this.form.street = value.street;
        this.form.countryName = value.country.country_name;
        this.form.id = value.id;
        this.form.phone = value.phone;
        this.form.address = value.address;
        this.form.default = value.default;
      } else {
        this.form = {
          country_id: "",
          city: "",
          phone: "",
          state: "",
          street: "",
          address: "",
          postal_code: "",
          default: 0,
          id: null,
        };
      }
    },



     getUserDetails: async function () {
      await Api.get("/user/profile")
        .then((response) => {
          const user = response.data.user_info;
          this.form.name = user.name;
          this.form.email = user.email;
          this.form.phone = user.phone;
          this.form.avatar = user.avatar;
          this.form.company_name = user.company_name;
          this.form.website_url = user.website_url;
          this.form.type_of_business = user.type_of_business;
          scrollTopHandler();
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
    },

    submit: function () {
      let api = "";
      if (this.typeForm == "edit") {
        api = `/user/addresses/${this.form.id}/update`;
      }  else {
        api = "/user/addresses/create";
      }
      Api.post(api, this.form)
        .then((response) => {

          scrollTopHandler();
          this.$notify({
            group: "custom-notify",
            type: "success",
            text: response.data.message,
          });
           this.form = {
            country_id: "",
            city: "",
            phone: "",
            state: "",
            street: "",
            address: "",
            postal_code: "",
            default: 0,
            id: null,
          }
          this.buttonPressed = false;
          this.$emit("buttonPressed",this.buttonPressed)
          this.$emit("close");
        })
        .catch((error) => {
          let errorObj = error.response.data.data;
          this.$notify({
            group: "errorMessage",
            type: "error",
            text: error.response.data.data[Object.keys(errorObj)[0]][0],
          });
        });
      // this.$Progress.finish();
    },


    getCountries() {
      // this.$Progress.start();
      Api.post("/countries")
        .then((response) => {
          this.countries = response.data.result;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
      // this.$Progress.finish();
    },
  },
};
</script>
<style>
.address-buttons{
  min-width: 150px;
}
</style>