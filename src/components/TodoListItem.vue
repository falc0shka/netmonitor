<script setup>

  import { ref, reactive, computed} from 'vue'

  defineProps([
    'todoAction',
    'todoItemStatus'])
  
  const emit = defineEmits([
    'todoRemoveItem',
    'todoItemChecked',
    'todoItemUnchecked'  
  ])
//event.target.checked
  function todoItemChangeStatus (event, todoItemStatus) {
    if (todoItemStatus) emit('todoItemChecked')
    else emit('todoItemUnchecked')
    console.log(todoItemStatus);
  }

</script>

<template>
  <li :class="{ 'action-done': todoItemStatus}">
    <input type="checkbox" 
      v-model="todoItemStatus"
      @change="todoItemChangeStatus($event, todoItemStatus)">
      {{ todoAction }} <button @click="$emit('todoRemoveItem')">Remove</button>
  </li>
</template>

<style scoped>
li.action-done {
  text-decoration: line-through;
}
</style>