<script setup>
import { defineComponent, ref, onMounted } from 'vue';
</script>

<template>
  <section class="login-background"></section>
  <section class="overlay"></section>

  <router-view />
</template>

<style scoped lang="scss">
.login-background {
  background: url('../assets/img/01.jpg');
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.overlay {
  background: linear-gradient(to top right, #b9b9b9, #000000);
  opacity: 0.6;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
