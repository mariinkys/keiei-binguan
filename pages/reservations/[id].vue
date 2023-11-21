<template>
   <h2 class="text-center">Edit Reservation</h2>
   <ReservationsReservationEditComponent v-if="reservationId !== -1" :reservation-id="reservationId" />
</template>

<script lang="ts">
export default {
   data() {
      return {
         reservationId: -1
      };
   },
   mounted() {
      const route = useRoute();
      const id = route.params.id;
      this.reservationId = +id;
   }
}
</script>