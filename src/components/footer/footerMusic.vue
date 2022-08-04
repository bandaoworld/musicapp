<template>
    <div class="footerMusic">
        <van-row justify="space-between" align="center">
            <van-col span="15">
                <div class="footerLeft" @click="updateDetailShow">
                    <img :src="`${playlist[playlistIndex].al.picUrl}?param=150y150`" alt="">
                    <div>
                        <p>{{ playlist[playlistIndex].name }}</p>
                        <span>横滑切换上下首嗷</span>
                    </div>

                </div>
            </van-col>
            <van-col span="5">
                <div class="footerRight">
                    <van-icon name="play-circle-o" size="30" @click="playMusic" v-if="isBtnShow" color="#4b4b4b" />
                    <van-icon name="pause-circle-o" size="30" @click="playMusic" v-else color="#4b4b4b" />
                    <van-icon name="add-square" size="30" color="#4b4b4b" />
                </div>
            </van-col>
        </van-row>
        <!-- 本地使用这个，这里用了代理 -->
        <!-- <audio ref="myAudio" :src="`/api/song/media/outer/url?id=${playlist[playlistIndex].id}.mp3`"></audio> -->
        <!-- 线上使用这个 -->
        <audio ref="myAudio"
            :src="`https://music.163.com/song/media/outer/url?id=${playlist[playlistIndex].id}.mp3`"></audio>
        <van-popup v-model:show="detailShow" position="bottom" duration="0.5s"
            :style="{ height: '100%', width: '100%' }">
            <musicDetail :musicList="playlist[playlistIndex]" :playMusic="playMusic" :isBtnShow="isBtnShow"
                :addDuration="addDuration">
            </musicDetail>
        </van-popup>
    </div>
</template>

<script>
import { mapMutations, mapState, useStore } from 'vuex'
import musicDetail from './musicDetail'
import { onMounted, onUpdated } from "vue"
export default {
    name: "footerMusic",
    setup() {
        const $store = useStore();
        // $store.dispatch("getLyric", this.playlist[this.playlistIndex].id)
        // console.log($store.state);
        onMounted(() => {
            $store.dispatch("getLyric", $store.state.playlist[$store.state.playlistIndex].id)
        })
        onUpdated(() => {
            $store.dispatch("getLyric", $store.state.playlist[$store.state.playlistIndex].id)
        })
    },
    data() {
        return {
            interVal: 0
        }
    },
    computed: {
        ...mapState(['playlist', 'playlistIndex', 'isBtnShow', 'detailShow']),
    },
    // 页面挂载
    mounted() {
        // console.log(this.$refs.myAudio);
        // this.$store.dispatch("getLyric", this.playlist[this.playlistIndex].id)
    },

    // 页面更新
    updated() {
        // this.$store.dispatch("getLyric", this.playlist[this.playlistIndex].id)
        this.addDuration()
    },
    methods: {
        // 判断音乐是否播放
        playMusic(event) {
            if (this.$refs.myAudio.paused) {
                this.$refs.myAudio.play();
                this.updateIsBtnShow(false);
                this.updateTime()  //播放则调用函数传值
            } else {
                this.$refs.myAudio.pause()
                this.updateIsBtnShow(true)
                clearInterval(this.interVal) //暂停清除定时器
            }
        },
        addDuration() {
            this.updateDuration(this.$refs.myAudio.duration)
        },
        updateTime() {
            this.interVal = setInterval(() => {
                this.updateCurrentTime(this.$refs.myAudio.currentTime)
            }, 500)
        },
        ...mapMutations(['updateIsBtnShow', 'updateDetailShow', 'updateCurrentTime', 'updateDuration'])
    },
    watch: {
        playlistIndex() {
            // 监听下标，改变则自动播放音乐
            this.$refs.myAudio.autoplay = true;
            if (this.$refs.myAudio.paused) {
                // 如果本来是暂停状态，改变图标
                this.updateIsBtnShow(false);
            }
        },
        playlist() {
            if (this.isBtnShow) {
                this.$refs.myAudio.autoplay = true;
                this.updateIsBtnShow(false);
            }
        }
    },
    components: {
        musicDetail
    }

}
</script>

<style lang="less" scoped>
.footerMusic {
    width: 100%;
    height: 1.4rem;
    background-color: #fff;
    position: fixed;
    bottom: -0.01rem;
    border-top: 0.04rem solid rgba(97, 97, 97, 0.199);
    padding: 0.2rem;
    box-shadow: 0 0 0.6rem rgba(0, 0, 0, 0.3);

    .footerLeft {
        display: flex;
        align-items: center;
        justify-content: space-around;
        position: absolute;
        top: 0.15rem;

        img {
            width: 1rem;
            border-radius: 50%;
        }

        div {
            position: relative;
            padding-left: 0.2rem;

            p {
                font-size: 0.35rem;
                width: 4.5rem;
                color: #2c2c2c;
                font-weight: 600;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;

            }

            span {
                font-size: 0.25rem;
                color: gray;
            }
        }
    }

    .footerRight {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        top: 0.12rem;

    }
}
</style>