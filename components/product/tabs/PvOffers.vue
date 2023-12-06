<template >

   <table id="offerTable"  class="w-50 w-md-100 shadow rounded-10" >
      <thead>
        <tr >
          <th>{{ $t("products.FROM") }}</th>
          <th>{{ $t("products.TO") }}</th>
          <th >{{ $t("products.PRICE") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(offer, index) in product.offers" :key="index">
          <td>{{ offer.from }}</td>
          <td>{{ offer.to }}</td>
          <td>{{ offer.price.currency + offer.price.value }}</td>
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
   border-collapse: collapse;

  overflow: hidden;
}

#offerTable td{
  padding: 8px;
}

#offerTable tr:nth-child(even){background-color: #f2f2f2;}

#offerTable tr:hover {background-color: #ddd;}

#offerTable th {
  padding: 8px;
  text-align: left;
  background-color: #3e3e3e;
  color: white;
}
</style>
