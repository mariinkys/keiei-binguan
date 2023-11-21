<template>
   <div v-if="!loading">
      <div v-if="reservations.length > 0">
         <DataTable :value="reservations" v-model:filters="filters" tableStyle="min-width: 50rem" paginator :rows="8"
            sortMode="multiple" removableSort @row-click="onRowClick($event)">
            <template #header>
               <div class="flex justify-between">
                  <div class="flex gap-2">
                     <Button icon="pi pi-refresh" rounded aria-label="Refresh" @click="refreshModel" />
                     <!-- <Button icon="pi pi-file-excel" severity="success" rounded aria-label="Download Excel"
                        @click="excelExport" /> -->
                  </div>
                  <span class="p-input-icon-left">
                     <i class="pi pi-search" />
                     <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                  </span>
               </div>
            </template>

            <Column sortable field="id" header="ID" style="width: 10%"></Column>
            <Column sortable field="client.name" header="Client" style="width: 20%"></Column>
            <Column sortable field="room.name" header="Room" style="width: 15%"></Column>
            <Column sortable field="checkInDate" header="Check In" style="width: 15%"></Column>
            <Column sortable field="checkOutDate" header="Check Out" style="width: 15%"></Column>
            <Column style="width: 10%">
               <template #header>
                  <div class="text-end w-full">
                     <p class="m-0 p-0">Delete</p>
                  </div>
               </template>
               <template #body="slotProps">
                  <div class="text-end">
                     <Button icon="pi pi-trash" severity="danger" rounded aria-label="Refresh"
                        @click="deleteRecord(slotProps.data.id)" size="small" />
                  </div>
               </template>
            </Column>
         </DataTable>
      </div>
      <div v-else>
         <p class="text-center">No hay registros...</p>
      </div>
   </div>
   <div v-else>
      <PageLoadingDataComponent />
   </div>
</template>

<script lang="ts">
import axios from 'axios'
import type { ReservationModel } from '@/server/models/reservationModel'
import { FilterMatchMode } from 'primevue/api';

export default {
   data() {
      return {
         reservations: ref<ReservationModel[]>([]),
         loading: true,
         filters: {
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
         }
      }
   },
   async mounted() {
      await this.refreshModel()
   },
   methods: {
      async refreshModel() {
         this.loading = true;
         await axios.get(`/api/reservations`)
            .then(res => {
               if (res.status == 200) {
                  this.reservations = res.data
                  this.loading = false
               } else {
                  this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Something has gone wrong!', life: 3000 });
               }
            })
      },
      async onRowClick(e: any) {
         const eId = e.data.id
         if (!isNaN(+eId)) {
            await navigateTo("/reservations/" + eId)
         } else {
            this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Something has gone wrong!', life: 3000 });
         }
      },
      async deleteRecord(id: any) {
         this.loading = true;
         await axios.post(`/api/reservations/delete/${id}`).then(async res => {
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
      },
   }
}
</script>