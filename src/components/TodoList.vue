<script setup>
  import TodoListItem from './TodoListItem.vue'

  import { ref, reactive, computed} from 'vue'

  const todoListItems = reactive([
    {
      id: 1,
      action: 'Buy bread',
      done: true
    },
    {
      id: 2,
      action: 'Buy coke',
      done: false
    },
    {
      id: 3,
      action: 'Buy cheese',
      done: true
    }
  ]
  )
  
  const addItemInput = ref('')
  let increment = 4;
  function todoListAddItem() {
    if (addItemInput.value) {
      todoListItems.push({
        id: increment++,
        action: addItemInput.value,
        done: false
      })
      addItemInput.value = '';
    }    
  }

  const todoItemSelect = ref('all')

</script>

<template>
    <h2>ToDo List module</h2>
    <!-- <button @click="increment">{{ state.count }}</button> -->
    <div><input type="text" v-model="addItemInput" placeholder="Input task name" />
    <button @click="todoListAddItem">Add task</button>
    </div>
    
    <!-- <label for="todoItemSelect">Show items ...</label> -->
    
      <select id="todoItemSelect" v-model="todoItemSelect">
        <option disabled value="">Выберите один из вариантов</option>
        <option value="all">Show all</option>
        <option value="false">Only undone</option>
        <option value="true">Only done</option>
      </select>
    
    <div>Selected: {{ todoItemSelect }}</div>

    <ul>
      <template v-for="(value, index) of todoListItems" :key="value.id">
        <todo-list-item v-if="value.done.toString()===todoItemSelect||todoItemSelect==='all'" 
          :todoAction="value.action"     
          :todoItemStatus = "value.done"
          @todoItemChecked = "value.done = true"
          @todoItemUnchecked = "value.done = false" 
          @todoRemoveItem="todoListItems.splice(index,1)"
        ></todo-list-item>
    </template>
    </ul>
</template>