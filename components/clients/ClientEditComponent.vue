<template>
   <div class="max-w-5xl m-auto" v-if="!loading">
      <div class="my-3 text-end">
         <ToggleButton v-model="editing" on-label="Editing" off-label="Not editing" />
      </div>

      <form @submit.prevent="onSubmit" class="flex flex-col gap-8">
         <span class="p-float-label">
            <InputText id="name" v-model="client.name" class="w-full" required autocomplete="off" aria-autocomplete="none"
               :disabled="!editing" />
            <label for="name">Name</label>
         </span>

         <span class="p-float-label">
            <InputText id="firstSurname" v-model="client.firstSurname" class="w-full" autocomplete="off"
               aria-autocomplete="none" :disabled="!editing" />
            <label for="firstSurname">First Surname</label>
         </span>

         <span class="p-float-label">
            <InputText id="secondSurname" v-model="client.secondSurname" class="w-full" autocomplete="off"
               aria-autocomplete="none" :disabled="!editing" />
            <label for="secondSurname">Second Surname</label>
         </span>

         <GendersGenderSelectComponent :pre-selected="client.genderId ?? undefined"
            @value-changed="(e) => client.genderId = e" :editing="editing" />

         <span class="p-float-label">
            <InputText id="country" v-model="client.country" class="w-full" autocomplete="off" aria-autocomplete="none"
               :disabled="!editing" />
            <label for="country">Country</label>
         </span>

         <span class="p-float-label">
            <Calendar v-model="client.birthDate" dateFormat="dd/mm/yy" showIcon class="w-full" :disabled="!editing" />
            <label for="birthDate">Birth Date</label>
         </span>

         <!-- THINK ABOUT HOW TO DISPLAY DOCUMENT.-->

         <span class="p-float-label">
            <InputText id="notes" v-model="client.notes" class="w-full" autocomplete="off" aria-autocomplete="none"
               :disabled="!editing" />
            <label for="notes">Notes</label>
         </span>

         <Button type="submit" label="Add" :disabled="!editing" />
      </form>
   </div>
   <div v-else>
      <PageLoadingDataComponent />
   </div>
</template>

<script lang="ts">
import { initDefaultClient, mapPrismaClientModel } from '@/server/models/clientModel';
import axios from 'axios'

export default {
   props: {
      clientId: Number,
   },
   data() {
      return {
         client: initDefaultClient(),
         loading: true,
         editing: false,
      };
   },
   async mounted() {
      await axios.get(`/api/clients/${this.clientId}`)
         .then(async res => {
            if (res.status == 200) {
               this.client = mapPrismaClientModel(res.data)
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
         if (!this.client.name)
            errors.push({ path: "name", message: "Required" });
         return errors;
      },
      onSubmit() {
         const body = this.client;
         if (this.validate().length === 0) {
            axios.post(`/api/clients/${this.clientId}`, {
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