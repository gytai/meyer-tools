<template>
  <div class="todo">
    <h2 class="todo-count">待办: <span>{{ todoCount }}</span></h2>
    <div class="todo-item">
      <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" class="todo-item-datetime"
                  @on-change="handleChange" :options="options" :editable="false"></DatePicker>
      <Input class="todo-item-input" placeholder="写下你的待办事项" v-model="todoItem.content" @on-enter="handleInput">
        <Icon type="ios-alarm" slot="suffix" v-show="todoItem.end_time"/>
      </Input>
    </div>
    <div class="todo-list">
      <Timeline pending>
        <TimelineItem v-for="item,index in todoList" @click.native="handleItemClick(item.id,index)"
                      class="todo-list-item" v-bind:key="index" v-show=" (showFinished && item.is_finished) || !item.is_finished">
          <Icon type="ios-trophy" slot="dot" v-if="item.is_finished"></Icon>
          <span>{{ item.content}}</span>  <span class="todo-list-item-datetime" v-if="item.end_time"> <Time :time="item.end_time" :interval="1"/></span>
        </TimelineItem>
        <TimelineItem class="todo-list-item" @click.native="showFinished = !showFinished">显示已完成事项</TimelineItem>
      </Timeline>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import {apiCreate, apiUpdate, apiList} from '@/api/todo';
  import moment from 'moment';

  @Component
  export default class Todo extends Vue {
      private showFinished = false;
      private todoList = [];

      private options = {
        disabledDate (date) {
          return date && date.valueOf() < Date.now();
        }
      };

      private todoItem = {
        content:'',
        end_time:''
      };

      get todoCount(){
        const result = this.todoList.filter(item => !item.is_finished);
        return result.length;
      }

      handleChange (date) {
        this.todoItem.end_time = date;
      }

      handleItemClick( id,index ){
        if(this.todoList[index].is_finished){
          return;
        }
        apiUpdate({id:id}).then( () => {
          this.todoList[index].is_finished = true;
          this.$Message.success('厉害了美亚小哥哥')
        }).catch( err => {
          console.error(err);
        })
      }

      handleInput(){
        if(!this.todoItem.content){
          this.$Message.warning('请填写事项内容')
          return
        }
        if(!this.todoItem.end_time){
          this.$Message.warning('请选择事项结束时间')
          return
        }
        apiCreate(this.todoItem).then( ret => {
          this.todoList.push(ret)
        }).catch( err => {
          console.error(err);
        })
      }

      mounted(){
        apiList().then( ret => {
          ret.forEach( d => {
            if(d.end_time){
              d.end_time = moment(d.end_time).format('YYYY-MM-DD HH:mm:ss')
            }
            this.todoList.push(d);
          });

        }).catch( err => {
          console.error(err);
        })
      }
  }

</script>
<style scoped lang="less">
  .todo{
    width: 100%;
    height: 100%;
    padding: 15px;
    background: white;

    &-count{
      text-align: left;
    }

    &-item{
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;

      &-input{
        width: 100%;
        margin-left: 5px;
      }

      &-datetime{
        width: 180px;
      }
    }

    &-list{
      width: 100%;
      height: calc(100% - 75px);
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding-top: 40px;
      overflow-y: auto;

      &-item{
       cursor: pointer;

        &-datetime{
          margin-left: 20px;
          color: red;
        }
      }
    }
  }
</style>
<style>
  .todo .ivu-input{
    background-color: #ebeef0;
  }
  .todo .ivu-timeline-item-content{
    text-align: left;
  }
  .todo .ivu-select-dropdown{
    right: 5px;
  }
</style>
