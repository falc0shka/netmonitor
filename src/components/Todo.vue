<script setup>

import { ref, reactive, computed, onMounted} from 'vue'
import TodoItem from './TodoItem.vue'


/**
 * Refs and variables
 */

const todoItemList = reactive([]);
const todoItemSelect = ref('all')
const todoItemInput = ref('')
const todoItemInputRef = ref(null)
let increment = 4;

/**
 * Remote data fetching
 */

setTimeout(() => {
  todoItemList.push(
  {
    todoId: 1,
    todoItemText: 'Buy bread',
    todoItemStatus: true
  },
  {
    todoId: 2,
    todoItemText: 'Buy coke',
    todoItemStatus: false
  },
  {
    todoId: 3,
    todoItemText: 'Buy cheese',
    todoItemStatus: true
  }
)
}, 2000)  


/**
 * Lifecycle
 */

onMounted(()=>todoItemInputRef.value.focus());

/**
 * Methods
 */

function todoAddItem() {
  if (todoItemInput.value) {
    todoItemList.push({
      id: increment++,
      todoItemText: todoItemInput.value,
      todoItemStatus: false
    })
    todoItemInput.value = '';
  }    
}

function todoItemChangeStatus(index,newStatus) {
  todoItemList[index].todoItemStatus = newStatus||false;
}

/**
 * Feature testing
 */


</script>

<template>
    <h2>ToDo List module</h2>
    <div><input ref="todoItemInputRef" type="text" v-model.lazy="todoItemInput" placeholder="Input task name" />
    <button @click="todoAddItem">Add task</button>
    </div>
    
    <!-- <label for="todoItemSelect">Show items ...</label> -->
    
      <select id="todoItemSelect" v-model="todoItemSelect">
        <option value="all">Show all</option>
        <option value="false">Only undone</option>
        <option value="true">Only done</option>
      </select>
    <ul>
      <li v-if="!todoItemList.length">No items to display.</li>
      <template v-for="(value, index) of todoItemList" :key="value.todoId">
        <todo-item v-if="value.todoItemStatus.toString()===todoItemSelect||todoItemSelect==='all'" 
          v-bind="value"
          @todo-item-change-status = "(todoItemStatus)=>todoItemChangeStatus(index,todoItemStatus)"
          @todo-item-remove="todoItemList.splice(index,1)"
        ></todo-item>
    </template>
    </ul>

</template>