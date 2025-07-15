<template>
  <main class="main">
    <nav aria-label="breadcrumb" class="breadcrumb-nav">
      <div class="container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <nuxt-link to="/">
              {{ $t("common.home") }}
            </nuxt-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ $t("common.dashboard") }}
          </li>
        </ol>
      </div>
    </nav>

    <div class="container">
      <h1 class="h1-download">{{ $t("header.downloads") }}</h1>
      <div class="row">
        <div
          v-for="(product, index) in downloads"
          :key="product.slug"
          class="col-lg-3 col-md-4 col-sm-6 col-6 mb-2 col-equal download"
        >
          <pv-card :product="product" />
        </div>
      </div>

      <div
        v-if="page < totalPages && !loading"
        v-observe-visibility="onVisible"
        class="text-center my-4"
      >
        <span class="text-muted"></span>
      </div>

      <div v-if="loading" class="text-center my-4">
        <span></span>
      </div>
    </div>
  </main>
</template>

<script>
import Api from "~/api";
import PvCard from "~/components/downloads/PvCard";
import { scrollTopHandler } from "~/utils";

export default {
  components: {
    PvCard,
  },

  data() {
    return {
      downloads: [],
      page: 1,
      totalPages: 1,
      loading: false,
      itemsPerPage: 12,
    };
  },

  async asyncData({ $axios, query, error }) {
    try {
      const page = query.page || 1;
      const res = await $axios.$get(`/downloads?page=${page}`);
      return {
        downloads: res.result,
        page: res.page,
        totalPages: res.total_pages,
      };
    } catch (err) {
      error({ statusCode: 500, message: 'Failed to load downloads' });
    }
  },

  methods: {
    async onVisible(isVisible) {
      if (!isVisible || this.loading || this.page >= this.totalPages) return;
      this.loading = true;
      try {
        const nextPage = this.page + 1;
        const res = await this.$axios.$get(`/downloads?page=${nextPage}`);
        this.downloads.push(...res.result);
        this.page = res.page;
        this.totalPages = res.total_pages;
      } catch (e) {
        console.error("Error loading more:", e);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
.selectPageClass a {
  background: #f07905 !important;
  color: #fff !important;
}
@media screen and (max-width: 575px) {
  .download {
    margin-left: auto;
    margin-right: auto;
  }
}
.h1-download {
  font-size: 36px;
  border-bottom: 2px solid;
  border-image: linear-gradient(to right, #892118, #ff6800) 1;
  border-image-slice: 1;
  padding-left: 0;
  width: fit-content;
}
</style>
