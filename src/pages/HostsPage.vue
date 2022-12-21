<script setup>
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  watch,
  onBeforeMount,
  TransitionGroup,
} from 'vue';
import { useHostsStore } from '../stores/HostsStore';
import { useServicesStore } from '../stores/ServicesStore';
import { useQuasar } from 'quasar';

const hostsStore = useHostsStore();
hostsStore.getHosts();

const servicesStore = useServicesStore();

const $q = useQuasar();

const filterStatus = ref('any');
const filterService = ref([]);
const filterName = ref('');
const windowWidth = ref(window.innerWidth);

onBeforeMount(() => {
  const fillterParams = Object.fromEntries(
    new URL(window.location).searchParams.entries(),
  );
  const { name, status, service } = fillterParams;
  if (name) filterName.value = name;
  if (status) filterStatus.value = status;
  if (service) filterService.value = service.split('.');
});

const onWidthChange = () => (windowWidth.value = window.innerWidth);
const onStateChange = (e) => {
  const fillterParams = Object.fromEntries(
    new URL(window.location).searchParams.entries(),
  );
  const { name, status, service } = fillterParams;
  if (name) filterName.value = name;
  if (status) filterStatus.value = status;
  if (service) filterService.value = service.split('.');
};
onMounted(() => {
  window.addEventListener('popstate', onStateChange);
  window.addEventListener('resize', onWidthChange);
});
onUnmounted(() => {
  window.removeEventListener('popstate', onStateChange);
  window.removeEventListener('resize', onWidthChange);
});

const filtersVisibilitySelect = ref(false);

const filtersVisibility = computed(() => {
  if (windowWidth.value >= 1024 || filtersVisibilitySelect.value === true)
    return true;
  else return false;
});

const displayHostDetails = ref(new Set());

const filteredHostsList = computed(() => {
  return hostsStore.hosts.filter((host) => {
    return (
      (filterStatus.value == 'any' || filterStatus.value == host.hostStatus) &&
      (filterService.value.length === 0 ||
        filterService.value.some((service) => service == host.hostService)) &&
      host.hostName.toLowerCase().indexOf(filterName.value.toLowerCase()) >= 0
    );
  });
});

watch(filterName, (newFilterName) => {
  history.replaceState(
    history.state,
    '',
    `?name=${newFilterName}&status=${
      filterStatus.value
    }&service=${filterService.value.join('.')}`,
  );
});
watch(filterStatus, (newFilterStatus) => {
  history.replaceState(
    history.state,
    '',
    `?name=${
      filterName.value
    }&status=${newFilterStatus}&service=${filterService.value.join('.')}`,
  );
});
watch(filterService, (newFilterService) => {
  newFilterService = newFilterService.join('.');
  history.replaceState(
    history.state,
    '',
    `?name=${filterName.value}&status=${filterStatus.value}&service=${newFilterService}`,
  );
});

function filterReset() {
  filterStatus.value = 'any';
  filterService.value = [];
  filterName.value = '';
}

function deleteHost(id) {
  $q.dialog({
    title: 'Confirm deletion',
    message: 'Would you like to delete this host from database?',
    cancel: true,
    persistent: true,
  })
    .onOk(async () => {
      //console.log('>>>> OK')
      await hostsStore.deleteHost(id);
      await hostsStore.getHosts();
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Host was deleted!',
      });
    })
    .onOk(() => {
      //console.log('>>>> second OK catcher')
    })
    .onCancel(() => {
      //console.log('>>>> Cancel')
    })
    .onDismiss(() => {
      //console.log('I am triggered on both OK and Cancel')
    });
}
</script>

<template>
  <h1 class="q-my-sm">Host list</h1>
  <div class="row q-col-gutter-x-lg q-my-sm">
    <div class="col-12 col-md-3">
      <q-btn
        @click="filtersVisibilitySelect = true"
        v-if="!filtersVisibilitySelect"
        class="lt-md q-mb-md"
        color="accent"
      >
        Show filters
      </q-btn>
      <q-btn
        @click="filtersVisibilitySelect = false"
        v-if="filtersVisibilitySelect"
        class="lt-md q-mb-md"
      >
        Hide filters
      </q-btn>
      <transition name="filters">
        <div
          class="column no-wrap justify-start items-stretch"
          v-if="filtersVisibility"
        >
          <div class="fit column no-wrap justify-start q-my-sm q-gutter-sm">
            <strong>Filter by status:</strong>
            <q-radio v-model="filterStatus" val="any" label="Any" dense />
            <q-radio v-model="filterStatus" val="true" label="OK" dense />
            <q-radio v-model="filterStatus" val="false" label="FAIL" dense />
          </div>

          <div class="fit column no-wrap justify-start q-my-sm q-gutter-sm">
            <div><strong>Filter by service:</strong></div>
            <template
              v-for="service of servicesStore.services"
              :key="service.serviceId"
            >
              <q-checkbox
                v-model="filterService"
                :val="service.serviceId"
                :label="service.serviceName"
                dense
              />
            </template>
          </div>

          <q-btn
            label="Reset filters"
            color="primary"
            @click="filterReset"
            class="q-my-md"
          />
          <hr />
        </div>
      </transition>
    </div>

    <div class="col-12 col-md-9">
      <div class="hosts">
        <div class="row no-wrap justify-between items-start q-mb-sm">
          <q-input
            bottom-slots
            v-model="filterName"
            label="Find host by name"
            maxlength="30"
            dense
            outlined
          >
            <template v-slot:append>
              <q-icon
                v-if="filterName !== ''"
                name="close"
                @click="filterName = ''"
                class="cursor-pointer"
              />
              <q-icon name="search" />
            </template>
          </q-input>

          <q-btn label="Add new host" color="positive" to="/admin" />
        </div>
        <hr />
        <div
          v-if="!filteredHostsList.length"
          class="column items-center q-mt-lg"
        >
          <q-icon name="fa-solid fa-snowman" size="2em" />No hosts to display,
          please check filter settings
        </div>
        <TransitionGroup name="hosts-list">
          <q-card
            class="q-pa-md q-mb-lg shadow-6"
            v-for="hostItem of filteredHostsList"
            :key="hostItem._id"
            :class="{
              ok: hostItem.hostStatus == 'true',
              fail: hostItem.hostStatus == 'false',
            }"
          >
            <h3 class="hostName">
              <router-link
                :to="{ name: 'host.page', params: { _id: hostItem._id } }"
                class="text-primary q-ma-sm"
              >
                {{ hostItem.hostName }}
              </router-link>
              <q-icon
                name="check_circle"
                size="1em"
                color="positive"
                v-if="hostItem.hostStatus == 'true'"
              />
              <q-icon name="warning" size="1em" color="negative" v-else />
            </h3>
            <Transition mode="out-in">
              <q-btn
                @click="displayHostDetails.add(hostItem._id)"
                v-if="!displayHostDetails.has(hostItem._id)"
              >
                Show details
              </q-btn>
              <q-btn
                @click="displayHostDetails.delete(hostItem._id)"
                v-else-if="displayHostDetails.has(hostItem._id)"
                color="dark"
              >
                Hide details
              </q-btn>
            </Transition>

            <div
              class="q-mt-md q-pa-sm"
              v-if="displayHostDetails.has(hostItem._id)"
            >
              <p class="hostId"><strong>ID:</strong> {{ hostItem._id }}</p>
              <p><strong>FQDN:</strong> {{ hostItem.hostFqdn }}</p>
              <p><strong>IP:</strong> {{ hostItem.hostIp }}</p>
              <p class="serviceId">
                <strong>Service:</strong>
                {{ servicesStore.getSeviceName(hostItem.hostService) }}
              </p>
            </div>
            <q-card-actions align="right">
              <q-btn
                label="Delete host"
                color="negative"
                @click="deleteHost(hostItem._id)"
                dense
              />
            </q-card-actions>
          </q-card>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hosts {
  width: 100%;
}

.q-card a {
  text-decoration: none;
}

.q-card.ok {
  box-shadow: 0 2px 5px rgba(62, 151, 42, 0.418),
    0 1px 9px rgba(52, 129, 5, 0.12);
}
.q-card.fail {
  box-shadow: 0 2px 5px rgba(151, 42, 42, 0.418),
    0 1px 9px rgba(129, 5, 5, 0.12);
}

.filters-enter-active,
.filters-leave-active {
  transition: all 0.5s ease;
}
.filters-enter-from,
.filters-leave-to {
  opacity: 0;
}

.hosts-list-move,
.hosts-list-enter-active,
.hosts-list-leave-active {
  transition: all 0.5s ease;
}
.hosts-list-enter-from,
.hosts-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.hosts-list-leave-active {
  position: absolute;
  width: max-content;
}
</style>
