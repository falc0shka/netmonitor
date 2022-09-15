<script setup>

  import { ref, reactive, computed} from 'vue'

  const props = defineProps([
    'todoItemText',
    'todoItemStatus']);
  
  const emit = defineEmits([
    'todoItemRemove',
    'todoItemChangeStatus'  
  ]);
  const todoItemStatus = computed({
    get() {
      return props.todoItemStatus
    },
    set(todoItemStatus) {
      emit('todoItemChangeStatus', todoItemStatus)
    }
  })
// @change="$emit('todoItemChangeStatus', todoItemStatus)">
</script>

<template>
  <li :class="{ 'action-done': todoItemStatus}">
    <input type="checkbox" 
      v-model="todoItemStatus"
      />
      {{ todoItemText }} <button @click="$emit('todoItemRemove')">Remove</button>
  </li>
</template>

<style scoped>
li.action-done {
  text-decoration: line-through;
}
</style>