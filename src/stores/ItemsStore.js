import { ref } from 'vue';
import { defineStore } from 'pinia';
import api from '../utils/Api';

export const useItemsStore = defineStore('items', {
  state: () => ({
    items: [],
  }),
  actions: {
    async getItemsByHostId(id) {
      this.items = (await api.get(`/v1/items/${id}`)).data;
    },
    async createItem(values) {
      await api.post(`/v1/items`, {
        ...values,
      });
    },
    async deleteItem(id) {
      await api.delete(`/v1/items/${id}`);
    },
  },
});
