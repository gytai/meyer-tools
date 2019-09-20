<template>
  <div class="file-cloud">
      <div class="file-cloud-header">
        <Breadcrumb separator=">" class="file-cloud-header-breadcrumb">
          <BreadcrumbItem v-for="item,index in breadcrumbItems" v-bind:key="index">
            {{ item }}
          </BreadcrumbItem>
        </Breadcrumb>

        <div class="file-cloud-header-opration">
          <Button class="file-cloud-header-opration-btn" type="primary" icon="ios-add" size="small">上传</Button>
          <Button class="file-cloud-header-opration-btn" type="primary" icon="ios-folder" size="small">新建文件夹</Button>
        </div>
      </div>

      <div class="file-cloud-container">
        <FilePanel v-for="item,index in fileList" v-bind:key="index" :title="item.title" :img="item.img"/>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FilePanel from '@/components/FilePanel.vue'


@Component({
  components: {
    FilePanel
  },
})

export default class Home extends Vue {
  private breadcrumbItems = ['全部文件'];
  private fileList = [{title:"测试1",img:require('../static/images/fileCloud/folder.png')},{title:"测试2",img:require('../static/images/fileCloud/folder.png')}]
}
</script>
<style scoped lang="less">
  .file-cloud{
    width: 100%;
    height: 100%;
    background: white;

    &-header{
      height: 50px;
      background: #ffffff;
      border-bottom: solid 1px #e4e4e4;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding-left: 20px;
      padding-right: 20px;

      &-opration{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;

        &-btn{
          margin-left: 10px;
          height: 25px;
        }
      }
    }

    &-container{
      padding: 15px;
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
    }
  }
</style>
