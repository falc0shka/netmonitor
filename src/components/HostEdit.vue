<script setup>

import { ref, reactive, computed, defineAsyncComponent, onMounted, watch, provide, readonly, inject} from 'vue'

/**
 * Props and Emits
 */

const props = defineProps({
  'id': {
    type: String,
    required: true
  },
  'testProp': {
    type: String
  }
});

const emit = defineEmits([

]);

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
  Host Edit Page
  {{$route.params.id}}
  {{id}}
  {{testProp}}
  <div>
    <button @click="$router.back()">Go back</button>
  </div>
</template>


<style scoped>

</style>

