import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useHostsStore = defineStore('hosts', {
  state: ()=>({
    hosts: [
      {
        hostId: 1,
        clusterId: 1,
        serviceId: 1,
        noteId: 12,
        hostName: 'Netmonitor',
        hostFqdn: 'netmonitor.local',
        hostIp: '10.0.0.1',
        hostStatus: 'true'
      },
      {
        hostId: 2,
        clusterId: 2,
        serviceId: 7,
        noteId: 15,
        hostName: 'CUCM 01',
        hostFqdn: 'cucm01.local',
        hostIp: '10.0.0.2',
        hostStatus: 'false'
      },
      {
        hostId: 3,
        clusterId: 2,
        serviceId: 7,
        noteId: 10,
        hostName: 'CUCM 02',
        hostFqdn: 'cucm02.local',
        hostIp: '10.0.0.3',
        hostStatus: 'true'
      },
    ],
    host: {}
  }),
  actions: {
    async getById(id) {
      this.host = { loading: true }
      try {
          this.host = this.hosts.filter(host=>host.hostId==id)[0]
          if (!this.host) throw new Error('Host is not defined!')
      } catch (error) {
          this.host = { error };
      }
    },
    updateById(id, values) {
      try {
        this.host = this.hosts.filter(host=>host.hostId==id)[0]
        if (!this.host) throw new Error('Cant find host with such ID!')
        else {
          this.host.hostName = values.hostName
          this.host.hostFqdn = values.hostFqdn
        }
      } catch (error) {
          this.host = { error };
      }
    }
  }
}
)

 