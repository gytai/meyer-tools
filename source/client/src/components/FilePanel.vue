<template>
  <div class="file">
      <img :src="img" class="file-img" :title="name">
      <div class="file-title">{{ name }}</div>
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
      margin-bottom: 20px;

      &-img{
          width: 60px;
          height: 60px;
          margin-bottom: 10px;
      }

      &-title{
          max-width: 90px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
      }
  }
</style>
