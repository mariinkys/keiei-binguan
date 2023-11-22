<template>
   <span class="w-full p-float-label" v-if="!loading">
      <Dropdown v-model="selectedGender" :options="genders" filter optionLabel="name" placeholder="Select a Gender"
         showClear class="w-full md:w-14rem" @update:modelValue="onValueChange" :disabled="!editing">
      </Dropdown>
      <label for="gender">Gender</label>
   </span>
   <div v-else class="w-full text-center">
      <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
   </div>
</template>

<script lang="ts">
import axios from 'axios'
import type { GenderModel } from '@/server/models/genderModel'

export default {
   props: {
      preSelected: Number,
      editing: Boolean
   },
   data() {
      return {
         genders: ref<GenderModel[]>([]),
         selectedGender: ref<GenderModel>(),
         loading: true,
      }
   },
   async mounted() {
      await this.refreshModel()
   },
   methods: {
      async refreshModel() {
         this.loading = true;
         await axios.get(`/api/genders`)
            .then(res => {
               if (res.status == 200) {
                  this.genders = res.data
                  if (this.preSelected) {
                     this.selectedGender = this.genders.find(x => x.id === this.preSelected)
                  }
                  this.loading = false
               } else {
                  //@ts-expect-error
                  this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Something has gone wrong!', life: 3000 });
               }
            })
      },
      onValueChange(e: any) {
         console.log(this.selectedGender)
         if (e.id) {
            const id = +e.id
            this.$emit('value-changed', id)
         }
      }
   }
}
</script>