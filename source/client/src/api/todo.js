/**
 * Author: TaiGuangYin
 * Created Time: 2019-09-24
 * Description: 用户请求接口
 */
import service from '../utils/axiosHelper';

function apiCreate(data) {
    return service({
        url: '/api/todo/create',
        method: 'post',
        data
    })
}

function apiList(data) {
    return service({
        url: '/api/todo/list',
        method: 'get',
        data
    })
}

function apiUpdate(data) {
    return service({
        url: '/api/todo/update',
        method: 'post',
        data
    })
}

export {
    apiCreate, apiList, apiUpdate
}
