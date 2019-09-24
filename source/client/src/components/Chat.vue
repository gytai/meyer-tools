<template>
  <div class="chat">
    <div class="chat__slide">
      <ChatUser v-for="item in userlist" :imgUrl="item.avatar"
                :msgCount="item.msgCount" :nickName="item.nickName" v-bind:key="item.id"/>
    </div>
    <div class="chat__main">
      <div class="chat__main__header">
        <div class="chat__main__header__info">
          <div class="chat__main__header__info__avatar"> <img :src="userInfo.avatar"/> </div>
          <div class="chat__main__header__info__name"> {{userInfo.name }} </div>
        </div>
      </div>
      <div class="chat__main__content">
        test
      </div>
      <div class="chat__main__footer">
        <div class="chat__main__footer__controls">
          <div class="chat__main__footer__controls__btn-msg" title="表情"></div>
          <div class="chat__main__footer__controls__btn-file" title="文件传输"></div>
          <div class="chat__main__footer__controls__btn-like" title="点赞"></div>
        </div>
        <div class="chat__main__footer__input">
          <Input class="chat__main__footer__input__textarea" type="textarea" :autosize="{minRows: 6,maxRows:10000}" placeholder="Enter something..."/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ChatUser from '@/components/ChatUser.vue'

@Component({
  components: {
    ChatUser
  },
})

export default class Chat extends Vue {
  private userlist = [
    {
      id:1,
      avatar:'https://image.chinameyer.com/avatar/male.png',
      msgCount:23,
      nickName:'李四'
    },
    {
      id:2,
      avatar:'https://image.chinameyer.com/avatar/male.png',
      msgCount:24,
      nickName:'李四2'
    },
    {
      id:3,
      avatar:'https://image.chinameyer.com/avatar/male.png',
      msgCount:25,
      nickName:'李四3'
    }
  ];

  private userInfo = {
    name: '张三',
    avatar: 'https://image.chinameyer.com/avatar/male.png'
  }
}
</script>

<style scoped lang="less">
  .chat{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    background: #f5f6f7;

    &__slide{
      width: 200px;
      min-width: 200px;
      max-width: 200px;
      height: 100%;
      border-right: solid 1px #e8e8e8;
      background: white;
    }

    &__main{
      width: 100%;
      height: 100%;
      border-right: solid 1px #e8e8e8;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &__header{
        height: 50px;
        border-bottom: solid 1px #e4e4e4;

        &__info {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          width: 100%;
          height: 100%;
          padding-left: 10px;

          &__avatar {
            height: 100%;
            width: 50px;
          }

          &__avatar > img {
            margin-top: 10px;
            width: 30px;
            border-radius: 40px;
          }

          &__name {
            margin-left: 5px;
            font-size: 16px;
            font-weight: bold;
          }
        }
      }

      &__footer{
        min-height: 160px;
        border-top: solid 1px #e4e4e4;

        &__controls{
          width: 100%;
          height: 35px;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;

          &__btn-msg{
            margin-left: 20px;
            width: 16px;
            height: 16px;
            background:url('../static/images/icon_im_face.png');
          }

          &__btn-file{
            margin-left: 20px;
            width: 16px;
            height: 16px;
            background:url('../static/images/icon_workfile_line.png');
          }

          &__btn-like{
            margin-left: 20px;
            width: 16px;
            height: 16px;
            background:url('../static/images/icon_likegood.png');
          }
        }

        &__input{
          height: calc(100% - 35px);
        }
      }
    }
  }


</style>
