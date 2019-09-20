<template>
  <div class="home">
    <Chat/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Chat from '@/components/Chat.vue'


@Component({
  components: {
    Chat
  },
})

export default class Home extends Vue {}
</script>
<style scoped>
  .home{
    width: 100%;
    height: 100%;
  }
</style>
