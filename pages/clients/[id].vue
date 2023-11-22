<template>
   <CustomPageTitleComponent text="Edit Client" />
   <ClientsClientEditComponent v-if="clientId !== -1" :client-id="clientId" />
</template>

<script lang="ts">
export default {
   data() {
      return {
         clientId: -1
      };
   },
   mounted() {
      const route = useRoute();
      const id = route.params.id;
      this.clientId = +id;
   }
}
</script>