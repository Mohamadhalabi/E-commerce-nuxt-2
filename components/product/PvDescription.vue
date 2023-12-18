<template>
  <div :class="{ 'text-right': getIsAr }">
      <div v-if="product.accessories && !isEmpty(product.accessories)">
        <h3 class="additional-product-items mb-lg-3">{{ $t("products.Accessories") }}</h3>
        <table class="table table-bordered table-spacing">
          <tr>
            <td>
              <div
                v-for="item in product.accessories"
                :key="item.sku"
                class="col-lg-12 col-md-12 col-sm-12"
              >
                <pv-product-row :product="item" />
              </div>
            </td>
          </tr>
          <br>
        </table>
      </div>

      <div v-if="product.compatible_with && !isEmpty(product.compatible_with)">
        <h3 class="additional-product-items mb-lg-3">{{ $t("products.CompatibleWith") }}</h3>
        <table class="table table-bordered table-spacing">
          <tr>
            <td>
              <div
                v-for="item in product.compatible_with"
                :key="item.sku"
                class="col-lg-12 col-md-12 col-sm-12">
                <pv-product-row :product="item" />
              </div>
            </td>
          </tr>
          <br>
        </table>
      </div>

      <div v-if="product.bundled.length > 0">
        <h3 class="additional-product-items mb-lg-3">{{ $t("products.BundleProducts") }}</h3>
        <table class="table table-bordered table-spacing">
          <tr>
            <td>
              <div
                v-for="item in product.bundled"
                :key="item.sku"
                class="col-lg-12 col-md-12 col-sm-12">
                <pv-product-bundel :product="item" />
              </div>
            </td>
          </tr>
          <br>
        </table>
      </div>


      <div v-if="product.attributes && !isEmpty(product.attributes)">
      <h3 class="additional-product-items">{{ $t("products.Attributes") }}</h3>
      <div class="col-12 p-0">
        <no-ssr>
          <pv-attributes :product="product" />
        </no-ssr>
      </div>
    </div>

    <div v-if="product.brands && !isEmpty(product.brands)">
      <h3 class="additional-product-items">{{ $t("products.Models") }}</h3>
      <div class="col-12 p-0">
        <pv-models :product="product" />
      </div>
    </div>
    <div>

  <pv-tabs class="product-single-tabs">
    <ul
      class="nav bg-white nav-tabs"
      role="tablist"
      style="position: sticky;margin-bottom: 10px;"
    >
      <li
        class="nav-item"
        v-if="product.description && !isEmpty(product.description)"
      >
        <a
          id="product-tab-desc"
          class="nav-link active"
          data-toggle="tab"
          href="#product-desc-content"
          role="tab"
          aria-controls="product-desc-content"
          aria-selected="true"
          >{{ $t("products.Description") }}</a
        >
      </li>

      <li class="nav-item" v-if="product.faq && !isEmpty(product.faq)">
        <a
          id="product-tab-faq"
          class="nav-link"
          data-toggle="tab"
          href="#product-faq-content"
          role="tab"
          aria-controls="product-faq-content"
          aria-selected="true"
          >{{ $t("products.FAQ") }}</a
        >
      </li>

      <li class="nav-item">
        <a
          id="product-tab-reviews"
          class="nav-link"
          data-toggle="tab"
          href="#product-reviews-content"
          role="tab"
          aria-controls="product-reviews-content"
          aria-selected="false"
        >
          {{ $t("products.Reviews") }}({{ product.total_reviews }})</a
        >
      </li>

      <li class="nav-item" v-if="product.videos.length > 0">
        <a
          id="product-tab-videos"
          class="nav-link"
          data-toggle="tab"
          href="#product-videos-content"
          role="tab"
          aria-controls="product-videos-content"
          aria-selected="false"
          >{{ $t("products.Videos") }} ({{ product.videos.length }})</a
        >


      </li>

      <li class="nav-item d-none d-md-block" v-if="product.pdf.length > 0">
        <a
          id="product-tab-pdf"
          class="nav-link"
          data-toggle="tab"
          href="#product-pdf-content"
          role="tab"
          aria-controls="product-pdf-content"
          aria-selected="false"
          >{{ $t("products.PDF") }} ({{ product.pdf.length }})</a
        >
      </li>

      <li class="nav-item">
        <a
          id="product-tab-contactus"
          class="nav-link"
          data-toggle="tab"
          href="#product-contactus-content"
          role="tab"
          aria-controls="product-contactus-content"
          aria-selected="false"
          >{{ $t("products.contactus") }}</a
        >
      </li>
    </ul>

    <div class="tab-content">
      <div
        v-if="product.description && !isEmpty(product.description)"
        id="product-desc-content"
        class="tab-pane fade show active"
        role="tabpanel"
        aria-labelledby="product-tab-desc"
        v-html="product.description"
        ref="contentContainer"
      />
      <div class="modal" v-if="isModalOpen">
        <div class="modal-content">
          <span class="close-btn" @click="closeModal">X</span>
          <div class="modal-image-container">
            <img loading="lazy" :src="selectedImage.src" :alt="selectedImage.alt" class="modal-image">
          </div>
        </div>
      </div>


      <div
        id="product-bundled-content"
        class="tab-pane fade"
        role="tabpanel"
        aria-labelledby="product-tab-bundled"
      >
        <div class="row">
          <div
            v-for="item in product.bundled"
            :key="item.sku"
            class="col-6 col-sm-3 col-lg-2"
          >
            <pv-product :product="item" />
          </div>
        </div>
      </div>
      <div
        v-if="product.offers && !isEmpty(product.offers)"
        id="product-offers-content"
        class="tab-pane fade"
        role="tabpanel"
        aria-labelledby="product-tab-offers"
      >
        <pv-offers :product="product" />
      </div>

      <div
        v-if="product.faq && !isEmpty(product.faq)"
        id="product-faq-content"
        class="tab-pane fade"
        role="tabpanel"
        aria-labelledby="product-tab-faq"
        v-html="product.faq"
      />
      <div
        id="product-support-content"
        class="tab-pane fade"
        role="tabpanel"
        aria-labelledby="product-tab-support"
      >
        <client-only>
          <pv-support :type-support="'product'" :model-id="product.sku" />
        </client-only>
      </div>

      <div
        id="product-reviews-content"
        class="tab-pane fade"
        role="tabpanel"
        aria-labelledby="product-tab-reviews"
      >
        <pv-reviews :product="product" />
      </div>
      <div
        id="product-videos-content"
        class="tab-pane fade"
        role="tabpanel"
        aria-labelledby="product-tab-videos">
        <div class="row">
          <div
            v-for="(video, index) in product.videos"
            :key="index"
            class="downloadVedioWrapper col-md-4  position-relative mb-2 ">
            <video-player :src="video.link" />

<!--            <pv-video-player-->
<!--              :src="video.link"-->
<!--              :type="'video/youtube'"-->
<!--              :options="videoOptions"-->
<!--              class=""/>-->

          </div>
        </div>
      </div>
      <div
        id="product-pdf-content"
        class="tab-pane fade"
        role="tabpanel"
        aria-labelledby="product-tab-pdf">
        <pv-pdf :product="product" />
      </div>
      <div
        id="product-contactus-content"
        class="tab-pane fade"
        role="tabpanel"
        aria-labelledby="product-tab-contactus"
      >
        <pv-contactus
          :product="product"
          :type-contact="'product'"
          :model-id="product.sku"
        />
      </div>
    </div>
  </pv-tabs>
    </div>
  </div>
</template>

<script>
import PvTabs from "~/components/features/PvTabs";
import PvModels from "~/components/product/tabs/PvModels";
import PvReviews from "~/components/product/tabs/PvReviews";
import PvPdf from "~/components/product/tabs/PvPdf";
import PvProduct from "~/components/product/card/PvProduct";
import PvContactus from "~/components/product/tabs/PvContactus";
// import PvVideoPlayer from "../features/PvVideoPlayer.vue";
import { isEmpty } from "lodash";
import PvProductRow from "~/components/product/card/PvProductRow.vue";
import PvProductBundel from "~/components/product/card/PvProductBundel.vue";
import {mapGetters} from "vuex";

import VideoPlayer from 'nuxt-video-player'

require('nuxt-video-player/src/assets/css/main.css')

export default {
  components: {
    VideoPlayer,
    PvProductBundel,
    PvProductRow,
    PvTabs,
    PvAttributes: () => import("~/components/product/tabs/PvAttributes"),
    PvModels,
    PvSupport:() => import("~/components/product/tabs/PvSupport"),
    PvReviews,
    PvProduct,
    PvPdf,
    PvContactus,
    // PvVideoPlayer,
  },

  props: {
    product: Object,
  },
  data: function () {
    return {
      isEmpty,
      loadedData: false,
      ImageFromDescription:'',
      isModalOpen: false,
      selectedImage: null,
      videoOptions: {
        autoplay: false,
        controls: true,
      },
    };
  },
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
  },
  watch: {
    $route(val) {
      if (val.query.reviews == "true") {
        document.getElementById("products-tab-reviews").click();
        document.getElementById("products-tab-reviews").scrollIntoView();
      }
    },
  },
  mounted() {
    // this.addEventListenersToImages();
  },
  methods: {
    addEventListenersToImages() {
      const contentContainer = this.$refs.contentContainer;
      const images = contentContainer.getElementsByTagName('img');

      // Add click event listener to each image
      Array.from(images).forEach((img) => {
        img.addEventListener('click', () => {
          this.openModal({
            src: img.getAttribute('src'),
            alt: img.getAttribute('alt')
          });
        });
      });
    },
    openModal(image) {
      this.selectedImage = image;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
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
  }
};
</script>
<style>
.table-spacing tr {
  margin-bottom: 10px!important;
}
.additional-product-items{
  border-image: linear-gradient(to right, #892118, #ff6800) 1;
  border-image-slice: 1;
  padding-left: 0;
}

div.vjs-poster{
  border: 10px solid white;
  border-radius: 0!important;
}
.table-bordered{
  border: 0px solid #dee2e6;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  position: relative;
  //max-width: 40%;
}

.modal-image-container {
  text-align: center;
}

.modal-image {
  display: inline-block;
  max-width: 100%;
  max-height: 100%;
}

.close-btn {
  position: fixed;
  top: 5px;
  right: 5px;
  font-size: 20px;
  color: #fff;
  padding: 5px;
  border-radius: 50%;
  cursor: pointer;
}



</style>
