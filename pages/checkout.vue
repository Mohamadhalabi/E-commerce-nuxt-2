<template>
  <main class="main main-test">
    <div class="container checkout-container">
      <nav aria-label="breadcrumb" class="breadcrumb-nav">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <nuxt-link :to="getLink('/')">
              {{ $t('shop.home') }}
            </nuxt-link>
          </li>
          <li class="breadcrumb-item">
            <nuxt-link :to="getLink('/cart')"> {{ $t("dashboard.cart") }} </nuxt-link>
          </li>
          <li class="breadcrumb-item active">
            <a href="javascript:;">{{ $t("dashboard.checkout") }}</a>
          </li>
        </ol>
      </nav>
      <template v-if="cartList.length > 0">
        <div class="row">
          <div class="col-12">
            <button type="button" class="p-lg-0 border-0 bg-white float-right" @click="generatePdf()">
              <img src="../static/images/pdf-logo.png" class="pdf-logo" alt="PDF Button">
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-8">
            <pv-free-shipping-amount class="p-3" :checkout="true"></pv-free-shipping-amount>
            <div class="mt-1 coupon-box-checkout">
              <div class="col-lg-12 text-center">
                <p class="text-black-50">{{ $t('checkout.IfYouHaveAcoupon') }}</p>
              </div>
              <div class="col-lg-12 text-center">
                <input
                  class="form-input mr-2 apply-coupon-input text-black-50"
                  v-model="dataForm.coupon_code"
                  type="text"
                  @input="hiddenErrorMessage"
                  :placeholder="$t('checkout.enterCouponCode')"
                >
                <button
                  class="checkout-default-button mt-1"
                  :disabled="!dataForm.coupon_code"
                  type="button"
                  @click="refetchPrice"
                >{{ $t('checkout.applyCoupon')}}
                </button>
              </div>
            </div>

            <div class="col-lg-12 p-0 mt-2 stepper">
              <div class="bs-stepper stepper-bg">
                <div class="bs-stepper-header">
                  <!-- your steps here -->
                  <div class="step ">
                    <span class="step-trigger">
                      <span class="bs-stepper-circle stepper-address" ></span>
                      <span class="bs-stepper-label checkout-steps">{{ $t('checkout.addrress') }}</span>
                    </span>
                  </div>
                  <div class="line"></div>
                  <div class="step">
                    <span class="step-trigger">
                      <span class="bs-stepper-circle stepper-shipping"></span>
                      <span class="bs-stepper-label checkout-steps">{{ $t('checkout.shippingMethod') }}</span>
                    </span>
                  </div>
                  <div class="line"></div>
                  <div class="step">
                    <span class="step-trigger">
                      <span class="bs-stepper-circle stepper-payment"></span>
                      <span class="bs-stepper-label checkout-steps">{{ $t('checkout.paymentMethod') }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-12 mt-2 border-with-top-text">
              <pv-addresses
                @DefaultAddress="CheckIfDefaultExists"
                @address="GetNewAddress"
                :checkout="true"
              />
            </div>
            <h5 v-if="this.is_shipping_method_disabled" style="color: red;margin: 0;" class="text-center mt-2">* {{ $t('checkout.selectAddress') }}</h5>
            <transition name="slide">
              <div class="col-lg-12 mt-2 border-with-top-text-shipping-method">
                <div class="row" :class="{ 'text-right': getIsAr }">
                  <div
                    v-for="(item, index) in ['dhl', 'aramex', 'fedex', 'ups','domestic','pick_up']" :key="index" class="col-lg-3 col-md-3 col-sm-3 col-6 mt-auto mb-auto text-center">
                    <label :for="item" class="addressStyle mt-2 mb-2 ml-2 mr-2" :class="dataForm.shipping_method == item ? 'selectedAddress' : 'notSelectedAddress'">
                      <div class="row">
                        <div class="col-12 mr-auto ml-auto">
                          <input
                            type="radio"
                            class="d-none"
                            :id="item"
                            :disabled="is_shipping_method_disabled"
                            v-model="dataForm.shipping_method"
                            :value="item"
                            @click="GetShippingMethod(item)"
                          />
                          <img
                            v-if="item !=='pick_up' && item !=='domestic'"
                            class="shipping-methods"
                            :src="`./images/payments_and_shipping/${item}-png.png`"
                            :alt="item"
                            :title="item"
                            :class="{ 'custom-disabled-class': is_shipping_method_disabled }"
                          />
                          <img
                            v-if="item =='pick_up'"
                            class="shipping_methods"
                            :src="`./images/payments_and_shipping/pick-up.jpg`"
                            alt="Pick Up from our store"
                            title="Pick Up From Our Store!"
                            :class="{ 'custom-disabled-class': is_shipping_method_disabled }"
                          />
                          <img
                            v-if="item =='domestic'"
                            class="shipping_methods"
                            :src="`./images/payments_and_shipping/domestic-shipping.png`"
                            alt="Domestic Shipping"
                            title="Domestic Shipping"
                            :class="{ 'custom-disabled-class': is_shipping_method_disabled }"
                          />
                        </div>
                      </div>
                    </label>
                    <input
                      class="radio"
                      type="radio"
                      :disabled="is_shipping_method_disabled"
                      v-model="dataForm.shipping_method"
                      :value="item"
                      @click="GetShippingMethod(item)"
                    />
                  </div>
                </div>
              </div>
            </transition>
            <h5 v-if="this.is_payment_method_disabled" style="color: red;margin: 0;" class="text-center mt-2">* {{ $t('checkout.selectAShipping')}}</h5>
            <transition name="slide">
              <div class="col-lg-12 mt-4 border-with-top-text-payment-method">
                <div class="row p-3" :class="{ 'text-right': getIsAr }">
                  <div class="col-lg-4 mt-lg-4">
                    <div
                      class="card text-center paymentMethod-card"
                      style="max-height: 100px!important; min-height: 100px"
                      :class="{ 'payment-method-active': clickedCardIndex === 1 }"
                      @click="handlePaymentMethod(1),CheckCardSelected()"
                    >
                      <div class="card-body payment-method-card">
                        <div class="row">
                          <div class="col-12 mt-auto mb-auto payment-method-text font-weight-bold">
                            {{ $t('checkout.creditDebitCard') }}
                          </div>
                          <div class="col-12 mb-auto mt-auto payment-methods">
                            <svg id='Debit_Card_48' width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><rect width='48' height='48' stroke='none' fill='#000000' opacity='0'/>
                            <g transform="matrix(0.92 0 0 0.92 24 24)" >
                            <g style="" >
                            <g transform="matrix(1 0 0 1 0 0)" >
                            <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(63,81,181); fill-rule: nonzero; opacity: 1;" transform=" translate(-24, -24)" d="M 45 35 C 45 37.208 43.209 39 41 39 L 7 39 C 4.791 39 3 37.208 3 35 L 3 13 C 3 10.79 4.791 9 7 9 L 41 9 C 43.209 9 45 10.79 45 13 L 45 35 z" stroke-linecap="round" />
                            </g>
                            <g transform="matrix(1 0 0 1 0 0.5)" >
                            <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,193,7); fill-rule: nonzero; opacity: 1;" transform=" translate(-24, -24.5)" d="M 16 21 C 16 21.553 15.553 22 15 22 L 10 22 C 9.447 22 9 21.553 9 21 L 9 17 C 9 16.447 9.447 16 10 16 L 15 16 C 15.553 16 16 16.447 16 17 L 16 21 z M 15 26 L 9 26 L 9 28 L 15 28 L 15 26 z M 23 31 L 9 31 L 9 33 L 23 33 L 23 31 z M 23 26 L 17 26 L 17 28 L 23 28 L 23 26 z M 31 26 L 25 26 L 25 28 L 31 28 L 31 26 z M 39 26 L 33 26 L 33 28 L 39 28 L 39 26 z" stroke-linecap="round" />
                            </g>
                            <g transform="matrix(1 0 0 1 5.5 -6)" >
                            <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(159,168,218); fill-rule: nonzero; opacity: 1;" transform=" translate(-29.5, -18)" d="M 20 16 L 39 16 L 39 20 L 20 20 z" stroke-linecap="round" />
                            </g>
                            </g>
                            </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="text-center">
                      <input
                        class="radio"
                        type="radio"
                        :disabled="is_payment_method_disabled"
                        v-model="clickedCardIndex"
                        :value="1"
                        @click="handlePaymentMethod(1),CheckCardSelected()"
                      />
                    </div>
                  </div>

                  <div class="col-lg-4 mt-lg-4">
                    <div
                      class="card text-center paymentMethod-card"
                      style="max-height: 100px!important; min-height: 100px"
                      :class="{ 'payment-method-active': clickedCardIndex === 2 }"
                      @click="handlePaymentMethod(2),CheckCardSelected()"
                    >
                      <div class="card-body payment-method-card">
                        <div class="row">
                          <div class="col-lg-12 mt-auto mb-auto payment-method-text font-weight-bold">
                            {{ $t('checkout.payPal') }}
                          </div>
                          <div class="col-lg-12 mb-auto mt-auto payment-methods">
                            <svg id='PayPal_48' width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><rect width='48' height='48' stroke='none' fill='#000000' opacity='0'/>
                            <g transform="matrix(0.92 0 0 0.92 24 24)" >
                            <g style="" >
                            <g transform="matrix(1 0 0 1 -4.91 -3.5)" >
                            <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(21,101,192); fill-rule: nonzero; opacity: 1;" transform=" translate(-19.09, -20.5)" d="M 18.7 13.767 L 18.705 13.769 C 18.809 13.326 19.187 13 19.66 13 L 33.132 13 C 33.149 13 33.166 12.993 33.183 12.994 C 32.896 8.215 28.887 6 25.35 6 L 11.878 6 C 11.404 6 11.026 6.335 10.923 6.777 L 10.918 6.775 L 5.029 33.813 L 5.042 33.814 C 5.028 33.878 5.003 33.939 5.003 34.008 C 5.003 34.561 5.45 34.999 6.003 34.999 L 14.074 34.999 L 18.7 13.767 z" stroke-linecap="round" />
                            </g>
                            <g transform="matrix(1 0 0 1 2.89 3.5)" >
                            <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(3,155,229); fill-rule: nonzero; opacity: 1;" transform=" translate(-26.89, -27.5)" d="M 33.183 12.994 C 33.236 13.87 33.178 14.823 32.954 15.876 C 31.673000000000002 21.871 27.042 24.991 21.319000000000003 24.991 C 21.319000000000003 24.991 17.849000000000004 24.991 17.006000000000004 24.991 C 16.485000000000003 24.991 16.239000000000004 25.297 16.126000000000005 25.531 L 14.386000000000005 33.58 L 14.081000000000005 35.009 L 14.075000000000005 35.009 L 12.812000000000005 40.805 L 12.825000000000005 40.806 C 12.811000000000005 40.87 12.786000000000005 40.931 12.786000000000005 41 C 12.786000000000005 41.553 13.233000000000004 42 13.786000000000005 42 L 21.119000000000007 42 L 21.13200000000001 41.99 C 21.60400000000001 41.983000000000004 21.97900000000001 41.646 22.07700000000001 41.202000000000005 L 22.09500000000001 41.187000000000005 L 23.90700000000001 32.771 C 23.90700000000001 32.771 24.033000000000012 31.968 24.87700000000001 31.968 C 25.721000000000007 31.968 29.05500000000001 31.968 29.05500000000001 31.968 C 34.77800000000001 31.968 39.45600000000001 28.862000000000002 40.738000000000014 22.866 C 42.18 16.106 37.358 13.019 33.183 12.994 z" stroke-linecap="round" />
                            </g>
                            <g transform="matrix(1 0 0 1 0.66 -4.74)" >
                            <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(40,53,147); fill-rule: nonzero; opacity: 1;" transform=" translate(-24.66, -19.26)" d="M 19.66 13 C 19.186 13 18.808 13.326 18.705000000000002 13.769 L 18.7 13.767 L 16.125 25.532 C 16.238 25.298 16.484 24.992 17.005 24.992 C 17.849 24.992 21.24 24.992 21.24 24.992 C 26.962999999999997 24.992 31.671999999999997 21.872 32.952999999999996 15.877 C 33.178 14.824000000000002 33.23499999999999 13.871 33.181999999999995 12.995000000000001 C 33.166 12.993 33.148 13 33.132 13 L 19.66 13 z" stroke-linecap="round" />
                            </g>
                            </g>
                            </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="text-center">
                      <input
                        class="radio"
                        type="radio"
                        :disabled="is_payment_method_disabled"
                        v-model="clickedCardIndex"
                        :value="2"
                        @click="handlePaymentMethod(2),CheckCardSelected()"
                      />
                    </div>
                  </div>
                  <div class="col-lg-4 mt-lg-4">
                    <div
                      class="card text-center paymentMethod-card"
                      style="max-height: 100px!important; min-height: 100px"
                      :class="{ 'payment-method-active': clickedCardIndex === 3 }"
                      @click="handlePaymentMethod(3),CheckCardSelected()"
                    >
                      <div class="card-body payment-method-card">
                        <div class="row">
                          <div class="col-lg-12 mt-auto mb-auto payment-method-text font-weight-bold">
                            {{ $t('checkout.buyNowPayLater') }}
                          </div>
                          <div class="col-lg-12 mb-auto mt-auto payment-methods">
                            <svg id='Bank_Building_48' width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><rect width='48' height='48' stroke='none' fill='#000000' opacity='0'/>
                            <g transform="matrix(0.92 0 0 0.92 24 24)" >
                            <g style="" >
                            <g transform="matrix(1 0 0 1 0 2)" >
                            <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(76,175,80); fill-rule: nonzero; opacity: 1;" transform=" translate(-24, -26)" d="M 13 17 L 35 17 L 35 35 L 13 35 z" stroke-linecap="round" />
                            </g>
                            <g transform="matrix(1 0 0 1 0 -1)" >
                            <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(215,204,200); fill-rule: nonzero; opacity: 1;" transform=" translate(-24, -23)" d="M 2 39 L 46 39 L 46 41 L 2 41 z M 34 19 L 39 19 L 39 35 L 34 35 z M 9 19 L 14 19 L 14 35 L 9 35 z M 43 17 L 5 17 L 5 14 L 24 5 L 43 14 z M 6 35 L 42 35 L 42 37 L 6 37 z" stroke-linecap="round" />
                            </g>
                            <g transform="matrix(1 0 0 1 0 0.5)" >
                            <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(188,170,164); fill-rule: nonzero; opacity: 1;" transform=" translate(-24, -24.5)" d="M 32 17 L 41 17 L 41 19 L 32 19 z M 7 17 L 16 17 L 16 19 L 7 19 z M 4 37 L 44 37 L 44 39 L 4 39 z M 24 10 C 22.895430500338414 10 22 10.895430500338414 22 12 C 22 13.104569499661586 22.895430500338414 14 24 14 C 25.104569499661586 14 26 13.104569499661586 26 12 C 26 10.895430500338414 25.104569499661586 10 24 10 z" stroke-linecap="round" />
                            </g>
                            <g transform="matrix(1 0 0 1 0 -6)" >
                            <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(67,160,71); fill-rule: nonzero; opacity: 1;" transform=" translate(-24, -18)" d="M 16 17 L 32 17 L 32 19 L 16 19 z" stroke-linecap="round" />
                            </g>
                            <g transform="matrix(1 0 0 1 0 3)" >
                            <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(232,245,233); fill-rule: nonzero; opacity: 1;" transform=" translate(-24, -27)" d="M 27.116 27.565 C 26.83 27.275000000000002 26.477999999999998 27.016000000000002 26.062 26.787000000000003 C 25.646 26.556 25.115000000000002 26.311000000000003 24.469 26.052000000000003 C 23.823 25.792 23.382 25.539 23.144000000000002 25.290000000000003 C 22.906000000000002 25.041000000000004 22.787000000000003 24.712000000000003 22.787000000000003 24.301000000000002 C 22.787000000000003 23.858 22.909000000000002 23.512 23.152 23.26 C 23.395 23.008000000000003 23.738 22.882 24.181 22.882 C 24.629 22.882 24.987000000000002 23.044 25.254 23.365000000000002 C 25.522000000000002 23.687 25.656000000000002 24.352 25.656000000000002 25.001 L 28 25.001 C 28 23.947000000000003 27.73 22.91 27.189 22.249000000000002 C 26.66 21.6 25.928 21.207 25 21.065 L 25 19 L 23 19 L 23 21.137999999999998 C 22.329 21.299999999999997 21.768 21.601 21.321 22.048 C 20.737000000000002 22.631999999999998 20.446 23.378999999999998 20.446 24.293999999999997 C 20.446 24.823999999999998 20.531000000000002 25.279999999999998 20.701 25.662999999999997 C 20.871000000000002 26.046999999999997 21.109 26.379999999999995 21.414 26.663999999999998 C 21.719 26.948 22.086000000000002 27.197 22.513 27.416999999999998 C 22.94 27.636 23.448 27.857 24.037000000000003 28.078 C 24.626 28.3 25.043000000000003 28.541 25.289 28.804 C 25.535 29.067 25.658 29.418 25.658 29.860999999999997 C 25.658 30.286999999999995 25.52 30.626999999999995 25.245 30.878999999999998 C 24.969 31.130999999999997 24.594 31.255 24.118000000000002 31.255 C 23.545 31.255 23.106 31.084 22.8 30.741999999999997 C 22.495 30.397999999999996 22.342000000000002 29.642999999999997 22.342000000000002 28.999999999999996 L 20 28.999999999999996 C 20 30.107999999999997 20.304 31.256999999999998 20.911 31.923999999999996 C 21.425 32.489 22.129 32.845 23 33.016999999999996 L 23 35 L 25 35 L 25 33.056 C 25.894 32.928 26.613 32.608999999999995 27.141 32.082 C 27.714 31.509 28 30.764 28 29.845 C 28 29.352999999999998 27.924 28.923 27.773 28.552 C 27.622 28.183 27.403 27.853 27.116 27.565 z" stroke-linecap="round" />
                            </g>
                            </g>
                            </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="text-center">
                      <input
                        class="radio"
                        type="radio"
                        :disabled="is_payment_method_disabled"
                        v-model="clickedCardIndex"
                        :value="3"
                        @click="handlePaymentMethod(3),CheckCardSelected()"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </transition>

            <transition name="slide">
              <div class="col-lg-12 mt-2 bank-transfer-payment" v-if="clickedCardIndex == 3">
                <div class="container mt-2">
                  <div class="table-responsive">
                    <table class="table table-bordered table-hover">
                      <thead>
                      <tr>
                        <th>{{ $t('checkout.bank') }}</th>
                        <th>{{ $t('checkout.accountNumber') }}</th>
                        <th>{{ $t('checkout.SortCode') }}</th>
                        <th style="width: 25%">{{ $t('checkout.IBAN') }}</th>
                        <th>{{ $t('checkout.BIC') }}</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td data-label="Flight No.">ADCB</td>
                        <td data-label="Destination">699321041001</td>
                        <td data-label="Time">ADCBAEAA</td>
                        <td data-label="Gate">AE470030000699321041001</td>
                        <td data-label="Status">ADCBAEAA</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </transition>
          </div>
          <div class="col-lg-4 mt-1 p-0 stepper-bg">
            <div class="table-container" v-if="checkoutData !=null">
              <table class="custom-table">
                <thead class="checkout-table-header">
                <p class="your-order">{{ $t("checkout.yourOrder") }}</p>
                </thead>
                <tbody>
                <tr
                  v-for="(product, index) in checkoutData.products"
                  :key="`cart-product-${index}`"
                  class="checkout-table-body"
                  v-if="index < 5 || showAllResults"
                >
                  <td>
                    <div class="row">
                      <div class="col-lg-1 col-md-1 col-sm-1 col-2 align-center m-auto">
                        <i class="fa fa-trash remove-button" @click="refetchPrice(),removeFromCart({ product, index })"></i>
                      </div>
                      <div class="col-lg-2 col-md-2 col-sm-2 col-12 align-center m-auto">
                        <nuxt-link :to="getLink('/products/'+product.slug)">
                          <nuxt-img :src="product.gallery[0].s.url" class="m-auto checkout-image" :alt="product.gallery[0].s.alt" />
                        </nuxt-link>
                      </div>
                      <div class="col-lg-6 col-md-4 col-sm-4">
                        <p class="product-title pt-3 mt-auto mb-auto">
                          {{ product.short_title }}
                          <span class="sku-color sku-color-checkout d-flex justify-content-lg-start justify-content-md-start text-center">
                            SKU: {{ product.sku }}
                          </span>
                        </p>
                        <span style="color: red;font-weight: bold;font-size: 12px" v-if="product.quantity > product.stock">
                          {{ $t("checkout.outOfStock") }}
                        </span>
                      </div>
                      <div class="d-grid col-lg-3 col-md-5 col-sm-5 mt-auto mb-auto product-quantity-price text-lg-right text-md-right text-sm-right text-center">
                        <span class="product-qty">{{ product.quantity }} X</span>
                        <span
                          v-if="product.price"
                          class="font-weight-bold" style="color: red;">
                            {{ product.price.value + " " + product.price.currency }}
                          </span>
                      </div>
                    </div>
                  </td>
                </tr>
                <br>
                <tr v-if="checkoutData.products.length > 5" class="checkout-table-pagination">
                  <td colspan="2">
                    <a @click="showAllResults = !showAllResults" class="checkout-table-pagination-a">
                      <button class="checkout-default-button" style="width: auto">
                        {{ showAllResults ? $t('shop.showLess') : $t('shop.seeAllResults') }}
                      </button><span v-if="!showAllResults" class="product-counter" style="color: white; font-size: 18px;">
                        ({{ checkoutData.products.length }})
                      </span>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td class="payment-details-td">
                    <div class="row p-3 mt-1" v-if="checkoutData.total_before_coupon">
                      <div class="col-lg-8 col-sm-6 col-2 checkout-table-body">
                        <h6 class="">{{ $t("checkout.subtotal") }} Before Coupon</h6>
                      </div>
                      <div class="col-lg-4 col-sm-6 col-2 checkout-table-body font-weight-bold text-align-end" style="text-decoration: line-through">
                        {{parseFloat(checkoutData.total_before_coupon.value).toFixed(2) + " " + checkoutData.total_before_coupon.currency}}
                      </div>
                    </div>
                    <div class="row p-3" v-if="checkoutData.total_before_coupon">
                      <div class="col-lg-8 checkout-table-body d-flex">
                        <h6 class="text-success">
                          <i class="fa fa-times text-danger" @click="removeCoupon" style="cursor: pointer">
                          </i>
                          {{ $t("checkout.coupon") }}: {{ dataForm.coupon_code }}
                        </h6>
                      </div>
                      <div class="col-lg-4 checkout-table-body text-align-end">
                        <b>{{parseFloat(checkoutData.discount_value.value * -1).toFixed(2) + " " + checkoutData.discount_value.currency}}</b>
                      </div>
                    </div>
                    <div class="row p-3 mt-1">
                      <div class="col-lg-8 checkout-table-body">
                        <h6>{{ $t("checkout.subtotal") }}</h6>
                      </div>
                      <div class="col-lg-4 checkout-table-body font-weight-bold text-align-end" style="color: red;">
                      <span v-if="!checkoutData.discount">
                        {{
                          checkoutData.sub_total.value +
                          " " + checkoutData.sub_total.currency
                        }}</span>
                      </div>
                    </div>
                    <div v-if="!checkoutData.total_before_coupon && dataForm.coupon_code!=''" class="row p-3">
                      <div class="col-lg-8 checkout-table-body">
                        <h6 class="">
                          {{ $t("checkout.coupon") }}
                        </h6>
                      </div>
                      <div class="col-lg-4 checkout-table-body font-weight-bold text-align-end" style="color: red;">
                        0
                      </div>
                    </div>
                    <div class="row p-3">
                      <div class="col-lg-8 checkout-table-body checkout-payment-method-shipping">
                        <h6>{{ $t("checkout.shippingPrice") }} Method</h6>
                        <p class="text-uppercase"
                        v-if="dataForm.shipping_method =='pick_up'">
                          Pick Up from our store
                        </p>
                        <p class="text-uppercase"
                           v-else-if="dataForm.shipping_method =='domestic'">
                          Domestic Shipping
                        </p>
                        <p class="text-uppercase"
                           v-else>
                          {{ dataForm.shipping_method }}
                        </p>
                        <p class="m-1 text-uppercase" v-if="dataForm.shipping_method ===''">---</p>
                      </div>
                      <div class="col-lg-4 checkout-table-body font-weight-bold mt-lg-3 text-align-end" style="color: red;">
                        <span>{{checkoutData.shipping_cost.value + " " + checkoutData.shipping_cost.currency }}</span>
                      </div>
                    </div>
                    <div class="row p-3">
                      <div class="col-lg-12 checkout-table-body">
                        <h6>Payment Method</h6>
                        <p class="text-uppercase checkout-payment-method-shipping"
                           v-if="this.clickedCardIndex == 1"
                        >Credit / Debit Card
                        </p>

                        <p class="text-uppercase checkout-payment-method-shipping"
                           v-if="this.clickedCardIndex == 2"
                        >Paypal
                        </p>

                        <p class="text-uppercase checkout-payment-method-shipping"
                           v-if="this.clickedCardIndex == 3"
                        >Transfer
                        </p>
                        <p class="m-1 text-uppercase checkout-payment-method-shipping"
                           v-if="this.clickedCardIndex == null"
                        >---
                        </p>

                      </div>
                    </div>

                    <div class="row p-3">
                      <div class="col-lg-8 checkout-table-body">
                        <h6>Sub Total</h6>
                      </div>
                      <div class="col-lg-4 checkout-table-body text-align-end">
                        <b class="total-price"
                           style="font-weight: 600;font-size: 18px"
                        >
                        {{
                            checkoutData.dolar_price.value  +
                            checkoutData.dolar_price.currency
                          }}
                        </b>
                      </div>
                    </div>

                    <div class="row p-3"  v-if="this.dataForm.payment_method == 'paypal' || this.dataForm.payment_method == 'ccavenue'">
                      <div class="col-lg-8 checkout-table-body">
                        <h6>Additional Fees (Paypal & Credit / Debit Cards)</h6>
                      </div>
                      <div class="col-lg-4 checkout-table-body text-align-end">
                        <b class="total-price" style="font-weight: 600;font-size: 18px">
                          3%
                        </b>
                      </div>
                    </div>
                    <div class="row p-3">
                      <div class="col-lg-8 checkout-table-body">
                        <h4>{{ $t("checkout.total") }}</h4>
                      </div>
                      <div class="col-lg-4 checkout-table-body text-align-end">
                        <b class="total-price"
                           style="font-weight: 600;font-size: 22px"
                           v-if="this.dataForm.payment_method == 'paypal' || this.dataForm.payment_method == 'ccavenue'"
                        >
                        {{
                            (checkoutData.dolar_price.value * 1.03).toFixed(2) +
                            checkoutData.dolar_price.currency
                          }}
                        </b>
                        <b class="total-price" 
                        style="font-weight: 600;font-size:22px"
                        v-else
                        >
                         {{
                            checkoutData.dolar_price.value +
                            checkoutData.dolar_price.currency
                          }}      
                      </b>
                      </div>
                    </div>

                    <div class="row p-3 ml-auto mr-auto">
                      <div class="col-lg-12">
                        <input class="mr-2" type="checkbox"
                               v-model="termsAndConditions"
                        >
                        I have read and agree the website <span class="font-weight-bold" style="color:#556b2f !important;">
                        <a href="/terms" target="_blank">
                          terms and conditions
                        </a>
                      </span>
                      </div>
                    </div>

                    <div>
                      <p
                        v-if="hasBlockedCountry"
                        class="mt-2"
                        style="font-size: 14px; color: #ff8181"
                      >
                      <!-- {{ $t("checkout.blocked_product") }} -->
                      <div v-for="(product, index) in checkoutData.products" :key="`cart-product-${index}`">
                        <span v-if="product.message != null" style="font-size: 16px; color: #ff8181;font-weight:bold">
                          * {{ product.message }} ({{ product.sku }})
                        </span>
                      </div>
                      </p>

                      <base-button-icon-1
                        class="py-4 w-100"
                        type="button"
                        :disabled="hasBlockedCountry"
                        @click="createOrder"
                        :outline="true"
                      ><span v-if="!loadingOrder">
                    {{ $t("checkout.createOrder") }}
                  </span>
                        <b-spinner v-else class=""
                        /></base-button-icon-1>
                      <div class="mt-2">
<!--                        <PaypalBtn-->
<!--                          v-if="checkoutData && dataForm.payment_method == 'paypal'"-->
<!--                          ref="mediaRef"-->
<!--                          :payment-for="'order'"-->
<!--                          :amount="checkoutData.dolar_price.value"-->
<!--                          :coupon_code="dataForm.coupon_code"-->
<!--                          :shipping_method="dataForm.shipping_method"-->
<!--                          :address="dataForm.address"-->
<!--                          :is-valid="checkIsValidPayment && !hasBlockedCountry"-->
<!--                          :termsAndConditions="termsAndConditions"-->
<!--                          :is_uae="this.is_uae"-->
<!--                          :isActive="this.isActive"-->
<!--                        />-->
                      </div>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </template>

      <div v-else class="box-content">
        <table
          class="table-cart"
          data-pagination="no"
          data-per-page="5"
          data-page="1"
          data-id
          data-token
        >
          <thead class="d-none">
          <tr>
            <th class="product-thumbnail" />

            <th class="product-name">
              <span class="nobr">{{ $t("checkout.products") }}</span>
            </th>

            <th class="product-price">
              <span class="nobr">{{ $t("checkout.price") }}</span>
            </th>

            <th class="product-stock-status">
              <span class="nobr">{{ $t("checkout.stockStatus") }}</span>
            </th>

            <th class="product-add-to-cart">
              <span class="nobr">{{ $t("checkout.actions") }}</span>
            </th>
          </tr>
          </thead>

          <tbody class="cart-items-wrapper">
          <tr class="border-0 py-0">
            <td colspan="6" class="px-3 py-2 text-center">
              <p class="noproduct-msg mb-2">
                {{ $t("checkout.CheckoutNotAvailable") }}
              </p>
              <i class="icon-bag-2 cart-empty" />
            </td>
          </tr>
          <tr class="border-0 py-0">
            <td colspan="6" class="px-3 py-2 text-center cart-empty">
              {{ $t("checkout.noProductCard") }}
            </td>
          </tr>
          <tr class="border-0 py-0">
            <td colspan="6" class="px-3 text-center">
              <nuxt-link :to="getLink('/shop')" class="btn btn-go-shop">
                {{ $t("checkout.returnToShop") }}
              </nuxt-link>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="mb-6" />
      </div>
    </div>
    <AddressDialog
      :type-form="typeForm"
      @close="closedEvent"
    />
  </main>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import Api from "~/api";
export default {
  components: {
    PvAddresses: () => import("~/components/account/PvAddresses.vue"),
    PvFreeShippingAmount: () => import("~/pages/PvFreeShippingAmount.vue"),
    AddressDialog: () => import("~/components/account/PvAddressFormModal"),
    BaseButtonIcon1: () => import("~/components/common/BaseButtonIcon1.vue"),
  },
  data: function () {
    return {
      is_uae:false,
      is_shipping_method_disabled: true,
      is_payment_method_disabled: true,
      termsAndConditions:false,
      showAllResults: false,
      clickedCardIndex: null,
      checkIsValidPayment: false,
      loadingOrder: false,
      checkoutData: null,
      address: [],
      selectedAddress:false,
      hasBlockedCountry: false,
      typeForm: "add",
      dataForm: {
        address: "",
        payment_method: "",
        card_name: "",
        card_id: "",
        coupon_code: "",
        shipping_method: "",
      },
      showInvalideMessage: false,
    };
  },
  computed: {
    ...mapGetters("language", ["getLang"]),
    ...mapGetters("authentication", ["isAuthenticated","StateUser"]),
    ...mapGetters("shop", [
      "cartList",
      "cartCurrency",
    ]),
    ...mapGetters("rtlStore", ["getIsAr"]),
  },

  watch: {
    "dataForm.payment_method": function (val) {
      if (val == "paypal") {
        this.dataForm.card_id = "-1";
      } else {
        const element = document.getElementsByTagName("head");
        element[0].removeChild(element[0].children[0]);
      }
    },
    "dataForm.shipping_method": function (val) {
      this.refetchPrice();
    },
    dataForm: {
      handler: function (val) {
        if (!val.shipping_method || !val.address) {
          this.checkIsValidPayment = false;
        } else {
          this.checkIsValidPayment = true;
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.refetchPrice()
  },
  methods: {
    ...mapActions("shop", ["removeFromCart"]),
    getLink(route) {
      if (this.getLang === 'en') {
        return route; // Return the route as is without the language parameter
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    },
    generatePdf(){
      // this.$Progress.start();
      Api.get(`/generate-pdf-checkout`, {params: {user: this.StateUser.email, currency: this.cartCurrency, address:this.dataForm.address,shipping_method:this.dataForm.shipping_method
          ,shipping_cost:this.checkoutData.shipping_cost.value}})
        .then((response) => {
          // this.$Progress.finish();
          // Assuming the response contains the base64-encoded PDF data as 'pdf'
          if (response.data.pdf) {
            // Convert base64 to binary data
            const pdfBinary = atob(response.data.pdf);

            // Convert the binary data to a Uint8Array
            const pdfArray = new Uint8Array(pdfBinary.length);
            for (let i = 0; i < pdfBinary.length; i++) {
              pdfArray[i] = pdfBinary.charCodeAt(i);
            }

            // Create a Blob from the Uint8Array
            const pdfBlob = new Blob([pdfArray], {type: 'application/pdf'});

            // Create a URL for the Blob
            const pdfUrl = URL.createObjectURL(pdfBlob);

            // Open the PDF in a new tab or window
            window.open(pdfUrl, '_blank');
          }
        })
        .catch((error) => {
          console.error('Error generating PDF:', error);
        });
    },
    CheckCardSelected(){
      if(!this.is_payment_method_disabled) {
        const value = this.clickedCardIndex;
        if (value !== null) {
          // if(this.clickedCardIndex === 1 && value !== -1){
          const spanElement = document.querySelector('.stepper-payment');
          if (value) {
            spanElement.style.backgroundColor = '#556b2f';
          } else {
            spanElement.style.backgroundColor = '#6c757d';
          }
        }
      }
    },
    GetShippingMethod(value){
      const spanElement = document.querySelector('.stepper-shipping');
      if (value) {
        spanElement.style.backgroundColor = '#556b2f';
        this.is_payment_method_disabled = false
      } else {
        spanElement.style.backgroundColor = '#6c757d';
      }
    },
    handlePaymentMethod(index) {
      if(!this.is_payment_method_disabled) {
        this.clickedCardIndex = index;
        if (this.clickedCardIndex === 1) {
          this.dataForm.payment_method = "ccavenue"
        } else if (this.clickedCardIndex === 2) {
          this.dataForm.payment_method = "paypal"
        } else if (this.clickedCardIndex === 3) {
          this.dataForm.payment_method = "transfer_online"
        }
      }
    },
    CheckIfDefaultExists(val) {
      const spanElement = document.querySelector('.stepper-address');
      if (val) {
        spanElement.style.backgroundColor = '#556b2f';
      } else {
        spanElement.style.backgroundColor = '#6c757d';
      }
      this.selectedAddress = val;
      if(this.selectedAddress){
        this.is_shipping_method_disabled = false;
      }
    },

    GetNewAddress(value){
      this.dataForm.address = value.id
      this.refetchPrice()
      Api.post("/user/addresses/check-if-uae",{ id: value.id }).then((res) =>{
        this.is_uae = res.data.message
      })
    },
    hiddenErrorMessage(event) {
      this.showInvalideMessage = false;
    },
    createOrder() {
      if (this.dataForm.address == "") {
        this.$notify({
          group: "errorMessage",
          type: "error",
          text: this.$t('alerts.PleaseSelect')
        });
      }
      else if (this.dataForm.shipping_method == "") {
        this.$notify({
          group: "errorMessage",
          type: "error",
          text: this.$t('alerts.PleaseChoose')
        });
      }
      else if (this.dataForm.payment_method == ""){
        this.$notify({
          group: "errorMessage",
          type: "error",
          text: this.$t('alerts.PleaseSelectPaymentMethod')
        });
      }
      else {
        if (this.termsAndConditions == true) {
          if(!this.is_uae && this.dataForm.shipping_method == "domestic" || !this.is_uae && this.dataForm.shipping_method =="pick_up"){
            this.$notify({
              group: "custom-notify",
              type: "error",
              text: this.$t("alerts.domesticShipping"),
            })
          }
          else{
            this.loadingOrder = true;
            this.$nuxt.$loading.start()
            Api.post("/user/orders/create", this.dataForm)
              .then((response) => {
                this.$nuxt.$loading.finish()
                if (this.dataForm.payment_method === 'ccavenue') {

                  let order_id = response.data.data.order['order_id']; // Corrected property access
                  let total = response.data.data.payment.amount;

                  // Add 3% to the total
                  total = (total * 1.03).toFixed(2); // Keep two decimal places for precision

                  // Redirect to the online order page with the order ID and total amount
                  location.href = `https://dev-srv.tlkeys.com/online-order?order_id=${order_id}&amount=${total}`;
                }


                else if(this.dataForm.payment_method == 'paypal'){
                  location.href = response.data.data.paypal_url
                }
                else {
                  this.$router.push({
                    path: "/complete-order",
                    query: {
                      orderId: response.data.data.order.order_id,
                      success: response.data.data.order.success,
                      message: response.data.data.message,
                    },
                  });
                }
              })
              .catch((err) => {
                this.$notify({
                  group: "errorMessage",
                  type: "error",
                  text: err.response.data.message,
                });
                this.loadingOrder = false;
              });
          }
        }
        else {
          this.$notify({
            group: "custom-notify",
            type: "error",
            text: this.$t("alerts.acceptTerms"),
          })
        }
      }
    },

    refetchPrice() {
      this.$nuxt.refresh()

      const authToken = this.$cookies.get('authToken');


      this.$Progress.start();
      let query = "?";
      if (this.dataForm.address) {
        query += `address=${this.dataForm.address}&`;
      }
      if(this.dataForm.shipping_method ==""){
        query += `shipping_method=${"NULL"}&`;
      }
      else if (this.dataForm.shipping_method !="") {
        query += `shipping_method=${this.dataForm.shipping_method}&`;
      }
      if (this.dataForm.coupon_code) {
        query += `coupon_code=${this.dataForm.coupon_code}`;
      }
      Api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      Api.get(`/user/orders/checkout${query}`)
        .then((response) => {
          this.checkoutData = response.data;
          if(this.dataForm.shipping_method ==""){
            this.checkoutData.shipping_cost.value = 0.00
          }
          this.checkHasBlockedCountry(this.checkoutData.products);
          this.$Progress.finish();
        })
        .catch((error) => {
          console.log(error)
        });
    },

    checkHasBlockedCountry(products) {
      this.hasBlockedCountry = false;
      for (let index = 0; index < products.length; index++) {
        if (products[index]["message"]) {
          this.hasBlockedCountry = true;
        }
      }
    },

    removeCoupon() {
      this.dataForm.coupon_code = null;
      this.refetchPrice();
    },
  },
};
</script>
<style>
.custom-disabled-class{
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
}
.paymentMethod-card{
  margin-bottom: 1rem!important;
}

@media screen and (max-width: 600px){
  .checkout-image{
    width: 100px;
  }
}
</style>
