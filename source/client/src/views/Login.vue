<template>
    <div class="login-body">
        <div class="site-login">
            <Card>
                <p slot="title">登录面板</p>
                <Form @submit.native.prevent>
                    <FormItem prop="user">
                        <Input type="text" v-model="account" placeholder="Username">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="password" placeholder="Password">
                            <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button class="login-btn" type="primary" @click="handleSubmit">登录</Button>
                    </FormItem>
                </Form>
            </Card>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {apiLogin, apiLogout} from '@/api/users';
    import Cookies from 'js-cookie'

    @Component
    export default class Home extends Vue {
        private account =  '';
        private password= '';

        handleSubmit () {
            apiLogin({
                account:this.account,
                password: this.password
            }).then( res => {
                Cookies.set('x-access-token',res.token);
                Cookies.set('account',this.account);
                Cookies.set('avatar','http://lorempixel.com/100/100/');
                Cookies.set('name',res.name);
                this.$router.push({ path: '/' })
            }).catch( err => {
                console.log(err);
            })
        }
    }
</script>

<style scoped>
    .login-body{
        width: 100%;
        height: 100%;
        background-image: url('../static/images/login-bg.jpg');
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .site-login{
        position: absolute;
        right: 160px;
        top: 50%;
        -webkit-transform: translateY(-60%);
        transform: translateY(-60%);
        width: 300px;
        min-width: 460px;
    }
    .ivu-form-item {
        width: 100%;
    }
    .login-btn{
        width: 100%;
    }
</style>
