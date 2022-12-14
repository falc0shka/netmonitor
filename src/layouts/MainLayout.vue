<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-4">
    <q-header elevated>
      <q-toolbar>
        <q-icon name="fa-solid fa-network-wired" size="2em" />
        <q-toolbar-title class="text-weight-bold"> Netmonitor</q-toolbar-title>

        <div>v0.0.1 (by falc0shka)</div>
      </q-toolbar>
      <q-tabs align="center">
        <q-route-tab to="/" label="Dashboard" exact />
        <q-route-tab :to="{ name: 'hosts' }" label="Hosts & Devices" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <div class="q-px-lg q-py-sm">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup() {
    return {};
  },
  mounted() {
    console.log(`Main layount mounted`);
  },
});
</script>
