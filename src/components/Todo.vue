<script setup>
  import TodoItem from './TodoItem.vue'

  import { ref, reactive, computed, onMounted} from 'vue'

  const todoItemList = reactive([
    {
      id: 1,
      todoItemText: 'Buy bread',
      todoItemStatus: true
    },
    {
      id: 2,
      todoItemText: 'Buy coke',
      todoItemStatus: false
    },
    {
      id: 3,
      todoItemText: 'Buy cheese',
      todoItemStatus: true
    }
  ]
  )

  const todoItemSelect = ref('all')
  const todoItemInput = ref('')
  const todoItemInputRef = ref(null)
  let increment = 4;
  
  onMounted(()=>todoItemInputRef.value.focus());

  function todoListAddItem() {
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

</script>

<template>
    <h2>ToDo List module</h2>
    <div><input ref="todoItemInputRef" type="text" v-model="todoItemInput" placeholder="Input task name" />
    <button @click="todoListAddItem">Add task</button>
    </div>
    
    <!-- <label for="todoItemSelect">Show items ...</label> -->
    
      <select id="todoItemSelect" v-model="todoItemSelect">
        <option value="all">Show all</option>
        <option value="false">Only undone</option>
        <option value="true">Only done</option>
      </select>
    <ul>
      <template v-for="(value, index) of todoItemList" :key="value.id">
        <todo-item v-if="value.todoItemStatus.toString()===todoItemSelect||todoItemSelect==='all'" 
          v-bind="value"
          @todo-item-change-status = "(todoItemStatus)=>todoItemChangeStatus(index,todoItemStatus)"
          @todo-item-remove="todoItemList.splice(index,1)"
        ></todo-item>
    </template>
    </ul>
    <hr>
</template>