<template>
  <div class="chatuser">
      <div class="chatuser__info">
        <div class="chatuser__info__avatar"> <img :src="imgUrl"/> </div>
        <div class="chatuser__info__name"> {{nickName}} </div>
      </div>

      <div class="chatuser__msg">
        <Badge :count="msgCount"></Badge>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ChatUser extends Vue {
  @Prop() private nickName!: string;
  @Prop() private imgUrl!: string;
  @Prop() private msgCount!: number;
}
</script>

<style scoped lang="less">
  .chatuser{
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-bottom: solid 1px #e8e8e8;

    &__info {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      width: calc(100% - 50px);
      &__avatar {
        width: 50px;
      }

      &__avatar > img {
        width: 40px;
        border-radius: 40px;
      }

      &__name {
        margin-left: 5px;
        font-size: 16px;
        font-weight: bold;
      }
    }

    &__msg{
      width: 50px;
    }

  }
</style>
