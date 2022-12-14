import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useServicesStore = defineStore('services', {
  state: () => ({
    services: [
      {
        serviceId: '1',
        serviceName: 'Monitoring services',
        serviceStatus: 'unknown',
      },
      {
        serviceId: '2',
        serviceName: 'Network services & devices',
        serviceStatus: 'unknown',
      },
      {
        serviceId: '3',
        serviceName: 'VPN service',
        serviceStatus: 'unknown',
      },
      {
        serviceId: '4',
        serviceName: 'AAA services',
        serviceStatus: 'unknown',
      },
      {
        serviceId: '5',
        serviceName: 'Internet access services',
        serviceStatus: 'unknown',
      },
      {
        serviceId: '6',
        serviceName: 'Mail services',
        serviceStatus: 'unknown',
      },
      {
        serviceId: '7',
        serviceName: 'Cisco UC services',
        serviceStatus: 'unknown',
      },
      {
        serviceId: '8',
        serviceName: 'Telephone services',
        serviceStatus: 'unknown',
      },
      {
        serviceId: '9',
        serviceName: 'Wi-Fi services',
        serviceStatus: 'unknown',
      },
    ],
    service: {},
  }),
  actions: {
    getSeviceById(id) {
      this.service = this.services.filter(
        (service) => service.serviceId == id,
      )[0];
    },
    getSeviceName(id) {
      return this.services.filter((service) => service.serviceId == id)[0]
        .serviceName;
    },
    changeServiceStatus(id, status) {
      this.services.filter(
        (service) => service.serviceId === id,
      )[0].serviceStatus = status;
    },
  },
});
