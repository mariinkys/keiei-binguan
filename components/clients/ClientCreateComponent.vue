<template>
   <div class="max-w-5xl m-auto">
      <form @submit.prevent="onSubmit" class="flex flex-col gap-8">
         <span class="p-float-label">
            <InputText id="name" v-model="client.name" class="w-full" required autocomplete="off"
               aria-autocomplete="none" />
            <label for="name">Name</label>
         </span>

         <span class="p-float-label">
            <InputText id="firstSurname" v-model="client.firstSurname" class="w-full" autocomplete="off"
               aria-autocomplete="none" />
            <label for="firstSurname">First Surname</label>
         </span>

         <span class="p-float-label">
            <InputText id="secondSurname" v-model="client.secondSurname" class="w-full" autocomplete="off"
               aria-autocomplete="none" />
            <label for="secondSurname">Second Surname</label>
         </span>

         <GendersGenderSelectComponent @value-changed="(e) => client.genderId = e" :editing="true" />

         <span class="p-float-label">
            <InputText id="country" v-model="client.country" class="w-full" autocomplete="off" aria-autocomplete="none" />
            <label for="country">Country</label>
         </span>

         <span class="p-float-label">
            <Calendar v-model="client.birthDate" dateFormat="dd/mm/yy" showIcon class="w-full" />
            <label for="birthDate">Birth Date</label>
         </span>

         <span class="p-float-label">
            <InputText id="notes" v-model="client.notes" class="w-full" autocomplete="off" aria-autocomplete="none" />
            <label for="notes">Notes</label>
         </span>

         <Button type="submit" label="Add" />
      </form>
   </div>
</template>

<script lang="ts">
import { initDefaultClient } from '@/server/models/clientModel';
import axios from 'axios'

export default {
   data() {
      return {
         client: initDefaultClient()
      };
   },
   methods: {
      validate(): any[] {
         const errors = [];
         if (!this.client.name)
            errors.push({ path: "name", message: "Required" });
         return errors;
      },
      onSubmit() {
         const body = this.client;
         if (this.validate().length === 0) {
            axios.post("/api/clients", {
               body
            }).then(async (res) => {
               if (res.status == 200) {
                  await navigateTo(`/clients/${res.data.id}`);
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