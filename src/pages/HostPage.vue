<script setup>
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';

import { useHostsStore } from '../stores/HostsStore';
import { useItemsStore } from '../stores/ItemsStore';
import { useServicesStore } from '../stores/ServicesStore';
import ItemGraphComponent from 'src/components/ItemGraphComponent.vue';

const props = defineProps({
  _id: {
    type: String,
    required: true,
  },
});

const emit = defineEmits([]);

const hostsStore = useHostsStore();
const itemsStore = useItemsStore();
itemsStore.getItemsByHostId(props._id);
const servicesStore = useServicesStore();
const serviceName = ref('Unknown');
hostsStore
  .getHostById(props._id) // find host
  .then(() => {
    serviceName.value = servicesStore.getSeviceName(
      hostsStore.host.hostService,
    );
  })
  .catch((e) => console.log(e));

const $q = useQuasar();

const itemsFilter = ref('all');

const filteredItemsList = computed(() =>
  filters[itemsFilter.value](itemsStore.items),
);

const filters = {
  all: (itemsList) => itemsList,
  ok: (itemsList) => itemsList.filter((item) => item.itemStatus == 'true'),
  fail: (itemsList) => itemsList.filter((item) => item.itemStatus == 'false'),
};
const formDefaults = {
  itemType: '',
  itemTarget: '',
};
const formValues = ref({
  itemType: '',
  itemTarget: '',
});

const itemOptions = ref(['ping', 'smtp-check', 'http-check']);

const displayItemGraph = ref(new Set());

const itemCreateDialog = ref(false);

const itemGraph = ref(null);

async function onSubmit() {
  try {
    await itemsStore.createItem({
      itemHost: props._id,
      ...formValues.value,
    });
    await itemsStore.getItemsByHostId(props._id);
    await hostsStore.getHostById(props._id);

    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Item created!',
    });
    formValues.value = { ...formDefaults };
  } catch (e) {
    console.log(e);
  }
}

function onReset() {
  formValues.value = { ...formDefaults };
}

function deleteItem(hostId, itemId) {
  $q.dialog({
    title: 'Confirm deletion',
    message: 'Would you like to delete this item?',
    cancel: true,
    persistent: true,
  })
    .onOk(async () => {
      //console.log('>>>> OK')
      await itemsStore.deleteItem(itemId);
      await itemsStore.getItemsByHostId(hostId);
      await hostsStore.getHostById(props._id);

      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Item was deleted!',
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
  <div class="row justify-between items-center">
    <h1 class="q-my-sm">{{ hostsStore.host.hostName }}</h1>
    <q-btn
      color="primary"
      label="Back to hosts list"
      :to="{ name: 'hosts' }"
      flat
    />
  </div>
  <q-card class="row wrap justify-between q-pa-md q-my-sm">
    <div>
      <p><strong>Host ID:</strong> {{ hostsStore.host._id }}</p>
      <p><strong>Host name:</strong> {{ hostsStore.host.hostName }}</p>
      <p><strong>Host FQDN:</strong> {{ hostsStore.host.hostFqdn }}</p>
      <p><strong>Host IP:</strong> {{ hostsStore.host.hostIp }}</p>
      <p><strong>Host status:</strong> {{ hostsStore.host.hostStatus }}</p>
      <p>
        <strong>Host service:</strong>
        {{ serviceName }}
      </p>
      <p><strong>Host cluster:</strong> {{ hostsStore.host.hostCluster }}</p>
      <p><strong>Notes:</strong> {{ hostsStore.host.hostNote }}</p>
    </div>
    <div>
      <q-btn
        color="primary"
        label="Edit host settings"
        :to="{ name: 'host.edit', params: { _id: _id } }"
        class="q-mr-sm"
      />
    </div>
  </q-card>

  <div>
    <div class="row justify-between items-start q-mt-md q-gutter-sm">
      <h2 class="q-mb-xs">Monitoring items</h2>
      <q-btn
        label="Add new item"
        color="positive"
        @click="itemCreateDialog = true"
      />
    </div>

    <div v-if="itemsStore.items.length">
      <div class="row justify-between items-start q-my-md q-gutter-sm">
        <q-btn-group v-if="itemsStore.items.length" color="primary">
          <q-btn-toggle
            v-model="itemsFilter"
            toggle-color="primary"
            :options="[
              { label: 'All items', value: 'all' },
              { label: 'Only OK', value: 'ok' },
              { label: 'Only FAIL', value: 'fail' },
            ]"
          />
        </q-btn-group>
      </div>
      <div v-if="!filteredItemsList.length" class="column items-center q-mt-lg">
        <q-icon name="fa-solid fa-snowman" size="2em" />
        No items found matching the specified filter
      </div>
      <q-card
        class="q-pa-md q-mb-lg"
        v-for="item of filteredItemsList"
        :key="item._id"
      >
        <h2 class="itemType">
          {{ item.itemType }}
          <q-icon
            name="check_circle"
            size="1em"
            color="positive"
            v-if="item.itemStatus == 'true'"
          />
          <q-icon name="warning" size="1em" color="negative" v-else />
        </h2>
        <p class="itemTarget">
          <strong>Target expression:</strong> {{ item.itemTarget }}
        </p>
        <q-btn
          label="Show graph"
          @click="displayItemGraph.add(item._id)"
          v-if="!displayItemGraph.has(item._id)"
          dense
        />
        <q-btn
          label="Hide graph"
          color="dark"
          @click="displayItemGraph.delete(item._id)"
          v-if="displayItemGraph.has(item._id)"
          dense
        />
        <div class="item-graph" v-if="displayItemGraph.has(item._id)">
          <item-graph-component :_id="item._id" />
        </div>
        <q-card-actions align="right">
          <q-btn
            label="Delete item"
            color="negative"
            @click="deleteItem(_id, item._id)"
            dense
          />
        </q-card-actions>
      </q-card>
    </div>
    <div v-else class="column items-center q-mt-lg">
      <q-icon name="fa-solid fa-snowman" size="2em" />
      There are no items attached to this host
    </div>
  </div>

  <q-dialog v-model="itemCreateDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <h2>Create new item</h2>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form
          @submit.stop.prevent="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
          <q-select
            outlined
            lazy-rules="ondemand"
            bg-color="white"
            v-model="formValues.itemType"
            label="Select item type *"
            hint="You must choose item type"
            :options="itemOptions"
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Please, choose type of the item',
            ]"
          />
          <q-input
            outlined
            lazy-rules="ondemand"
            bg-color="white"
            v-model="formValues.itemTarget"
            label="Target expression *"
            hint="Type target expression"
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Please, type item\'s target expression',
            ]"
          />

          <div>
            <q-btn label="Add item" type="submit" color="primary" />
            <q-btn
              label="Cancel"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
              v-close-popup
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.filters li {
  display: inline-block;
  padding: 10px;
}
.item-graph {
  margin: 20px 20px;
}
</style>
