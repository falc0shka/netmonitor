<script setup>

import { ref, provide, readonly, defineAsyncComponent } from 'vue'
import LoadingComponent from '../components/tech/LoadingComponent.vue'
import ErrorComponent from '../components/tech/ErrorComponent.vue'

import Services from '../components/ServicesComponent.vue'

import { useCounterStore } from '../stores/CounterStore'


/**
 * Props and Emits
 */

 const props = defineProps([

]);

const emit = defineEmits([

]);


/**
 * Refs and variables
 */
let temp = new Date()
temp.setHours(temp.getHours()-2)
const lastUpdateTime = ref(temp)

const testMesssage = ref('it\'s "provide"-feature testing!')

/**
 * Remote data fetching
 */


/**
 * Watchers
 */


/**
 * Methods
 */


/**
 * Lifecycle
 */


/**
 * Todo module loader
 */

const TodoAsyncComp = defineAsyncComponent({
  loader: async () => {
    try {
      await new Promise(resolve => {
        setTimeout(resolve, 2000);
      });
      return await import('../components/TodoComponent.vue');
    } catch (e) {console.log(e)}
  },
  loadingComponent: LoadingComponent,
  delay: 200,
  errorComponent: ErrorComponent,
  timeout: 10000
})


/**
 * Feature testing
 */


 provide('test', readonly(testMesssage));


</script>

<template>
  <h1>Dashboard</h1>

  <div class="row">
      <div class="col">
        <!-- Current status -->
        <div class="current-status">
          <h2>Current status  <span>GOOD</span></h2>
          <h3>Last update from server</h3>
          {{lastUpdateTime.toLocaleString('ru-RU')}}
          <h3>Alerts count</h3>
          <h3>Device count</h3>
        </div>
      </div>
      <div style="position: relative;" class="col">  
        <!-- Toto module -->
        <TodoAsyncComp />
      </div>
    </div>

    <div class="row">
      <div class="col">
        .col
      </div>
      <div class="col">
        <!-- Services module -->
        <Services />
      </div>
    </div>
</template>

<style scoped lang="scss">
.row > div {
  padding: 10px 15px;
  background: rgba(86,61,124,.15);
  border: 1px solid rgba(86,61,124,.2);
}
.row + .row {
  margin-top: 1rem;
}
</style>
