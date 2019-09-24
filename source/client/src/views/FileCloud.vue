<template>
    <div class="file-cloud">
        <div class="file-cloud-header">
            <Breadcrumb separator=">" class="file-cloud-header-breadcrumb">
                <BreadcrumbItem v-for="item,index in breadcrumbItems" v-bind:key="index">
                    {{ item }}
                </BreadcrumbItem>
            </Breadcrumb>

            <div class="file-cloud-header-opration">
                <Button class="file-cloud-header-opration-btn" type="primary" icon="ios-add" size="small" @click="drawerShow = true">添加</Button>
            </div>
        </div>

        <div class="file-cloud-container">
            <FilePanel v-for="item,index in fileList" v-bind:key="index" :name="item.name" :img="item.img"/>
        </div>

        <Drawer
                title="添加"
                v-model="drawerShow"
                width="300"
                :mask-closable="false"
                :styles="styles"
        >
            <Form :model="formData" label-position="left" :label-width=80>
                <FormItem label="类型">
                    <RadioGroup v-model="formData.type">
                        <Radio label="1">文件夹   </Radio>
                        <Radio label="2">文件</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="私有">
                    <RadioGroup v-model="formData.is_public">
                        <Radio label="0">是</Radio>
                        <Radio label="1">否</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="名称">
                    <Input v-model="formData.name" placeholder="请输入文件夹或者文件名称"></Input>
                </FormItem>

                <Upload
                        v-show="formData.type == 2"
                        type="drag"
                        action="/api/upload">
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>点击或者拖拽文件到这里进行上传</p>
                    </div>
                </Upload>
            </Form>
            <div class="file-cloud-drawer-footer">
                <Button style="margin-right: 8px" @click="drawerShow = false">取消</Button>
                <Button type="primary" @click="createFile">提交</Button>
            </div>
        </Drawer>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import FilePanel from '@/components/FilePanel.vue'
    import {apiListFile, apiCreatFile} from '@/api/file';

    @Component({
        components: {
            FilePanel
        },
    })

    export default class Home extends Vue {
        private breadcrumbItems = ['全部文件'];
        private currentFileId = 0;
        private drawerShow = false;
        private fileList = [{name: "测试1", img: require('../static/images/fileCloud/folder.png')}];
        private styles = {
            height: 'calc(100% - 55px)',
            overflow: 'auto',
            paddingBottom: '53px',
            position: 'static'
        };
        private formData = {
            name: '',
            type: "1",
            pid: '',
            is_public: '0'
        };

        listFile(pid: Number) {
            const params = {
                pid: pid
            };
            apiListFile(params).then(res => {
                this.fileList = res
            })
        }

        createFile(){
            const params = {
                pid: this.currentFileId,
                name: this.formData.name,
                type: this.formData.type,
                is_public: this.formData.is_public,
            };
            apiCreatFile(params).then( () => {
                this.listFile(this.currentFileId);
                this.$Message.success('添加成功')
            })
        }

        mounted() {
            this.listFile(this.currentFileId);
        }
    }
</script>
<style scoped lang="less">
    .file-cloud {
        width: 100%;
        height: 100%;
        background: white;

        &-header {
            height: 50px;
            background: #ffffff;
            border-bottom: solid 1px #e4e4e4;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding-left: 20px;
            padding-right: 20px;

            &-opration {
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                align-items: center;

                &-btn {
                    margin-left: 10px;
                    height: 25px;
                }
            }
        }

        &-container {
            padding: 15px;
            height: calc(100% - 50px);
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
        }

        &-drawer-footer{
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            border-top: 1px solid #e8e8e8;
            padding: 10px 16px;
            text-align: right;
            background: #fff;
        }
    }
</style>
