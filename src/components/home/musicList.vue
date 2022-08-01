<template>
    <div class="musicList">
        <div class="musicTop">
            <div class="title">发现好歌单</div>
            <div class="more">查看更多</div>
        </div>
        <div class="musicContent">
            <van-swipe :loop="false" :width="150" class="my-swipe" :show-indicators=false>
                <van-swipe-item v-for="(item, index) in state.musicList" :key="index" class="listBox">
                    <router-link :to="{ path: '/playlist', query: { id: item.id } }">
                        <img :src="item.picUrl" />
                        <span class="playCount">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href='#icon-bofang1'></use>
                            </svg>
                            {{ changeCount(item.playCount) }}
                        </span>
                        <span class="name">{{ item.name }}</span>
                    </router-link>
                </van-swipe-item>
            </van-swipe>
        </div>

    </div>
</template>

<script>
import { getMusicList } from '@/request/api/home.js'
import { reactive, onMounted } from 'vue';
export default {
    name: "musicList",
    setup() {
        const state = reactive({ musicList: [] })

        function changeCount(num) {
            if (num >= 100000000) {
                // toFixed(1) 小数点后一位
                return (num / 100000000).toFixed(1) + "亿"
            } else if (num >= 10000) {
                return (num / 10000).toFixed(1) + "万"
            }
        }
        onMounted(async () => {
            let response = await getMusicList();
            console.log('好歌单获取成功');
            state.musicList = response.data.result
            // console.log(music.musicList);
        })
        return {
            state,
            changeCount
        }
    }
}
</script>

<style lang="less" scoped>
.musicList {
    width: 100%;
    height: 5rem;
    padding: 0.2rem;

    .musicTop {
        width: 100%;
        height: 0.6rem;
        display: flex;
        justify-content: space-between;
        margin-top: 0.2rem;

        .title {
            font-size: 0.4rem;
            font-weight: 900;
        }

        .more {
            border: 0.02rem solid #ccc;
            text-align: center;
            line-height: 0.6rem;
            padding: 0 0.2rem;
            border-radius: 0.4rem;
        }
    }

    .musicContent {
        padding-top: 0.15rem;
        height: 4.5rem;
        .my-swipe {
            height: 100%;
            display: flex;
            flex-direction: column;
            position: relative;

            .listBox {
                padding: 0.15rem;

                img {
                    border-radius: 0.4rem;
                    width: 100%;
                }

                .playCount {
                    position: absolute;
                    right: 0.1rem;
                    top: 0.1rem;
                    font-size: 0.25rem;
                    color: #eee;
                    display: flex;
                    align-items: center;
                    background-color: rgba(0, 0, 0, 0.2);
                    margin: 0.14rem;
                    padding: 0.06rem;
                    border-radius: 0.4rem;

                    .icon {
                        width: 0.3rem;
                        fill: #eee;
                    }
                }

                .name {
                    height: 0.6rem;
                    width: 100%;
                    font-size: 0.24rem;
                    line-height: 0.4rem;
                }
            }
        }
    }
}
</style>