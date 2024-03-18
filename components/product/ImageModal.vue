<template>
  <div>
    <b-modal v-model="showModal" hide-footer centered hide-header>
      <img :src="imageUrl" alt="Modal Image">
      <div>
      </div>
    </b-modal>
    <button
        v-if="this.showModal"
        title="Close (Esc)"
        type="button"
        class="close-image-modal"
        @click="closeModal"
    >
      X
    </button>
  </div>
</template>
<script>
export default {
  name: "ImageModal",
  props: {
    imageUrl: String
  },
  data() {
    return {
      showModal: false
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
    }
  }
};
</script>

<style>
.close-image-modal{
  position: fixed!important;
  top: 0!important;
  background: transparent;
  color: white;
  font-size: 25px;
  right: 0;
  border: 0;
  z-index: 10000
}
</style>
