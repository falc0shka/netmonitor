<script setup>
  
import { ref, reactive, computed, defineAsyncComponent, onMounted, watch, provide, readonly, inject} from 'vue'
import { useHostsStore } from '../stores/HostsStore'
import { useItemsStore } from '../stores/ItemsStore'


/**
 * Props and Emits
 */

const props = defineProps({
  'id': {
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
hostsStore.getById(props.id)
const hostItem = hostsStore.host

const itemsStore = useItemsStore()
itemsStore.getById(props.id)
const itemsList = itemsStore.hostItems

/**
 * Refs and variables
 */

const visibility = ref('all')

const filteredItemsList = computed(() => filters[visibility.value](itemsList))

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
  <h1>{{hostItem.hostName}}</h1>
  <router-link :to="{name: 'host.edit', params: {id: id}}">Edit settings</router-link>
  <router-link :to="{name: 'hosts'}">Back to hosts list</router-link>

  <p>Host ID: {{hostItem.hostId}}</p>
  <p>Host name: {{hostItem.hostName}}</p>
  <p>Host FQDN: {{hostItem.hostFqdn}}</p>
  <p>Host IP: {{hostItem.hostIp}}</p>
  <p>Host status: {{hostItem.hostStatus}}</p>
  <p>Host service: {{hostItem.serviceId}}</p>
  <p>Host cluster: {{hostItem.clusterId}}</p>
  <p>Notes: {{hostItem.hostId}}</p>

  <div class="hostitems">
    <ul class="filters" v-if="itemsList.length">
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
      <div class="t-body" v-if="itemsList.length">
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