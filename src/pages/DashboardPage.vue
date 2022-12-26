<script setup>
import {
  ref,
  provide,
  readonly,
  defineAsyncComponent,
  onMounted,
  onUnmounted,
  watch,
} from 'vue';
import LoadingComponent from '../components/tech/LoadingComponent.vue';
import ErrorComponent from '../components/tech/ErrorComponent.vue';

import Services from '../components/ServicesComponent.vue';

import { useHostsStore } from '../stores/HostsStore';
import { useServicesStore } from '../stores/ServicesStore';
import { useMainStore } from '../stores/MainStore';

const props = defineProps([]);

const emit = defineEmits([]);

const mainStore = useMainStore();

const hostsStore = useHostsStore();
hostsStore.getHosts();

const testMesssage = ref('it\'s "provide"-feature testing!');

const autoUpdate = ref('ON');

const autoUpdateRef = ref(null);

watch(autoUpdate, (newValue) => {
  if (newValue === 'OFF') {
    clearInterval(autoUpdateRef.value);
  } else {
    autoUpdateRef.value = setInterval(() => {
      hostsStore.getHosts();
    }, +process.env.variables.API_HOSTS_UPDATE_PERIOD * 1000);
  }
  console.log(`Auto-fetching data is ${newValue} now`);
});

onMounted(() => {
  autoUpdateRef.value = setInterval(() => {
    hostsStore.getHosts();
  }, +process.env.variables.API_HOSTS_UPDATE_PERIOD * 1000);
});
onUnmounted(() => {
  clearInterval(autoUpdateRef.value);
});

const TodoAsyncComp = defineAsyncComponent({
  loader: async () => {
    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
      return await import('../components/TodoComponent.vue');
    } catch (e) {
      console.log(e);
    }
  },
  loadingComponent: LoadingComponent,
  delay: 200,
  errorComponent: ErrorComponent,
  timeout: 10000,
});

provide('test', readonly(testMesssage));
</script>

<template>
  <h1 class="q-my-sm">Dashboard</h1>

  <div class="fit row q-col-gutter-sm q-my-sm">
    <div class="col-xs-12 col-sm-12 col-md-6">
      <!-- Current status -->
      <q-card class="current__status">
        <h2 class="q-my-sm">
          Current status
          <q-icon
            name="check_circle"
            size="2em"
            color="positive"
            v-if="mainStore.mainStatus == 'ok'"
          />
          <q-icon
            class="current__status__icon_warning"
            name="warning"
            size="2em"
            color="negative"
            v-else-if="mainStore.mainStatus == 'fail'"
          />
          <q-icon name="help" size="2em" color="warning" v-else />
        </h2>
        <h3>Last update from server</h3>
        <p>{{ mainStore.lastUpdate }}</p>
        <q-toggle
          false-value="OFF"
          :label="`Auto update is ${autoUpdate}`"
          true-value="ON"
          color="primary"
          v-model="autoUpdate"
        />
        <!-- <h3>Alerts count</h3>
        <h3>Device count</h3> -->
      </q-card>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-6">
      <q-card>
        <!-- Services module -->
        <h2 class="q-my-sm">Services</h2>
        <Services />
      </q-card>
    </div>
  </div>
  <div class="fit row q-col-gutter-sm q-my-sm">
    <div class="col-xs-12 col-sm-12 col-md-6">
      <q-card>
        <h2 class="q-my-sm">Alerts</h2>
        <p>Under construction</p>
      </q-card>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-6" style="position: relative">
      <q-card>
        <!-- Toto module -->
        <h2 class="q-my-sm">ToDo</h2>
        <TodoAsyncComp />
      </q-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
// .row > div {
//   padding: 10px 15px;
//   background: rgba(86,61,124,.15);
//   border: 1px solid rgba(86,61,124,.2);
// }
// .row + .row {
//   margin-top: 1rem;
// }
.q-card {
  height: 100%;
  padding: 20px 20px;
}

.current__status__icon_warning {
  @keyframes warning {
    to {
      transform: scale(1.3);
    }
  }
  animation: warning 2s steps(10, jump-none) infinite;
  position: relative;
  top: -5px;
}
</style>
