<script setup>

import { ref, reactive, computed, onMounted, watchEffect} from 'vue'
import TodoItem from './TodoItem.vue'


/**
 * Refs and variables
 */

const STORAGE_KEY = 'netmonitor-todo'

const todoItemList = reactive(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));

const todoItemSelect = ref('all')
const todoItemInput = ref('')
const todoItemInputRef = ref(null)

let increment = todoItemList.length?todoItemList[todoItemList.length-1].id+1:1;

const todoItemFilteredList = computed (()=>{
  return todoItemList.filter(value=>value.todoItemStatus.toString()===todoItemSelect.value||todoItemSelect.value==='all')
})


/**
 * Remote data fetching
 */


/**
 * Watchers
 */

watchEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todoItemList))
})

/**
 * Lifecycle
 */

// onMounted(()=>todoItemInputRef.value.focus());

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

function todoItemChangeStatus(id,todoItemStatus) {
  todoItemList[todoItemList.findIndex((item)=>item.id===id)].todoItemStatus = todoItemStatus||false;
}

function todoRemoveItem(id) {
  console.log(todoItemList, id)
  todoItemList.splice(todoItemList.findIndex((item)=>item.id===id),1)
}

/**
 * Feature testing
 */


</script>

<template>
    
    <div class="todo-input">
      <q-input 
        filled
        ref="todoItemInputRef"
        v-model="todoItemInput"
        label="Input task"
        @keyup.enter="todoAddItem"
      />
      <q-btn color="primary" label="Add task" @click="todoAddItem" square />
    </div>
    
    <!-- <label for="todoItemSelect">Show items ...</label> -->
    <div class="q-pa-md">
      <div v-if="!todoItemFilteredList.length">No items to display.</div>
      <div v-for="(value) of todoItemFilteredList" :key="value.id">
        <todo-item
            v-bind="value"
            @todo-item-change-status = "(id,todoItemStatus)=>todoItemChangeStatus(id,todoItemStatus)"
            @todo-item-remove="(id)=>todoRemoveItem(id)"
        />
      </div>
    </div>
    <div class="todo-select">
      <q-btn-toggle
        v-model="todoItemSelect"
        glossy
        dense
        toggle-color="primary"
        :options="[
          {label: 'Show all', value: 'all'},
          {label: 'Only undone', value: 'false'},
          {label: 'Only done', value: 'true'}
        ]"
      />
    </div>
</template>

<style scoped lang="scss">

</style>