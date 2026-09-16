<!-- Home.vue-->
<template>
  <div class="navigation-cards">
    <h2>Izaberite kategoriju:</h2>
    
    <!-- Link za PC komponente -->
    <router-link :to="{ name: 'Shop', params: { category: 'pc-komponente' } }" class="card">
      <h3>PC Komponente</h3>
    </router-link>

    <!-- Link za Laptove -->
    <router-link :to="{ name: 'Shop', params: { category: 'laptopovi' } }" class="card">
      <h3>Laptopovi</h3>
    </router-link>
  </div>
</template>

<style scoped>
.btn { display: inline-block; padding: 10px 20px; background: blue; color: white; text-decoration: none; }
.categories a { margin-right: 15px; color: green; }
</style>

<script>
export default {};
</script>