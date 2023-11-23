<template>
   <CustomPageTitleComponent text="Edit Client" />
   <div v-if="!loading">
      <div class="w-full text-end px-3">
         <ToggleButton v-model="editing" on-label="Editing" off-label="Not editing" />
      </div>
      <div class="sm:flex p-3 sm:gap-3">
         <div class="sm:w-3/5">
            <Card>
               <template #title> Client </template>
               <template #content>
                  <ClientsClientEditComponent :editing="editing" v-if="clientId !== -1" :client-id="clientId" />
               </template>
            </Card>
         </div>
         <div class="my-3 sm:my-0 sm:w-2/5">
            <Card>
               <template #title>Client Document</template>
               <template #content>
                  <DocumentsDocumentEditComponent :editing="editing" :client-id="clientId" />
               </template>
            </Card>
         </div>
      </div>
   </div>
   <div v-else>
      <PageLoadingDataComponent />
   </div>
</template>

<script lang="ts">
export default {
   data() {
      return {
         clientId: -1,
         editing: false,
         loading: true
      };
   },
   mounted() {
      const route = useRoute();
      const id = route.params.id;
      this.clientId = +id;
      this.loading = false
   }
}
</script>