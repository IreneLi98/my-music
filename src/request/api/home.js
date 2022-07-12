import service from "..";
//轮播图数据
export function getBanner() {
    return service({
        method: 'GET',
        url: '/banner?type=2',
    })
}
//获取发现好歌单数据
export function getMusicList() {
    return service({
        method: 'GET',
        url: '/personalized?limit=10'
    })
}
//获取搜索结果
export function getSearchRes(data) {
    return service({
        method: 'GET',
        url: `/search?keywords=${data}`
    })
}
//验证用户登录
export function getLogin(data) {
    return service({
        method: 'GET',
        url: `/login/cellphone?phone=${data.phone}&password=${data.password}`
    })
}
//获取用户详情
export function getUserInfo(data) {
    return service({
        method: 'GET',
        url: `/user/detail?uid=${data}`
    })
}