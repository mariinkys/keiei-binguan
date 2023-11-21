<template>
   <span class="w-full p-float-label" v-if="!loading">
      <Dropdown v-model="selectedRoom" :options="rooms" filter optionLabel="name" placeholder="Select a Room" showClear
         class="w-full md:w-14rem" @update:modelValue="onValueChange" :disabled="!editing">
      </Dropdown>
      <label for="room">Room</label>
   </span>
   <div v-else class="w-full text-center">
      <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
   </div>
</template>

<script lang="ts">
import axios from 'axios'
import type { RoomModel } from '@/server/models/roomModel'

export default {
   props: {
      preSelected: Number,
      editing: Boolean
   },
   data() {
      return {
         rooms: ref<RoomModel[]>([]),
         selectedRoom: ref<RoomModel>(),
         loading: true,
      }
   },
   async mounted() {
      await this.refreshModel()
   },
   methods: {
      async refreshModel() {
         this.loading = true;
         await axios.get(`/api/rooms`)
            .then(res => {
               if (res.status == 200) {
                  this.rooms = res.data
                  if (this.preSelected) {
                     this.selectedRoom = this.rooms.find(x => x.id === this.preSelected)
                  }
                  this.loading = false
               } else {
                  this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Something has gone wrong!', life: 3000 });
               }
            })
      },
      onValueChange(e: any) {
         console.log(this.selectedRoom)
         if (e.id) {
            const id = +e.id
            this.$emit('value-changed', id)
         }
      }
   }
}
</script>