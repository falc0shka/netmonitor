<script setup>
import { useServicesStore } from '../stores/ServicesStore';

/**
 * Props and Emits
 */

/**
 * State
 */

const servicesStore = useServicesStore();

/**
 * Refs and variables
 */

/**
 * Remote data fetching
 */

/**
 * Watchers
 */

/**
 * Methods
 */

/**
 * Lifecycle
 */

/**
 * Feature testing
 */
</script>

<template>
  <div class="services">
    <!-- <q-table
      table-header-class="text-h2"
      :rows="servicesStore.services"
      :columns="servicesColumns"
      row-key="name"
      hide-bottom
    /> -->

    <table class="services-table">
      <thead>
        <tr class="text-h4 text-left">
          <th>Service name</th>
          <th class="text-center">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="items text-h6 text-left"
          v-for="serviceItem of servicesStore.services"
          :key="serviceItem.serviceId"
        >
          <td class="serviceName">{{ serviceItem.serviceName }}&nbsp;</td>
          <td class="serviceStatus text-center">
            <q-icon
              name="check_circle"
              size="1em"
              color="positive"
              v-if="serviceItem.serviceStatus === 'true'"
            />
            <q-icon name="warning" size="1em" color="negative" v-else />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.services-table {
  table-layout: auto;
  width: 100%;
}
</style>
