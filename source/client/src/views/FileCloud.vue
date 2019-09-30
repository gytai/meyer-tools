<template>
    <div class="file-cloud">
        <div class="file-cloud-header">
            <Breadcrumb separator=">" class="file-cloud-header-breadcrumb">
                <BreadcrumbItem v-for="item,index in breadcrumbItems" v-bind:key="index" :pid="item.id"
                                v-on:click.native="handleBreadcrumbClick(index,item.id)">
                    {{ item.name }}
                </BreadcrumbItem>
            </Breadcrumb>

            <div class="file-cloud-header-opration">
                <Button class="file-cloud-header-opration-btn" type="primary" icon="ios-add"
                        size="small" @click="drawerShow = true">添加</Button>
            </div>
        </div>

        <div class="file-cloud-container">
            <FilePanel v-for="item,index in fileList" v-bind:key="index" :name="item.name"
                       :img="item.img"
                       v-on:dblclick.native="handleFileDblClick(item.type,item.id,item.name,item.preview_path)"
                       v-on:click.native="handleFileClick(item.id,item.type,item.name,item.is_public,item.is_share,item.preview_path)"
            />
        </div>

        <Drawer
                title="添加"
                v-model="drawerShow"
                width="300"
                :mask-closable="false"
                :styles="styles">
            <Form :model="formData" label-position="left" :label-width=60>
                <FormItem label="类型">
                    <RadioGroup v-model="formData.type">
                        <Radio label="1">文件夹</Radio>
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
                        :headers="uploadHeaders"
                        :on-success="handleSuccess"
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
        <Drawer
                title="文件属性"
                v-model="drawerInfoShow"
                width="300"
                :mask-closable="false"
                :styles="styles">
            <Form :model="formData" label-position="left" :label-width=60>
                <FormItem label="私有">
                    <RadioGroup v-model="fileInfoData.is_public">
                        <Radio label="0">是</Radio>
                        <Radio label="1">否</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="名称">
                    <Input v-model="fileInfoData.name" placeholder="请输入文件夹或者文件名称"></Input>
                </FormItem>
                <FormItem label="分享" v-show="fileInfoData.type == 2">
                    <i-switch v-model="fileInfoData.is_share" size="large">
                        <span slot="1">开启</span>
                        <span slot="0">关闭</span>
                    </i-switch>
                </FormItem>
                <FormItem label="分享链接" v-show="fileInfoData.is_share">
                    {{ server_url + fileInfoData.preview_path }}
                </FormItem>
            </Form>
            <div class="file-cloud-drawer-footer">
                <Button style="margin-right: 8px" @click="drawerInfoShow = false">取消</Button>
                <Button style="margin-right: 8px" type="primary"
                        @click="updateFile(fileInfoData.id,fileInfoData.is_public,
                        fileInfoData.name,fileInfoData.is_share,fileInfoData.type)">更新</Button>
                <Button type="error" @click="modalDelete = true;">删除</Button>
            </div>
        </Drawer>
        <Modal
                v-model="modalDelete"
                title="确认删除"
                @on-ok="deleteFile"
                @on-cancel="cancel">
            <p>您是否确认删除这个文件?</p>
        </Modal>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import FilePanel from '@/components/FilePanel.vue'
    import {apiListFile, apiCreatFile, apiUpdateFile, apiDeleteFile} from '@/api/file';
    import Cookies from 'js-cookie'
    import {HOST_URL} from "@/config";

    @Component({
        components: {
            FilePanel
        },
    })

    export default class Home extends Vue {
        private breadcrumbItems = [{name:'全部文件',id:0}];
        private currentFileId = 0;
        private drawerShow = false;
        private drawerInfoShow = false;
        private modalDelete = false;
        private clickTimeId = 0;
        private server_url = HOST_URL;
        private uploadHeaders = {
            'x-access-token': Cookies.get('x-access-token')
        };

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
            is_public: '0',
            preview_path: '',
            storage_path: '',
            is_share: false
        };

        private fileInfoData = {
            id: 0,
            pid: 0,
            name: '',
            type: 1,
            is_public: '0',
            preview_path:'',
            is_share: false
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
                preview_path: this.formData.preview_path,
                storage_path: this.formData.storage_path
            };
            apiCreatFile(params).then( () => {
                this.formData.name = '';
                this.formData.type = "1";
                this.formData.is_public = "0";
                this.formData.preview_path = '';
                this.formData.storage_path = '';

                this.listFile(this.currentFileId);
                this.drawerShow = false;
                this.$Message.success('添加成功')
            }).catch( err => {
                console.log(err);
            })
        }

        deleteFile(){
            apiDeleteFile({
                id: this.fileInfoData.id,
                type: this.fileInfoData.type
            }).then( () => {
                this.listFile(this.currentFileId);
                this.drawerInfoShow = false;
                this.$Message.success('删除成功')
            }).catch( err => {
                console.log(err);
            })
        }

        updateFile(id,is_public,name,is_share,type){
            apiUpdateFile({
                id: id,
                is_public: is_public,
                name: name,
                is_share: is_share?1:0,
                type: type
            }).then( () => {
                this.listFile(this.currentFileId);
                this.drawerInfoShow = false;
                this.$Message.success('更新成功')
            }).catch( err => {
                console.log(err);
            })
        }

        handleSuccess (res, file) {
            if(res.code == 200){
                this.formData.preview_path = res.data.previewPath;
                this.formData.storage_path = res.data.storagePath;
                if(!this.formData.name){
                    this.formData.name = file.name;
                }else{
                    let extIndex = file.name.lastIndexOf('.');
                    let ext = file.name.substr(extIndex);
                    this.formData.name = this.formData.name + ext;
                }
            }else{
                this.$Message.error('文件上传失败');
            }
        }

        handleFileDblClick(type,id,name,preview_path){
            clearTimeout(this.clickTimeId);
            if(type == 1){
                this.currentFileId = id;
                this.listFile(this.currentFileId);

                this.breadcrumbItems.push({
                    name: name,
                    id: id
                });
            }else{
                window.open(preview_path)
            }
        }

        handleFileClick(id,type,name,is_public,is_share,preview_path){
            clearTimeout(this.clickTimeId);
            // 加定时器防止单击事件和双击事件有冲突
            this.clickTimeId = setTimeout(() =>  {
                this.fileInfoData.id = id;
                this.fileInfoData.name = name;
                this.fileInfoData.type = type;
                this.fileInfoData.is_public = is_public + '';
                this.fileInfoData.is_share = is_share == 1?true:false;
                this.fileInfoData.preview_path = preview_path;
                this.drawerInfoShow = true;
            }, 250);
        }

        handleBreadcrumbClick(index,id){
            this.breadcrumbItems = this.breadcrumbItems.slice(0,index+1);
            this.currentFileId = id;
            this.listFile(this.currentFileId);
        }

        cancel(){
            this.modalDelete = false;
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

            &-breadcrumb{
                cursor: pointer;
            }

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
            flex-wrap: wrap;
            align-content:flex-start;
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
