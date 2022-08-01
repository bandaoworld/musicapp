<template>
    <div class="infoUserView">
        <van-image :src="user.profile.backgroundUrl" alt="" class="bgImg"/>
        <div class="bigUserInfo">
            <van-image round width="1.5rem" height="1.5rem" :src="user.profile.avatarUrl" class="avatar" />
            <div class="userInfo">
                <p>{{ user.profile.nickname }}</p>
                <van-row justify="center" align="center" class="followsAndFolloweds">
                    <van-col span="5">
                        <span>{{ user.profile.follows }}关注</span>
                    </van-col>
                    <van-col span="5">
                        <span>{{ user.profile.followeds }}关注</span>
                    </van-col>
                    <van-col span="5">
                        <span>uid:{{ user.profile.userId }}</span>
                    </van-col>
                </van-row>
                <van-button type="primary" @click="deleteToken" class="deleteToken">删除localStorage的token，并返回上一页
                </van-button>
            </div>
        </div>
    </div>
    <div class="myLike">
        <div class="likeSpan">
            <span>我喜欢的</span>
        </div>
        <musicPlaylist :itemList="state.itemList"></musicPlaylist>
    </div>
</template>

<script>
import musicPlaylist from '@/components/item/musicPlaylist'
import { reactive, onMounted } from 'vue'
import { getMusicItemList, getItemList } from '@/request/api/item'
import { mapState } from 'vuex'
export default {
    name: "infoUserView",
    setup() {
        const user = {
            "code": 200,
            "profile": {
                "backgroundUrl": "https://p4.music.126.net/O2jCbja9CUsaj3c17S8kyA==/18589443092870290.jpg",
                "nickname": "半岛的孤城",
                "followeds": 7,
                "follows": 113,
                "avatarUrl": "https://p3.music.126.net/mGZNPrGFey51Qoa8Lcfn6g==/109951163273589284.jpg",
                "userId": 357301093,
            },
        }
        const state = reactive({
            // 歌单详情页数据
            playlist: {},
            // 歌单歌曲
            itemList: {}
        })
        onMounted(async () => {
            let playlistId = 503031497

            // 获取歌单详情
            let response = await getMusicItemList(playlistId)
            console.log("歌单详情获取成功");
            // console.log(response);
            state.playlist = response.data.playlist

            // 获取歌单歌曲
            let musicList = await getItemList(playlistId)
            console.log("歌单歌曲获取成功");
            state.itemList = musicList.data.songs
            // console.log(musicList);

            // 防止页面刷新导致数据丢失，将数据保存到sessionStorage
            sessionStorage.setItem('itemDetail', JSON.stringify(state));
        })
        return {
            user,
            state
        }
    },
    computed: {
        ...mapState(['user']),

    },
    mounted() {
        console.log(this.user);
    }
    ,
    methods: {
        deleteToken() {
            localStorage.removeItem('token')
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="less" scoped>
.bgImg {
    position: absolute;
    width: 100%;
    height: 10rem;
    z-index: -1;
    filter: blur(0.2rem);
}

.bigUserInfo {
    padding: 0.2rem;
    padding-top: 3rem;
    text-align: center;

    .avatar {
        display: inline-block;
    }

    .userInfo {
        margin-top: -0.8rem;
        width: 100%;
        height: 4rem;
        background-color: #f3f3f3;
        border-radius: 0.4rem;
        padding-top: 0.9rem;

        p {
            font-size: 0.45rem;
            font-weight: 700;
        }

        .followsAndFolloweds {
            padding-top: 0.2rem;

            span {
                color: #c5c5c5;
            }
        }

        .deleteToken {
            margin-top: 0.4rem;
            font-size: 0.3rem;
        }
    }

}

.myLike {
    background-color: #fff;
    border-top-left-radius: 0.4rem;
    border-top-right-radius: 0.4rem;

    .likeSpan {
        padding: 0.15rem;
        text-align: center;
        font-size: 0.45rem;
        font-weight: 700;
    }
}
</style>