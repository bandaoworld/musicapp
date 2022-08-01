import { createStore } from 'vuex'
import { getMusicLyric } from '@/request/api/item'
import { getPhoneLogin } from '@/request/api/home'
export default createStore({
    state: {
        playlist: [{         //播放列表
            al: {
                id: 357301093,
                name: "Legend of Redemption 宽怀的传说",
                pic: 109951165434255510,
                picUrl: "http://p2.music.126.net/yoRaxBY77koSqhjh52g-DA==/109951165434255510.jpg",
                pic_str: "109951165434255510"
            },
            ar: [
                { "id": 963431, "name": "陈致逸", "tns": [], "alias": [] },
                { "id": 12487174, "name": "HOYO-MiX", "tns": [], "alias": [] }
            ],
            id: 1492276425,
            name: "Legend of Redemption 宽怀的传说",
        }],
        playlistIndex: 0,   //默认下表为0
        isBtnShow: true,     //暂停按钮的显示
        detailShow: false,    //歌曲详情页的显示
        lyricList: {},            //歌词部分
        currentTime: 0,          // 当前时间
        duration: 0,             // 歌曲总时长
        isLogin: false,         // 判断是否登录
        isFooterMusic: true,    // 是否需要底部组件
        token: '',   // 登录Token
        user: {},    // 用户信息
    },
    getters: {
    },
    mutations: {
        updateIsBtnShow(state, value) {
            state.isBtnShow = value
        },
        updatePlaylist(state, value) {
            state.playlist = value
        },
        updatePlaylistIndex(state, value) {
            state.playlistIndex = value
        },
        updateDetailShow(state) {
            state.detailShow = !state.detailShow
        },
        updateLyricList(state, value) {
            state.lyricList = value
        },
        updateCurrentTime(state, value) {
            state.currentTime = value
        },
        updateDuration(state, value) {
            state.duration = value
        },
        updateIsLogin(state, value) {
            state.isLogin = value
        },
        updateToken(state, value) {
            state.token = value
            localStorage.setItem('token', value)
        },
        updateUser(state, value) {
            state.user = value
        },

    },
    actions: {
        async getLyric(context, musicId) {
            try {
                let response = await getMusicLyric(musicId)
                // console.log(response);
                context.commit("updateLyricList", response.data.lrc)
                console.log("歌词获取成功");
            }
            catch {
                console.log("歌词获取失败");
            }
        },
        async getLogin(context, value) {
            let response = getPhoneLogin(value)
            console.log(response);
        }

    },
    modules: {
    }
})