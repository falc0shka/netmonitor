import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useHostsStore = defineStore('hosts', {
  state: ()=>{
    return {
      hosts: [
        {
          _id: 1,
          hostCluster: 1,
          hostService: 1,
          noteId: 12,
          hostName: 'Netmonitor',
          hostFqdn: 'netmonitor.local',
          hostIp: '10.0.0.1',
          hostStatus: 'true'
        }
      ],
      host: {},
      counter: 0,
    }
  },
  actions: {
    async getHosts(){
      this.hosts = (await axios.get('http://10.0.0.87:3000/v1/hosts')).data
      console.log('test',this.hosts)
    },
    async getById(id) {
      this.host = { loading: true }
      try {
          this.host = this.hosts.filter(host=>host._id==id)[0]
          if (!this.host) throw new Error('Host is not defined!')
      } catch (error) {
          this.host = { error };
      }
    },
    updateById(id, values) {
      try {
        this.host = this.hosts.filter(host=>host._id==id)[0]
        if (!this.host) throw new Error('Cant find host with such ID!')
        else {
          this.host.hostName = values.hostName
          this.host.hostFqdn = values.hostFqdn
        }
      } catch (e) {
          console.log(e)
      }
    }
  }
}
)

 