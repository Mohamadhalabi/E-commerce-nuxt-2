<template>
  <script type="application/ld+json">
    {{ JSON.stringify(schemaData) }}
  </script>
</template>

<script>
export default {
  name: 'SchemaOrg',
  props: {
    schemaData: {
      type: Object,
      required: true,
    },
  },
};
</script>
