<template >
  <button  ontouchstart
    @click="handleClick"
    class="noselect"
    :disabled="disabled"
    :class="{ outline: outline, disaple: disabled }"
    :type="type"
  >
    <slot>

    </slot>
    <span class="innerText" :class="hasIcon ? 'text' : ''">{{
      innerText
    }}</span>
  </button>
</template>

<script>
export default {
  name: "BaseButtonIcon1",

  props: ["innerText", "icon", "outline", "disabled",'type'],

  computed: {
    hasIcon() {
      return this.icon;
    },
  },

  methods: {
    handleClick: function () {
      this.$emit("click");
    },
  },
};
</script>

<style scoped>
</style>
