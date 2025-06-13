<template>
  <table id="offerTable" class="table">
    <tbody class="text-center">
      <tr v-for="(offer, index) in product.offers" :key="index">
        <td class="text-left">
          <span v-if="offer.to === 10000">
            {{ $t("products.FROM") }} {{ offer.from }} & More {{ offer.from }}
          </span>
          <span v-else>
            {{ $t("products.FROM") }} {{ offer.from }} {{ $t("products.TO") }} {{ offer.to }}
          </span>
        </td>
        <td class="price-color-offer text-right">{{ offer.price.currency + offer.price.value }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    product: Object,
  },
};
</script>

<style scoped>
.rounded-10{
  border-radius: 10px !important;
}

#offerTable {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #dee2e6; /* outer border */
  font-size: 15px
}

#offerTable td,
#offerTable th {
  border-top: 1px solid #dee2e6;
  border-bottom: 1px solid #dee2e6;
  border-left: none;
  border-right: none;
  padding: 8px;
}

#offerTable tr:first-child td {
  border-top: none; /* optional: remove top border for first row */
}

#offerTable tr:last-child td {
  border-bottom: none; /* optional: remove bottom border for last row */
}

/* Apply left and right borders only to the first and last column */
#offerTable td:first-child,
#offerTable th:first-child {
  border-left: 1px solid #dee2e6;
}

#offerTable td:last-child,
#offerTable th:last-child {
  border-right: 1px solid #dee2e6;
}
.text-left{
  text-align: left;
}
.text-right{
  text-align: right;
}
</style>
