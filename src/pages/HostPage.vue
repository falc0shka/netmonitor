<script setup>
  
import { ref, reactive, computed, defineAsyncComponent, onMounted, watch, provide, readonly, inject} from 'vue'
import { useQuasar } from 'quasar'

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

hostsStore.getHostById(props._id) // find host


const itemsStore = useItemsStore()

itemsStore.getItemsByHostId(props._id)
console.log(itemsStore.items)

/**
 * Refs and variables
 */
const $q = useQuasar()

const visibility = ref('all')

const filteredItemsList = computed(() => filters[visibility.value](itemsStore.items))

const filters = {
  all: (itemsList) => itemsList,
  ok: (itemsList) => itemsList.filter((item) => item.itemStatus == 'true'),
  fail: (itemsList) => itemsList.filter((item) => item.itemStatus == 'false')
}
const formDefaults = { 
  itemType: '',
  itemTarget: '',
}
const formValues = ref({ 
  itemType: '',
  itemTarget: '',
})

const itemOptions = ref(['ping', 'smtp-check', 'http-check'])

const displayItemGraph = ref(new Set())

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
  console.log(route)
  if (filters[route]) {
    visibility.value = route
  } else {
    console.log('test')
    window.location.hash = ''
    visibility.value = 'all'
  }
}

window.addEventListener('hashchange', onHashChange)
onHashChange()

async function onSubmit() {
  try {
    await itemsStore.createItem(
      {
        itemHost: props._id,
        ...formValues.value
      }
    )
    await itemsStore.getItemsByHostId(props._id)

    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Item created!'
    })
    formValues.value = { ...formDefaults }
  } catch (e) {console.log(e)}
}

function onReset() {
  formValues.value = { ...formDefaults }
}

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
    <ul class="filters" v-if="itemsStore.items.length">
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
        <p class="itemTypeTitle">itemType</p>
        <p class="itemHostTitle">itemHost</p>
        <p class="itemStatusTitle">itemStatus</p>
        <p class="itemTargetTitle">itemTarget</p>
      </div>
      <div class="t-body" v-if="itemsStore.items.length">
        <div class="items row" v-for="item of filteredItemsList" :key="item._id">

          <p class="itemType">{{item.itemType}}</p>
          <p class="itemHost">{{item.itemHost}}</p>
          <p class="itemStatus">{{item.itemStatus}}
            <span @click="displayItemGraph.add(item._id)" v-if="!displayItemGraph.has(item._id)">
              Show graph
            </span>
            <span @click="displayItemGraph.delete(item._id)" v-if="displayItemGraph.has(item._id)">
              Hide graph
            </span>  
          </p>
          <p class="itemTarget">{{item.itemTarget}}</p>
          <div class="break-column"></div>
            <div class="item-graph" v-if="displayItemGraph.has(item._id)">
              {{item.itemGraph}}
            </div>
        </div>
      </div>
      <div class="t-body" v-else>No items to display</div>
    </div> 
  </div>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form
      @submit.prevent="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-select 
        outlined
        lazy-rules="ondemand"
        bg-color="white"  
        v-model="formValues.itemType"
        label="Select item type *"
        hint="You must choose item type"
        :options="itemOptions"
        :rules="[ val => val && val.length > 0 || 'Please, choose type of the item']"
      />
      <q-input
        outlined
        lazy-rules="ondemand"
        bg-color="white"
        v-model="formValues.itemTarget"
        label="Target expression *"
        hint="You must type host's IP address"
        :rules="[ val => val && val.length > 0 || 'Please, type item\'s target expression']"
      />
      
      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
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
.item-graph {
  border: 1px dotted #aaa;
  width: 100%;
}
</style>