<template>
   <div class="max-w-5xl m-auto" v-if="!loading">
      <form @submit.prevent="onSubmit" class="flex flex-col gap-8">
         <!-- CLIENT SELECT COMPONENT -->
         <ClientsClientSelectComponent :pre-selected="reservation.roomId ?? undefined"
            @value-changed="(e) => reservation.clientId = e" :editing="!editing" />

         <!-- ROOM SELECT COMPONENT -->
         <RoomsRoomSelectComponent :pre-selected="reservation.roomId ?? undefined"
            @value-changed="(e) => reservation.roomId = e" :editing="!editing" />

         <span class="p-float-label">
            <Calendar v-model="reservation.checkInDate" dateFormat="dd/mm/yyyy" showIcon :disabled="!editing" />
            <label for="checkInDate">Check In</label>
         </span>

         <span class="p-float-label">
            <Calendar v-model="reservation.checkOutDate" dateFormat="dd/mm/yyyy" showIcon :disabled="!editing" />
            <label for="costeCompra">Check Out</label>
         </span>

         <Button type="submit" label="Add" :disabled="!editing" />
      </form>
   </div>
   <div v-else>
      <PageLoadingDataComponent />
   </div>
</template>

<script lang="ts">
import { initDefaultReservation } from '@/server/models/reservationModel';
import axios from 'axios'

export default {
   props: {
      reservationId: Number,
   },
   data() {
      return {
         reservation: initDefaultReservation(),
         loading: true,
         editing: false,
      };
   },
   methods: {
      validate(): any[] {
         const errors = [];
         if (!this.reservation.checkInDate)
            errors.push({ path: "checkInDate", message: "Required" });
         if (!this.reservation.checkOutDate)
            errors.push({ path: "checkOutDate", message: "Required" });
         if (!this.reservation.clientId)
            errors.push({ path: "clientId", message: "Required" });
         if (!this.reservation.roomId)
            errors.push({ path: "roomId", message: "Required" });
         return errors;
      },
      onSubmit() {
         const body = this.reservation;
         if (this.validate().length === 0) {
            axios.post("/api/reservations", {
               body
            }).then(async (res) => {
               if (res.status == 200) {
                  await navigateTo("/");
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