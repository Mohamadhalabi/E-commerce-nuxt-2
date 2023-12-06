<template>
  <main class="main">
    <nav aria-label="breadcrumb" class="breadcrumb-nav container">
      <div class="">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <nuxt-link to="/">
              {{ $t("common.home") }}
            </nuxt-link>
          </li>
          <li class="breadcrumb-item">
            <nuxt-link to="/downloads">
              {{ $t("common.dashboard") }}
            </nuxt-link>
          </li>
          <li v-if="loaded" aria-current="page" class="breadcrumb-item active">
            {{ download.title }}
          </li>
        </ol>
      </div>
    </nav>
    <!-- Begin:Title -->
    <div class="container mb-lg-3 download-container p-2 p-lg-0">
      <h1 class="text-black mb-0 h1-download">
        {{ productTitle }}
      </h1>
      <no-ssr>
        <PvBtnShare :url="urlLink" />
      </no-ssr>
    </div>
    <!-- End:Title -->
    <!--    <pv-download-gallery-slider  :products="download"></pv-download-gallery-slider>-->

    <div v-if="download" class="container">
      <div class="row ">
        <!-- Begin:Left Side img -->
        <div
          v-animate
          data-animation-delay="400"
          data-animation-name="fadeInUpShorter"
          class="col-lg-3 col-9 col-sm-6 col-md-4 ml-auto mr-auto "
        >
          <figure class="post-media">
            <nuxt-link :to="`/downloads/${download.slug}`">
              <img
                v-lazy="download.internal_image.l.url"
                :alt="download.internal_image.l.alt"
                :width="download.internal_image.l.width"
                :height="download.internal_image.l.height"
                style="width:100%; height: auto;cursor: auto"
              />
            </nuxt-link>
          </figure>
        </div>
        <div
          v-animate
          data-animation-delay="600"
          data-animation-name="fadeInUpShorter"
          class="col-lg-9 col-12"
        >
          <div class="post-body">
            <!-- Begin: Software -->
            <div
              v-if="
                download.attributes.software &&
                download.attributes.software.length > 0
              "
              class="post-content mb-2"
              style="border-bottom: 1px solid #ddd"
            >
              <h2 class="text-orange download-items">{{ $t("common.software") }}</h2>
              <ul>
                <li
                  v-for="(software, index) in download.attributes.software"
                  :key="index"
                >
                  <p class="download-sub-item">
                    <a target="_blank" :href="software.link">{{
                        software.name
                      }}</a>
                  </p>
                </li>
              </ul>
            </div>
            <!-- End: software -->
            <!-- Begin: Support -->
            <div
              v-if="
                download.attributes.Support &&
                download.attributes.Support.length > 0
              "
              class="post-content mb-2"
              style="border-bottom: 1px solid #ddd"
            >
              <h2 class="text-orange download-items">{{ $t("common.support") }}</h2>
              <ul>
                <li
                  v-for="(support, index) in download.attributes.Support"
                  :key="index"
                >
                  <p class="download-sub-item">
                    <a target="_blank" :href="support.link">{{
                        support.name
                      }}</a>
                  </p>
                </li>
              </ul>
            </div>

            <!-- End: Support -->

            <!-- Begin: Diagnose -->
            <div
              v-if="
                download.attributes.Diagnose &&
                download.attributes.Diagnose.length > 0
              "
              class="post-content mb-2"
              style="border-bottom: 1px solid #ddd"
            >
              <h2 class="text-orange download-items">{{ $t("common.diagnose") }}</h2>
              <ul>
                <li
                  v-for="(Diagnose, index) in download.attributes.Diagnose"
                  :key="index"
                >
                  <p class="download-sub-item">
                    <a target="_blank" :href="Diagnose.link">{{
                        Diagnose.name
                      }}</a>
                  </p>
                </li>
              </ul>
            </div>
            <!-- End: Diagnose -->

            <!-- Begin: Setup -->
            <div
              v-if="
                download.attributes.Setup &&
                download.attributes.Setup.length > 0
              "
              class="post-content mb-2"
              style="border-bottom: 1px solid #ddd"
            >
              <h2 class="text-orange download-items">{{ $t("common.setup") }}</h2>
              <ul>
                <li
                  v-for="(Setup, index) in download.attributes.Setup"
                  :key="index"
                >
                  <p class="download-sub-item">
                    <a target="_blank" :href="Setup.link">{{
                        Setup.name
                      }}</a>
                  </p>
                </li>
              </ul>
            </div>
            <!-- End: Setup -->

            <!-- Begin: Faqs -->
            <div
              v-if="
                download.attributes['Frequently Asked Questions'] &&
                download.attributes['Frequently Asked Questions'].length > 0
              "
              class="post-content mb-2"
              style="border-bottom: 1px solid #ddd"
            >
              <h2 class="text-orange download-items">{{ $t("common.Faqs") }}</h2>
              <ul>
                <li
                  v-for="(Faqs, index) in download.attributes['Frequently Asked Questions']"
                  :key="index"
                >
                  <p class="download-sub-item">
                    <a target="_blank" :href="Faqs.link">{{
                        Faqs.name
                      }}</a>
                  </p>
                </li>
              </ul>
            </div>
            <!-- End: Faqs -->

            <!-- Begin: Extra -->
            <div
              v-if="
                download.attributes.extra &&
                download.attributes.extra.length > 0
              "
              class="post-content mb-2"
              style="border-bottom: 1px solid #ddd"
            >
              <h2 class="text-orange download-items">Extra</h2>
              <ul>
                <li
                  v-for="(extra, index) in download.attributes.extra"
                  :key="index"
                >
                  <p class="download-sub-item">
                    <a target="_blank" :href="extra.link">{{ extra.name }}</a>
                  </p>
                </li>
              </ul>
            </div>
            <!-- End: Extra -->

            <!-- Begin: driver -->
            <div
              v-if="
                download.attributes.driver &&
                download.attributes.driver.length > 0
              "
              class="post-content mb-2"
              style="border-bottom: 1px solid #ddd"
            >
              <h2 class="text-orange download-items">{{ $t("common.driver") }}</h2>
              <ul>
                <li
                  v-for="(driver, index) in download.attributes.driver"
                  :key="index"
                >
                  <p class="download-sub-item">
                    <a target="_blank" :href="driver.link">{{ driver.name }}</a>
                  </p>
                </li>
              </ul>
            </div>
            <!-- End: driver -->

            <!-- Begin:Configratiom -->
            <div
              v-if="
                download.attributes.configuration &&
                download.attributes.configuration.length > 0
              "
              class="post-content mb-2"
              style="border-bottom: 1px solid #ddd"
            >
              <h2 class="text-orange download-items">{{ $t("common.configuration") }}</h2>
              <ul>
                <li
                  v-for="(configuration, index) in download.attributes
                    .configuration"
                  :key="index"
                >
                  <p class="download-sub-item">
                    <a target="_blank" :href="configuration.link">{{
                        configuration.name
                      }}</a>
                  </p>
                </li>
              </ul>
            </div>
            <!-- End:Configratiom -->

            <!-- Begin:Maker -->
            <div
              v-if="
                download.attributes.maker &&
                download.attributes.maker.length > 0
              "
              class="post-content mb-2"
              style="border-bottom: 1px solid #ddd"
            >
              <h2 class="text-orange download-items">{{ $t("common.maker") }}</h2>
              <ul>
                <li
                  v-for="(maker, index) in download.attributes.maker"
                  :key="index"
                >
                  <p class="download-sub-item">
                    <a target="_blank" :href="maker.link">{{ maker.name }}</a>
                  </p>
                </li>
              </ul>
            </div>
            <!-- End:Maker -->

            <!-- Begin:User Manual -->
            <div
              v-if="
                download.attributes.user_manual &&
                download.attributes.user_manual.length > 0
              "
              class="post-content mb-2"
              style="border-bottom: 1px solid #ddd"
            >
              <h2 class="text-orange download-items">{{ $t("common.userManual") }}</h2>
              <ul>
                <li
                  v-for="(user_manual, index) in download.attributes
                    .user_manual"
                  :key="index"
                >
                  <p class="download-sub-item">
                    <a target="_blank" :href="user_manual.link">{{
                        user_manual.name
                      }}</a>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- Begin:Right Side -->

      <!-- Begin:ScreenShot Slider-->
      <h3 class="text-orange download-border-bottom" v-if="download.screen_shot.gallery && download.screen_shot.gallery.length > 0">Screen shot</h3>
      <pv-media :product="download.screen_shot" :ScreenShot="true"></pv-media>
      <!-- End:ScreenShot Slider-->

      <!-- Begin: Gallery Slider-->

      <div class="post-content mt-lg-4" v-html="download.description" />
      <h3 class="text-orange mt-lg-4 download-border-bottom" v-if="gallery.length > 0">Gallery</h3>
      <pv-media  :product="download"></pv-media>
      <h3 v-if="videos.length > 0" class="text-orange mt-lg-4 download-border-bottom"
      >video</h3>
      <div v-if="videos.length > 0" class="row mb-3">
        <div
          v-for="(video, index) in videos"
          :key="index"
          class="downloadVedioWrapper col-md-4  position-relative mb-2 "

        >
<!--          <pv-video-player-->
<!--            :src="video.link"-->
<!--            :type="'video/youtube'"-->
<!--            :options="videoOptions"-->
<!--            class=""-->
<!--          />-->
          <div
            style="
              opacity: 0;
              z-index: 2;
              cursor: pointer;
              top: 0px;
              left: 0px;
              right: 0px;
            "
            @click="openVedioModal(video)"
            class="w-100 h-100 position-absolute border"
          >
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Api from "~/api";
// import PvVideoPlayer from "~/components/features/PvVideoPlayer";
import PvMedia from "~/components/downloads/PvMedia.vue";
import { baseSlider3 } from "~/utils/data/carousel";

export default {
  components: {
    // PvVideoPlayer,
    PvMedia,
    PvBtnShare: () => import("~/components/common/PvBtnShare.vue"),
  },
  data: function () {
    return {
      meta_image: "",
      softwareName: "",
      softwareLink: "",
      productTitle:'',
      urlLink: null,
      baseSlider3,
      download: null,
      loaded: false,
      screenShorts: [],
      gallery: [],
      videos: [],
      videoOptions: {
        autoplay: false,
        controls: true,
      },
      structuredData: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.tlkeys.com"
        },{
          "@type": "ListItem",
          "position": 2,
          "name": "Downloads",
          "item": "https://www.tlkeys.com/downloads"
        },
          {
            "@type" : "ListItem",
            "position": 3,
            "name": this.$route.params.slug.replace(/-/g, ' '),
          }
        ]
      },
      structuredData2: {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Techno Lock Keys",
        "url": "https://www.tlkeys.com",
        "sameAs" : [ "https://www.facebook.com/technolockkeys_world/",
          "https://twitter.com/techno_lock",
          "https://www.instagram.com/technolock/",
          "https://www.youtube.com/channel/UC40E3nDQ52h8d-jGbCJeepg",
          "https://api.whatsapp.com/send?phone=971504429045"]
      },
    };
  },
  head() {
    return {
      link: [
        {
          rel: 'canonical',
          href: this.urlLink,
        },
        {
          rel: 'alternate',
          hreflang: 'en',
        },
        {
          rel: 'alternate',
          hreflang: 'ar',
        },
      ],
      titleTemplate: this.download ? this.download.meta_title : null,
      title: this.download ? this.download.meta_title : null,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.download ? this.download.meta_description : null,
        },
        {
          hid: "og:description",
          name: "og:description",
          content: this.download ? this.download.meta_description : null,
        },
        {
          hid: "og:title",
          name: "og:title",
          content: this.download ? this.download.meta_title : null,
        },
        {
          hid: "og:type",
          name: "og:type",
          content: "website",
        },
        {
          hid: "og:url",
          name: "og:url",
        },
        {
          hid: "og:image",
          name: "og:image",
          content: this.meta_image.url,
        },
      ],
      script: [
        { type: 'application/ld+json', json: this.structuredData },
        { type: 'application/ld+json', json: this.structuredData2 },
        { type: 'application/ld+json', json:
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": this.download ? this.download.meta_title : null,
              "description": this.download ? this.download.meta_description : null,
              "mainEntity": {
                "@type": "SoftwareApplication",
                "name": this.softwareName,
                "operatingSystem": ["Windows", "MacOS", "Linux"],
                "applicationCategory": "DriverApplication",
                "downloadUrl": this.softwareLink,
              }
            }
        },
      ]
    };
  },
  mounted() {
    this.urlLink = window.location.origin + this.$route.fullPath
  },
  created: async function () {
    await this.getDownload();
    if(this.download.meta_image['s'] !== undefined){
      this.meta_image = this.download.meta_image['s'];
    }
    if(this.download.attributes.software !== undefined) {
      this.softwareLink = this.download.attributes.software[0].link;
      this.softwareName = this.download.attributes.software[0].name;
    }
    else if(this.download.attributes.driver !== undefined){
      this.softwareLink = this.download.attributes.driver[0].link;
      this.softwareName = this.download.attributes.driver[0].name;
    }
    else{
      this.softwareLink = "";
      this.softwareName = "";
    }
  },

  methods: {
    openVedioModal: function (story) {
      this.$modal.show(
        () => import("~/components/home/PvStoryModal"),
        { story },
        {
          adaptive: true,
          class: "video-modal-container",
        }
      );
    },
    toggleVisiplity() {
      this.isVisible = !this.isVisible;
    },
    getDownload: async function () {
      this.loaded = false;
      await Api.get(`downloads/${this.$route.params.slug}`)
        .then((response) => {
          this.download = response.data.download;
          this.sources = this.download.videos;
          this.productTitle = response.data.download.title;
          this.videos = this.download.video;
          for (
            let index = 0;
            index < this.download.screen_shot.length;
            index++
          ) {
            this.screenShorts.push(this.download["screen_shot"][index].l.url);
          }
          for (let index = 0; index < this.download.gallery.length; index++) {
            this.gallery.push(this.download["gallery"][index].l.url);
          }
          this.loaded = true;
        })

        .catch((error) => ({ error: JSON.stringify(error) }));
    },
  },
};
</script>
<style scoped>
.carousel-indicators li {
  background-color: #f07905;
}
.h1-download{
  font-size: 2.5rem;
  font-weight: 700;
  border-bottom: 0;
}
.carousel-control-next-icon,
.carousel-control-prev-icon {
  background-color: #f07905;
  display: none;
}
.text-orange {
  color: #f07905 !important;
}
.download-container{
  border-bottom: 2px solid;
  border-image: linear-gradient(to right, #da5555, #ff6800) 1;
  border-image-slice: 1;
}
@media screen and (min-width: 1436px) {
  .download-container{
    display: flex;
    justify-content: space-between;
  }
}

.download-border-bottom{
  border-bottom: 2px solid;
  -o-border-image: linear-gradient(to right, #da5555, #ff6800) 1;
  border-image: linear-gradient(to right, #da5555, #ff6800) 1;
  border-image-slice: 1;
  width: fit-content;
}
.download-items{
  font-size: 20px;
}
.download-sub-item{
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
}
</style>

