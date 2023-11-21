<template>
   <header class="w-full sticky">
      <nav class="flex w-full p-2 items-center justify-center">
         <NuxtLink class="no-underline text-inherit" to="/">
            <h1>宾馆</h1>
         </NuxtLink>
      </nav>
   </header>
</template>

<script lang="ts">
export default {
   methods: {
      switchTheme() {
         //@ts-ignore
         this.$primevue.changeTheme('md-dark-indigo', 'md-light-indigo', 'theme-link', () => { });
      }
   }
}
</script>