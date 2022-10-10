<script setup>

import { ref, provide, readonly, defineAsyncComponent, onMounted, onUnmounted, watch } from 'vue'
import LoadingComponent from '../components/tech/LoadingComponent.vue'
import ErrorComponent from '../components/tech/ErrorComponent.vue'

import Services from '../components/ServicesComponent.vue'

import { useHostsStore } from '../stores/HostsStore'
import { useServicesStore } from '../stores/ServicesStore'
import { useMainStore } from '../stores/MainStore'


/**
 * Props and Emits
 */

 const props = defineProps([

]);

const emit = defineEmits([

]);

/**
 * State
 */

const mainStore = useMainStore()

const hostsStore = useHostsStore()
console.log('Start getting hosts!')
hostsStore.getHosts()

/**
 * Refs and variables
 */

const testMesssage = ref('it\'s "provide"-feature testing!')

const autoUpdate = ref('ON')

const autoUpdateRef = ref(null)

/**
 * Remote data fetching
 */


/**
 * Watchers
 */

watch(autoUpdate, (newValue) => {
  if (newValue === 'OFF') {
    clearInterval(autoUpdateRef.value)
  }
  else {
    autoUpdateRef.value = setInterval(() => {
      hostsStore.getHosts()
    }, 10000)
  }
  console.log(`Auto-fetching data is ${newValue} now`)
})

/**
 * Methods
 */


/**
 * Lifecycle
 */
onMounted(()=> {
  console.log('Mounted!')
  autoUpdateRef.value = setInterval(() => {
    hostsStore.getHosts()
  }, 10000)
})
onUnmounted(()=>{
  clearInterval(autoUpdateRef.value)
  console.log('Unmounnted!')
})
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
  <h1 class="q-ma-sm">Dashboard</h1>

  <div class="fit row q-col-gutter-sm q-pa-sm">
    <div class="col-xs-12 col-sm-12 col-md-6">
      <!-- Current status -->
      <q-card class="my-content current-status">
        
        <h2 class="q-my-sm">
          Current status
          <q-icon name="check_circle" size="2em" color="positive" v-if="mainStore.mainStatus == true"/>
          <q-icon name="warning" size="2em" color="negative" v-else />
        </h2>
        <h3>Last update from server</h3>
        <p>{{mainStore.lastUpdate}}</p>
        <q-toggle
          false-value="OFF"
          :label="`Auto update is ${autoUpdate}`"
          true-value="ON"
          color="primary"
          v-model="autoUpdate"
        />
        <!-- <h3>Alerts count</h3>
        <h3>Device count</h3> -->
      </q-card>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-6">
      <q-card class="my-content">
        <!-- Services module -->
        <h2 class="q-my-sm">Services</h2>
        <Services />
      </q-card>
    </div>
  </div>
  <div class="fit row q-col-gutter-sm q-pa-sm">
    <div class="col-xs-12 col-sm-12 col-md-6">
      <q-card class="my-content">
        <h2 class="q-my-sm">Alerts</h2>
        <p>Under construction</p>
      </q-card>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-6" style="position: relative;">
      <q-card class="my-content">
        <!-- Toto module -->
        <h2 class="q-my-sm">ToDo List module</h2>
        <TodoAsyncComp />
      </q-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
// .row > div {
//   padding: 10px 15px;
//   background: rgba(86,61,124,.15);
//   border: 1px solid rgba(86,61,124,.2);
// }
// .row + .row {
//   margin-top: 1rem;
// }
.my-content {
  height: 100%;
  padding: 20px 20px;
}
</style>
