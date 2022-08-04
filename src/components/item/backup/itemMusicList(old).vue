<template>
    <div class="itemMusicList">
        <van-row justify="space-between" align="center" class="itemListTop">
            <van-col span="12" class="listLeft">
                <van-icon name="play-circle-o" size="30" />
                <span class="playAllSongs">
                    播放全部
                    <span class="songsNumber">
                        (共{{ itemList.length }}首)
                    </span>
                </span>
            </van-col>
            <van-col span="10">
                <div class="listRight">
                    <van-icon name="plus" size="20" />
                    <span>收藏({{ subscribedCount }})</span>
                </div>

            </van-col>
        </van-row>
        <div class="itemList">
            <van-row class="item" align="center" justify="space-between" v-for="(item, index) in itemList" :key="index">
                <van-col span="16" class="itemLeft" @click="playMusic(index)">
                    <span class="leftSpan">{{ index + 1 }}</span>
                    <div class="songInfo">
                        <p>{{ item.name }}</p>
                        <span>{{ showAuthor(item.ar) }}</span>
                    </div>
                </van-col>
                <van-col span="6" class="itemRight">
                    <van-icon name="tv-o" class="tv" v-if="item.mv != 0" size="30" />
                    <van-icon name="wap-nav" class="nav" size="30" />
                </van-col>
            </van-row>
        </div>
        <div style="height: 1.4rem;"></div>
    </div>
    
</template>

<script>
import { reactive } from 'vue'
import { mapMutations } from 'vuex'
export default {
    name: "itemMusicList",
    props: ['itemList', 'subscribedCount'],
    setup() {

        function showAuthor(authorList) {
            const authors = reactive([])
            for (let i = 0; i < authorList.length; i++) {
                authors.push(authorList[i].name)
            }
            let author = authors.join(' / ')
            return author
        }
        return {
            showAuthor,
        }
    },
    methods: {
        playMusic(index) {
            console.log(index);
            this.updatePlaylist(this.itemList)
            this.updatePlaylistIndex(index)
        },
        ...mapMutations(['updatePlaylist', 'updatePlaylistIndex'])
    },

}
</script>

<style lang="less" scoped>
.itemMusicList {
    background-color: #fff;
    border-top-left-radius: 0.4rem;
    border-top-right-radius: 0.4rem;


    .itemListTop {
        position: relative;
        height: 0.8rem;
        padding: 0.16rem;
        margin: 0.15rem;
        text-align: center;

        .listLeft {
            display: flex;
            align-items: center;

            .playAllSongs {
                padding-left: 0.16rem;
                color: #000;
                font-weight: 700;
                font-size: 0.3rem;

                .songsNumber {
                    padding: 0;
                    font-weight: 500;
                    font-size: 0.15rem;
                    color: gray;
                }
            }
        }

        .listRight {
            position: absolute;
            right: 0.2rem;
            top: 0.13rem;
            color: #fff;
            padding: 0.1rem 0.25rem;
            border-radius: 0.6rem;
            background-color: #f34755;
            text-align: center;
            display: flex;
            align-items: center;

            span {
                padding-left: 0.1rem;
                font-size: 0.3rem;

            }
        }
    }

    .item {
        height: 1.5rem;
        padding: 0.2rem;
        animation: one-in 0.5s ease;

        .itemLeft {
            position: relative;
            display: flex;
            align-items: center;
            padding-left: 0.1rem;

            .leftSpan {
                width: 0.35rem;
                text-align: center;
            }

            .songInfo {
                position: absolute;
                padding-left: 0.6rem;

                p {
                    width: 5.3rem;
                    font-weight: 700;
                    font-size: 0.38rem;
                    color: #2c2c2c;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }

                span {
                    width: 5.3rem;
                    color: #777777;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                }
            }
        }

        .itemRight {
            color: #a6a6a6;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            position: relative;
            padding-right: 0.1rem;

            .tv {
                padding-right: 0.3rem;
            }
        }
    }
}

// https://zhuanlan.zhihu.com/p/219783692
@keyframes one-in {
    from {
        padding-top: 2rem;
        height: 50%;
        opacity: 0.5;
    }

    to {
        padding-top: 0.45rem;
        height: 100%;
        opacity: 1;
    }
}
</style>