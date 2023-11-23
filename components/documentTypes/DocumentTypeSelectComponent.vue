<template>
   <span class="w-full p-float-label" v-if="!loading">
      <Dropdown v-model="selectedDocumentType" :options="documentTypes" filter optionLabel="name"
         placeholder="Select a Document Type" showClear class="w-full md:w-14rem" @update:modelValue="onValueChange"
         :disabled="!editing">
      </Dropdown>
      <label for="documentType">Document Type</label>
   </span>
   <div v-else class="w-full text-center">
      <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
   </div>
</template>

<script lang="ts">
import axios from 'axios'
import type { DocumentTypeModel } from '@/server/models/documentTypeModel'

export default {
   props: {
      preSelected: Number,
      editing: Boolean
   },
   data() {
      return {
         documentTypes: ref<DocumentTypeModel[]>([]),
         selectedDocumentType: ref<DocumentTypeModel>(),
         loading: true,
      }
   },
   async mounted() {
      await this.refreshModel()
   },
   methods: {
      async refreshModel() {
         this.loading = true;
         await axios.get(`/api/documenttypes`)
            .then(res => {
               if (res.status == 200) {
                  this.documentTypes = res.data
                  if (this.preSelected) {
                     this.selectedDocumentType = this.documentTypes.find(x => x.id === this.preSelected)
                  }
                  this.loading = false
               } else {
                  this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Something has gone wrong!', life: 3000 });
               }
            })
      },
      onValueChange(e: any) {
         if (e.id) {
            const id = +e.id
            this.$emit('value-changed', id)
         }
      }
   }
}
</script>