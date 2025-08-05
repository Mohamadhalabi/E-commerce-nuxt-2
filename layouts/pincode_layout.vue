<template>
  <div class="private-layout">
    <main>
      <nuxt />
    </main>
  </div>
</template>

<script>
export default {
  name: 'PincodeLayout'
}
</script>

<style scoped>
.private-layout {
  background-color: black;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>