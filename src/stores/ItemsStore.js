import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useItemsStore = defineStore('items', {
  state: () => ({
    items: [],
  }),
  actions: {
    async getItemsByHostId(id) {
      this.items = (
        await axios.get(
          `${process.env.variables.API_BASE_URL}:${process.env.variables.API_PORT}/v1/items/${id}`,
        )
      ).data;
    },
    async createItem(values) {
      await axios.post(
        `${process.env.variables.API_BASE_URL}:${process.env.variables.API_PORT}/v1/items`,
        {
          ...values,
        },
      );
    },
    async deleteItem(id) {
      await axios.delete(
        `${process.env.variables.API_BASE_URL}:${process.env.variables.API_PORT}/v1/items/${id}`,
      );
    },
  },
});
