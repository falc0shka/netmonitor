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
    <h2>Netmonitor module</h2>
    <button @click="increment">
      {{ state.count }}
    </button>
    <ul>
      <TodoItem />
    </ul>
  </div>
</template>