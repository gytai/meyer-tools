<template>
  <div class="file">
      <img :src="img" class="file-img">
      <div>{{ name}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class FilePanel extends Vue {
  @Prop() private img!: string ;
  @Prop() private name !: string ;
}
</script>

<style scoped lang="less">
  .file{
      width: 100px;
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &-img{
          width: 60px;
          height: 60px;
          margin-bottom: 10px;
      }
  }
</style>
