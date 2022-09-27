<script setup>
  
import { ref, reactive, computed, defineAsyncComponent, onMounted, watch, provide, readonly, inject} from 'vue'

/**
 * Props and Emits
 */

const props = defineProps({
  activeHost: {
    type: Object,
    required: true
  }
});

const emit = defineEmits([
  'host-page-close'
]);

/**
 * Refs and variables
 */

const itemsList = ref([
  {
    itemId: 234,
    itemTypeId: 1,
    hostId: 1,
    itemStatus: 'true'
  },
  {
    itemId: 2544,
    itemTypeId: 2,
    hostId: 1,
    itemStatus: 'false'
  },
  {
    itemId: 8953,
    itemTypeId: 3,
    hostId: 1,
    itemStatus: 'true'
  },
]);

const visibility = ref('all')

const filteredItemsList = computed(() => filters[visibility.value](itemsList.value))

const filters = {
  all: (itemsList) => itemsList,
  ok: (itemsList) => itemsList.filter((item) => item.itemStatus == 'true'),
  fail: (itemsList) => itemsList.filter((item) => item.itemStatus == 'false')
}

/**
 * Remote data fetching
 */


/**
 * Watchers
 */


/**
 * Methods
 */

function onHashChange() {
  const route = window.location.hash.replace(/#\/?/, '')
  if (filters[route]) {
    visibility.value = route
  } else {
    window.location.hash = ''
    visibility.value = 'all'
  }
}

window.addEventListener('hashchange', onHashChange)
onHashChange()

/**
 * Lifecycle
 */


/**
 * Feature testing
 */


</script>


<template>
  <router-link :to="{name: 'host.edit', params: {id: activeHost.hostId}}">Edit host</router-link>
  <button @click="$emit('host-page-close')">Close</button>
  <p>Host ID: {{activeHost.hostId}}</p>
  <p>Host name: {{activeHost.hostName}}</p>
  <p>Host status: {{activeHost.hostStatus}}</p>
  <p>Notes: {{activeHost.noteId}}</p>
  <div class="hostitems">
    <ul class="filters">
      <li>
        <a href="#all" :class="{ selected: visibility === 'all' }">All items</a>
      </li>
      <li>
        <a href="#ok" :class="{ selected: visibility === 'true' }">OK</a>
      </li>
      <li>
        <a href="#fail" :class="{ selected: visibility === 'false' }">FAIL</a>
      </li>
    </ul> 

    <div class="hosts">
      <div class="titles row">
        <p class="itemIdTitle">hostId</p>
        <p class="itemTypeIdTitle">hostName</p>
        <p class="hostIdTitle">serviceId</p>
        <p class="itemStatusTitle">hostStatus</p>
      </div>
      <div class="t-body">
        <div class="items row" v-for="item of filteredItemsList">
          <p class="itemId">{{item.itemId}}</p>
          <p class="itemTypeId">{{item.itemTypeId}}</p>
          <p class="hostId">{{item.hostId}}</p>
          <p class="itemStatus">{{item.itemStatus}}</p>
        </div>
      </div>
    </div> 
  </div>

</template>


<style scoped>
.row {
  display: flex;
  flex-direction: row;
}
div.row p {
  flex: 1;
}
.filters li {
  display: inline-block;
  padding: 10px;
}
</style>