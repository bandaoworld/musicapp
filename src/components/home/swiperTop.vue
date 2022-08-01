<template>
    <div class="swiperTop">
        <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item v-for="(image, index) in state.images" :key="index" @click="bannerClick(index)">
                <img :src="image.pic" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
import axios from 'axios'
import { getBanner } from '@/request/api/home.js'
import { reactive, onMounted } from "vue"
export default {
    name: 'swiperTop',
    setup() {
        const state = reactive({
            images: [
                'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
                'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
            ]
        })

        onMounted(async () => {
            let response = await getBanner(2)
            console.log("banner信息获取成功");
            state.images = response.data.banners
            // console.log(response);
        })

        function bannerClick(index) {
            if (state.images[index].targetType == 1) {
                // 歌曲
                let songId = state.images[index].song.id
                location.assign(`https://music.163.com/#/song?id=${songId}`)
            } else if (state.images[index].targetType == 1000) {
                // 策划类
                let targetId = state.images[index].targetId
                location.assign(`https://music.163.com/playlist?id=${targetId}`)
            }
            else if (state.images[index].targetType == 10) {
                // 新专辑
                let targetId = state.images[index].targetId
                location.assign(`https://music.163.com/#/album?id=${targetId}`)
            }
            else {
                try {
                    location.assign(state.images[index].url)
                }
                catch {
                    console.log("打不开了，算了");
                }
            }

        }
        return {
            state,
            bannerClick
        }
    }
}
</script>

<style lang="less" scoped>
.swiperTop {
    .van-swipe {
        width: 100%;
        height: 3rem;

        .van-swipe-item {
            padding: 0 0.2rem;

            img {
                width: 100%;
                height: 100%;
                border-radius: 0.2rem;
            }
        }
    }

    /deep/.van-swipe__indicator--active {
        background-color: #e34d59;
    }
}
</style>