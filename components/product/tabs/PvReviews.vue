<template>
  <div>
    <div
      v-if="ratings.length > 0"
      key="noReviews"
      class="product-reviews-content"
    >
      <div class="container">
        <div
          v-for="(item, index) in ratings"
          :key="`reviews-${index}`"
          class=""
        >
          <div class="row mb-2">
            <div
              class="col-sm-12 col-12 py-2 px-4 rounded-5"
              style="background-color: rgb(225, 225, 225)"
            >
              <h5 class="m-0 z-100">
                {{item.user_name}}
              </h5>
              <p class="m-0 z-100">
                {{item.comment}}.
              </p>
              <div class="ratings-container z-100 m-0">
                <div class="product-ratings ">
                  <span
                    class="ratings"
                    :style="$options.filters.ratingFormat(item.rating , true)"
                    :class="getIsAr ? 'end-0' : ''"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="divider" />
    </div>
    <div class="add-product-review">
      <h3
        v-if="ratings.length == 0"
        class="review-title"
      >
        {{$t("review.firstReview")}}: “{{product.title}}”
      </h3>

      <div class="form-group position-relative">
        <div class="d-flex align-items-center justify-content-between">
          <label>
            {{$t("review.your_review")}}
            <span class="required">*</span>
          </label>

          <div class="rating-form">
            <label for="rating">
              {{$t("review.YourRating")}}
              <span class="required">*</span>
            </label>
            <span class="rating-stars">
              <a
                v-for="number in [1, 2, 3, 4, 5]"
                :key="`rating${number}`"
                href="javascript:;"
                :class="`star-${number}`"
                @click="setRating($event, number)"
              />
            </span>

            <select
              id="rating"
              v-model="dataForm.rating"
              name="rating"
              required
              style="display: none"
            >
              <option value>
                {{$t("review.rate")}}
              </option>
              <option value="5">
                {{$t("review.perfect")}}
              </option>
              <option value="4">
                {{$t("review.good")}}
              </option>
              <option value="3">
                {{$t("review.average")}}
              </option>
              <option value="2">
                {{$t("review.NotBad")}}
              </option>
              <option value="1">
                Very poor
              </option>
            </select>
          </div>
        </div>


        <b-form-textarea
          id="textarea-auto-height"
          v-model="dataForm.comment"
          no-resize
          class="m-0"
          :placeholder="$t('review.writeYourReview')"
        ></b-form-textarea>

        <base-button-icon-1
          style="position: relative!important;"
          :outline="true"
          class="position-absolute m-4 p-3 rounded-circle"
          @click="sendRating"
        >
          <span><svg
            xmlns="http://www.w3.org/2000/svg"
            height="30"
            viewBox="0 96 960 960"
            width="30"
            fill="#ff6800"
          >
            <path
              d="M120 896V256l760 320-760 320Zm60-93 544-227-544-230v168l242 62-242 60v167Zm0 0V346v457Z"
            />
          </svg>
          </span>
        </base-button-icon-1>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import BaseButtonIcon1 from '~/components/common/BaseButtonIcon1.vue';
import Api from '~/api';

export default {
  components: {
    BaseButtonIcon1
  },

  props: {
    product: Object
  },

  data() {
    return {
      ratings: [],
      dataForm: {
        rating: '',
        comment: '',
        product_slug: this.product.slug
      }
    };
  },

  created() {
    this.getRating();
  },

  computed: {
    ...mapGetters('rtlStore', ['getIsAr'])
  },

  methods: {
    getRating() {
      Api.get(`/products/review?product_slug=${this.$route.params.slug}`)
        .then((response) => {
          this.ratings = response.data.result;
        })
        .catch((error) => {
          this.$notify({
            group: 'errorMessage',
            type: 'success',
            text: error.response.data.message
          });
        });
    },
    setRating: function(e, number) {
      this.dataForm.rating = number;
      if(e.currentTarget.parentNode.querySelector('.active'))
        e.currentTarget.parentNode
          .querySelector('.active')
          .classList.remove('active');
      e.currentTarget.classList.add('active');
    },
    sendRating() {
      /* checling if the reating & comment is empty or n not */
      if(this.dataForm.rating == '' || this.dataForm.comment == '') {
        this.$notify({
          group: 'custom-notify',
          type: 'error',
          text: 'reating and comment is required'
        });
      } else {
        Api.post('/products/review/create', this.dataForm)
          .then((response) => {
            (this.dataForm.comment = null),
            (this.dataForm.rating = null),
            this.$notify({
              group: 'custom-notify',
              type: 'success',
              text: response.data.message
            });
          })
          .catch((error) => {
            this.$notify({
              group: 'errorMessage',
              type: 'error',
              text: error.response.data.message
            });
          });
      }
    }
  }
};
</script> 
