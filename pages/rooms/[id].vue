<template>
   <CustomPageTitleComponent text="Edit Room" />
   <RoomsRoomEditComponent v-if="roomId !== -1" :room-id="roomId" />
</template>

<script lang="ts">
export default {
   data() {
      return {
         roomId: -1
      };
   },
   mounted() {
      const route = useRoute();
      const id = route.params.id;
      this.roomId = +id;
   }
}
</script>