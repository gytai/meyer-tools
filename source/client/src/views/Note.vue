<template>
  <div class="note">
    <Tree class="note-menu" :data="menuData"></Tree>
    <mark-down class="note-editor" @on-save="saveMarkdown" :initialValue="initialValue" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MarkDown from 'vue-meditor';


@Component({
  components: {
    MarkDown
  }
})

export default class Note extends Vue {
  private menuData = [
    {
      id:0,
      title: '我的文件夹',
      expand: true,
      selected: true,
      children: [
        {
          id:1,
          title: 'parent 1-1',
          expand: true,
          children: [
            {
              title: 'leaf 1-1-1',
            },
            {
              title: 'leaf 1-1-2'
            }
          ]
        },
        {
          id:2,
          title: 'parent 1-2',
          expand: true,
          children: [
            {
              title: 'leaf 1-2-1',
            },
            {
              title: 'leaf 1-2-1'
            }
          ]
        }
      ]
    }
  ] ;
  private initialValue = '';

  // MarkDown 自动保存
  saveMarkdown(value){
    console.log(value);
  }

  mounted(){

  }
}
</script>
<style scoped lang="less">
  .note{
    width: 100%;
    height: 100%;
    text-align: left;
    display: flex;
    flex-direction: row;

    &-menu{
      width: 200px;
      height: 100%;
    }

    &-editor{
      width: calc(100% - 200px);
      height: 100% !important;
    }
  }
</style>
<style>
  .markdown-preview Light{
    text-align: left;
  }
</style>
