<script setup>

import { ref, reactive, computed, defineAsyncComponent, onMounted, watch, provide, readonly, inject} from 'vue'
import { useHostsStore } from '../stores/HostsStore'
import { useQuasar } from 'quasar'
import { store } from 'quasar/wrappers';
import { storeToRefs } from 'pinia';

/**
 * Props and Emits
 */

const props = defineProps({
  '_id': {
    type: String,
    required: true
  }
});

const emit = defineEmits([

]);

/**
 * Refs and variables
 */

const $q = useQuasar()

const formDefaults = reactive({})

/**
 * State
 */

const hostsStore = useHostsStore()
hostsStore.getHosts() // refetch hosts
  .then(()=>hostsStore.getById(props._id)) // find host
  .then(()=>{
    formDefaults.formHostName = hostsStore.host.hostName  // assign default to form values
    formDefaults.formHostFqdn = hostsStore.host.hostFqdn
  })
  .catch(e=>console.log(e))
  
  console.log(formDefaults)

/**
 * Remote data fetching
 */


/**
 * Watchers
 */


/**
 * Methods
 */
function onSubmit() {
  hostsStore.updateById(
    props._id,
    {
      hostName: hostsStore.host.hostName,
      hostFqdn: hostsStore.host.hostFqdn
    }
  )
    formDefaults.formHostName = hostsStore.host.hostName
    formDefaults.formHostFqdn = hostsStore.host.hostFqdn
  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'cloud_done',
    message: 'Submitted'
  })
}

function onReset() {
  console.log(formDefaults)
  hostsStore.host.hostName = formDefaults.formHostName
  hostsStore.host.hostFqdn = formDefaults.formHostFqdn
}

/**
 * Lifecycle
 */


/**
 * Feature testing
 */
  

</script>


<template>
  <h1>{{formDefaults.formHostName}} edit page</h1>
  <q-btn 
    color="primary"
    label="Go back" 
    @click="$router.back()"
    class="q-ma-sm"
  />
  <div class="q-pa-md" style="max-width: 400px">

    <q-form
      @submit.prevent="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        outlined 
        bg-color="white"
        v-model="hostsStore.host.hostName"
        label="Hostname"
        hint="You can change hostname"
        :rules="[ val => val && val.length > 0 || 'Choose appropriate hostname']"
      />

      <q-input
        outlined 
        bg-color="white"
        v-model="hostsStore.host.hostFqdn"
        label="Fully Qualified Domain Name"
        hint="You can change FQDN"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Choose appropriate FQDN']"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>


<style scoped>

</style>

