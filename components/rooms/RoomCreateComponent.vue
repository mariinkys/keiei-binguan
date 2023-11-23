<template>
   <div class="max-w-5xl m-auto">
      <form @submit.prevent="onSubmit" class="flex flex-col gap-8">
         <span class="p-float-label">
            <InputText id="name" v-model="room.name" class="w-full" required autocomplete="off" aria-autocomplete="none" />
            <label for="name">Name</label>
         </span>

         <Button type="submit" label="Add" />
      </form>
   </div>
</template>

<script lang="ts">
import { initDefaultRoom } from '@/server/models/roomModel';
import axios from 'axios'

export default {
   data() {
      return {
         room: initDefaultRoom()
      };
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
            axios.post("/api/rooms", {
               body
            }).then(async (res) => {
               if (res.status == 200) {
                  await navigateTo("/rooms");
                  this.$toast.add({ severity: "success", summary: "Created", detail: "Added!", life: 3000 });
               }
               else {
                  this.$toast.add({ severity: "error", summary: "Error", detail: "Something has gone wrong!", life: 3000 });
               }
            }).catch(err => {
               this.$toast.add({ severity: "error", summary: "Error", detail: "Something has gone wrong!", life: 3000 });
               console.log(err);
            });
         }
         else {
            this.$toast.add({ severity: "error", summary: "Error", detail: "Not valid!", life: 3000 });
         }
      }
   }
}
</script>