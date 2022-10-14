import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useServicesStore } from '../stores/ServicesStore'
import { useMainStore } from '../stores/MainStore'

import axios from 'axios'

export const useHostsStore = defineStore('hosts', {
  state: ()=>{
    return {
      hosts: [],
      host: { loading: true },
    }
  },
  actions: {
    async getHosts(){
      const servicesStore = useServicesStore()
      const mainStore = useMainStore()
      this.hosts = (await axios.get(`${process.env.variables.API_BASE_URL}:${process.env.variables.API_PORT}/v1/hosts`)).data
      mainStore.lastUpdate = new Date().toLocaleString('ru-RU')
      console.log('Hosts data was fetched')
      let tempMainStatus = true
      for (let service of servicesStore.services) {
        if (this.hosts.filter(host=>host.hostService===service.serviceId).every(host=>host.hostStatus === 'true')) {
          servicesStore.changeServiceStatus(service.serviceId, 'true')
        }
        else {
          servicesStore.changeServiceStatus(service.serviceId, 'false')
          tempMainStatus = false
        }
      }
      mainStore.mainStatus = tempMainStatus
    },
    async getHostById(id) {
      this.host = { loading: true }
        this.host = (await axios.get(`${process.env.variables.API_BASE_URL}:${process.env.variables.API_PORT}/v1/hosts/${id}`)).data
    },
    async createHost(values) {
      await axios.post(
        `${process.env.variables.API_BASE_URL}:${process.env.variables.API_PORT}/v1/hosts`,
        {
          ...values,
        }
      ) 
    },
    async updateHost(id, values) {
      this.host = (await axios.put(
          `${process.env.variables.API_BASE_URL}:${process.env.variables.API_PORT}/v1/hosts`,
          {
            "_id": id,
            ...values,
          }
        ) 
      ).data
    },
    async deleteHost(id) {
      await axios.delete(
        `${process.env.variables.API_BASE_URL}:${process.env.variables.API_PORT}/v1/hosts/${id}`
      ) 
    }
  }
}
)

 