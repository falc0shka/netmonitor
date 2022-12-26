import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    mainStatus: 'unknown',
    lastUpdate: 'Never',
    counter: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
