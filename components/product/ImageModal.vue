<template>
  <div>
    <b-modal v-model="showModal" hide-footer hide-header>
      <img :src="imageUrl" alt="Modal Image">
      <div>
        <button
          title="Close (Esc)"
          type="button"
          class="close-image-modal"
          @click="closeModal"
          style=""
        >
          ×
        </button>
      </div>
    </b-modal>
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

<style scoped>
.close-image-modal{

  position: fixed!important;
  top: 0!important;
  background: transparent;
  color: white;
  font-size: 40px;
  right: 0;
  border: 0;
}
</style>
