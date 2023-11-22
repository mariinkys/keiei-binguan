<template>
   <div class="max-w-5xl m-auto" v-if="!loading">
      <div class="my-3 text-end">
         <ToggleButton v-model="editing" on-label="Editing" off-label="Not editing" />
      </div>

      <form @submit.prevent="onSubmit" class="flex flex-col gap-8">
         <span class="p-float-label">
            <InputText id="name" v-model="room.name" class="w-full" required autocomplete="off" aria-autocomplete="none"
               :disabled="!editing" />
            <label for="name">Name</label>
         </span>

         <Button type="submit" label="Add" :disabled="!editing" />
      </form>
   </div>
   <div v-else>
      <PageLoadingDataComponent />
   </div>
</template>

<script lang="ts">
import { initDefaultRoom, mapPrismaRoomModel } from '@/server/models/roomModel';
import axios from 'axios'

export default {
   props: {
      roomId: Number,
   },
   data() {
      return {
         room: initDefaultRoom(),
         loading: true,
         editing: false,
      };
   },
   async mounted() {
      await axios.get(`/api/rooms/${this.roomId}`)
         .then(async res => {
            if (res.status == 200) {
               this.room = mapPrismaRoomModel(res.data)
               this.loading = false
            } else {
               //@ts-expect-error
               this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Something has gone wrong!', life: 3000 });
               await navigateTo("/clients")
            }
         })
   },
   methods: {
      validate(): any[] {
         const errors = [];
         if (!this.room.name)
            errors.push({ path: "name", message: "Required" });
         return errors;
      },
      onSubmit() {
         const body = this.room;
         if (this.validate().length === 0) {
            axios.post(`/api/rooms/${this.roomId}`, {
               body
            }).then(async (res) => {
               if (res.status == 200) {
                  this.editing = false;
                  this.loading = false;
                  //@ts-expect-error
                  this.$toast.add({ severity: 'success', summary: 'Success', detail: 'Changes saved!', life: 3000 });
               }
               else {
                  this.loading = false;
                  //@ts-expect-error
                  this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Something has gone wrong!', life: 3000 });
               }
            }).catch(err => {
               this.loading = false;
               //@ts-expect-error
               this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Something has gone wrong!', life: 3000 });
               console.log(err)
            });
         }
         else {
            //@ts-expect-error
            this.$toast.add({ severity: "error", summary: "Error", detail: "Not valid!", life: 3000 });
         }
      }
   }
}
</script>