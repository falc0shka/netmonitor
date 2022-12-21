import { defineStore } from 'pinia';
import { useServicesStore } from './ServicesStore';
import { useMainStore } from './MainStore';

import api from '../utils/Api';

export const useHostsStore = defineStore('hosts', {
  state: () => {
    return {
      hosts: [],
      host: { loading: true },
    };
  },
  actions: {
    async getHosts() {
      try {
        this.hosts = (await api.get(`/v1/hosts`)).data;

        console.log('Hosts data was fetched');

        const mainStore = useMainStore();
        mainStore.lastUpdate = new Date().toLocaleString('ru-RU');

        const servicesStore = useServicesStore();
        let tempMainStatus = true;
        for (let service of servicesStore.services) {
          if (
            this.hosts
              .filter((host) => host.hostService === service.serviceId)
              .every((host) => host.hostStatus === 'true')
          ) {
            servicesStore.changeServiceStatus(service.serviceId, 'true');
          } else {
            servicesStore.changeServiceStatus(service.serviceId, 'false');
            tempMainStatus = false;
          }
        }
        mainStore.mainStatus = tempMainStatus;
      } catch (e) {}
    },

    async getHostById(id) {
      this.host = { loading: true };
      this.host = (await api.get(`/v1/hosts/${id}`)).data;
    },

    async createHost(values) {
      await api.post(`/v1/hosts`, {
        ...values,
      });
    },

    async updateHost(id, values) {
      this.host = (
        await api.put(`/v1/hosts`, {
          _id: id,
          ...values,
        })
      ).data;
    },

    async deleteHost(id) {
      await api.delete(`/v1/hosts/${id}`);
    },
  },
});
