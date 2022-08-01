import service from '..'

// 获取轮播图的api,type:资源类型,对应以下类型,默认为 0 即PC
// 1: android;2: iphone;3: ipad
// 获取首页轮播图的数据
export function getBanner(type = 1) {
    return service({
        method: 'GET',
        url: '/banner',
        params: {
            type
        }
    })
}
//获取推荐歌单
export function getMusicList(limit = 10) {
    return service({
        method: 'GET',
        url: '/personalized',
        params: {
            limit
        }
    })
}
//搜索歌曲
export function getSearchMusic(keywords, limit = 30, offset = 0, type = 1) {
    return service({
        method: 'GET',
        url: '/cloudsearch',
        params: {
            keywords,
            limit,
            offset,
            type
        }
    })
}
//登录
export function getPhoneLogin(state) {
    return service({
        method: 'GET',
        url: '/login/cellphone',
        params: {
            phone:state.phone,
            password:state.password,
            captcha:state.captcha
        }
    })
}
//发送验证码
export function getCaptcha(phone) {
    return service({
        method: 'GET',
        url: '/captcha/sent',
        params: {
            phone,
        }
    })
}
//获取用户详情
export function getLoginUser(uid) {
    return service({
        method: 'GET',
        url: '/user/detail',
        params: {
            uid,
        }
    })
}
