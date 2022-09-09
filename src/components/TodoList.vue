<script setup>
  import TodoItem from './TodoItem.vue'

  import { reactive } from 'vue'

  const state = reactive({ count: 0 })

  function increment() {
    state.count++
  }


</script>

<template>
  <div>
    <h2>To Do List for Netmonitor</h2>
    <button @click="increment">
      {{ state.count }}
    </button>
    <ul>
      <TodoItem />
    </ul>
  </div>
</template>