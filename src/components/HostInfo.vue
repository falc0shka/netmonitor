<script setup>

import { ref, reactive, computed, defineAsyncComponent, onMounted, watch, provide, readonly, inject} from 'vue'

/**
 * Props and Emits
 */

const props = defineProps(
{
  hostItem: {
    type: Object,
    required: true
  }
}
);

const emit = defineEmits([

]);

/**
 * Refs and variables
 */


/**
 * Remote data fetching
 */


/**
 * Methods
 */


/**
 * Watchers
 */


/**
 * Lifecycle
 */


/**
 * Feature testing
 */
  
  
</script>


<template>
  FQDN: {{hostItem.hostFqdn}} IP: {{hostItem.hostIp}}
</template>


<style scoped>

</style>