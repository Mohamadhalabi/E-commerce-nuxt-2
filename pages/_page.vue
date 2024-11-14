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
    const hasQueryParams = Object.keys(this.$route.query).length > 0;  // Move this line outside of head_data object
    let head_data = {
      titleTemplate: this.page.meta_title,
      title: this.page.meta_title,
      link: [
        {
          rel: 'canonical',
          href: process.env.PUBLIC_PATH + this.$route.params.page,
        },
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
                "item": process.env.PUBLIC_PATH,
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": this.$i18n.t("products.shop"),
                "item": `${process.env.PUBLIC_PATH}shop`,
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": this.page.title,
                "item": `${process.env.PUBLIC_PATH}shop/` + this.$route.params.page,
              },
            ]
          }
        },
        {
          type: 'application/ld+json', json: {
            "@context": "https://schema.org",
            "@type": "Organization",
            "url": `${process.env.PUBLIC_PATH}` + this.page.slug,
            "logo": this.page.meta_image,
            "image": this.page.meta_image,
            "name": this.page.title,
            "description": this.page.meta_description,
            "email": "info@tlkeys.com",
          }
        },
      ]
    };

    if (hasQueryParams) {
      head_data.meta.push({
        name: 'robots',
        content: 'noindex, nofollow'
      });
    }

    // Add custom scripts and other meta tags as needed
    if (this.page.type == "manufacturer") {
      // Add your custom manufacturer related scripts here
    }

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
        property: "og:description",
        content: this.page.meta_description,
      });
      head_data.meta.push({
        property: "og:url",
        content: process.env.PUBLIC_PATH + this.page.slug,
      });
      head_data.meta.push({
        property: "og:image",
        content: this.page.meta_image,
      });
    }

    return head_data;
  },
};
</script>
