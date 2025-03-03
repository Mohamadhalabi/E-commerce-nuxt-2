<template>
  <div>
    <!-- Display the main image and open the modal on click -->
    <nuxt-img
      :src="image[currentIndex]['l'].url"
      :width="image[currentIndex]['l'].width"
      :height="image[currentIndex]['l'].height"
      class="rounded-5 w-100"
      :alt="image[currentIndex]['l'].alt"
      style="border: 1px solid #e7e7e6!important; cursor: pointer;"
      @click="showImageModal"
      format="webp"
      sizes="sm:100vw md:50vw lg:600px"
      width="500"
      height="500"
      loading="lazy"
    />

    <!-- Modal -->
    <div class="modal" v-if="isModalVisible" @click.self="closeImageModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="position-relative">
            <!-- Left Button (Previous) -->
            <button
              type="button"
              class="position-absolute left-arrow btn-secondary"
              @click="prevImage"
              :disabled="currentIndex === 0"
            >
              <img src="/images/icons/left-arrow.svg" alt="Previous" width="40px" />
            </button>

            <!-- Main Image -->
            <div class="text-center">
              <nuxt-img
                :src="image[currentIndex]['l'].url"
                :width="image[currentIndex]['l'].width"
                :height="image[currentIndex]['l'].height"
                class="rounded-5"
                style="max-width:40vw!important;"
                :alt="image[currentIndex]['l'].alt"
              />
            </div> 

            <!-- Right Button (Next) -->
            <button
              type="button"
              class="position-absolute right-arrow btn-secondary"
              @click="nextImage"
              :disabled="currentIndex === image.length - 1"
            >
              <img src="/images/icons/right-arrow.svg" alt="Next" width="40px" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: Array, // Image array passed from parent
    currentIndex: {
      type: Number,
      default: 0, // Default to the first image
    },
    size: {
      type: String,
      default: 'l',
    },
  },
  data() {
    return {
      isModalVisible: false, // Control modal visibility
    };
  },
  methods: {
    showImageModal() {
      this.isModalVisible = true; // Open modal when the image is clicked
    },
    closeImageModal() {
      this.isModalVisible = false; // Close modal when the image in modal is clicked
    },
    prevImage() {
      if (this.currentIndex > 0) {
        this.currentIndex--; // Navigate to the previous image
      }
    },
    nextImage() {
      if (this.currentIndex < this.image.length - 1) {
        this.currentIndex++; // Navigate to the next image
      }
    },
  },
};
</script>

<style scoped>
/* Style for left button */
.left-arrow {
  top: 50%;
  left: -15vw; /* Move the button outside the image */
  transform: translateY(-50%);
  z-index: 1;
}

/* Style for right button */
.right-arrow {
  top: 50%;
  right: -15vw; /* Move the button outside the image */
  transform: translateY(-50%);
  z-index: 1;
}

.left-arrow, .right-arrow {
  border: none;
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
}

/* Ensure that the image is centered in the modal */
.text-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
