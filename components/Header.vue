<template>
   <header class="w-full sticky">
      <nav class="flex w-full p-2 items-center">
         <Button icon="pi pi-bars" class="mr-3" text raised rounded @click="emit('toogleSidebar')" />
         <NuxtLink class="no-underline text-inherit" to="/">
            <h1>宾馆</h1>
         </NuxtLink>
      </nav>
   </header>
</template>

<script setup lang="ts">
const emit = defineEmits(['toogleSidebar']);
</script>