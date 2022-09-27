<script setup>
  
import { ref, reactive, computed, defineAsyncComponent, onMounted, watch, provide, readonly, inject} from 'vue'
import HostPage from './HostPage.vue'
import { useCounterStore } from '../stores/CounterStore'

/**
 * Props and Emits
 */


/**
 * Refs and variables
 */

const hostsList = ref([
  {
    hostId: 1,
    clusterId: 1,
    serviceId: 1,
    noteId: 12,
    hostName: 'Netmonitor',
    hostFqdn: 'netmonitor.local',
    hostIp: '10.0.0.1',
    hostStatus: 'true'
  },
  {
    hostId: 2,
    clusterId: 2,
    serviceId: 7,
    noteId: 15,
    hostName: 'CUCM 01',
    hostFqdn: 'cucm01.local',
    hostIp: '10.0.0.2',
    hostStatus: 'false'
  },
  {
    hostId: 3,
    clusterId: 2,
    serviceId: 7,
    noteId: 10,
    hostName: 'CUCM 02',
    hostFqdn: 'cucm02.local',
    hostIp: '10.0.0.3',
    hostStatus: 'true'
  },
]);


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

const filteredHostsList = computed(()=>hostsList.value.filter(host=>{
  return (filterStatus.value=='any'||filterStatus.value==host.hostStatus)
  &&(filterService.value.length===0||filterService.value.some(service=>service==host.serviceId))
}));


//const defaultFilterStatus = ['true', 'false']
//const defaultFilterService = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const filterStatus = ref('any');
const filterService = ref([]);

const activeHost = ref({});

const counter = useCounterStore()
counter.$reset()
counter.$patch(state=>{state.count+=10})
console.log(counter.count)


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

function displayHostDetails(hostItem) {
  activeHost.value = hostItem;
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
  <template v-for="service of servicesList">
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
      <div class="items row" v-for="hostItem of filteredHostsList">
        <p class="hostId">{{hostItem.hostId}}</p>
        <p class="hostName" @click="displayHostDetails(hostItem)">{{hostItem.hostName}}<br>FQDN: {{hostItem.hostFqdn}}<br>IP: {{hostItem.hostIp}}</p>
        <p class="serviceId">{{hostItem.serviceId}}</p>
        <p class="hostStatus">{{hostItem.hostStatus}}</p>
      </div>
    </div>
  </div>
  <div class="host-details" v-if="activeHost.hostId" >
  <HostPage v-bind:activeHost="activeHost" @host-page-close="activeHost={}"/>
  </div>
</template>


<style scoped>
.hosts{
  width: 100%;
}
.row {
  display: flex;
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
}
</style>