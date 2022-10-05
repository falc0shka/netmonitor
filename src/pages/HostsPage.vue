<script setup>
  
import { ref, reactive, computed, defineAsyncComponent, onMounted, watch, provide, readonly, inject} from 'vue'
import { useHostsStore } from '../stores/HostsStore'
import HostInfo from '../components/HostInfo.vue'

/**
 * Props and Emits
 */


/**
 * State
 */

const hostsStore = useHostsStore()
hostsStore.getHosts()

/**
 * Refs and variables
 */

const servicesList = ref([
  {
    serviceId: 1,
    serviceName: 'Monitoring services',
    serviceStatus: true
  },
  {
    serviceId: 2,
    serviceName: 'Network services & devices',
    serviceStatus: true
  },
  {
    serviceId: 3,
    serviceName: 'VPN service',
    serviceStatus: true
  },
  {
    serviceId: 4,
    serviceName: 'AAA services',
    serviceStatus: true
  },
  {
    serviceId: 5,
    serviceName: 'Internet access services',
    serviceStatus: true
  },
  {
    serviceId: 6,
    serviceName: 'Mail services',
    serviceStatus: true
  },
  {
    serviceId: 7,
    serviceName: 'Cisco UC services',
    serviceStatus: true
  },
  {
    serviceId: 8,
    serviceName: 'Telephone services',
    serviceStatus: true
  },
  {
    serviceId: 9,
    serviceName: 'Wi-Fi services',
    serviceStatus: true
  },
]);

//const defaultFilterStatus = ['true', 'false']
//const defaultFilterService = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const filterStatus = ref('any');
const filterService = ref([]);

const activeHost = ref({});

const displayHostDetails = ref(new Set())

const filteredHostsList = computed(()=>{
  console.log('computed',hostsStore.hosts)
  return hostsStore.hosts.filter(host=>{
      return (filterStatus.value=='any'||filterStatus.value==host.hostStatus)
            &&(filterService.value.length===0||filterService.value.some(service=>service==host.serviceId))
    }
  )
});


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

/**
 * Lifecycle
 */


/**
 * Feature testing
 */


</script>


<template>
  <h1>Host list</h1>
  <h2>Filters</h2>
  <button @click="filterReset">Reset filters</button>
  <div>Filter by status:</div>
  <span><input type="radio" id="status-any" value="any" v-model="filterStatus"><label for="status-any">Any</label></span>
  <span><input type="radio" id="status-ok" value="true" v-model="filterStatus"><label for="status-ok">OK</label></span>
  <span><input type="radio" id="status-fail" value="false" v-model="filterStatus"><label for="status-fail">FAIL</label></span>

  <div>Filter by service:</div>
  <template v-for="service of servicesList" :key="service.serviceId">
    <span>
      <input type="checkbox" :id="`service-${service.serviceId}`" :value="service.serviceId" v-model="filterService">
      <label :for="`service-${service.serviceId}`">{{service.serviceName}}</label>
    </span>
  </template>

  <hr>
  <div class="hosts">
    <div class="titles row">
      <p class="hostIdTitle">hostId</p>
      <p class="hostNameTitle">hostName</p>
      <p class="serviceIdTitle">serviceId</p>
      <p class="hostStatusTitle">hostStatus</p>
    </div>
    <div class="t-body">
      <div class="items row" v-for="hostItem of filteredHostsList" :key="hostItem._id">
        <p class="hostId">{{hostItem._id}}</p>
        <p class="hostName">
          <router-link :to="{name: 'host.page', params: {_id: hostItem._id}}">
            {{hostItem.hostName}}
          </router-link>
          <span @click="displayHostDetails.add(hostItem._id)" v-if="!displayHostDetails.has(hostItem._id)">
            Show details
          </span>
          <span @click="displayHostDetails.delete(hostItem._id)" v-if="displayHostDetails.has(hostItem._id)">
            Hide details
          </span>     
        </p>
        <p class="serviceId">{{hostItem.serviceId}}</p>
        <p class="hostStatus">{{hostItem.hostStatus}}</p>
        <div class="break-column"></div>
        <div class="host-details" v-if="displayHostDetails.has(hostItem._id)">
          <HostInfo v-bind:hostItem="hostItem" />
        </div>
      </div>
    </div> 
  </div>
</template>


<style scoped>
.hosts{
  width: 100%;
}
.row {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
.row .hostId,
.row .hostStatus,
.row .hostIdTitle,
.row .hostStatusTitle {
  flex: 1;
}
.row .serviceId,
.row .serviceIdTitle {
  flex: 2;
}
.row .hostName,
.row .hostNameTitle {
  flex: 3;
}
span {
  display: inline-block;
  margin: 5px 10px;
}
.host-details {
  border: 1px dotted #aaa;
  width: 100%;
}
.break-column {
  flex-basis: 100%;
  width: 0;
}
</style>