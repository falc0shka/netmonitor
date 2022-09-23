<script setup>
import {  } from 'vue'



//const AsyncComp = defineAsyncComponent(()=>import('./components/Dashboard.vue'));

</script>

<template>
  <header>Netmonitor app v1.0.0</header>
  <nav>
    <ul>
      <li><router-link to="/">Dashboard</router-link></li>
      <li><router-link :to="{name: 'hosts'}">Hosts</router-link></li>
      <li><router-link to="/admin">Admin</router-link></li>
    </ul>
  </nav>
  <router-view />
  <!-- <HelloWorld msg="Hello world module"/> -->
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
