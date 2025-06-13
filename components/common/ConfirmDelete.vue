<template>
<div class="card">
  <div class="card-header">
    {{ $t('common.areDelete') }}
  </div>
  <div class="card-body">
    <p class="mb-0" style="text-align: center">
      <base-button-icon-1 style="width: 90px" class="py-2 mx-2" @click="confirmDelete">
      {{ $t("common.delete") }}</base-button-icon-1>
      <base-button-icon-1
      class="py-2 mx-2"
      :outline="true"
      @click="hideDialog">
      {{ $t("common.cancel") }}</base-button-icon-1>
    </p>
  </div>
</div>
</template>
<script>
import Api from '~/api';
import BaseButtonIcon1 from './BaseButtonIcon1.vue';
export default {
  props: {
    api: {
      type: String,
      require: true
    }
  },
  components: {
    BaseButtonIcon1,
  },
  methods: {
    hideDialog() {
      this.$emit('close');
    },
    confirmDelete() {

      Api.post(this.api)
        .then(response => {
          this.$notify({
            group: 'custom-notify',
            type: 'success',
            text: response.data.message
          });
          this.$emit('close');
        })
        .catch(error => ({error: JSON.stringify(error)}));
    }
  }
};
</script>

<style scoprd>
.modal-dialog{
      max-width: 500px;
}
.modal-header{
    padding: 0 20px;
    height: 50px;
  }
.modal-content{
    border-radius: 10px !important;
  }
</style>
