/**
 * Author: TaiGuangYin
 * Created Time: 2019-09-24
 * Description: axios 封装
 */

import axios from "axios";
import qs from "qs";
import config from '../config';
import { Message } from 'iview'
import Cookies from 'js-cookie'

const service = axios.create({
    baseURL: config.BASE_URL,  // api的base_url
    timeout: 5000,  // 请求超时时间
});

let loading = null;

//request拦截器
service.interceptors.request.use(config => {
    loading = Message.loading({
        content: 'Loading...',
        duration: 0
    });

    setTimeout(loading,5000);

    config.method === 'post'
        ? config.data = qs.stringify({...config.data})
        : config.params = {...config.data};
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    config.headers['x-access-token'] = Cookies.get('x-access-token');
    return config;
}, error => {  //请求错误处理
    Message.error(error);
    Promise.reject(error)
});

/****** respone拦截器==>对响应做处理 ******/
service.interceptors.response.use(
    response => {  //成功请求到数据
        setTimeout(loading,1);
        //这里根据后端提供的数据进行对应的处理
        if (response.data.code === 200) {
            return response.data.data;
        }
        else if(response.data.code === 505){
            Cookies.remove('x-access-token');
            location.reload();
        }else {
            Message.error(response.data.msg)
            return Promise.reject(response.data)
        }
    },
    error => {  //响应错误处理
        console.error(error);
        setTimeout(loading,1);
        let text = JSON.parse(JSON.stringify(error)).response.status === 404
            ? '404'
            : '网络异常，请重试';
        Message.error(text);

        return Promise.reject(error)
    }
);

export default service;
