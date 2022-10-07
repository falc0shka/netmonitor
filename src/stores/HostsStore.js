import { ref } from 'vue'
import { defineStore } from 'pinia'
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
      this.hosts = (await axios.get('http://10.0.0.87:3000/v1/hosts')).data
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

 