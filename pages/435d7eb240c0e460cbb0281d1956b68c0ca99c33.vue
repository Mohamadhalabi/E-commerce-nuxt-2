<template>
  <main class="vin-to-pin d-flex justify-content-center align-items-center">
    <div class="card custom-card p-4 text-white shadow" style="width: 100%; max-width: 400px;">      
      <h3 class="text-center text-white mb-3">KIA / HYUNDAI VIN TO PIN</h3>

      <!-- Bootstrap Alert for errors -->
      <div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
        {{ errorMessage }}
      </div>

      <!-- Loading screen -->
      <div v-if="loading" class="loading-overlay">
        <div class="spinner-border text-light" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

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

        <!-- Key Code -->
        <div class="mb-2">
          <input type="text" v-model="keyCode" class="form-control large-input" placeholder="Key Code" readonly />
        </div>

        <!-- Pin Code -->
        <div class="mb-2">
          <input type="text" v-model="pinCode" class="form-control large-input" placeholder="Pin Code" readonly />
        </div>

        <!-- Submit Button (Get) -->
        <button type="submit" class="btn get-button w-100 large-button" :disabled="disabled">
          <span v-if="loading">Loading...</span>
          <span v-else>Get</span>
        </button>
      </form>

      <!-- Display requests_today and requests_this_month -->
      <div v-if="requestsToday !== undefined && requestsThisMonth !== undefined">
        <div class="mt-3 text-white">
          <p>Requested codes today:: {{ requestsToday }}</p>
          <p>Requests codes this month: {{ requestsThisMonth }}</p>
        </div>
      </div>

      <!-- Copy button that triggers copyToClipboard method -->
      <div v-if="keyCode && pinCode && !loading">
        <button
          type="button"
          class="btn btn-success w-100 mt-3"
          @click="copyToClipboard"
        >
          Copy VIN, Key Code, and Pin Code
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  layout: "pincode_layout",

  data() {
    return {
      vin: "",
      username: "",
      keyCode: "",
      pinCode: "",
      showVinError: false,
      loading: false, // Loading state
      errorMessage: "", // Error message for Bootstrap alert
      requestsToday: undefined, // Track today's requests count
      requestsThisMonth: undefined, // Track this month's requests count
      disabled: false,
    };
  },

  mounted() {
    const savedUsername = this.getCookie("username");
    if (savedUsername) {
      this.username = savedUsername;
    }
  },

  watch: {
    vin(newVal) {
      // Remove alert automatically if VIN reaches exactly 17 chars
      if (newVal.length === 17) {
        this.showVinError = false;
      }
    },
  },

  methods: {
    formatVin() {
      this.vin = this.vin.replace(/o/gi, "0").toUpperCase().slice(0, 17);
    },

    async handleSubmit() {
      // VIN validation
      if (this.vin.length !== 17) {
        this.showVinError = true;
        return;
      }
      this.showVinError = false;

      // Save username for 12 hours
      this.setCookie("username", this.username, 0.5);

      this.loading = true; // Start loading
      this.disabled = true;

      try {
        const response = await axios.post(
          "vin-to-pin-old", // endpoint relative to baseURL
          {
            username: this.username,
            vin: this.vin,
          },
          {
            baseURL: process.env.API_BASE_URL,
            headers: {
              "Accept-Language": this.$i18n.locale,
              "Content-Type": "application/json",
              currency: this.$cookies.get("currency") || "USD",
              Accept: "application/json",
              "secret-key": process.env.SECRET_KEY,
              "api-key": process.env.API_KEY,
            },
          }
        );

        console.log("API Response:", response.data);

        // Check if there's an error from the API response
        if (response.data.error) {
          // If the API response has an error message, display it
          this.errorMessage = response.data.error; // e.g., "Request limit exceeded for today"
          this.keyCode = ""; // Clear keyCode in case of error
          this.pinCode = ""; // Clear pinCode in case of error
        } else if (response.data.vin === "Not Correct Vin") {
          // If VIN is invalid, clear the values
          this.keyCode = "";
          this.pinCode = "";
          this.errorMessage = "Invalid VIN entered. Please try again."; // Display error message
        } else {
          // Set the keyCode and pinCode values to the response data
          this.keyCode = response.data.key_code || "";
          this.pinCode = response.data.pin_code || "";
          this.errorMessage = ""; // Clear any previous error message
        }

        // Ensure requests_today and requests_this_month are being handled correctly
        this.requestsToday = response.data.requests_today || 0;
        this.requestsThisMonth = response.data.requests_this_month || 0;
      } catch (error) {
        console.error("Error fetching VIN to Pin:", error);
        this.errorMessage = error.response ? error.response.data.error || "An error occurred. Please try again later." : "An error occurred. Please try again later."; // Display API or generic error
      } finally {
        this.loading = false; // End loading
      }
    },


    // Helper: set cookie (days can be fractional)
    setCookie(name, value, days) {
      let expires = "";
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
    },

    // Helper: get cookie
    getCookie(name) {
      const nameEQ = name + "=";
      const ca = document.cookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    },

    // Helper: erase cookie
    eraseCookie(name) {
      document.cookie = name + "=; Max-Age=-99999999; path=/";
    },

    // Helper: copy to clipboard
    copyToClipboard() {
      const textToCopy = `VIN: ${this.vin}\nKey Code: ${this.keyCode}\nPin Code: ${this.pinCode}`;
      navigator.clipboard.writeText(textToCopy).then(() => {
        alert("Copied to clipboard!");
      }).catch((err) => {
        console.error("Error copying to clipboard: ", err);
      });
    },
  },

  head() {
    return {
      title: "Vin To Pin",
      meta: [
        { hid: "robots", name: "robots", content: "noindex, noarchive, nofollow" },
        { hid: "googlebot", name: "googlebot", content: "noindex, noarchive, nofollow" },
      ],
    };
  },
};
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

.alert {
  border-radius: 10px;
  margin-bottom: 15px;
  padding: 0.8rem;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
