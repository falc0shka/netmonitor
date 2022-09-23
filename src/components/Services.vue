<script setup>
  
import { ref, reactive, computed, defineAsyncComponent, onMounted, watch, provide, readonly, inject} from 'vue'


/**
 * Props and Emits
 */


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

/**
 * Remote data fetching
 */


/**
 * Watchers
 */


/**
 * Lifecycle
 */


/**
 * Methods
 */


/**
 * Feature testing
 */


</script>


<template>
  <div class="services">
    <div class="titles row">
      <p class="serviceId">serviceId</p>
      <p class="serviceName">serviceName</p>
      <p class="serviceStatus">serviceStatus</p>
    </div>
    <div class="t-body">
      <div class="items row" v-for="serviceItem of servicesList">
        <p class="serviceId">{{serviceItem.serviceId}}&nbsp;</p>
        <p class="serviceName">{{serviceItem.serviceName}}&nbsp;</p>
        <p class="serviceStatus">{{serviceItem.serviceStatus}}&nbsp;</p>
      </div>
    </div>
  </div>
</template>


<style scoped>
div.services{
  width: 100%;
}
div.row {
  display: flex;
  flex-direction: row;
}
div.row .serviceId, div.row .serviceStatus {
  flex: 1;
}
div.row .serviceName {
  flex: 3;
}
</style>