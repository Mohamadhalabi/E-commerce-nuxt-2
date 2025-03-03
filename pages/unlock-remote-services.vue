<template>
  <div :class="{ 'text-right': getIsAr }">
    <Carousel class="rounded-5" :options="baseSlider6">
      <div v-for="(slide, index) in slides" :key="index" class="swiper-slide boxed-slide rounded-5">
        <img style="width: 100%" class="slide-bg ml-auto mr-auto" :src="slide.image" alt="banner" />
      </div>
    </Carousel>
    
    <div class="container mt-3">
      <div class="d-flex justify-content-sm-between">
        <h1 class="text-center unlock-service-title">{{ $t("services.unlockServices") }}</h1>
        <button type="button" class="border-0 bg-white" @click="downloadPDF">
          <img src="https://www.tlkeys.com/static/images/pdf-logo.png" class="pdf-logo mb-1" alt="PDF Button">
        </button>
      </div>
      
      <div class="input-group input-group-lg">
        <input v-model="searchTerm" type="text" class="form-control mb-1" placeholder="Type to Search" >
      </div>
      <vue-good-table
        :columns="columns"
        :rows="items"
        :pagination-options="{ enabled: true, perPage: perPage }"
        :search-options="{ enabled: true, externalQuery: searchTerm }"
        >
        <template v-slot:table-row="props">
          <span v-if="props.column.field === 'image'">
            <img :src="props.row.image" style="max-width: 100px;">
          </span>
          <span v-else-if="props.column.field ==='make'">
            <span>{{ props.row.make[$i18n.locale] }}</span>
          </span>
          <span v-else-if="props.column.field ==='model'">
            <span>{{ props.row.model[$i18n.locale] }}</span>
          </span>
          <span v-else-if="props.column.field ==='description'">
            <span>{{ props.row.description[$i18n.locale] }}</span>
          </span>
          <span v-else>
            {{ props.column.field === 'year' ? props.row.from + ' - ' + props.row.to : props.row[props.column.field] }}
          </span>
        </template>
      </vue-good-table>
    </div>
    <div class="container mt-lg-3">
      <div class="row">
        <div class="col-lg-6">
          <img src="/images/unlock-remote-services/unlocking-service-1.jpg" class="m-auto" width="80%" />
        </div>
        <div class="col-lg-6">
          <h3 class="h3-unlock-remote">{{ $t("services.toEnsure") }}</h3>
          <ul style="list-style-type: circle">
            <li class="unlock-service-list">
              {{ $t("services.chooseARep") }}
            </li>
            <li class="unlock-service-list">
              {{ $t("services.ensureSecure") }}
            </li>
            <li class="unlock-service-list">
              {{ $t("services.packItens") }}
            </li>
            <li class="unlock-service-list">
              {{ $t("services.useadequate") }}
            </li>
            <li class="unlock-service-list">
              {{ $t("services.ensureBattery")}}
            </li>
          </ul>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6 mt-auto mb-auto">
          <h3 class="h3-unlock-remote">{{ $t("services.regardingthe")}}</h3>
          <p class="unlock-remote-p">
            {{ $t("services.technolockkeys")}}
          </p>
          <p class="unlock-remote-p">
            {{ $t("services.askeysandremote")}}
          </p>
        </div>
        <div class="col-lg-6">
          <img src="/images/unlock-remote-services/unlocking-service-2.jpg" class="m-auto" width="80%" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from 'vue-ssr-carousel';
import { mapGetters } from "vuex";
import { VueGoodTable } from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css';

export default {
  components: { Carousel, VueGoodTable },
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
  },
  data() {
    return {
      searchTerm: '',
      perPage: 10,
      columns: [
        { label: "#", field: "id" },
        { label: "Image", field: "image", type: "image" },
        { label: "Make", field: "make" },
        { label: "Model", field: "model" },
        { label: "Description", field: "description" },
        { label: "From - To", field: "year" }
      ],
      items: []
    };
  },
  async asyncData({ $axios }) {
    try {
      const response = await $axios.get(`/unlock-remote`);
      return { items: response.data };
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    downloadPDF() {
      window.open('/pdf/Techno-lock-keys-unlock-service-list.pdf', '_blank');
    }
  }
};
</script>

<style>
.vgt-left-align{
  vertical-align: middle!important;
}
.unlock-service-title{
  font-size: 3.5rem;
}
</style>