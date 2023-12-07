<template>
  <main class="main">
    <!-- <div class="page-header">
      <div class="container d-flex flex-column align-items-center">
        <nav
          aria-label="breadcrumb"
          class="breadcrumb-nav"
        >
          <div class="container">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <nuxt-link to="/">
                  {{$t('common.home')}}
                </nuxt-link>
              </li>
              <li class="breadcrumb-item">
                <nuxt-link to="/shop">
                  {{$t('common.shop')}}
                </nuxt-link>
              </li>
              <li
                class="breadcrumb-item active"
                aria-current="page"
              >
                {{$t('common.myAccount')}}
              </li>
            </ol>
          </div>
        </nav>

        <h1>{{$t('common.myAccount')}}</h1>
      </div>
    </div> -->

    <div class="container reset-password-container">
      <div class="row">
        <div class="col-lg-6 offset-lg-3">
          <div style="border-top: 3px solid #ff832d;   border-left: 1px solid #aaa; border-right: 1px solid #aaa; border-bottom: 1px solid #aaa;" class="feature-box   rounded-2 shadow">
            <div class="feature-box-content">
              <form class="mb-0" @submit.prevent="forgotPassword">
                <p>
                  {{ $t("forgotPassword.subText") }}
                </p>
                <div class="form-group mb-0">
                  <label for="reset-email" class="font-weight-normal">{{
                    $t("common.email")
                  }}</label>
                  <input
                    id="reset-email"
                    v-model="email"
                    type="email"
                    class="form-control"
                    name="reset-email"
                    required
                  />
                </div>

                <div
                  class="form-footer mb-0 d-felx align-items-center justify-content-between"
                >
                  <nuxt-link to="/auth/login" class="m-0 p-0">
                    {{ $t("forgotPassword.clickHere") }}
                  </nuxt-link>

                  <!-- <button
                    type="submit"
                    class="btn btn-md btn-primary form-footer-right font-weight-normal text-transform-none mr-0"
                  >
                    {{$t('forgotPassword.resetPassword')}}
                  </button> -->
                  <base-button-icon-1 type="submit" class="p-2" :outline="true">{{
                    $t("forgotPassword.resetPassword")
                  }}</base-button-icon-1>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
<!--      <modal name="error">-->
<!--        <div-->
<!--          class="alert alert-danger alert-dismissible mb-0 text-center"-->
<!--          role="alert"-->
<!--        >-->
<!--          <strong>{{ $t("common.warning") }}</strong>-->
<!--          <ul class="my-1">-->
<!--            <li v-for="(value, key) in errors" :key="key">-->
<!--              {{ key }}:-->
<!--              <ul>-->
<!--                <li v-for="(err, key2) in value" :key="key2">- {{ err }}</li>-->
<!--              </ul>-->
<!--            </li>-->
<!--          </ul>-->
<!--        </div>-->
<!--      </modal>-->
<!--      <modal name="success">-->
<!--        <div-->
<!--          class="alert alert-success alert-dismissible mb-0 text-center"-->
<!--          role="alert"-->
<!--        >-->
<!--          &lt;!&ndash; <strong>{{ message }}</strong> &ndash;&gt;-->
<!--        </div>-->
<!--      </modal>-->
    </div>
  </main>
</template>

<script>
import BaseButtonIcon1 from "~/components/common/BaseButtonIcon1.vue";

export default {
  components: { BaseButtonIcon1 },
  data() {
    return {
      email: "",
      /* message: "", */
      errors: {},
    };
  },
  head() {
    return {
      title: this.$t("forgotPassword.title"),
    };
  },
  methods: {
    forgotPassword() {
      this.$store
        .dispatch("auth/forgotPassword", this.email)
        .then((res) => {
          /*   this.message = res.data.message;
        this.$modal.show('success');  */
          this.$notify({
            group: "custom-notify",
            type: "success",
            text: res.data.message+'',
          });
        })
        .catch((error) => {
          this.$notify({
            group: "errorMessage",
            type: "error",
            text: error.response.data.data.email +'',
          });

          /* this.errors = error.response.data.data;
        this.$modal.show('error'); */
        });
    },
  },
};
</script>
