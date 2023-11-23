<template>
   <div class="flex items-center justify-between">
      <CustomPageTitleComponent text="Rooms" class="sm:grow" />
      <Button icon="pi pi-plus" @click="async () => await navigateTo('/rooms/create')" rounded />
   </div>
   <RoomsListComponent />
</template> 
