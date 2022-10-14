<script setup>

import { ref, reactive, computed, inject} from 'vue'

/**
 * Props and Emits
 */

const props = defineProps([
  'id',
  'todoItemText',
  'todoItemStatus'
]);

const emit = defineEmits([
  'todoItemRemove',
  'todoItemChangeStatus'  
]);

/**
 * Refs and variables
 */

const todoItemStatus = computed({
  get() {
    return props.todoItemStatus === true
  },
  set(todoItemStatus) {
    emit('todoItemChangeStatus', props.id, todoItemStatus)
  }
})

/**
 * Feature testing
 */
const test = inject('test');

</script>

<template>
  <div>
    <q-checkbox v-model="todoItemStatus" />
    <span 
      :class="{ 'action-done': todoItemStatus}">
      {{ todoItemText }}
    </span>
    <q-btn
      
      flat
      class="q-ml-sm q-pa-sm bg-negative text-white"
      @click="$emit('todoItemRemove', props.id)"
      label="Remove"
    />
  </div>
  <!-- <slot></slot> -->
</template>

<style scoped>
.action-done {
  text-decoration: line-through;
}
</style>