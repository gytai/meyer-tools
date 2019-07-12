<template>
  <div id="app">
    <Layout>
      <Sider hide-trigger>
        <div class="slide-menu">
          <div class="btn-msg" title="聊天"></div>
          <div class="btn-todo" title="任务"></div>
          <div class="btn-user" title="通讯录"></div>
        </div>
      </Sider>
      <Layout>
        <Header>
          <div class="header-user">
            <Avatar icon="ios-person"/>
          </div>
        </Header>
        <Content> <router-view/></Content>
        <!--<Footer>Footer</Footer>-->
      </Layout>
    </Layout>
  </div>
</template>

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

.slide-menu > .btn-todo:hover{
  background:url('./static/images/icon_dingtab-focus.png');
}

.slide-menu > .btn-user{
  margin-top: 30px;
  width: 32px;
  height: 32px;
  background:url('./static/images/icon_addresslist.png');
}

.slide-menu > .btn-user:hover{
  background:url('./static/images/icon_addresslist-focus.png');
}
</style>
