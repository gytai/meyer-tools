<template>
  <div class="chat">
    <div class="chat__slide">
      <ChatUser v-for="item,index in userlist" :imgUrl="item.avatar"
                :msgCount="item.msgCount" :nickName="item.name" v-bind:key="index"
                @click.native="handleUserClick(item.account,item.name,item.avatar)"/>
    </div>
    <div class="chat__main">
      <div class="chat__main__header">
        <div class="chat__main__header__info">
          <div class="chat__main__header__info__avatar"> <img :src="sessionUserInfo.avatar"/> </div>
          <div class="chat__main__header__info__name"> {{sessionUserInfo.name }} </div>
        </div>
      </div>
      <div class="chat__main__content" id="msgContent">
        <ChatMessage v-for="item,index in messageList" v-bind:key="index" :item="item"/>
      </div>
      <div class="chat__main__footer">
        <div class="chat__main__footer__controls">
          <div class="chat__main__footer__controls__btn-msg" title="表情"></div>
          <div class="chat__main__footer__controls__btn-file" title="文件传输"></div>
          <div class="chat__main__footer__controls__btn-like" title="点赞"></div>
        </div>
        <div class="chat__main__footer__input">
          <Input class="chat__main__footer__input__textarea" type="textarea" v-model="sendMsgContent"
                 :autosize="{minRows: 6,maxRows:10000}" placeholder="按 Ctrl + Enter 发送"  @keyup.native.ctrl.enter="onKeyup" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component,Watch, Vue } from 'vue-property-decorator';
import ChatUser from '@/components/ChatUser.vue'
import ChatMessage from '@/components/ChatMessage.vue'
import moment from 'moment'

@Component({
  sockets: {
    connect(){
      console.log('socket session connect');
      this.socketLogin();
    },
    disconnect(){
      console.log('socket session disconnect');
    },
    userOnline(data){
      this.$Message.success(data.name + ' 上线');
    },
    userList(data){
      this.userlist = data;
    },
    roomMessage(data){
      if(data.from != this.userInfo.account){
        let info = {
          'date' : moment().format('YYYY-MM-DD HH:mm:ss'),
          'content': data.data,
          'self': false
        };
        this.messageList.push(info);
      }
    }
  },
  components: {
    ChatUser,
    ChatMessage
  },
})

export default class Chat extends Vue {
  private userlist = [];
  private messageList = [];

  private userInfo = {
    name:  new Date().getTime(),
    avatar: 'https://image.chinameyer.com/avatar/male.png',
    account: new Date().getTime()
  };

  private sessionUserInfo = {
    name: '即时群聊',
    avatar: '',
    account:'meyer-chat'
  };

  private sendMsgContent = '';

  onKeyup () {
    let info = {
      'date' : moment().format('YYYY-MM-DD HH:mm:ss'),
      'content': this.sendMsgContent,
      'self': true
    };
    this.messageList.push(info);
    this.sendMessage(this.sessionUserInfo.account,this.sendMsgContent);
  }

  @Watch('messageList')
  handleScroll() {
    this.scrollMsgContent();
  }

  scrollMsgContent(){
    setTimeout(() => {
      let ele = document.getElementById('msgContent');
      ele.scrollTop = ele.scrollHeight;
    },50);
  }

  handleUserClick(account,name,avatar){
    //this.sessionUserInfo.account = account;
    //this.sessionUserInfo.name = name;
    //this.sessionUserInfo.avatar = avatar;
  }

  // socket 操作
  socketLogin(){
    this.$socket.emit('login', {
      account:this.userInfo.account,
      avatar: this.userInfo.avatar,
      msgCount:0,
      name: this.userInfo.account,
    });
    this.$socket.emit('joinRoom', {
      from: this.userInfo.account,
      roomId: 'meyer-chat',
    });
  }

  sendMessage(to,content){
    this.$socket.emit('roomMessage', {
      from: this.userInfo.account,
      to: to,
      data: content
    })
  }

  mounted(){
    this.scrollMsgContent();
  }
}
</script>

<style scoped lang="less">
  .chat{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    background-color: #eee;

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

      &__content{
        height: calc(100% - 220px);
        overflow-y:auto;
      }

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
