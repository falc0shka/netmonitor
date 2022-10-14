<script setup>
  
import { ref, reactive, computed, defineAsyncComponent, onMounted, watch, provide, readonly, inject} from 'vue'
import { useQuasar } from 'quasar'

import { useHostsStore } from '../stores/HostsStore'
import { useItemsStore } from '../stores/ItemsStore'
import ItemGraphComponent from 'src/components/ItemGraphComponent.vue';


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

const itemCreateDialog = ref(false)

const itemGraph = ref(null)

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

async function onSubmit() {
  try {
    await itemsStore.createItem(
      {
        itemHost: props._id,
        ...formValues.value
      }
    )
    await itemsStore.getItemsByHostId(props._id)
    await hostsStore.getHostById(props._id)

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

function deleteItem(hostId, itemId) {
  $q.dialog({
    title: 'Confirm deletion',
    message: 'Would you like to delete this item?',
    cancel: true,
    persistent: true
  })
  .onOk(async () => {
    //console.log('>>>> OK')
    await itemsStore.deleteItem(itemId)
    await itemsStore.getItemsByHostId(hostId)
    await hostsStore.getHostById(props._id)

    $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Item was deleted!'
      })
  })
  .onOk(() => {
    //console.log('>>>> second OK catcher')
  })
  .onCancel(() => {
    //console.log('>>>> Cancel')
  })
  .onDismiss(() => {
    //console.log('I am triggered on both OK and Cancel')
  })
}

/**
 * Lifecycle
 */


/**
 * Feature testing
 */


</script>


<template>
  <h1 class="q-ma-sm">{{hostsStore.host.hostName}}</h1>
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


  <q-card class="q-pa-md q-ma-sm">
    <p>Host ID: {{hostsStore.host._id}}</p>
    <p>Host name: {{hostsStore.host.hostName}}</p>
    <p>Host FQDN: {{hostsStore.host.hostFqdn}}</p>
    <p>Host IP: {{hostsStore.host.hostIp}}</p>
    <p>Host status: {{hostsStore.host.hostStatus}}</p>
    <p>Host service: {{hostsStore.host.hostService}}</p>
    <p>Host cluster: {{hostsStore.host.hostCluster}}</p>
    <p>Host items: {{hostsStore.host.hostItems}}</p>
    <p>Notes: {{hostsStore.host.hostNote}}</p>
  </q-card>

  <div class="hostitems">

    <div class="items q-ma-sm" v-if="itemsStore.items.length">  
      <q-btn-group v-if="itemsStore.items.length" color="primary" glossy>
        <q-btn href="#all" label="All items" :color="visibility === 'all'?'secondary':'primary'" />
        <q-btn href="#ok" label="Only OK" :color="visibility === 'ok'?'secondary':'primary'" />
        <q-btn href="#fail" label="Only FAIL" :color="visibility === 'fail'?'secondary':'primary'"/>
      </q-btn-group>
      <div class="items q-mt-sm" v-if="!filteredItemsList.length">No items found matching the specified filter</div>
      <q-card class="q-pa-md q-my-lg" v-for="item of filteredItemsList" :key="item._id">
        <h2 class="itemType">{{item.itemType}}
          <q-icon name="check_circle" size="1em" color="positive" v-if="item.itemStatus == 'true'"/>
          <q-icon name="warning" size="1em" color="negative" v-else />
        </h2>
        <!-- <p class="itemHost">itemHost: {{item.itemHost}}</p> -->
        <p class="itemTarget"><strong>Target expression:</strong> {{item.itemTarget}}</p>
        <q-btn label="Show graph" color="dark" @click="displayItemGraph.add(item._id)" v-if="!displayItemGraph.has(item._id)" dense />
        <q-btn label="Hide graph" color="dark" @click="displayItemGraph.delete(item._id)" v-if="displayItemGraph.has(item._id)" dense />
        <div class="item-graph" v-if="displayItemGraph.has(item._id)">
          <item-graph-component :_id="item._id"/>
        </div>
        <q-card-actions align="right">
          <q-btn label="Delete item" color="negative" @click="deleteItem(_id, item._id)" dense />
        </q-card-actions>
        
      </q-card>
      
      
    </div>
    <div class="items" v-else>No items to display</div>
  </div>
  <q-btn label="Add new item" color="primary" @click="itemCreateDialog = true" class="q-ma-sm" />


  <q-dialog v-model="itemCreateDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <h2>Create new item</h2>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form
            @submit.stop.prevent="onSubmit"
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
              hint="Type target expression"
              :rules="[ val => val && val.length > 0 || 'Please, type item\'s target expression']"
            />
            
            <div>
              <q-btn label="Add item" type="submit" color="primary" />
              <q-btn label="Cancel" type="reset" color="primary" flat class="q-ml-sm" v-close-popup />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

</template>


<style scoped>

.filters li {
  display: inline-block;
  padding: 10px;
}
.item-graph {
  margin: 20px 20px;
}
</style>