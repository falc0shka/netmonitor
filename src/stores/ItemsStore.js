import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useItemsStore = defineStore('items', {
  state: ()=>({
    items: [],
  }),
  actions: {
    async getItemsByHostId(id) {
      this.items = (await axios.get(`http://10.0.0.87:3000/v1/items/${id}`)).data
    },
    async createItem(values) {
        await axios.post(
            `http://10.0.0.87:3000/v1/items`,
            {
              ...values,
            }
          )
    },
    async deleteItem(id) {
      await axios.delete(
        `http://10.0.0.87:3000/v1/items/${id}`
      ) 
    }
  }
}
)

 