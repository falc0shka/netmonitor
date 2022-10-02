<script setup>

import { ref, reactive, computed, defineAsyncComponent, onMounted, watch, provide, readonly, inject} from 'vue'
import { useHostsStore } from '../stores/HostsStore'

/**
 * Props and Emits
 */

const props = defineProps({
  'id': {
    type: String,
    required: true
  }
});

const emit = defineEmits([

]);

/**
 * State
 */

const hostsStore = useHostsStore()
hostsStore.getById(props.id)
const hostItem = hostsStore.host


/**
 * Refs and variables
 */


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
 * Feature testing
 */
  

</script>


<template>
  <h1>{{hostItem.hostName}} edit page</h1>
  <div>
    <button @click="$router.back()">Go back</button>
    <button @click="$router.back()">Go back</button>
  </div>
</template>


<style scoped>

</style>

