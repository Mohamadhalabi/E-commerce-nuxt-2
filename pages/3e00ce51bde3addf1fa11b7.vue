<template>
  <main class="vin-to-pin d-flex justify-content-center align-items-center">
    <div class="card custom-card p-4 text-white shadow" style="width: 100%; max-width: 400px;">      
      <h3 class="text-center text-white mb-3">VIN TO PIN</h3>

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

        <!-- Username (password style) -->
        <div class="mb-2">
          <input
            type="password"
            v-model="username"
            class="form-control large-input"
            placeholder="Enter Username"
            required
          />
        </div>

        <!-- Pin Code -->
        <div class="mb-2">
          <input type="text" v-model="pinCode" class="form-control large-input" placeholder="Part Number" readonly />
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn get-button w-100 large-button">Get</button>
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
      // Remove alert automatically if VIN reaches exactly 17 chars
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
      // VIN validation
      if (this.vin.length !== 17) {
        this.showVinError = true
        return
      }
      this.showVinError = false

      // Save username for 12 hours
      this.setCookie('username', this.username, 0.5)

      try {
        const response = await axios.post(
          "vin-to-pin", // endpoint relative to baseURL
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

        console.log("API Response:", response.data)

        // If API returns keyCode & pinCode
        this.keyCode = response.data.keyCode || ''
        this.pinCode = response.data.pinCode || ''

      } catch (error) {
        console.error("Error fetching VIN to PIN:", error)
        alert("There was an error sending your request.")
      }
    },

    // Helper: set cookie (days can be fractional)
    setCookie(name, value, days) {
      let expires = ''
      if (days) {
        const date = new Date()
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
        expires = '; expires=' + date.toUTCString()
      }
      document.cookie = name + '=' + (value || '') + expires + '; path=/'
    },

    // Helper: get cookie
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

    // Helper: erase cookie
    eraseCookie(name) {
      document.cookie = name + '=; Max-Age=-99999999; path=/'
    }
  },

  head() {
    return {
      title: 'Vin To Pin',
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex, noarchive, nofollow' },
        { hid: 'googlebot', name: 'googlebot', content: 'noindex, noarchive, nofollow' }
      ]
    }
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

.alert{
    border-radius: 10px;
    margin-bottom: 15px;
    padding: 0.8rem;
}
</style>