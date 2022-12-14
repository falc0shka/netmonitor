<script setup>
import { ref } from 'vue';
import { useHostsStore } from '../stores/HostsStore';
import { useQuasar } from 'quasar';
import { store } from 'quasar/wrappers';
import { storeToRefs } from 'pinia';
import { useServicesStore } from '../stores/ServicesStore';

const props = defineProps({});

const emit = defineEmits([]);

const hostsStore = useHostsStore();
const servicesStore = useServicesStore();

const formDefaults = {
  hostName: '',
  hostFqdn: '',
  hostIp: '',
  hostService: '',
  hostCluste: '',
  hostNote: '',
};
const formValues = ref({
  hostName: '',
  hostFqdn: '',
  hostIp: '',
  hostService: '',
  hostCluster: '',
  hostNote: '',
});

const $q = useQuasar();

let serviceOptions = [];
for (let service of servicesStore.services) {
  serviceOptions.push({
    label: service.serviceName,
    value: service.serviceId,
  });
}

async function onSubmit() {
  try {
    await hostsStore.createHost({
      ...formValues.value,
    });
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Host created!',
    });
    formValues.value = { ...formDefaults };
  } catch (e) {
    console.log(e);
  }
}

function onReset() {
  formValues.value = { ...formDefaults };
}
</script>

<template>
  <h1 class="q-my-sm">Create host</h1>

  <!-- <q-btn 
    color="primary"
    label="Go back" 
    @click="$router.back()"
    class="q-ma-sm"
  /> -->

  <div class="q-pt-sm q-my-sm" style="max-width: 400px">
    <q-form @submit.prevent="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        outlined
        dense
        bg-color="white"
        lazy-rules="ondemand"
        v-model="formValues.hostName"
        label="Hostname *"
        hint="You must choose hostname"
        :rules="[(val) => (val && val.length > 0) || 'Choose unique hostname']"
      />
      <q-input
        outlined
        dense
        bg-color="white"
        v-model="formValues.hostFqdn"
        label="Fully Qualified Domain Name"
        hint="You can choose FQDN"
      />
      <q-input
        outlined
        dense
        bg-color="white"
        lazy-rules="ondemand"
        v-model="formValues.hostIp"
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
        v-model="formValues.hostService"
        label="Service type *"
        hint="You must choose service type"
        :options="serviceOptions"
        :rules="[
          (val) => (val && val.length >= 0) || 'Please, choose service type',
        ]"
      />

      <q-input
        outlined
        dense
        bg-color="white"
        v-model="formValues.hostCluster"
        label="Cluster ID"
        hint="You can choose Cluster ID"
      />
      <q-input
        outlined
        dense
        bg-color="white"
        type="textarea"
        v-model="formValues.hostNote"
        label="Notes"
        hint="Notes for this host"
      />

      <div class="q-gutter-sm">
        <q-btn label="Create host" type="submit" color="positive" />
        <q-btn label="Back" @click="$router.back()" color="negative" />
        <q-btn label="Reset form" type="reset" color="primary" flat />
      </div>
    </q-form>
  </div>
</template>

<style scoped></style>
