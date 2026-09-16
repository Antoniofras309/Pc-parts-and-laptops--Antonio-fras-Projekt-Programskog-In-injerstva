<template>
  <TheNavbar />
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar.vue';

export default {
  name: 'App',
  components: {
      TheNavbar,
  },
};
</script>