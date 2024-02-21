<template>
  <div class="d-flex attributes-table">
    <div
      class="pr-2 pl-2 w-100"
      :style="{
        width: '100%'
      }"
      v-for="(group, index) in groupedAttributeNames"
      :key="index"
    >
      <table class="table table-striped table-bordered">
        <tbody>
        <tr v-for="attributeName in group" :key="attributeName">
          <th style="width: 50%;background-color: #f9f9f9">{{ attributeName }}</th>
          <td style="background-color: #ffffff">
              <span
                v-for="(attributeValue, j) in product.attributes[attributeName]"
                :key="j"
              >
                {{ attributeValue + (j === product.attributes[attributeName].length - 1 ? '' : ', ') }}
              </span>
            <span v-if="attributeName == 'weight'">
              {{product.weight}} KG
            </span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    product: Object,
  },
  data() {
    return {
      screenWidth: window.innerWidth,
    };
  },
  computed: {
    attributeNames() {
      return Object.keys(this.product.attributes);
    },
    groupSize() {
      let count = this.attributeNames.length / 2;
      return this.screenWidth <= 767 ? 12 : Math.ceil(count);
    },
    groupedAttributeNames() {
      const result = [];
      if (this.attributeNames.length > 0) {
        for (let i = 0; i < this.attributeNames.length; i += this.groupSize) {
          result.push(this.attributeNames.slice(i, i + this.groupSize));
        }
        // Check if there are groups in the result
        if (result.length > 0) {
          if (result[1] && result[1].length) {
            let FirstTable = result[0].length;
            let SecondTable = result[1].length;
            if (FirstTable - SecondTable === 1) {
              result[1].push("weight");
            } else {
              result[0].push("weight");
            }
          } else {
            result[0].push("weight");
          }
        }
      } else {
        result[0] = ["weight"];
      }
      return result;
    },
  },
  watch: {
    screenWidth() {
      // Update groupedAttributeNames when the screen width changes
      this.updateGroupedAttributeNames();
    },
  },
  methods: {
    updateGroupedAttributeNames() {
      const result = [];
      if(this.attributeNames.length > 0) {
        for (let i = 0; i < this.attributeNames.length; i += this.groupSize) {
          result.push(this.attributeNames.slice(i, i + this.groupSize));
        }
      }
      return result;
    },
    updateScreenWidth() {
      // Update the screen width when the window is resized
      this.screenWidth = window.innerWidth;
    },
  },
  mounted() {
    // Add a listener to update the screen width when the window is resized
    window.addEventListener('resize', this.updateScreenWidth);
  },
  beforeDestroy() {
    // Remove the resize listener when the component is destroyed
    window.removeEventListener('resize', this.updateScreenWidth);
  },
};
</script>
<style>
.attributes-table{
  margin-top: -15px;
}
</style>
