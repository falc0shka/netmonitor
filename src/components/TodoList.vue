<script setup>
  import TodoItem from './TodoItem.vue'

  import { ref, reactive, computed} from 'vue'

  const state = reactive({ count: 0 })

  function increment() {
    state.count++
  }

  const myObject = reactive(
  [
    {
      id: 1,
      action: 'Buy bread'
    },
    {
      id: 2,
      action: 'Buy coke'
    },
    {
      id: 3,
      action: 'Buy cheese'
    }
  ]
  )

</script>

<template>
  <div>
    <h2>ToDo List module</h2>
    <button @click="increment">{{ state.count }}</button>
    <ul>
      <li  v-for="(value, key) of myObject" :key="value.id">{{value.id}}: {{value.action}}</li>
      <TodoItem />
    </ul>
  </div>
</template>