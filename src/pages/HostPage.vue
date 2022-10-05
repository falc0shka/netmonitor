<script setup>
  
import { ref, reactive, computed, defineAsyncComponent, onMounted, watch, provide, readonly, inject} from 'vue'
import { useHostsStore } from '../stores/HostsStore'
import { useItemsStore } from '../stores/ItemsStore'


/**
 * Props and Emits
 */

const props = defineProps({
  '_id': {
    type: String,
    required: true
  }
}
);

const emit = defineEmits([

]);

/**
 * State
 */

const hostsStore = useHostsStore()

hostsStore.getHosts() // refetch hosts
  .then(()=>hostsStore.getById(props._id)) // find host
  .catch(e=>console.log(e))

const itemsStore = useItemsStore()
itemsStore.getById(props._id)

/**
 * Refs and variables
 */

const visibility = ref('all')

const filteredItemsList = computed(() => filters[visibility.value](itemsStore.hostItems))

const filters = {
  all: (itemsList) => itemsStore.hostItems,
  ok: (itemsList) => itemsStore.hostItems.filter((item) => item.itemStatus == 'true'),
  fail: (itemsList) => itemsStore.hostItems.filter((item) => item.itemStatus == 'false')
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
  <h1>{{hostsStore.host.hostName}}</h1>
  <q-btn 
    color="primary"
    label="Back to hosts list" 
    :to="{name: 'hosts'}"
    class="q-ma-sm"
  />
  <q-btn 
    color="primary"
    label="Edit host settings" 
    :to="{name: 'host.edit', params: {_id: _id}}"
    class="q-ma-sm"
  />


  <q-card class="q-pa-md">
    <p>Host ID: {{hostsStore.host._id}}</p>
    <p>Host name: {{hostsStore.host.hostName}}</p>
    <p>Host FQDN: {{hostsStore.host.hostFqdn}}</p>
    <p>Host IP: {{hostsStore.host.hostIp}}</p>
    <p>Host status: {{hostsStore.host.hostStatus}}</p>
    <p>Host service: {{hostsStore.host.hostService}}</p>
    <p>Host cluster: {{hostsStore.host.hostCluster}}</p>
    <p>Notes: {{hostsStore.host.hostNote}}</p>
  </q-card>

  <div class="hostitems">
    <ul class="filters" v-if="itemsStore.hostItems.length">
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

    <div class="items">
      <div class="titles row">
        <p class="itemIdTitle">itemId</p>
        <p class="itemTypeIdTitle">itemTypeId</p>
        <p class="hostIdTitle">hostId</p>
        <p class="itemStatusTitle">itemStatus</p>
      </div>
      <div class="t-body" v-if="itemsStore.hostItems.length">
        <div class="items row" v-for="item of filteredItemsList" :key="item.itemId">
          <p class="itemId">{{item.itemId}}</p>
          <p class="itemTypeId">{{item.itemTypeId}}</p>
          <p class="hostId">{{item.hostId}}</p>
          <p class="itemStatus">{{item.itemStatus}}</p>
        </div>
      </div>
      <div class="t-body" v-else>No items to display</div>
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