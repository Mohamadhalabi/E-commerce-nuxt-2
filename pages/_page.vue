<template>
  <div>
    <ShopTemplate v-if="page.type === 'category'" :category="page" />
    <ShopTemplate v-if="page.type === 'manufacturer'" :manufacturer="page" />
    <ShopTemplate v-if="page.type === 'brand'" :brand="page" />
    <br/>
    <main
      v-if="page.type != 'brand' && page.type != 'manufacturer' && page.type != 'category'" class="main about">
        <div class="container">
          <nav aria-label="breadcrumb" class="breadcrumb-nav">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <nuxt-link to="/">
                  {{ $t("shop.home") }}
                </nuxt-link>
              </li>
              <li class="breadcrumb-item active">
                {{ $t("common.aboutUs") }}
              </li>
            </ol>
          </nav>
        </div>
      <div class="container my-2" v-html="page.description" />
    </main>
  </div>
</template>
<script>
import axios from "axios";
export default {
  components: { 
    ShopTemplate :()=> import ("~/pages/shop/_shop.vue")
  },
    async asyncData({ params, app, error }) {
    try {
      const { data } = await axios.get(`pages/${params.page}`, {
        baseURL: process.env.API_BASE_URL,
        headers: {
          'Accept-Language': app.i18n.locale,
          'Content-Type': 'application/json',
          'currency': app.$cookies.get('currency') || 'USD',
          'Accept': 'application/json',
          'secret-key': process.env.SECRET_KEY,
          'api-key': process.env.API_KEY,
        },
      });

      // Check if the page data exists
      if (!data) {
        // Trigger a 404 error
        error({ statusCode: 404, message: 'Page not found' });
        return; // Ensure no further processing occurs
      }

      return {
        page: data,
      };
    } catch (e) {
      // Trigger a 404 error if the API request fails
      error({ statusCode: 404, message: 'Page not found' });
    }
  },
  head() {
  const languagePrefix = this.$i18n.locale !== 'en' ? `/${this.$i18n.locale}` : '';

  let head_data = {
    titleTemplate: this.page.meta_title,
    title: this.page.meta_title,
    link: [
      {
        rel: 'canonical',
        href: process.env.PUBLIC_PATH_WITHOUT_SLASH + languagePrefix + '/' + this.$route.params.page,
      },
      // hreflang implementation - dynamically generated based on availableLocales
      ...this.$i18n.availableLocales.map(loc => ({
        rel: 'alternate',
        hreflang: loc,
        href: process.env.PUBLIC_PATH_WITHOUT_SLASH + (loc !== 'en' ? `/${loc}` : '') + '/' + this.$route.params.page
      })),
      // Fallback hreflang for default locale (this will help search engines find the main language version)
      {
        rel: 'alternate',
        hreflang: 'x-default',
        href: process.env.PUBLIC_PATH_WITHOUT_SLASH + '/' + this.$route.params.page
      }
    ],
    meta: [
      {
        name: "description",
        content: this.page.meta_description,
      },
      {
        name: "og:description",
        content: this.page.meta_description,
      },
    ],
    script: [
      {
        type: 'application/ld+json',
        json: {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": this.$i18n.t("products.home"),
              "item": process.env.PUBLIC_PATH_WITHOUT_SLASH + languagePrefix,
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": this.$i18n.t("products.shop"),
              "item": `${process.env.PUBLIC_PATH_WITHOUT_SLASH}` + languagePrefix + '/shop',
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": this.page.title,
              "item": `${process.env.PUBLIC_PATH_WITHOUT_SLASH}` + languagePrefix + '/' + this.$route.params.page,
            },
          ]
        }
      },
      {
        type: 'application/ld+json',
        json: {
          "@context": "https://schema.org/",
          "@type": "Organization",
          "name": "Techno Lock Keys Trading",
          "url": "https://www.tlkeys.com/",
          "image": "https://www.tlkeys.com/images/logos/techno-lock-desktop-logo.webp",
          "description": "Techno Lock Keys provides a wide range of auto keys, remotes, diagnostics, cutting machines, programming devices, Fobs, transponder keys, and emulators.",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Industrial No. 5, behind Maliah Road., shop No. 8",
            "addressCountry": "AE"
          },
          "telephone": "+971504429045",
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
    ],
  };
  if (this.page.type == "page") {
    head_data.meta.push({
      name: "og:image:alt",
      content: this.page.meta_image.l.alt,
    });
    head_data.meta.push({
      property: "og:image",
      content: this.page.meta_image.l.url,
    });
    head_data.meta.push({
      name: "og:image:height",
      content: this.page.meta_image.l.height,
    });
    head_data.meta.push({
      name: "og:image:width",
      content: this.page.meta_image.l.width,
    });
  } else {
    head_data.meta.push({
      property: "og:title",
      content: this.page.meta_title,
    });
    head_data.meta.push({
      property: "og:type",
      content: "website",
    });
    head_data.meta.push({
      property: "og:image",
      content: this.page.meta_image,
    });
  }
  head_data.meta.push({
    property: "og:url",
    content: process.env.PUBLIC_PATH_WITHOUT_SLASH + languagePrefix + '/' + this.$route.params.page,
  });

  return head_data;
},

};
</script>
