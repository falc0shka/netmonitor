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
import { useItemsStore } from '../stores/ItemsStore';

import '../utils/Chart';

/**
 * Props and Emits
 */

const props = defineProps({
  _id: {
    type: String,
    required: true,
  },
});

/**
 * State
 */

const itemsStore = useItemsStore();

/**
 * Refs and variables
 */

const itemGraph = ref(null);
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

onMounted(() => {
  var xValues = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  new Chart(itemGraph.value, {
    type: 'line',
    data: {
      labels: xValues,
      datasets: [
        {
          data: itemsStore.items.filter((item) => item._id === props._id)[0]
            .itemGraph,
          borderColor: 'blue',
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      legend: { display: false },
      scales: {
        yAxes: [
          {
            ticks: {
              suggestedMin: 0,
              suggestedMax: 1,
              stepSize: 1,
            },
          },
        ],
      },
    },
  });
});

/**
 * Feature testing
 */
</script>

<template>
  <canvas ref="itemGraph" style="width: 100%; height: 100px"></canvas>
</template>

<style scoped>
.services-table {
  table-layout: auto;
  width: 100%;
}
</style>
