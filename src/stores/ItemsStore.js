import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useItemsStore = defineStore('items', {
  state: ()=>({
    items: [
      {
        itemId: 234,
        itemTypeId: 1,
        hostId: "633dd74e83fe13b2e3488247",
        itemStatus: 'true'
      },
      {
        itemId: 2544,
        itemTypeId: 2,
        hostId: "633dd74e83fe13b2e3488247",
        itemStatus: 'false'
      },
      {
        itemId: 8953,
        itemTypeId: 3,
        hostId: "633dd74e83fe13b2e3488247",
        itemStatus: 'true'
      },
    ],
    hostItems: []
  }),
  actions: {
    async getById(id) {
      try {
          this.hostItems = this.items.filter(item=>item.hostId==id)
          console.log(this.hostItems)
          if (this.hostItems.length===0) throw new Error('Items are not defined!')
      } catch (error) {
          this.hostItems = { error };
      }
    },
  }
}
)

 