<template>
    <van-image :src="`${musicList.al.picUrl}?param=400y400`" alt="" class="bgImg"/>
    <div class="musicDetail">
        <van-row justify="space-between" align="center" class="detailTop">
            <van-col span="2" class="detailTopLeft" @click="backHome">
                <van-icon name="arrow-down" size="30" color="#fff" />
            </van-col>
            <van-col span="14" class="leftMarquee">
                <Vue3Marquee style="color: #fff; font-size: .37rem;">{{ musicList.name }}</Vue3Marquee>
                <span>
                    {{ showAuthor(musicList.ar) }}
                    <van-icon name="arrow" size=".20rem" color="rgba(200, 200, 200, 0.8)" />
                </span>
            </van-col>
            <van-col span="2" class="detailTopRight">
                <van-icon name="share-o" size="30" color="#fff" />
            </van-col>
        </van-row>

        <div class="detailContent" v-show="!isLyricShow">
            <img src="@/assets/needle-ab.png" alt="" class="img_needle" :class="{ img_needle_active: !isBtnShow }">
            <img src="@/assets/cd.png" alt="" class="img_cd"/>
            <van-image round :src="`${musicList.al.picUrl}?param=300y300`" alt="" class="img_al" @click="isLyricShow = true"
                :class="{ img_al_active: !isBtnShow, img_al_paused: isBtnShow }"/>
        </div>

        <div class="musicLyric" ref="musicLyric" v-show="isLyricShow">
            <p v-for="item in lyric" :key="item"
                :class="{ active: (currentTime * 1000 >= item.time && currentTime * 1000 < item.pre) }"
                @click="this.isLyricShow = false;">
                {{ (this.lyricList.lyric[0] == '[') ? item.lrc : item }}
            </p>
        </div>

        <div class="detailFooter">
            <div>
                <van-row justify="space-around" align="center" class="footerTop">
                    <van-col span="4">
                        <van-icon name="like-o" size="30" color="#e7e7e7" />
                    </van-col>
                    <van-col span="4">
                        <van-icon name="down" size="30" color="#e7e7e7" />
                    </van-col>
                    <van-col span="4">
                        <van-icon name="music-o" size="30" color="#e7e7e7" />
                    </van-col>
                    <van-col span="4">
                        <van-icon name="comment-circle-o" size="30" color="#e7e7e7" />
                    </van-col>
                    <van-col span="4">
                        <van-icon name="more-o" size="30" color="#e7e7e7" />
                    </van-col>
                </van-row>
            </div>
            <div class="footerContent">
                <van-row justify="space-between" align="center">
                    <van-col span="1" class="myTime">{{ currentTimeFormat(currentTime) }}</van-col>
                    <van-col span="18">
                        <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05">
                    </van-col>
                    <van-col span="1" class="myTime">{{ currentTimeFormat(duration) }}</van-col>
                </van-row>
            </div>
            <div class="footer">
                <van-row justify="space-around" align="center" class="footerTop">
                    <van-col span="4">
                        <van-icon name="replay" size="30" color="#e7e7e7" />
                    </van-col>
                    <van-col span="4">
                        <svg class="icon" aria-hidden="true" @click="playSong(-1)">
                            <use xlink:href='#icon_lastSong'></use>
                        </svg>
                    </van-col>
                    <van-col span="6" @click="playMusic" v-if="isBtnShow">
                        <van-icon name="play-circle-o" size="40" color="#e7e7e7" />
                    </van-col>
                    <van-col span="6" @click="playMusic" v-else>
                        <van-icon name="pause-circle-o" size="40" color="#e7e7e7" />
                    </van-col>
                    <van-col span="4">
                        <svg class="icon" aria-hidden="true" @click="playSong(1)">
                            <use xlink:href='#icon_nextSong'></use>
                        </svg>
                    </van-col>
                    <van-col span="4">
                        <van-icon name="bars" size="30" color="#e7e7e7" />
                    </van-col>
                </van-row>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue'
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { mapMutations, mapState } from 'vuex'
export default {
    name: "musicDetail",
    props: ['musicList', 'playMusic', 'isBtnShow', 'addDuration'],
    components: {
        Vue3Marquee,
    },
    setup(props) {

        function showAuthor(authorList) {
            const authors = reactive([])
            for (let i = 0; i < authorList.length; i++) {
                authors.push(authorList[i].name)
            }
            let author = authors.join('/')
            return author
        }
        function currentTimeFormat(time) {
            // https://segmentfault.com/a/1190000040388316
            if (!time) return '00:00'
            let interval = Math.floor(time)
            let minute = (Math.floor(interval / 60)).toString().padStart(2, '0')
            let second = (interval % 60).toString().padStart(2, '0')
            return `${minute}:${second}`
        }
        return {
            showAuthor,
            currentTimeFormat
        }
    },
    data() {
        return {
            isLyricShow: false
        }
    },
    methods: {
        backHome() {
            this.isLyricShow = false;
            this.updateDetailShow();
        },
        playSong(num) {
            let index = this.playlistIndex + num
            if (index < 0) {
                index = this.playlist.length
            } else if (index == this.playlist.length) {
                index = 0
            }
            this.updatePlaylistIndex(index)

        },
        ...mapMutations(['updateDetailShow', 'updatePlaylistIndex']),
    },
    computed: {
        ...mapState(['lyricList', 'currentTime', 'playlistIndex', 'playlist', 'duration']),
        lyric() {
            let arr;
            if (this.lyricList.lyric) {
                if (this.lyricList.lyric[0] == '[') {
                    // 删除结尾换行
                    this.lyricList.lyric = this.lyricList.lyric.substring(0, this.lyricList.lyric.length - 1);

                    arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
                        let min = item.slice(1, 3);
                        let sec = item.slice(4, 6);
                        let mill = item.slice(7, item.indexOf(']'));
                        let lrc = item.slice(item.indexOf(']') + 1, item.length)

                        let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
                        // console.log(min, sec, mill, lrc);
                        return { min, sec, mill, lrc, time }
                    })
                    arr.forEach((item, i) => {
                        if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
                            item.pre = 100000
                        } else {
                            item.pre = arr[i + 1].time
                        }
                    })
                } else { //没有时间码
                    console.log("该歌词现在无法滚动");
                    arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/)
                }
            }
            // console.log(arr);
            return arr
        }
    },
    watch: {
        currentTime: {
            handler(newValue) {
                if (this.lyricList.lyric[0] == '[') {
                    let p = document.querySelector("p.active")
                    try {
                        if (p.offsetTop > 300) {
                            console.log([p][0].innerHTML);
                            this.$refs.musicLyric.scrollTop = p.offsetTop - 320
                        }
                    }
                    catch {
                        console.log("歌词滚动不了");
                    }
                }
                if (newValue === this.duration) {

                    if (this.playlistIndex == this.playlist.length - 1) {
                        this.updatePlaylistIndex(0)
                        this.playMusic()
                    } else {
                        this.updatePlaylistIndex(this.playlistIndex + 1)
                    }
                }
            },
            deep: true,

        }
    },
    mounted() {
        this.addDuration()
        console.log(this.lyricList.lyric);
    }
}
</script>

<style lang="less" scoped>
.musicDetail {
    backdrop-filter: saturate(150%) contrast(50%) blur(0.32rem);
    position: relative;
    height: 100%;
}

.bgImg {
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: -1;
    overflow: hidden;
    background-size: cover;
}


.detailTop {
    position: relative;
    height: 1.2rem;
    padding: 0.3rem;


    .detailTopLeft {
        text-align: center;
    }

    .leftMarquee {
        text-align: center;
        display: flex;
        align-items: center;
        flex-direction: column;

        .leftMarquee {
            color: #fff;
            font-size: 0.35rem;
        }

        span {
            color: rgba(200, 200, 200, 0.8);
            font-size: .27rem;
        }
    }

    .detailTopRight {
        text-align: center;
    }
}

.detailContent {
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    top: 1.2rem;

    .img_needle {
        width: 2.6rem;
        height: 3.7rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(-15deg);
        transition: all 2s;
        z-index: 2;
    }

    .img_needle_active {
        width: 2.6rem;
        height: 3.7rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(0deg);
        transition: all 2s;
        z-index: 2;
    }

    .img_cd {
        width: 6.5rem;
        height: 6.5rem;
        position: absolute;
        bottom: 0.7rem;
        z-index: 1;
    }

    .img_al {
        width: 4.5rem;
        height: 4.5rem;
        border-radius: 50%;
        position: absolute;
        bottom: 1.7rem;
        z-index: 1;
        // 名称 时间 匀速 无限循环
        animation: rotate_al 20s linear infinite;

    }

    .img_al_active {
        animation-play-state: running;
    }

    .img_al_paused {
        animation-play-state: paused;
    }

    @keyframes rotate_al {
        0% {
            transform: rotateZ(0deg)
        }

        100% {
            transform: rotateZ(360deg)
        }
    }
}

.musicLyric {
    width: 100%;
    height: 14rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0.2rem;
    // overflow: scroll;
    overflow-x: hidden;
    padding: 0.6rem;
    padding-right: 0.8rem;
    padding-left: 0.8rem;

    &::-webkit-scrollbar {
        padding-right: 0.1rem;
        width: 0.1rem;
        height: 0.1rem;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 0.4rem;
        background: #c5c5c56b;
    }

    &::-webkit-scrollbar-button {}

    &::-webkit-scrollbar-track {
        border-radius: 0.4rem;
        background: #c5c5c523;
    }

    p {
        font-size: 0.3rem;
        color: #e7e7e7b0;
        margin-bottom: .6rem;
        transition-property: color, font-size;
        transition-duration: 0.5s, 0.5s;
    }

    .active {
        color: #f3f3f3dc;
        font-size: 0.35rem;
    }
}

.detailFooter {
    position: absolute;
    bottom: 0;
    right: 1%;
    left: 1%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    text-align: center;

    .footerTop {
        height: 1rem;
        padding: 0.2rem;
        width: 8rem;
        text-align: center;
        position: relative;
    }

    .footerContent {
        // width: 7rem;
        padding: 0.2rem 0.3rem 0.2rem 0;
        text-align: center;

        .myTime {
            font-size: 0.25rem;
            color: rgba(238, 238, 238, 0.8);
        }

        .range {
            text-align: center;
            margin-bottom: 0.23rem;
            width: 6rem;
            height: 0.06rem;

            // https://blog.csdn.net/m0_47587616/article/details/108284878
            // 进度条
            -webkit-appearance: none;
            appearance: none;
            /* outline设置为零防止点到空白区域时会出现边框影响美观性问题 */
            outline: 0;
            border: 0;
            /* 背景色设置为渐变色，有兼容性问题谨慎使用 */
            background: linear-gradient(to right, rgb(255, 141, 107), rgb(255, 87, 87));
            border-radius: 0 0.5rem 0.5rem 0;

            &::-webkit-slider-thumb {
                appearance: none;
                -webkit-appearance: none;
                height: 0.2rem;
                width: 0.2rem;
                border-radius: 50%;
                background-color: white;
                border: 0.1rem solid rgb(245, 95, 95);
            }
        }
    }

    .footer {
        height: 1.6rem;
        padding: 0.1rem;

        .icon {
            width: 0.7rem;
            height: 0.7rem;
            fill: #e7e7e7;
        }
    }
}
</style>