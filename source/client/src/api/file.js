/**
 * Author: TaiGuangYin
 * Created Time: 2019-09-24
 * Description: 文件请求接口
 */
import service from '../utils/axiosHelper';

function apiCreatFile(data) {
    return service({
        url: '/api/file/create',
        method: 'post',
        data
    })
}

function apiListFile(data) {
    return service({
        url: '/api/file/list',
        method: 'get',
        data
    })
}

export {
    apiCreatFile,apiListFile
}
