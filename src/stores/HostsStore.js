import { defineStore } from 'pinia';
import { useServicesStore } from './ServicesStore';
import { useMainStore } from './MainStore';
import { Notify } from 'quasar';

import api from '../utils/Api';

export const useHostsStore = defineStore('hosts', {
  state: () => {
    return {
      hosts: [],
      host: { loading: true },
      hostsCount: 0,
    };
  },
  actions: {
    async getHosts() {
      try {
        const response = await api.get(`/v1/hosts`);
        this.hosts = response.data;

        console.log('Hosts data was fetched');

        const mainStore = useMainStore();
        mainStore.lastUpdate = new Date().toLocaleString('ru-RU');

        const servicesStore = useServicesStore();

        this.hostsCount = this.hosts.length;
        let tempMainStatus = 'ok';
        for (let service of servicesStore.services) {
          if (
            this.hosts
              .filter((host) => host.hostService === service.serviceId)
              .every((host) => host.hostStatus === 'true')
          ) {
            servicesStore.changeServiceStatus(service.serviceId, 'ok');
          } else {
            servicesStore.changeServiceStatus(service.serviceId, 'fail');
            tempMainStatus = 'fail';
          }
        }
        mainStore.mainStatus = tempMainStatus;
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

    async getHostById(id) {
      try {
        this.host = { loading: true };
        const response = await api.get(`/v1/hosts/${id}`);
        this.host = response.data;
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

    async createHost(values) {
      try {
        await api.post(`/v1/hosts`, {
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

    async updateHost(id, values) {
      try {
        const response = await api.put(`/v1/hosts`, {
          _id: id,
          ...values,
        });
        this.host = response.data;
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

    async deleteHost(id) {
      try {
        await api.delete(`/v1/hosts/${id}`);
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
