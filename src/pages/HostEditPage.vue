<script setup>
import {
  ref,
  reactive,
  computed,
  defineAsyncComponent,
  onMounted,
  watch,
  provide,
  readonly,
  inject,
} from 'vue';
import { useHostsStore } from '../stores/HostsStore';
import { useServicesStore } from '../stores/ServicesStore';

import { useQuasar } from 'quasar';
import { store } from 'quasar/wrappers';
import { storeToRefs } from 'pinia';

const props = defineProps({
  _id: {
    type: String,
    required: true,
  },
});

const emit = defineEmits([]);

const formDefaults = ref({});

const hostsStore = useHostsStore();
hostsStore
  .getHostById(props._id) // find host
  .then(() => {
    // then assign defaults to form values
    formDefaults.value = { ...hostsStore.host };
  })
  .catch((e) => console.log(e));

const servicesStore = useServicesStore();
console.log(servicesStore);

const $q = useQuasar();

let serviceOptions = [];
for (let service of servicesStore.services) {
  serviceOptions.push({
    label: service.serviceName,
    value: service.serviceId,
  });
}

function onSubmit() {
  hostsStore.updateHost(props._id, {
    ...hostsStore.host,
  });

  formDefaults.value = { ...hostsStore.host };

  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'cloud_done',
    message: 'Submitted',
  });
}

function onReset() {
  hostsStore.host = { ...formDefaults.value };
}
</script>

<template>
  <h1 class="q-my-sm">{{ formDefaults.hostName }} edit page</h1>
  <div class="q-pt-sm q-my-sm" style="max-width: 400px">
    <q-form @submit.prevent="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        outlined
        dense
        bg-color="white"
        v-model="hostsStore.host.hostName"
        label="Hostname *"
        hint="You must choose hostname"
        :rules="[(val) => (val && val.length > 0) || 'Choose unique hostname']"
      />
      <q-input
        outlined
        dense
        bg-color="white"
        v-model="hostsStore.host.hostFqdn"
        label="Fully Qualified Domain Name"
        hint="You can choose FQDN"
      />
      <q-input
        outlined
        dense
        bg-color="white"
        v-model="hostsStore.host.hostIp"
        label="Host IP *"
        hint="You must type host's IP address"
        :rules="[
          (val) =>
            (val && val.length > 0) ||
            'Choose appropriate IP address for this host',
        ]"
      />

      <q-select
        outlined
        emit-value
        map-options
        options-cover
        dense
        bg-color="white"
        lazy-rules="ondemand"
        v-model="hostsStore.host.hostService"
        label="Service type *"
        hint="You can choose service type"
        :options="serviceOptions"
        :rules="[
          (val) => (val && val.length >= 0) || 'Please, choose service type',
        ]"
      />
      <q-input
        outlined
        dense
        bg-color="white"
        v-model="hostsStore.host.hostCluster"
        label="Cluster ID"
        hint="You can choose Cluster ID"
      />
      <q-input
        outlined
        dense
        bg-color="white"
        type="textarea"
        v-model="hostsStore.host.hostNote"
        label="Notes"
        hint="Notes for this host"
      />

      <div class="q-gutter-sm">
        <q-btn label="Save changes" type="submit" color="positive" />
        <q-btn label="Back" @click="$router.back()" color="negative" />
        <q-btn label="Reset form" type="reset" color="primary" flat />
      </div>
    </q-form>
  </div>
</template>

<style scoped></style>
