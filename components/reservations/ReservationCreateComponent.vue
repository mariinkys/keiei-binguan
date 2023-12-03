<template>
   <div class="max-w-5xl m-auto">
      <form @submit.prevent="onSubmit" class="flex flex-col gap-8">
         <!-- CLIENT SELECT COMPONENT -->
         <ClientsClientSelectComponent @value-changed="(e) => reservation.clientId = e" :editing="true" />

         <!-- ROOM SELECT COMPONENT -->
         <RoomsRoomSelectComponent @value-changed="(e) => reservation.roomId = e" :editing="true" />

         <span class="p-float-label">
            <Calendar v-model="reservation.checkInDate" dateFormat="dd/mm/yy" showIcon class="w-full" />
            <label for="checkInDate">Check In</label>
         </span>

         <span class="p-float-label">
            <Calendar v-model="reservation.checkOutDate" dateFormat="dd/mm/yy" showIcon class="w-full" />
            <label for="costeCompra">Check Out</label>
         </span>

         <Button type="submit" label="Add" />
      </form>
   </div>
</template>

<script lang="ts">
import { initDefaultReservation } from '@/server/models/reservationModel';
import axios from 'axios'

export default {
   data() {
      return {
         reservation: initDefaultReservation()
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
                  await navigateTo(`/reservations/${res.data.id}`);
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