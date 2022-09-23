<script setup>

import { ref, provide, readonly, defineAsyncComponent } from 'vue'
import loadingComponent from './tech/LoadingComponent.vue'
import errorComponent from './tech/ErrorComponent.vue'

import Services from './Services.vue'

/**
 * Props and Emits
 */


/**
 * Refs and variables
 */
let temp = new Date();
temp.setHours(temp.getHours()-2);
const lastUpdateTime = ref(temp);

const testMesssage = ref('it\'s "provide"-feature testing!');

/**
 * Toto module loader
 */

const AsyncComp = defineAsyncComponent({
  loader: async () => {
    try {
      await new Promise(resolve => {
        setTimeout(resolve, 2000);
      });
      return await import('./Todo.vue');
    } catch (e) {console.log(e)}
  },
  loadingComponent: loadingComponent,
  delay: 200,
  errorComponent: errorComponent,
  timeout: 10000
})

/**
 * Feature testing
 */

 provide('test', readonly(testMesssage));


</script>

<template>
  <h1>Dashboard</h1>
  <!-- Hosts module -->
    <Hosts />
  <!-- Current status -->
  <div class="current-status">
      <h2>Current status  <span>GOOD</span></h2>
      <h3>Last update from server</h3>
      {{lastUpdateTime.toLocaleString('ru-RU')}}
      <h3>Alerts count</h3>
      <h3>Device count</h3>

  </div>
  <!-- Toto module -->
  <AsyncComp />
  <!-- Services module -->
  <Services />

</template>

<style scoped>

</style>
