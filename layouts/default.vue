<template>
   <div>
      <CustomSidebar :side-bar-visible="sideBarVisible" @toogle-sidebar="toogleSidebar" />
      <Header @toogle-sidebar="toogleSidebar" />
      <slot />
   </div>
</template>

<script setup lang="ts">
const sideBarVisible = ref(false)
function toogleSidebar() {
   sideBarVisible.value = !sideBarVisible.value;
}
</script>