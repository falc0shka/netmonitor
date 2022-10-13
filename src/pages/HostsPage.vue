<script setup>
  
import { ref, reactive, computed, defineAsyncComponent, onMounted, watch, provide, readonly, inject} from 'vue'
import { useHostsStore } from '../stores/HostsStore'
import { useServicesStore } from '../stores/ServicesStore'
import { useQuasar } from 'quasar'


/**
 * Props and Emits
 */


/**
 * State
 */

const hostsStore = useHostsStore()
hostsStore.getHosts()

const servicesStore = useServicesStore()

/**
 * Refs and variables
 */

const $q = useQuasar()

const filterStatus = ref('any')
const filterService = ref([])

const displayHostDetails = ref(new Set())

const filteredHostsList = computed(()=>{
  return hostsStore.hosts.filter(host=>{
      return (filterStatus.value=='any'||filterStatus.value==host.hostStatus)
            &&(filterService.value.length===0||filterService.value.some(service=>service==host.hostService))
    }
  )
});

//const serviceId = servicesStore.getSeviceName(id)
//hostItem.hostService

/**
 * Remote data fetching
 */


/**
 * Watchers
 */


/**
 * Methods
 */

function filterReset() {
  filterStatus.value = 'any';
  filterService.value = [];
}




function deleteHost(id) {
  $q.dialog({
    title: 'Confirm deletion',
    message: 'Would you like to delete this host from database?',
    cancel: true,
    persistent: true
  })
  .onOk(async () => {
    //console.log('>>>> OK')
    await hostsStore.deleteHost(id)
    await hostsStore.getHosts()
    $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Host was deleted!'
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
  <h1 class="q-ma-sm">Host list</h1>
  <div class="q-ma-sm">
    <q-btn label="Reset filters" color="primary" @click="filterReset" class="q-mb-md" />
    <div class="q-gutter-sm">
      <strong>Filter by status:</strong>
      <q-radio dense v-model="filterStatus" val="any" label="Any" />
      <q-radio dense v-model="filterStatus" val="true" label="OK" />
      <q-radio dense v-model="filterStatus" val="false" label="FAIL" />
    </div>
    
    <div class="q-gutter-sm">
      <div><strong>Filter by service:</strong></div>
      <template v-for="service of servicesStore.services" :key="service.serviceId">
        <q-checkbox dense v-model="filterService" :val="service.serviceId" :label="service.serviceName" />
      </template>
    </div>
  </div>


  <hr>
  <div class="hosts">
    <div v-if="!filteredHostsList.length">No hosts to display</div>
    
    <q-card class="q-pa-md q-ma-sm" v-for="hostItem of filteredHostsList" :key="hostItem._id">
      <h3 class="hostName">
          <router-link :to="{name: 'host.page', params: {_id: hostItem._id}}">
            {{hostItem.hostName}}
          </router-link>
          <q-icon name="check_circle" size="1em" color="positive" v-if="hostItem.hostStatus == 'true'"/>
          <q-icon name="warning" size="1em" color="negative" v-else />
        </h3>
      <q-btn @click="displayHostDetails.add(hostItem._id)" v-if="!displayHostDetails.has(hostItem._id)">
          Show details
      </q-btn>
      <q-btn @click="displayHostDetails.delete(hostItem._id)" v-if="displayHostDetails.has(hostItem._id)">
          Hide details
      </q-btn>
      <div class="host-details q-mt-md q-pa-sm" v-if="displayHostDetails.has(hostItem._id)">
          <p class="hostId"><strong>ID:</strong> {{hostItem._id}}</p>
          <p><strong>FQDN:</strong> {{hostItem.hostFqdn}}</p>
          <p><strong>IP:</strong> {{hostItem.hostIp}}</p>
          <p class="serviceId"><strong>Service:</strong> {{servicesStore.getSeviceName(hostItem.hostService)}}</p>
      </div>
      <q-card-actions align="right">
        <q-btn label="Delete host" color="negative" @click="deleteHost(hostItem._id)" dense />
      </q-card-actions>
    </q-card>
  </div>
</template>


<style scoped lang="scss">
.hosts {
  width: 100%;
}

.host-details {
  border: 1px dotted #aaa;
}

</style>