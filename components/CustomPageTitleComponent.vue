<template>
   <h2 class="text-center text-3xl">{{ text ?? "Title not Found" }}</h2>
</template>

<script lang="ts">
export default {
   props: {
      text: String,
   },
}
</script>