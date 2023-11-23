<template>
   <div class="max-w-full m-auto" v-if="!loading">
      <form @submit.prevent="onSubmit" class="flex flex-col gap-8">
         <ClientsClientSelectComponent :pre-selected="document.clientId ?? undefined"
            @value-changed="(e) => document.clientId = e" :editing="false" />

         <DocumentTypesDocumentTypeSelectComponent :pre-selected="document.documentTypeId ?? undefined"
            @value-changed="(e) => document.documentTypeId = e" :editing="editing" />

         <span class="p-float-label">
            <Calendar v-model="document.expeditionDate" dateFormat="dd/mm/yy" showIcon class="w-full"
               :disabled="!editing" />
            <label for="expeditionDate">Expedition Date</label>
         </span>

         <span class="p-float-label">
            <InputText id="documentValue" v-model="document.documentValue" class="w-full" required autocomplete="off"
               aria-autocomplete="none" :disabled="!editing" />
            <label for="documentValue">Document Value</label>
         </span>

         <Button type="submit" label="Edit" :disabled="!editing" />
      </form>
   </div>
   <div v-else>
      <PageLoadingDataComponent />
   </div>
</template>

<script lang="ts">
import { initDefaultDocument, mapPrismaDocumentModel } from '@/server/models/documentModel';
import axios from 'axios'

export default {
   props: {
      clientId: Number,
      editing: Boolean,
   },
   async mounted() {
      this.document.clientId = this.clientId ?? null;
      if (this.document.clientId) {
         await axios.get(`/api/documents/findbyclient/${this.clientId}`)
            .then(async res => {
               if (res.status == 200) {
                  this.document = mapPrismaDocumentModel(res.data)
                  this.loading = false
               } else {
                  this.loading = false;
               }
            });
      }
   },
   data() {
      return {
         document: initDefaultDocument(),
         loading: true
      };
   },
   methods: {
      validate(): any[] {
         const errors = [];
         if (!this.document.clientId)
            errors.push({ path: "clientId", message: "Required" });
         if (!this.document.documentTypeId)
            errors.push({ path: "documentTypeId", message: "Required" });
         if (!this.document.expeditionDate)
            errors.push({ path: "expeditionDate", message: "Required" });
         if (!this.document.documentValue)
            errors.push({ path: "documentValue", message: "Required" });
         return errors;
      },
      onSubmit() {
         const body = this.document;
         if (this.validate().length === 0) {
            axios.post("/api/documents", {
               body
            }).then(async (res) => {
               if (res.status == 200) {
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