<script setup>
import { defineComponent, ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/AuthStore';

const authStore = useAuthStore();

onMounted(() => {
  console.log(`Main layount mounted`);
});
</script>

<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-4">
    <q-header elevated>
      <q-toolbar>
        <q-icon name="fa-solid fa-network-wired" size="2em" />
        <q-toolbar-title class="text-weight-bold"> Netmonitor</q-toolbar-title>

        <div>v0.0.3 (by falc0shka)</div>
      </q-toolbar>
      <q-tabs align="center">
        <q-route-tab to="/" label="Dashboard" exact />
        <q-route-tab :to="{ name: 'hosts' }" label="Hosts & Devices" />
        <q-btn
          unelevated
          color="light-blue-7"
          size="lg"
          label="Logout"
          @click="authStore.logout()"
        />
      </q-tabs>
    </q-header>

    <q-page-container>
      <div class="q-px-lg q-py-sm">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>
