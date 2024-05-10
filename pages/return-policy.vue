<template>
  <main class="main skeleton-body">
    <div class="container">
      <nav
        aria-label="breadcrumb"
        class="breadcrumb-nav"
      >
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <nuxt-link :to="getLink('/')">
            {{ $t('shop.home') }}
            </nuxt-link>
          </li>
          <li class="breadcrumb-item active">
            Return Policy
          </li>
        </ol>
      </nav>
      <div class="about_section mt-3">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-12">
              <div class="about_content">
                <h1>Return & Refund Policy</h1>
                <p style="color:red">
                  Note: Please be aware that the original products are not returnable or refundable. Only products that meet the eligibility criteria and are returned within 15 days of purchase will be considered for a refund or exchange. Thank you for your understanding.
                </p>
                <span class="policy">Eligibility for Refunds and Exchanges</span><br>
                <ul class="privacy-policy-list">
                  <li>Your item must be unused and in the same condition that you received it.</li>
                  <li>The item must be in the original packaging.</li>
                  <li>To complete your return, we require a receipt or proof of purchase.</li>
                  <li>If you receive a refund, return shipping will be deducted from your refund.</li>
                </ul>
                <span class="policy">Partial Refunds Are Granted (If Applicable)</span><br>
                <ul class="privacy-policy-list">
                  <li>Any item not in its original condition is damaged or missing parts for reasons not due to our error.</li>
                  <li>Any item that is returned more than 15 days after delivery.</li>
                  <li>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item.</li>
                  <li>We will also notify you of the approval or rejection of your refund.</li>
                  <li>If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, and will be processed within 10 to 45 days depending on the issuing bank of the credit card.</li>
                </ul>
                <span class="policy">Late Or Missing Refunds</span>
                <p>
                  If you have not received a refund yet, first check your bank account again. Then contact your credit card company, it may take some time before your refund is officially posted.
                </p>
                <p>
                  If you have done all of this and you still have not received your refund yet, please contact us at (+971) 50 442 9045 or at support@tlkeys.com
                </p>
                <span class="policy">Non-Exchangeable Items</span><br>
                <ul class="privacy-policy-list">
                  <li>Items that are damaged or abused</li>
                  <li>If the customer ordered the wrong item.</li>
                  <li>Items can be exchanged for an identical item (in the case of a factory-defective item) but cannot be returned for a refund.</li>
                </ul>
                <span class="policy">
                           Shipping
                       </span>
                <p>
                  Depending on where you live, the time it may take for your exchanged product to reach you, may vary.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "return-policy",
  head() {
    return {
      title: "Techno Lock Keys Trading | Return Policy",
      link: [
        {
          rel: 'canonical',
          href: 'https://www.tlkeys.com/return-policy',
        },
      ],
      meta: [
        {
          "http-equiv": "content-language",
          content: this.$i18n.locale,
        },
        {
          name: 'description',
          content: "Explore Techno Lock Keys' return policy for locksmith solutions. Enjoy secure products and hassle-free returns. Your satisfaction is our priority."
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
          content: "https://dev-srv.tlkeys.com/storage/images/seo/og-image.jpg",
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
                "opens": "8:00",
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
  computed:{
    ...mapGetters("language", ["getLang"])
  },
  methods:{
    getLink(route) {
      if (this.getLang === 'en') {
        return route; // Return the route as is without the language parameter
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    },
  }
}
</script>

<style scoped>
.about_content p {
  color: #5c5c5c;
  font-size: 16px;
  line-height: 26px;
  text-align: left;
  margin: 15px 0 25px 0;
}

.policy{
  font-size:20px!important;
  color:#3E444A!important;
  text-transform: capitalize;
  font-family: sans-serif;
  font-style: normal!important;
  font-weight:600;
}

.privacy-policy-list{
  font-size:16px;
  margin: 15px 0 25px 23px;
  list-style-type: circle
}
.privacy-policy-list li{
  padding:3px;
}

.about_content a{
  color:#da8b50!important;
  transition: 0.3s;
}
.about_content a:hover{
  color:#c05817!important;
}
.return-refund-policy{
  font-size: 36px;
}
</style>
