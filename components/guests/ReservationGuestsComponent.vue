<template>
   <div class="max-w-full m-auto" v-if="!loading">
      <Card>
         <template #title>
            <div class="flex items-center justify-between">
               <p class="m-0 p-0">Guests</p>
               <Button @click="() => editMode = true" icon="pi pi-plus" severity="info" rounded aria-label="Add New"
                  size="small" />
            </div>
         </template>
         <template #content>
            <div v-if="!editMode">
               <div v-if="reservationGuests.length > 0" v-for="reservationGuest in reservationGuests">
                  <div class="flex justify-between items-center shadow-lg p-3 my-3">
                     <p>
                        {{ reservationGuest.guest?.name }} {{ reservationGuest.guest?.firstSurname }} {{
                           reservationGuest.guest?.secondSurname }}
                     </p>
                     <Button icon="pi pi-trash" severity="danger" rounded aria-label="Refresh"
                        @click="deleteRecord(reservationGuest.id)" size="small" />
                  </div>
               </div>
               <div v-else class="text-center">
                  <p class="m-0 p-0">No guests...</p>
               </div>
            </div>
            <div v-else>
               <form @submit.prevent="onSubmit" class="flex flex-col gap-8">
                  <div>
                     <ClientsClientSelectComponent @value-changed="(e) => selectedClient = e" :editing="true" />
                     <Button label="Or create a new Client" link @click="async () => await navigateTo('/clients/create')" />
                  </div>

                  <div class="flex gap-1">
                     <Button label="Link" severity="primary" class="w-full" type="submit" />
                     <Button label="Cancel" severity="warning" class="w-full"
                        @click="() => { selectedClient = null, editMode = false }" />
                  </div>
               </form>
            </div>
         </template>
      </Card>
   </div>
   <div v-else>
      <PageLoadingDataComponent />
   </div>
</template>

<script lang="ts">
import type { ReservationGuestsModel } from '@/server/models/reservationGuestModel';
import axios from 'axios'

export default {
   props: {
      reservationId: Number,
   },
   data() {
      return {
         reservationGuests: ref<ReservationGuestsModel[]>([]),
         loading: true,
         editMode: false,
         selectedClient: null
      };
   },
   async mounted() {
      await this.refreshModel();
   },
   methods: {
      validate(): any[] {
         const errors = [];
         if (!this.selectedClient)
            errors.push({ path: "selectedClient", message: "Required" });
         return errors;
      },
      async refreshModel() {
         this.loading = true;
         await axios.get(`/api/reservations/guests/${this.reservationId}`)
            .then(res => {
               if (res.status == 200) {
                  this.reservationGuests = res.data
                  this.loading = false
               } else {
                  this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Something has gone wrong!', life: 3000 });
               }
            })
      },
      async onSubmit() {
         const body = {
            guestId: this.selectedClient,
            reservationId: this.reservationId
         };
         if (this.validate().length === 0) {
            this.loading = true;
            axios.post("/api/reservations/guests", {
               body
            }).then(async (res) => {
               if (res.status == 200) {
                  await this.refreshModel()
                  this.editMode = false
                  this.loading = false;
                  this.$toast.add({ severity: "success", summary: "Created", detail: "Added!", life: 3000 });
               }
               else {
                  this.$toast.add({ severity: "error", summary: "Error", detail: "Something has gone wrong!", life: 3000 });
                  this.loading = false;
               }
            }).catch(err => {
               this.$toast.add({ severity: "error", summary: "Error", detail: "Something has gone wrong!", life: 3000 });
               console.log(err);
               this.loading = false;
            });
         }
         else {
            this.$toast.add({ severity: "error", summary: "Error", detail: "Not valid!", life: 3000 });
         }
      },
      async deleteRecord(id: any) {
         this.loading = true;
         await axios.post(`/api/reservations/guests/delete/${id}`).then(async res => {
            if (res.status == 200) {
               await this.refreshModel()
               this.loading = false;
               this.$toast.add({ severity: 'success', summary: 'Success', detail: 'Deleted!', life: 3000 });
            }
            else {
               this.loading = false;
               this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Something has gone wrong!', life: 3000 });
            }
         }).catch(err => {
            this.loading = false;
            this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Something has gone wrong!', life: 3000 });
            console.log(err)
         });
      }
   }
}
</script>
