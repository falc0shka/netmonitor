<script setup>

import { ref, reactive, computed, inject} from 'vue'

/**
 * Props and Emits
 */

const props = defineProps([
  'todoId',
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
    return props.todoItemStatus
  },
  set(todoItemStatus) {
    emit('todoItemChangeStatus', todoItemStatus)
  }
})

/**
 * Feature testing
 */
const test = inject('test');

</script>

<template>
  <li :class="{ 'action-done': todoItemStatus}">
    <input type="checkbox" 
      v-model="todoItemStatus"
      />
      {{ todoItemText }} <button @click="$emit('todoItemRemove')">Remove</button>
  </li>
  <!-- <slot></slot> -->
</template>

<style scoped>
li.action-done {
  text-decoration: line-through;
}
</style>