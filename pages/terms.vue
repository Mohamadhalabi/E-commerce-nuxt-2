<template>
  <main class="main skeleton-body">
    <div class="container">
      <nav
        aria-label="breadcrumb"
        class="breadcrumb-nav"
      >
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <nuxt-link to="/">
              {{ $t('shop.home') }}
            </nuxt-link>
          </li>
          <li class="breadcrumb-item active">
            Terms And Conditions
          </li>
        </ol>
      </nav>
      <div class="about_section mt-32">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-12">
              <div class="about_content">
                <h1 class="h1-terms-and-conditions">Terms and conditions</h1>
                <h3>Definition</h3>
                <p class="terms-and-conditions">
                  These Terms and Conditions ("Terms") govern your use of the Car Locksmith E-commerce Website (the "Website") operated by [Insert Company Name] ("we," "us," or "our"). By accessing or using the Website, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use the Website.
                </p>
                <h3>1.Acceptance of Terms</h3>
                <p class="terms-and-conditions">
                  By using the Website, you acknowledge that you have read, understood, and agree to be bound by these Terms and any additional terms and conditions referenced herein.
                </p>
                <h3>2.Services</h3>
                <p class="terms-and-conditions">
                  Our Website provides access to information about locksmith services for cars, as well as the opportunity to purchase products and services related to car locksmithing.
                </p>
                <h3>3.User Accounts</h3>
                <ul class="terms-and-conditions">
                  <li>You may need to create an account to access certain features of the Website. You agree to provide accurate, current, and complete information during the registration process.
                  </li>
                  <li>
                    You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                  </li>
                  <li>
                    You must promptly notify us of any unauthorized access or use of your account.
                  </li>
                </ul>
                <h3>4.Purchases</h3>
                <ul class="terms-and-conditions">
                  <li>
                    When making a purchase through the Website, you agree to provide accurate billing and payment information.
                  </li>
                  <li>
                    All sales are final, and refunds are subject to our Refund Policy
                  </li>
                  <li>
                    Prices are subject to change without notice, and we are not responsible for pricing errors.
                  </li>
                </ul>
                <h3>5.Intellectual Property</h3>
                <ul class="terms-and-conditions">
                  <li>
                    All content on the Website, including but not limited to text, images, logos, and trademarks, is our property or the property of our licensors and is protected by intellectual property laws.
                  </li>
                  <li>
                    You may not use, copy, reproduce, modify, or distribute any content from the Website without our prior written consent.
                  </li>
                </ul>
                <h3>6.Privacy</h3>
                <ul class="terms-and-conditions">
                  <li>
                    We collect and use personal information as described in our Privacy Policy.
                  </li>
                  <li>
                    By using the Website, you consent to the collection and use of your personal information as described in the Privacy Policy.
                  </li>
                </ul>
                <h3>7- Contact Information</h3>
                <p class="terms-and-conditions">
                  If you have any questions about these Terms, please contact us at <a href="mailto:info@tlkeys.com">info@tlkeys.com</a>
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
export default {
  name: "terms",
  head() {
    return {
      title: "Techno Lock Keys Trading | Automotive Locksmith Services",
      link: [
        {
          rel: 'canonical',
          href: 'https://www.tlkeys.com/terms',
        },
      ],
      meta: [
        {
          "http-equiv": "content-language",
          content: this.$i18n.locale,
        },
        {
          name: 'description',
          content: "Explore our concise terms for locksmith services. Trust Techno Lock Keys for security with integrity and professionalism."
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
}
</script>

<style>
.h1-terms-and-conditions{
  font-size: 36px;
}
.terms-and-conditions{
  color: #757575;
  font-size: 16px;
  line-height: 30px;
  text-align: left;

}
ul.terms-and-conditions{
  list-style-type: circle;
  padding-left: 15px;
}
</style>
