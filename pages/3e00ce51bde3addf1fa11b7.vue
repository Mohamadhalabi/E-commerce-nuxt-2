<template>
  <main class="vin-to-pin d-flex justify-content-center align-items-center">
    <div class="card custom-card p-4 text-white shadow position-relative" style="width: 100%; max-width: 400px;">
      
      <!-- 🔄 Loading Overlay -->
      <div v-if="isLoading" class="loading-overlay d-flex justify-content-center align-items-center">
        <div class="spinner-border text-light" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <h3 class="text-center text-white mb-3">KIA / HYUNDAI Part Number</h3>

      <form @submit.prevent="handleSubmit">
        <!-- VIN -->
        <div class="mb-2">
          <div class="alert alert-danger" v-if="showVinError" role="alert">
            VIN must be exactly 17 characters.
          </div>
          <input
            type="text"
            v-model="vin"
            @input="formatVin"
            maxlength="17"
            class="form-control large-input"
            placeholder="VIN Number"
          />
        </div>

        <!-- Username -->
        <div class="mb-2">
          <input
            type="password"
            v-model="username"
            class="form-control large-input"
            placeholder="Enter Username"
            required
          />
        </div>

        <!-- Part Number Result -->
        <div class="mb-2">
          <input
            type="text"
            v-model="pinCode"
            class="form-control large-input"
            placeholder="Part Number"
            readonly
          />
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="alert alert-danger" role="alert">
          {{ errorMessage }}
        </div>

        <!-- Limit Info -->
        <div v-if="requestsLeft !== null || subscriptionEnds !== null" class="text-white text-sm mb-3">
          <div v-if="requestsLeft !== null">
            <strong>Queries left today:</strong> {{ requestsLeft }} / 5
          </div>
          <div v-if="subscriptionEnds">
            <strong>Subscription ends:</strong> {{ subscriptionEnds }}
          </div>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn get-button w-100 large-button" :disabled="isLoading">
          <span v-if="isLoading">
            <i class="fa fa-spinner fa-spin"></i> Loading...
          </span>
          <span v-else>Get</span>
        </button>
      </form>
    </div>
  </main>
</template>

<script>
import axios from 'axios'

export default {
  layout: 'pincode_layout',

  data() {
    return {
      vin: '',
      username: '',
      keyCode: '',
      pinCode: '',
      showVinError: false,
      isLoading: false,
      requestsLeft: null,
      subscriptionEnds: null,
      errorMessage: null
    }
  },

  mounted() {
    const savedUsername = this.getCookie('username')
    if (savedUsername) {
      this.username = savedUsername
    }
  },

  watch: {
    vin(newVal) {
      if (newVal.length === 17) {
        this.showVinError = false
      }
    }
  },

  methods: {
    formatVin() {
      this.vin = this.vin.replace(/o/gi, '0').toUpperCase().slice(0, 17)
    },

    async handleSubmit() {
      if (this.vin.length !== 17) {
        this.showVinError = true
        return
      }
      this.showVinError = false
      this.errorMessage = null

      this.setCookie('username', this.username, 0.5)

      this.isLoading = true
      this.pinCode = ''
      this.requestsLeft = null
      this.subscriptionEnds = null

      try {
        const response = await axios.post(
          "/vin-to-part-number",
          {
            username: this.username,
            vin: this.vin
          },
          {
            baseURL: process.env.API_BASE_URL,
            headers: {
              'Accept-Language': this.$i18n.locale,
              'Content-Type': 'application/json',
              'currency': this.$cookies.get('currency') || 'USD',
              'Accept': 'application/json',
              'secret-key': process.env.SECRET_KEY,
              'api-key': process.env.API_KEY,
            },
          }
        )

        this.pinCode = response.data.partno || ''
        this.requestsLeft = response.data.requests_left
        this.subscriptionEnds = response.data.subscription_ends
      } catch (error) {
        console.error("Error fetching VIN to PIN:", error)
        this.errorMessage = error.response?.data?.error || "There was an error sending your request."
      } finally {
        this.isLoading = false
      }
    },

    setCookie(name, value, days) {
      let expires = ''
      if (days) {
        const date = new Date()
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
        expires = '; expires=' + date.toUTCString()
      }
      document.cookie = name + '=' + (value || '') + expires + '; path=/'
    },

    getCookie(name) {
      const nameEQ = name + '='
      const ca = document.cookie.split(';')
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) === ' ') c = c.substring(1, c.length)
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
      }
      return null
    },
  }
}
</script>

<style scoped>
.vin-to-pin {
  min-height: 100vh;
  background-color: black;
  padding: 20px;
}

.get-button {
  background-color: green;
  color: white;
}

.custom-card {
  background-color: #1c1c1c;
  border-radius: 15px;
  position: relative;
}

/* Bigger inputs */
.large-input {
  height: 50px;
  font-size: 1.1rem;
  padding: 0 15px;
}

/* Bigger button */
.large-button {
  height: 50px;
  font-size: 1.1rem;
}

.alert {
  border-radius: 10px;
  margin-bottom: 15px;
  padding: 0.8rem;
}

/* 🔄 Loading overlay styles */
.loading-overlay {
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  border-radius: 15px;
}
</style>
