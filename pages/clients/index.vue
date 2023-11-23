<template>
   <div class="flex items-center justify-between">
      <CustomPageTitleComponent text="Clients" class="sm:grow" />
      <Button icon="pi pi-plus" @click="async () => await navigateTo('/clients/create')" rounded />
   </div>
   <ClientsListComponent />
</template> 
