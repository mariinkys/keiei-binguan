<template>
   <CustomPageTitleComponent text="Edit Reservation" />
   <div v-if="!loading && reservationId !== -1">
      <div class="w-full text-end px-3">
         <ToggleButton v-model="editing" on-label="Editing" off-label="Not editing" />
      </div>
      <div class="sm:flex p-3 sm:gap-3">
         <div class="sm:w-3/5">
            <Card>
               <template #title> Reservation </template>
               <template #content>
                  <ReservationsReservationEditComponent :editing="editing" :reservation-id="reservationId" />
               </template>
            </Card>
         </div>
         <div class="my-3 sm:my-0 sm:w-2/5">
            <GuestsReservationGuestsComponent :reservation-id="reservationId" />
         </div>
      </div>
   </div>
</template>

<script lang="ts">
export default {
   data() {
      return {
         reservationId: -1,
         loading: true,
         editing: false
      };
   },
   mounted() {
      const route = useRoute();
      const id = route.params.id;
      this.reservationId = +id;
      this.loading = false;
   }
}
</script>