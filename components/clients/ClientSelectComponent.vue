<template>
   <span class="w-full p-float-label" v-if="!loading">
      <Dropdown v-model="selectedClient" :options="clients" filter optionLabel="name" placeholder="Select a Client"
         showClear class="w-full md:w-14rem" @update:modelValue="onValueChange" :disabled="!editing">
      </Dropdown>
      <label for="client">Client</label>
   </span>
   <div v-else class="w-full text-center">
      <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
   </div>
</template>

<script lang="ts">
import axios from 'axios'
import type { ClientModel } from '@/server/models/clientModel'

export default {
   props: {
      preSelected: Number,
      editing: Boolean
   },
   data() {
      return {
         clients: ref<ClientModel[]>([]),
         selectedClient: ref<ClientModel>(),
         loading: true,
      }
   },
   async mounted() {
      await this.refreshModel()
   },
   methods: {
      async refreshModel() {
         this.loading = true;
         await axios.get(`/api/clients`)
            .then(res => {
               if (res.status == 200) {
                  this.clients = res.data
                  if (this.preSelected) {
                     this.selectedClient = this.clients.find(x => x.id === this.preSelected)
                  }
                  this.loading = false
               } else {
                  //@ts-expect-error
                  this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Something has gone wrong!', life: 3000 });
               }
            })
      },
      onValueChange(e: any) {
         console.log(this.selectedClient)
         if (e.id) {
            const id = +e.id
            this.$emit('value-changed', id)
         }
      }
   }
}
</script>