<template>
    <div class="container">
      <div class="row my-5 py-4">
        <div class="col-md-8 mx-auto d-flex align-items-center flex-column">
            <div class="success-checkmark">
                <div class="check-icon">
                <span class="icon-line line-tip"></span>
                <span class="icon-line line-long"></span>
                <div class="icon-circlee"></div>
                <div class="icon-fix"></div>
                </div>
            </div>
          <!-- Display session details in a table -->
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Detail</th>
                <th scope="col">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="sessionDetails">
                <td><strong>Email:</strong></td>
                <td>{{ sessionDetails.customer_details.email }}</td>
              </tr>
              <tr v-if="sessionDetails">
                <td><strong>Payment Status:</strong></td>
                <td>{{ sessionDetails.payment_status }}</td>
              </tr>
              <tr v-if="sessionDetails">
                <td><strong>Amount Paid:</strong></td>
                <td>{{ formattedAmount }}</td>
              </tr>
              <tr v-if="sessionDetails">
                <td><strong>Created At:</strong></td>
                <td>{{ formattedCreatedDate }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    async asyncData({ query, app, error }) {
      const session_id = query.session_id || null;
      try {
        const { data } = await axios.get(`/stripe/session/${session_id}`, {
          baseURL: process.env.API_BASE_URL,
          headers: {
            'Accept-Language': app.i18n.locale,
            'Content-Type': 'application/json',
            'currency': app.$cookies.get('currency') || 'USD',
            'Accept': 'application/json',
            'secret-key': process.env.SECRET_KEY,
            'api-key': process.env.API_KEY,
          }
        });
  
        return {
          sessionDetails: data,
        };
      } catch (e) {
        // Trigger a 404 error if the API request fails
        error({ statusCode: 404, message: 'no session found' });
        return;
      }
    },
    data: function () {
      return {
        sessionDetails: null,
      };
    },
    computed: {
      // Format the amount from cents to USD
      formattedAmount() {
        if (this.sessionDetails && this.sessionDetails.amount_total) {
          return (this.sessionDetails.amount_total / 100).toFixed(2) + ' USD';
        }
        return 'N/A';
      },
      // Format the created date (Unix timestamp to human-readable format)
      formattedCreatedDate() {
        if (this.sessionDetails && this.sessionDetails.created) {
          const createdDate = new Date(this.sessionDetails.created * 1000); // Convert Unix timestamp to milliseconds
          return createdDate.toLocaleString(); // Format based on locale
        }
        return 'N/A';
      },
      // Format the expires_at date (Unix timestamp to human-readable format)
      formattedExpiresDate() {
        if (this.sessionDetails && this.sessionDetails.expires_at) {
          const expiresDate = new Date(this.sessionDetails.expires_at * 1000); // Convert Unix timestamp to milliseconds
          return expiresDate.toLocaleString(); // Format based on locale
        }
        return 'N/A';
      },
    }
  };
  </script>
<style scoped>
.success-checkmark {
  width: 80px;
  height: 115px;
  margin: 0 auto;
}
.success-checkmark .check-icon {
  width: 80px;
  height: 80px;
  position: relative;
  border-radius: 50%;
  box-sizing: content-box;
  border: 4px solid #4caf50;
}
.success-checkmark .check-icon::before {
  top: 3px;
  left: -2px;
  width: 30px;
  transform-origin: 100% 50%;
  border-radius: 100px 0 0 100px;
}
.success-checkmark .check-icon::after {
  top: 0;
  left: 30px;
  width: 60px;
  transform-origin: 0 50%;
  border-radius: 0 100px 100px 0;
  animation: rotate-circle 5.5s ease-in;
}
.success-checkmark .check-icon::before,
.success-checkmark .check-icon::after {
  content: "";
  height: 100px;
  position: absolute;
  background: #fff;
  transform: rotate(-45deg);
}
.success-checkmark .check-icon .icon-line {
  height: 5px;
  background-color: #4caf50;
  display: block;
  border-radius: 2px;
  position: absolute;
  z-index: 10;
}
.success-checkmark .check-icon .icon-line.line-tip {
  top: 46px;
  left: 14px;
  width: 25px;
  transform: rotate(45deg);
  animation: icon-line-tip 2s;
}
.success-checkmark .check-icon .icon-line.line-long {
  top: 38px;
  right: 8px;
  width: 47px;
  transform: rotate(-45deg);
  animation: icon-line-long 2s;
}
.success-checkmark .check-icon .icon-circlee {
  top: -4px;
  left: -4px;
  z-index: 10;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: absolute;
  box-sizing: content-box;
  border: 4px solid rgba(76, 175, 80, 0.5);
}
.success-checkmark .check-icon .icon-fix {
  top: 8px;
  width: 5px;
  left: 26px;
  z-index: 1;
  height: 85px;
  position: absolute;
  transform: rotate(-45deg);
  background-color: #fff;
}
@keyframes rotate-circle {
  0% {
    transform: rotate(-45deg);
  }
  5% {
    transform: rotate(-45deg);
  }
  12% {
    transform: rotate(-405deg);
  }
  100% {
    transform: rotate(-405deg);
  }
}
@keyframes icon-line-tip {
  0% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  54% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  70% {
    width: 50px;
    left: -8px;
    top: 37px;
  }
  84% {
    width: 17px;
    left: 21px;
    top: 48px;
  }
  100% {
    width: 25px;
    left: 14px;
    top: 45px;
  }
}
@keyframes icon-line-long {
  0% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  65% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  84% {
    width: 55px;
    right: 0px;
    top: 35px;
  }
  100% {
    width: 47px;
    right: 8px;
    top: 38px;
  }
}
</style>