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
        <musicPlaylist :itemList="itemList"></musicPlaylist>
    </div>
</template>

<script>
import musicPlaylist from '@/components/item/musicPlaylist'
export default {
    name: "itemMusicList",
    props: ['itemList', 'subscribedCount'],
    setup() {
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
}
</style>