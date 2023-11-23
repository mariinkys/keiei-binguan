<template>
   <div class="flex items-center justify-between">
      <CustomPageTitleComponent text="Reservations" class="sm:grow" />
      <Button icon="pi pi-plus" @click="async () => await navigateTo('/reservations/create')" rounded />
   </div>
   <ReservationsListComponent />
</template> 
