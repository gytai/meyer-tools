/**
 * Author: TaiGuangYin
 * Created Time: 2019-09-24
 * Description: 用户请求接口
 */
import service from '../utils/axiosHelper';

function apiLogin(data) {
    return service({
        url: '/api/users/login',
        method: 'post',
        data
    })
}

function apiLogout(data) {
    return service({
        url: '/api/users/logout',
        method: 'post',
        data
    })
}

export {
    apiLogin, apiLogout
}
