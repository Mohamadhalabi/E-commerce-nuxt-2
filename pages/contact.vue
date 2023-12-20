<template>
  <main class="main contact-two">
    <nav aria-label="breadcrumb" class="breadcrumb-nav">
      <div class="container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <nuxt-link to="/">
              {{ $t("common.home") }}
            </nuxt-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ $t("products.contactus") }}
          </li>
        </ol>
      </div>
    </nav>

    <div id="map">
      <div />
      <iframe
        :src="$settings.contact.google_map_iframe"
        width="100%"
        height="100%"
        frameborder="0"
      />
    </div>

    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <h2 class="contact-title" :class="getIsAr ? 'text-right' : ''">
            {{ $t("contact.leave")
            }}<strong> {{ $t("contact.message") }}</strong>
          </h2>

          <form action="#">
            <div class="row">
              <div class="col-lg-6">
                <div class="form-group required-field">
                  <label for="contact-name">{{ $t("contact.name") }}</label>
                  <input
                    id="contact-name"
                    v-model="dataForm.name"
                    type="text"
                    class="form-control"
                    name="contact-name"
                    required
                  />
                </div>

                <div class="form-group required-field">
                  <label for="contact-email">{{ $t("contact.email") }}</label>
                  <input
                    id="contact-email"
                    v-model="dataForm.email"
                    type="email"
                    class="form-control"
                    name="contact-email"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="contact-subject">{{
                    $t("contact.subject")
                  }}</label>
                  <input
                    id="contact-subject"
                    v-model="dataForm.subject"
                    type="text"
                    class="form-control"
                    name="contact-subject"
                  />
                </div>
              </div>

              <div class="col-lg-6">
                <div class="form-group required-field mb-0">
                  <label for="contact-message">{{
                    $t("contact.message")
                  }}</label>
                  <textarea
                    id="contact-message"
                    v-model="dataForm.message"
                    cols="30"
                    rows="1"
                    class="form-control"
                    name="contact-message"
                    required
                  />
                </div>
                <recaptcha />
                <b v-if="this.token == ''" class="text-danger">{{
                  $t("common.pleaseCheckRecaptch")
                }}</b>

                <div class="form-footer">
                  <!--  <button
                    type="submit"
                    class="btn btn-primary m-auto"
                    @click.prevent="sendMessage"
                  >
                  </button> -->
                  <base-button-icon-1
                    class="w-50 py-4 px-0"
                    @click.prevent="sendMessage"
                    type="submit"
                    :outline="true"
                  >
                    <span class="mx-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="25"
                        viewBox="0 96 960 960"
                        width="25"
                        fill="#ff6800"
                      >
                        <path
                          d="M120 896V256l760 320-760 320Zm60-93 544-227-544-230v168l242 62-242 60v167Zm0 0V346v457Z"
                        />
                      </svg>
                    </span>
                    {{ $t("contact.sendMessage") }}</base-button-icon-1
                  >
                </div>
              </div>
            </div>
          </form>
        </div>

        <div class="col-md-4">
          <h2 class="contact-title" :class="getIsAr ? 'text-right' : ''">
            {{ $t("contact.contact") }}
            <strong>{{ $t("contact.details") }}</strong>
          </h2>
          <br>
          <div class="contact-info">
            <div class="porto-sicon-box d-flex align-items-center">
              <div class="porto-icon">
                <i class="fas fa-mobile-alt mobile-phone" />
              </div>
              <div class="porto-sicon-description">
                {{ $settings.contact.whatsapp }}<br />
                {{ $settings.contact.telegram }}
              </div>
            </div>
            <div class="porto-sicon-box d-flex align-items-center">
              <div class="porto-icon">
                <i class="fa fa-envelope" />
              </div>
              <div class="porto-sicon-description">
                {{ $settings.contact.email_primary }}<br />
                {{ $settings.contact.email_secondary }}
              </div>
            </div>
            <div class="porto-sicon-box d-flex align-items-center">
              <div class="porto-icon">
                <i class="fa fa-location-arrow" />
              </div>
              <div class="porto-sicon-description">
                Address :{{ $settings.contact.address }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { VueSlideToggle } from "vue-slide-toggle";
import { mapGetters } from "vuex";
import Api from "~/api";
import BaseButtonIcon1 from "~/components/common/BaseButtonIcon1.vue";
export default {
  components: {
    VueSlideToggle,
    BaseButtonIcon1,
  },

  head() {
    return {
      title: "Techno Lock Keys Trading | Get in Touch with Us",
      link: [
        {
          rel: 'canonical',
          href: 'https://www.tlkeys.com/contact',
        },
      ],
      meta: [
        {
          "http-equiv": "content-language",
          content: this.$i18n.locale,
        },
        {
          name: 'description',
          content: "Connect with us effortlessly! Our contact us page is your gateway to seamless communication. Reach out for support, inquiries, or collaboration opportunities. We're here to assist you – let's start the conversation today!"
        },
        {
          name: "og:type",
          content: "website",
        },
        {
          name: "og:site_name",
          content: "Techno Lock Keys",
        },
        {
          name: "og:title",
          content: "Techno Lock Keys Trading | Automotive Locksmith Services",
        },
        {
          name: "og:description",
          content: "Techno Lock Keys provides a wide range of auto keys, remotes, diagnostics, cutting machines, programming devices, Fobs, transponder keys, and emulators"
        },
        {
          name: "og:url",
          content: "https://www.tlkeys.com",
        },
        {
          name: "og:image",
          content: "https://dev-srv.tlkeys.com/storage/images/seo/technolock_logo.jpg",
        },
        {
          name: "og:image:alt",
          content: this.$settings.seo.meta_image.l.alt,
        },
        {
          name: "og:image:height",
          content: "627",
        },
        {
          name: "og:image:width",
          content: "1200",
        },
        {
          name: "twitter:card",
          content: "summary",
        },
        {
          name: "twitter:site",
          content: `${this.$settings.social_media.twitter}`,
        },
        {
          name: "twitter:title",
          content: 'Techno Lock Keys Trading | Automotive Locksmith Services',
        },
        {
          name: "twitter:description",
          content: "Techno Lock Keys provides a wide range of auto keys, remotes, diagnostics, cutting machines, programming devices, Fobs, transponder keys, and emulators"
        },
        {
          rel: "shortcut icon",
          href: "https://dev-srv.tlkeys.com/storage/images/seo/favicon-tlkeys.png",
        },
      ],
      script: [
        { type: 'application/ld+json', json: {
            "@context": "http://schema.org/",
            "@type": "Organization",
            "name": "Techno Lock Keys Trading",
            "url": "https://www.tlkeys.com/",
            "image": "https://www.tlkeys.com/tlk-logo.png",
            "description": "Techno Lock Keys provides a wide range of auto keys, remotes, diagnostics, cutting machines, programming devices, Fobs, transponder keys, and emulators.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Industrial No. 5, behind Maliah Road., shop No. 8",
              "addressCountry": "AE"
            },
            "telephone": "+971 6 542 1313",
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Saturday",
                  "Sunday"
                ],
                "opens": "10:00",
                "closes": "18:00"
              }
            ],
            "priceRange": "$$",
            "paymentAccepted": "Cash, Credit Card, Paypal",
            "sameAs": [
              "https://www.facebook.com/technolockkeys_world/",
              "https://twitter.com/techno_lock",
              "https://api.whatsapp.com/send?phone=971504429045"
            ]
          }
        },
        { type: 'application/ld+json', json: {
            "@context": "https://schema.org",
            "@type": "Organization",
            "url": "https://www.tlkeys.com",
            "logo": this.$settings.website.system_logo_black.l.url
          }
        }
      ]
    }
  },

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data: function () {
    return {
      toggleState: [true, false, false, false, false],
      dataForm: {
        name: "",
        email: "",
        subject: "",
        message: "",
        type: this.typeContact,
        model_id: this.modelId,
      },
      token: null,
    };
  },
  mounted() {
    this.$Progress.start();
    setTimeout(() => {
      this.$Progress.finish();
    }, 1000);
  },
  methods: {
    changeToggle: function (index) {
      let tmp = this.toggleState[index];
      this.toggleState.fill(false);
      this.toggleState[index] = !tmp;
      this.toggleState = [...this.toggleState];
    },

    sendMessage: async function () {
      try {
        this.token = await this.$recaptcha.getResponse();
      } catch (Ex) {
        this.token = "";
      }
      if (this.token != "") {
        this.$Progress.start();
        Api.post("/contact-us", this.dataForm)
          .then((response) => {
            (this.dataForm.name = ""),
              (this.dataForm.email = ""),
              (this.dataForm.subject = ""),
              (this.dataForm.message = "");
            this.errorMsg = {
              name: [],
              email: [],
              subject: [],
              message: [],
            };

            this.$notify({
              group: "custom-notify",
              type: "success",
              text: response.data.message,
            });
            this.$Progress.finish();
          })
          .catch((err) => {
            this.errorMsg = err.response.data.data;

            this.$notify({
              group: "errorMessage",
              type: "error",
              text: err.response.data.data.message[0],
            });

            this.$Progress.fail();
          });
      }
    },
  },
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
  },
};
</script>
