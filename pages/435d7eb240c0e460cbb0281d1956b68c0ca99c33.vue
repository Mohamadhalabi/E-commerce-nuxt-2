<template>
  <main class="vin-to-pin d-flex justify-content-center align-items-center">
    <div class="stack">
      <h3 class="heading text-center">Vin Request</h3>

      <!-- Error -->
      <div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
        {{ errorMessage }}
      </div>

      <!-- Loading -->
      <div v-if="loading" class="loading-overlay">
        <div class="spinner-border text-light" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <!-- Counters -->
      <div v-if="requestsToday !== undefined && requestsThisMonth !== undefined" class="counters">
        <p>Today: {{ requestsToday }} | This Month: {{ requestsThisMonth }}</p>
      </div>

      <form @submit.prevent="handleSubmit" class="flex-col">
        <!-- VIN -->
        <div class="row-gap">
          <div class="alert alert-danger py-2 px-3 mb-2" v-if="showVinError" role="alert">
            VIN must be exactly 17 characters.
          </div>
          <input
            type="text"
            v-model="vin"
            @input="formatVin"
            maxlength="17"
            :class="['pill-input', 'vin-width', successState ? 'success-border' : '', greenTextState ? 'green-text' : '']"
            placeholder="VIN Number"
            autocomplete="off"
            required
          />
        </div>

        <!-- Username -->
        <div class="row-gap">
          <input
            type="password"
            v-model="username"
            :class="['pill-input', 'username-width', successState ? 'success-border' : '', greenTextState ? 'green-text' : '']"
            placeholder="Enter Username"
            required
            autocomplete="new-password"
          />
        </div>

        <!-- Key Code -->
        <div class="row-gap">
          <input
            type="text"
            v-model="keyCode"
            :class="['pill-input', 'key-width', successState ? 'success-border' : '', greenTextState ? 'green-text' : '']"
            placeholder="Key Code"
            readonly
          />
        </div>

        <!-- Pin Code -->
        <div class="row-gap">
          <input
            type="text"
            v-model="pinCode"
            :class="['pill-input', 'pin-width', 'pin-accent', successState ? 'success-border' : '', greenTextState ? 'green-text' : '']"
            placeholder="Pin Code"
            readonly
          />
        </div>

        <!-- Actions: GET + COPY -->
        <div class="actions-row">
          <button type="submit" class="get-button" :disabled="disabled">
            <span v-if="loading">Loading...</span>
            <span v-else>GET</span>
          </button>

          <button
            v-if="keyCode && pinCode && !loading"
            type="button"
            class="copy-button"
            @click="copyToClipboard"
          >
            Copy
          </button>
        </div>
      </form>
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
      loading: false,
      errorMessage: "",
      requestsToday: undefined,
      requestsThisMonth: undefined,
      disabled: false,
      greenTextState: false, // ✅ NEW STATE
    };
  },
  computed: {
    successState() {
      return !!(this.keyCode && this.pinCode);
    },
  },
  mounted() {
    const savedUsername = this.getCookie("username");
    if (savedUsername) this.username = savedUsername;
  },
  watch: {
    vin(v) {
      if (v.length === 17) this.showVinError = false;
    },
  },
  methods: {
    formatVin() {
      this.vin = this.vin.replace(/o/gi, "0").toUpperCase().slice(0, 17);
    },

    async handleSubmit() {
      if (this.vin.length !== 17) {
        this.showVinError = true;
        return;
      }
      this.showVinError = false;
      this.setCookie("username", this.username, 0.5);
      this.loading = true;
      this.disabled = true;
      this.greenTextState = false; // reset

      try {
        const response = await axios.post(
          "vin-to-pin-old",
          { username: this.username, vin: this.vin },
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

        if (response.data.error) {
          this.errorMessage = response.data.error;
          this.keyCode = "";
          this.pinCode = "";
        } else if (response.data.vin === "Not Correct Vin") {
          this.keyCode = "";
          this.pinCode = "";
          this.errorMessage = "Invalid VIN entered. Please try again.";
        } else {
          this.keyCode = response.data.key_code || "";
          this.pinCode = response.data.pin_code || "";
          this.errorMessage = "";

          // ✅ Apply green text & border condition
          if (response.data.available_in_db && this.username === "4immo8110") {
            this.greenTextState = true;
          }
        }

        this.requestsToday = response.data.requests_today || 0;
        this.requestsThisMonth = response.data.requests_this_month || 0;
     } catch (e) {
        if (e.response && e.response.data) {
          // If Laravel validation error contains vin message
          if (e.response.data.errors && e.response.data.errors.vin) {
            this.errorMessage = e.response.data.errors.vin[0];
          }
          // If generic message exists
          else if (e.response.data.message) {
            this.errorMessage = e.response.data.message;
          }
          // Fallback
          else {
            this.errorMessage = "An error occurred. Please try again later.";
          }
        } else {
          this.errorMessage = "An error occurred. Please try again later.";
        }
        this.keyCode = "";
        this.pinCode = "";
      }finally {
        this.loading = false;
        this.disabled = false;
      }
    },

    setCookie(name, value, days) {
      let expires = "";
      if (days) {
        const d = new Date();
        d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + d.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
    },

    getCookie(name) {
      const nameEQ = name + "=";
      const ca = document.cookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
      }
      return null;
    },

    eraseCookie(name) {
      document.cookie = name + "=; Max-Age=-99999999; path=/";
    },

    copyToClipboard() {
      const text = `${this.vin}\n${this.keyCode}\n${this.pinCode}`;
      navigator.clipboard.writeText(text).then(
        () => alert("Copied to clipboard!"),
        (err) => console.error("Clipboard error:", err)
      );
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
/* Page */
.vin-to-pin {
  min-height: 100vh;
  background: #000;
  padding: 32px 16px;
}
.stack {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.heading {
  color: #e7e7e7;
  font-weight: 600;
  margin-bottom: 22px;
  letter-spacing: 0.3px;
}

/* Layout */
.flex-col { display: flex; flex-direction: column; align-items: center; }
.row-gap { margin: 22px 0; }

/* Inputs */
.pill-input {
  height: 64px;
  background: #1f1f1f;
  border: 2px solid #6b6b6b;
  color: #f2f2f2;
  border-radius: 14px;
  outline: none;
  text-align: center;
  font-size: 28px;
  line-height: 1;
  padding: 0 18px;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.04);
}
.pill-input::placeholder { color: #d9d9d9; opacity: 0.85; }
.pill-input:focus { border-color: #8a8a8a; }

/* ✅ Success border */
.success-border {
  border-color: #5fb99c !important;
  box-shadow: 0 0 0 2px rgba(0, 200, 83, 0.2);
}

/* ✅ Green text & border */
.green-text {
  color: #00ff00 !important;
  border-color: #00ff00 !important;
}

/* Widths */
.vin-width { width: 680px; max-width: 92vw; }
.username-width { width: 420px; max-width: 86vw; }
.key-width { width: 300px; max-width: 80vw; }
.pin-width { width: 360px; max-width: 84vw; }

/* Pin accent */
.pin-accent {
  border-color: #61c3a6;
  box-shadow: 0 0 0 2px rgba(97,195,166,0.15);
}

/* Actions row */
.actions-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-top: 34px;
  flex-wrap: wrap;
}

/* GET */
.get-button {
  width: 220px;
  height: 72px;
  background: #5fb99c;
  color: #ffffff;
  border: none;
  border-radius: 16px;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-size: 28px;
}
.get-button:disabled { opacity: 0.7; cursor: not-allowed; }

/* COPY */
.copy-button {
  height: 72px;
  padding: 0 20px;
  border-radius: 16px;
  border: 2px solid #5fb99c;
  background: #222;
  color: #e7fff6;
  font-weight: 700;
  letter-spacing: 0.3px;
}

/* Alerts + overlay */
.alert { border-radius: 10px; padding: 0.8rem; }
.loading-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.55);
  display: flex; justify-content: center; align-items: center;
  z-index: 10;
}

/* Mobile */
@media (max-width: 480px) {
  .pill-input { height: 58px; font-size: 22px; }
  .get-button, .copy-button { height: 64px; font-size: 18px; }
}
</style>
