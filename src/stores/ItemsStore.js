import { ref } from 'vue';
import { defineStore } from 'pinia';
import api from '../utils/Api';
import { Notify } from 'quasar';

export const useItemsStore = defineStore('items', {
  state: () => ({
    items: [],
  }),
  actions: {
    async getItemsByHostId(id) {
      try {
        const response = await api.get(`/v1/items/${id}`);
        this.items = response.data;
      } catch (error) {
        if (error.response.status === 403) {
          Notify.create({
            color: 'red-4',
            textColor: 'white',
            icon: 'warning',
            message:
              'Failed to load data from server, contact your system administrator to get permisions!',
          });
          // this.router.push('/forbidden');
        } else {
          this.router.push('/login');
        }
      }
    },
    async createItem(values) {
      try {
        await api.post(`/v1/items`, {
          ...values,
        });
      } catch (error) {
        if (error.response.status === 403) {
          Notify.create({
            color: 'red-4',
            textColor: 'white',
            icon: 'warning',
            message:
              'Failed to load data from server, contact your system administrator to get permisions!',
          });
          // this.router.push('/forbidden');
        } else {
          this.router.push('/login');
        }
      }
    },
    async deleteItem(id) {
      try {
        await api.delete(`/v1/items/${id}`);
      } catch (error) {
        if (error.response.status === 403) {
          Notify.create({
            color: 'red-4',
            textColor: 'white',
            icon: 'warning',
            message:
              'Failed to load data from server, contact your system administrator to get permisions!',
          });
          // this.router.push('/forbidden');
        } else {
          this.router.push('/login');
        }
      }
    },
  },
});
