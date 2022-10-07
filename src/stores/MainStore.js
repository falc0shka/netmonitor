import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    mainStatus: true,
    lastUpdate: new Date().toLocaleString('ru-RU'),
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
