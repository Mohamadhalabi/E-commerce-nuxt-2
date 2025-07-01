<template>
  <div>
    <!-- Serial input warning -->
    <div class="col-12">
      <ul class="text-danger fw-bold list-unstyled mb-2">
        <li>
          <i class="fa fa-exclamation-triangle me-1"></i>
          {{ $t("products.serial_number_is_required") }}
        </li>
        <li>
          <i class="fa fa-exclamation-triangle me-1"></i>
          {{ $t("products.after_receiving_payment") }}
        </li>
      </ul>
    </div>

    <!-- Serial input -->
    <div class="col-12">
      <label>{{ $t("products.serial_number") }}</label>
      <input
        type="text"
        v-model="newSerial"
        class="form-control border-warning"
        placeholder="Enter a serial number and press Enter"
        @input="checkInput"
      />
    </div>

    <!-- Added serial numbers -->
    <div class="mb-1 mt-1 d-flex flex-wrap gap-2">
      <span
        v-for="(sn, index) in serial_number"
        :key="index"
        class="badge bg-warning text-dark p-2 d-flex align-items-center"
      >
        {{ sn }}
        <i
          class="fa fa-times ms-2"
          style="cursor:pointer;"
          @click="removeSerial(index)"
          title="Remove"
        ></i>
      </span>
    </div>

    <!-- Quantity and Add to Cart -->
    <div class="row align-items-center mb-1">
      <div class="col-auto">
        <input
          :value="serial_number.length"
          class="form-control py-1 px-2"
          type="number"
          readonly
          style="width: 70px;"
        />
      </div>

      <div class="col-auto">
        <base-button-icon-1
          :disabled="!canAddToCart"
          @click="submitCart"
          :outline="true"
          class="p-2"
        >
          {{ $t("products.addCart") }}
        </base-button-icon-1>
      </div>
    </div>
  </div>
</template>


<script>
import { mapActions } from "vuex";
import BaseButtonIcon1 from '~/components/common/BaseButtonIcon1.vue';

export default {
  components: { BaseButtonIcon1 },
  props: {
    product: Object,
  },
  data() {
    return {
      serial_number: [],
      newSerial: '',
      canAddToCart: false,
    };
  },
  methods: {
    ...mapActions("shop", ["addToCart"]),

    submitCart() {
      this.addSerial(); // Add current serial if not empty
      this.handleAddToCart(); // Proceed with cart logic
    },
    addSerial() {
      const trimmed = this.newSerial.trim();
      if (trimmed && !this.serial_number.includes(trimmed)) {
        this.serial_number.push(trimmed);
      }
      this.newSerial = '';
      this.updateCartState();
    },

    removeSerial(index) {
      this.serial_number.splice(index, 1);
      this.updateCartState();
    },

    checkInput() {
      this.updateCartState();
    },

    updateCartState() {
      this.canAddToCart = this.newSerial.trim().length > 0 || this.serial_number.length > 0;
    },

    handleAddToCart() {
      this.product.quantity = this.serial_number.length;
      this.product.serial_number = [...this.serial_number];
      this.addToCart(this.product);
      this.canAddToCart = false;
    },
  },
};
</script>
<style scoped>
input[type="number"] {
  height: 32px !important;
}
</style>
