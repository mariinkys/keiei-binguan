<template>
   <div class="card flex justify-content-center">
      <Sidebar :visible="visible">
         <template #container>
            <div class="flex justify-between items-center p-3">
               <span class="font-semibold text-2xl text-primary">宾馆</span>
               <span>
                  <Button type="button" @click="emit('toogleSidebar')" icon="pi pi-times" outlined
                     class="h-2rem w-2rem"></Button>
               </span>
            </div>
            <div class="card flex justify-content-center px-3">
               <PanelMenu :model="items" class="w-full md:w-20rem" />
            </div>
         </template>
      </Sidebar>
   </div>
</template>

<script setup lang="ts">
const props = defineProps(['sideBarVisible'])
const visible = ref(false)

const emit = defineEmits(['toogleSidebar']);

watch(() => props.sideBarVisible, (first, _second) => {
   visible.value = first;
});

const items = ref([
   {
      label: 'Reservations',
      icon: 'pi pi-book',
      command: async () => {
         await navigateTo('/')
         emit('toogleSidebar')
      }
   },
   {
      label: 'Clients',
      icon: 'pi pi-users',
      command: async () => {
         await navigateTo('/clients')
         emit('toogleSidebar')
      }
   },
   {
      label: 'Rooms',
      icon: 'pi pi-building',
      command: async () => {
         await navigateTo('/rooms')
         emit('toogleSidebar')
      }
   },
   // {
   //    label: 'Settings',
   //    icon: 'pi pi-user',
   //    items: [
   //       {
   //          label: 'Change Password',
   //          icon: 'pi pi-shield',
   //          command: async () => {
   //             await navigateTo('/user/changepassword')
   //          }
   //       },
   //       {
   //          label: 'Register User',
   //          icon: 'pi pi-id-card',
   //          command: async () => {
   //             await navigateTo('/register')
   //          }
   //       }
   //    ],
   // }
]);
</script>