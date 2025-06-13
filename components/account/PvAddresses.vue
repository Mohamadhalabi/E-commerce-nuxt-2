<template>
  <div>
    <div class="clearfix d-flex align-items-center justify-content-between">
      <h3 class="account-sub-title  d-md-block mt-0 pt-1 ml-1" v-if="checkout !=true">
        {{ $t("account.address") }}
      </h3>
      <div v-if="addresses && !isEmpty(addresses)" class="address">
        <base-button-icon-1
          v-if="checkout !== true"
          style="width: 150px"
          class="py-4 checkout-buttons"
          @click="openAddressFormModal(null),displayAddressInCheckout(), scrollToDiv()"
          :outline="true">
          <i class="icon-plus"></i>
          {{ $t("account.add_address") }}</base-button-icon-1>
      </div>
    </div>
    <div v-if="!addresses" class="address position-relative pl-5">
      <div class="loading" />
      <div class="address-box">
        {{ $t("account.loading_addresses") }}
      </div>
    </div>
    <div class="d-flex align-items-center flex-column mb-1 mt-2" v-else-if="addresses && isEmpty(addresses)">
      <div class="address-box s text-center" v-if="checkout !== true">
          {{ $t("address.noAddress") }}
      </div>
      <div style="display: flex;justify-content: center;">
      <div v-if="displayAddressFormInCheckout == false">
      <base-button-icon-1
        v-if="checkout !== true"
        :outline="true"
          @click="openAddressFormModal(null),scrollToDiv()"
        class="address px-2 py-4 checkout-buttons mr-2"
      ><i class="icon-plus"></i>
        {{ $t('address.addNewAddress') }}
      </base-button-icon-1>
      <base-button-icon-1
        v-else
        :outline="true"
        @click="openAddressFormModal(null),displayAddressInCheckout(), scrollToDiv()"
        class="address px-2 py-4 checkout-buttons mr-2"
      ><i class="icon-plus"></i>
        {{ $t('address.addNewAddress') }}
      </base-button-icon-1>
      </div>
        <div class="address text-center mb-1" v-if="addresses && isEmpty(addresses) && this.close == true">
          <base-button-icon-1
            style="width: 150px;"
            class="py-4"
            @click="closeAddNewAddress()"
            :outline="true"
          > Close</base-button-icon-1
          >
      </div>
      </div>

    </div>
    <div v-else>
      <div class="row mt-2 p-2">
        <div
        v-for="(address, index) in addresses"
        :key="index"
        :class="getAddressClass(addresses.length)"
        style="border-radius: 6px;">
        <div class="text-center">
          <div class="card address-card mb-1 mt-1"
          :class="{'selectedCard': address === selectedAddress}"
          style="border-radius: 10px;"
          @click="selectAddress(address)">
          <h5 class="card-header">
            <div class="row">
              <div class="col-lg-6 col-md-6 col-6 text-start">
                <base-button-icon-1
                  @click="openDeleteConfirm(address)"
                  :outline="true"
                  class="px-2 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                  </svg>
                  {{$t("common.delete")}}
                </base-button-icon-1>
              </div>
              <div class="col-lg-6 col-md-6 col-6 text-end">
                <base-button-icon-1
                  @click="openAddressFormModal(address),displayAddressInCheckout()"
                  :outline="true"
                  class="px-2 py-2">
                  <svg id='Edit_24' width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><rect width='24' height='24' stroke='none' fill='#000000' opacity='0'/>
                  <g transform="matrix(0.83 0 0 0.83 12 12)" >
                  <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255, 255, 255); fill-rule: nonzero; opacity: 1;" transform=" translate(-15, -15)" d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 C 3.019555391732378 25.777315948579314 3.0004098353434143 25.88822818626975 3 26 C 3 26.552284749830793 3.4477152501692068 27 4 27 C 4.111771836422188 26.999590036115436 4.22268407474976 26.98044434440919 4.328125 26.943359 C 4.331387024617978 26.942074127865663 4.334642269631416 26.940772109861395 4.3378906 26.939453 L 4.3632812 26.931641 C 4.3652389131533935 26.93034554822427 4.367192058595549 26.929043206816875 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z" stroke-linecap="round" />
                  </g>
                  </svg>
                  {{ $t("common.edit") }}
                </base-button-icon-1>
              </div>
            </div>
          </h5>
          <div class="card-body">
            <div class="mb-1">
              <span>
                <b>{{ $t("checkout.addrress") }}:</b>
                {{`${address.address} ${address.city} ${address.country.country_name}`}}
              </span>
            </div>
            <div class="mb-1">
              <span>
                <b>{{ $t("checkout.phone") }}:</b>
                {{ `${address.phone}` }}
              </span>
            </div>
          </div>
        </div>
        <input
        type="radio"
        class="radio"
        :name="'address-radio-' + index"
        :checked="address === selectedAddress"
        />
      </div>
    </div>
  </div>
</div>


    <div class="d-lg-flex d-md-flex justify-content-md-center d-sm-flex justify-content-sm-center justify-content-lg-center">
      <div v-if="addresses && !isEmpty(addresses)" class="address text-center mb-1 mr-2">
        <base-button-icon-1
          v-if="checkout == true"
          style="width: 150px;"
          class="py-4 checkout-buttons"
          @click="openAddressFormModal(null),displayAddressInCheckout()"
          :outline="true"
        >          <i class="icon-plus"></i>
          {{ $t("account.add_address") }}</base-button-icon-1
        >
      </div>
      <div class="address text-center" v-if="addresses && !isEmpty(addresses) && this.close == true">
        <!-- <base-button-icon-1
          style="width: 150px;"
          class="py-4 close-button"
          @click="closeAddNewAddress()"
          :outline="true"
        > Close</base-button-icon-1
        > -->
      </div>
    </div>
    <AddressDialog
      :address-info="selectedAddressToUpdate"
      :type-form="typeForm"
      :checkout="checkout"
      :displayAddressFormInCheckout =displayAddressFormInCheckout
      @close="closedEvent"
      @buttonPressed="ButtonPressed"
      @formClosed="formClosed"
    />
    <!-- <ConfirmDelete :api="apiToDelete" @close="closedEvent" /> -->
  </div>
</template>

<script>
import { scrollTopHandler } from "~/utils";
import AddressDialog from "~/components/account/PvAddressFormModal";
// import ConfirmDelete from "~/components/common/ConfirmDelete";
import BaseButtonIcon1 from "../common/BaseButtonIcon1.vue";
import { isEmpty } from "lodash";
import Api from "~/api";

export default {
  components: {
    AddressDialog,
    // ConfirmDelete,
    BaseButtonIcon1,
  },
  data: function () {
    return {
      close: false,
      clicked:false,
      selectedAddress: null,
      addresses: null,
      selectedAddressToUpdate: {},
      typeForm: "add",
      apiToDelete: "",
      isEmpty,
      displayAddressFormInCheckout:false
    };
  },
  props:['checkout'],

  created() {
    this.getAddresses();
  },
  head() {
    return {
      titleTemplate: JSON.parse(this.$settings.seo.meta_title)[
        this.$i18n.locale
      ],
      title: JSON.parse(this.$settings.seo.meta_title)[this.$i18n.locale],
    };
  },
  // displayAddressFormInCheckout
  methods: {
    getAddressClass(length) {
      if (length === 1) {
        return 'col-xl-4 col-lg-5 col-md-4 col-sm-6 col-12';
      } else if (length === 2) {
        return 'col-xl-4 col-lg-5 col-md-4 col-sm-6 col-12';
      } else if (length === 3 || length === 4) {
        return 'col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12';
      } else {
        return 'col-xl-3 col-md-4 col-sm-6 col-12';
      }
    },
    closeAddNewAddress(){
      this.close = false
      this.displayAddressFormInCheckout = false
    },
    selectAddress(address) {
      this.selectedAddress = address;
      this.clicked = true


      this.$emit("DefaultAddress",true)
      this.$emit("address",address)
    },
    scrollToDiv() {
      this.close = true
    },
    ButtonPressed(newValue){
      this.displayAddressFormInCheckout = newValue
      this.clicked = false
      this.close = false
    },
    formClosed(newValue) {
      this.displayAddressFormInCheckout = newValue;
    },
    displayAddressInCheckout(){
      this.displayAddressFormInCheckout = true;
      this.close = true
    },
    getAddresses() {
      this.addresses = null;
      Api.get("/user/addresses?length=1000")
        .then((response) => {
          this.addresses = response.data.addresses;
          if(response.data.length == 0){
            this.displayAddressFormInCheckout = true
          }

          scrollTopHandler();

          const hasDefaultOne = this.addresses.some(obj => obj.default === 1);
          this.selectedAddress = this.addresses.find(address => address.default);
          if(hasDefaultOne == true) {
            this.$emit("address",this.selectedAddress)
          }
          this.$emit("DefaultAddress",hasDefaultOne)
        })
        .catch((error) => ({ error: JSON.stringify(error) }));

    },

    closedEvent() {
      this.$modal.hide("bv-modal-example");
      this.getAddresses();
    },

    openAddressFormModal(address) {
      this.displayAddressFormInCheckout = true
      this.selectedAddressToUpdate = address;
      if (address) {
        this.typeForm = "edit";
      } else {
        this.typeForm = "add";
      }
      this.$modal.show("bv-modal-example");
    },

    openDeleteConfirm(address) {
      this.apiToDelete = `user/addresses/${address.id}`;
      this.$modal.show(
        () => import("~/components/common/ConfirmDelete"),
        { api: this.apiToDelete },
        {
          width: "400",
          height: "auto",
          adaptive: true,
          class: "quickview-modal",
        },
        {
          name:'confirm-delete'
        },
        { onClose: () => this.$modal.hide() } // Ensure modal closes on event
      );
    },
  },
};
</script>
<style>

.defoultCard , .selectedCard{
  border: 3px solid #f07905;
  border-radius: 10px;
  margin-top: 3px
}

.card-header {
  border-radius: 10px 10px 0px 0px !important ;
}
.checkout-buttons{
  background-color: #892118!important;
  color: white!important;
  font-size: 14px!important;
}
</style>
<style lang="scss">
:root {
  --card-line-height: 1.2em;
  --card-padding: 1em;
  --card-radius: 0.5em;
  --color-green: #558309;
  --color-gray: #e2ebf6;
  --color-dark-gray: #c4d1e1;
  --radio-border-width: 2px;
  --radio-size: 1.5em;
}

.radio {
  font-size: inherit;
  margin: 0;
  right: calc(var(--card-padding) + var(--radio-border-width));
  top: calc(var(--card-padding) + var(--radio-border-width));
}

@supports(-webkit-appearance: none) or (-moz-appearance: none) {
  .radio {
    -webkit-appearance: none;
    -moz-appearance: none;
    background: #fff;
    border: var(--radio-border-width) solid var(--color-gray);
    border-radius: 50%;
    cursor: pointer;
    height: var(--radio-size);
    outline: none;
    transition:
      background 0.2s ease-out,
      border-color 0.2s ease-out;
    width: var(--radio-size);

    &::after {
      border: var(--radio-border-width) solid #fff;
      border-top: 0;
      border-left: 0;
      content: '';
      display: block;
      height: 16px;
      margin-left: 3px;
      margin-top: 8px;
      transform:
        rotate(45deg)
        translate(-50%, -50%);
      width: 8px;
    }

    &:checked {
      background: var(--color-green);
      border-color: var(--color-green);
    }
  }
}
.address-card{
}
</style>
