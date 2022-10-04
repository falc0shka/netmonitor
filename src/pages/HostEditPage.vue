<script setup>

import { ref, reactive, computed, defineAsyncComponent, onMounted, watch, provide, readonly, inject} from 'vue'
import { useHostsStore } from '../stores/HostsStore'
import { useQuasar } from 'quasar'

/**
 * Props and Emits
 */

const props = defineProps({
  'id': {
    type: String,
    required: true
  }
});

const emit = defineEmits([

]);

/**
 * State
 */

const hostsStore = useHostsStore()
hostsStore.getById(props.id)
const hostItem = hostsStore.host



/**
 * Refs and variables
 */

const $q = useQuasar()

let formDefaults = {
  formHostName: hostItem.hostName,
  formHostFqdn: hostItem.hostFqdn
}
const formHostName = ref(hostItem.hostName)
const formHostFqdn = ref(hostItem.hostFqdn)

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
    props.id,
    {
      hostName: formHostName.value,
      hostFqdn: formHostFqdn.value
    }
  )
    formDefaults.formHostName = formHostName.value
    formDefaults.formHostFqdn = formHostFqdn.value
  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'cloud_done',
    message: 'Submitted'
  })
}

function onReset() {
  formHostName.value = formDefaults.formHostName
  formHostFqdn.value = formDefaults.formHostFqdn
}

/**
 * Lifecycle
 */


/**
 * Feature testing
 */
  

</script>


<template>
  <h1>{{hostItem.hostName}} edit page</h1>
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
        v-model="formHostName"
        label="Hostname"
        hint="You can change hostname"
        :rules="[ val => val && val.length > 0 || 'Choose appropriate hostname']"
      />

      <q-input
        outlined 
        bg-color="white"
        v-model="formHostFqdn"
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

