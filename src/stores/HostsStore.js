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
      this.hosts = (await axios.get('http://10.0.0.87:3000/v1/hosts')).data
      mainStore.lastUpdate = new Date().toLocaleString('ru-RU')
      console.log('Hosts data was fetched')
      let tempMainStatus = true
      this.hosts.forEach( host => {
        if (host.hostStatus == 'false') {
          servicesStore.changeServiceStatus(host.hostService, 'false')
          tempMainStatus = false
        }
        else {
          servicesStore.changeServiceStatus(host.hostService, 'true')
        }
      })
      mainStore.mainStatus = tempMainStatus
    },
    async getHostById(id) {
      this.host = { loading: true }
        this.host = (await axios.get(`http://10.0.0.87:3000/v1/hosts/${id}`)).data
    },
    async createHost(values) {
      await axios.post(
        `http://10.0.0.87:3000/v1/hosts`,
        {
          ...values,
        }
      ) 
    },
    async updateHost(id, values) {
      this.host = (await axios.put(
          `http://10.0.0.87:3000/v1/hosts`,
          {
            "_id": id,
            ...values,
          }
        ) 
      ).data
    },
    async deleteHost(id) {
      await axios.delete(
        `http://10.0.0.87:3000/v1/hosts/${id}`
      ) 
    }
  }
}
)

 