<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="image-side">
        <img src="/promo-key-hand.jpg" alt="Promo Image" />
      </div>
      <div class="form-side">
        <div class="modal-header">
          <h5>Unlock $10 off<sup>*</sup></h5>
          <button class="close-btn" @click="$emit('close')">×</button>
        </div>
        <p class="subtitle">Signup for special offers and updates</p>
        <input
          type="email"
          v-model="email"
          placeholder="Enter your email address"
          class="form-control"
        />
        <div class="radio-group">
          <label>Are you a Locksmith?</label>
          <div>
            <label><input type="radio" v-model="isLocksmith" value="yes" /> Yes</label>
            <label><input type="radio" v-model="isLocksmith" value="no" /> No</label>
          </div>
        </div>
        <button class="unlock-btn" @click="unlockOffer">Unlock Offer</button>
        <p class="fine-print">*Minimum order value $149</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      isLocksmith: null,
    };
  },
  methods: {
    unlockOffer() {
      if (!this.email || this.isLocksmith === null) {
        alert("Please enter your email and select if you're a locksmith.");
        return;
      }
      // handle submission logic
      this.$emit('close');
      alert('Offer Unlocked!');
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  display: flex;
  flex-direction: row;
  background: white;
  width: 90%;
  max-width: 720px;
  border-radius: 8px;
  overflow: hidden;
}

.image-side {
  flex: 1;
  background: #f0f0f0;
}
.image-side img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.form-side {
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h5 {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}

.subtitle {
  margin: 10px 0;
  font-size: 14px;
}

.form-control {
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.radio-group {
  margin: 10px 0;
}

.radio-group label {
  font-weight: 600;
  margin-bottom: 5px;
  display: block;
}

.radio-group div {
  display: flex;
  gap: 20px;
  margin-top: 5px;
}

.unlock-btn {
  background-color: #e3342f;
  color: white;
  border: none;
  padding: 12px;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 12px;
  width: 100%;
}

.fine-print {
  font-size: 11px;
  color: #888;
  margin-top: 10px;
  text-align: center;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}
</style>
