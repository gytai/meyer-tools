<template>
  <div id="app">
    <Layout>
      <Sider hide-trigger v-show="isShow">
        <div class="slide-menu">
          <div class="btn-msg" v-bind:class="{ 'btn-msg-active': isMsgActive }" title="聊天" @click="toChat"></div>
          <div class="btn-todo" v-bind:class="{ 'btn-todo-active': isTodoActive }" title="任务"></div>
          <div class="btn-user" v-bind:class="{ 'btn-user-active': isUserActive }" title="通讯录"></div>
          <div class="btn-file" v-bind:class="{ 'btn-file-active': isFileActive }" title="文件盘" @click="toFileCloud"></div>
        </div>
      </Sider>
      <Layout>
        <Header v-show="isShow">
          <div class="header-user">
            <Avatar icon="ios-person"/>
            <span class="header-user-account">{{ account }}</span>
          </div>
        </Header>
        <Content > <router-view/></Content>
        <!--<Footer>Footer</Footer>-->
      </Layout>
    </Layout>
  </div>
</template>

<script lang="ts">
  import {Component, Vue } from 'vue-property-decorator';
  import Cookies from 'js-cookie'

  @Component
  export default class App extends Vue {

    private isMsgActive = true;
    private isTodoActive = false;
    private isUserActive = false;
    private isFileActive = false;
    private isShow = false;
    private account = '';

    toChat(){
      this.isMsgActive = true;
      this.isTodoActive = false;
      this.isUserActive = false;
      this.isFileActive = false;
      this.$router.push({ path: '/' })
    }

    toFileCloud(){
      this.isMsgActive = false;
      this.isTodoActive = false;
      this.isUserActive = false;
      this.isFileActive = true;
      this.$router.push({ path: '/fileCloud' })
    }

    updated(){
      console.log('App updated');
      this.isShow = Cookies.get('x-access-token')?true:false;
      this.account = Cookies.get('account');
    }
  }
</script>

<style lang="less">
html,body,#app {
  width: 100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

ul {
  list-style: none;
}

#app{
  min-width: 360px;
}

.ivu-layout{
  width: 100%;
  height: 100%;
}

.ivu-layout-sider,
.ivu-layout-sider-children,
.ivu-layout-sider-trigger{
  width: 65px !important;
  max-width: 65px !important;
  min-width: 65px !important;
  background: #5095f3;
}

.ivu-layout-header{
  padding: 0 30px !important;
  height: 50px !important;
  line-height: 50px !important;
  background: #ffffff !important;
  border-bottom: solid 1px #e8e8e8;
}

.header-user{
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  &-account{
    margin-left: 10px;
  }
}

.slide-menu{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 80px;
}

.slide-menu > .btn-msg{
  width: 32px;
  height: 32px;
  background:url('./static/images/icon_message.png');
}

.slide-menu > .btn-msg-active {
  background:url('./static/images/icon_message-focus.png');
}

.slide-menu > .btn-msg:hover{
  background:url('./static/images/icon_message-focus.png');
}

.slide-menu > .btn-todo{
  margin-top: 30px;
  width: 32px;
  height: 32px;
  background:url('./static/images/icon_dingtab.png');
}

.slide-menu > .btn-todo-active {
  background:url('./static/images/icon_dingtab-focus.png');
}

.slide-menu > .btn-todo:hover{
  background:url('./static/images/icon_dingtab-focus.png');
}

.slide-menu > .btn-user{
  margin-top: 30px;
  width: 32px;
  height: 32px;
  background:url('./static/images/icon_addresslist.png');
}

.slide-menu > .btn-user-active{
  background:url('./static/images/icon_addresslist-focus.png');
}


.slide-menu > .btn-user:hover{
  background:url('./static/images/icon_addresslist-focus.png');
}

.slide-menu > .btn-file{
  margin-top: 30px;
  width: 32px;
  height: 32px;
  background:url('./static/images/icon_file_fill.png');
}

.slide-menu > .btn-file-active{
  background:url('./static/images/icon_file_fill-focus.png');
}

.slide-menu > .btn-file:hover{
  background:url('./static/images/icon_file_fill-focus.png');
}

.ivu-form-item-content{
  text-align: left !important;
}

.ivu-drawer-header-inner{
  text-align: left !important;
}
.ivu-modal-header-inner,.ivu-modal-body{
  text-align: left;
}
</style>
