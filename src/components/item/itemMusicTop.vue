<template>
    <van-image :src="playlist.coverImgUrl" alt="" class="bgImg"/>
    <van-row justify="space-between" align="center" class="itemMusicTop">
        <van-col span="8" class="itemLeft">
            <van-icon name="arrow-left" @click="router.go(-1)" size="25" />
            <span>歌单</span>
        </van-col>
        <van-col span="8" class="itemRight">
            <van-icon name="search" class="search" size="25" />
            <van-icon name="wap-nav" class="wap-nav" size="25" />
        </van-col>
    </van-row>

    <van-row justify="space-between" align="center" class="itemMusicCenter">
        <van-col span="10" class="imgBox">
            <div class="imgBoxAndplayCount">
                <span class="playCount">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href='#icon-bofang1'></use>
                    </svg>
                    {{ changeCount(playlist.playCount) }}
                </span>
                <img :src="playlist.coverImgUrl" alt="" class="coverImg"/>
            </div>
        </van-col>
        <van-col span="14">
            <van-row justify="center" class="listInfo">
                <van-col span="30" class="title">{{ playlist.name }}</van-col>
                <van-col span="60" class="creator">
                    <img :src="playlist.creator.avatarUrl" alt="">
                    <span>
                        {{ playlist.creator.nickname }}

                    </span>
                    <van-icon name="arrow" size="15" />
                </van-col>
                <van-col span="30" class="description">
                    <div class="text">
                        {{ playlist.description ||"编辑信息：" }}

                    </div>
                    <van-icon name="arrow" size="15" />
                </van-col>
            </van-row>
        </van-col>
    </van-row>

    <van-row justify="space-between" align="center" class="functionButtons">
        <van-col span="6">
            <van-icon name="chat-o" size="30" />
            <span>{{ playlist.commentCount }}</span>
        </van-col>
        <van-col span="6">
            <van-icon name="share-o" size="30" />
            <span>{{ playlist.shareCount }}</span>
        </van-col>
        <van-col span="6">
            <van-icon name="down" size="30" />
            <span>下载</span>
        </van-col>
        <van-col span="6">
            <van-icon name="add-o" size="30" />
            <span>多选</span>
        </van-col>
    </van-row>
</template>

<script>
import { getMusicItemList } from '@/request/api/item'
import { useRouter } from 'vue-router';
export default {
    name: "itemMusicTop",
    props: ['playlist'],
    setup(props) {
        const router = useRouter();
        // 通过props进行传值，判断如果没有，则从sessionStorage获取
        if ((props.playlist.creator = "")) {
            try {
                console.log("here");
                props.playlist.creator = JSON.parse(sessionStorage.getItem('itemDetail')).playlist.creator
            }
            catch {
                console.log("here");
                let response = getMusicItemList(playlistId)
                playlist = response.data.playlist
            }

        }
        function changeCount(num) {
            if (num >= 100000000) {
                // toFixed(1) 小数点后一位
                return (num / 100000000).toFixed(1) + "亿"
            } else if (num >= 10000) {
                return (num / 10000).toFixed(1) + "万"
            }
            return num
        }
        return {
            router,
            changeCount
        }
    }
}
</script>

<style lang="less" scoped>
.bgImg {
    position: fixed;
    width: 100%;
    height: 7rem;
    z-index: -1;
    filter: blur(0.3rem);
}

.itemMusicTop {
    height: 1.2rem;
    padding: 0.15rem;

    .itemLeft,
    .itemRight {
        .van-icon {
            color: #eeeeee;
        }
    }

    .itemLeft {
        span {
            position: relative;
            font-size: 0.5rem;
            margin-left: 0.3rem;
            top: -0.05rem;
            color: #eeeeee;
            text-align: center;
            font-weight: 700;
        }
    }

    .itemRight {
        position: absolute;
        right: 0.3rem;
        .search {
            margin-right: 0.5rem;
        }
    }

}

.itemMusicCenter {
    margin-top: -0.3rem;
    padding: 0.2rem;
    height: 3.8rem;

    .imgBox {
        padding: 0.1rem;
        width: 3rem;
        align-self: center;
        display: flex;
        flex-direction: column;
        align-items: center;

        .imgBoxAndplayCount {
            position: relative;

            .coverImg {
                border-radius: 0.4rem;
                height: 3rem;
                width: 3rem;
                box-shadow: 0 0 0.9rem rgba(0, 0, 0, 0.3);
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
                margin: 0.1rem;
                padding: 0.06rem;
                border-radius: 0.4rem;

                .icon {
                    width: 0.3rem;
                    fill: #eee;
                }
            }
        }

    }

    .listInfo {
        padding: 0.1rem;
        flex-flow: column;
        width: 100%;
        position: relative;

        .title {
            font-weight: 700;
            color: #f3f3f3;
            font-size: .4rem;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            width: 4.5rem;
        }

        .creator {
            width: 100%;
            padding: 0.62rem 0.1rem;
            color: rgba(255, 255, 255, 0.8);
            display: flex;
            align-items: center;

            img {
                border-radius: 50%;
                height: 0.6rem;
            }

            span {
                padding-left: 0.2rem;
                max-width: 3rem;
                font-size: 0.32rem;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;

            }

            .van-icon {
                padding-left: 0.2rem;
            }
        }

        .description {
            display: flex;
            align-items: center;
            color: rgba(255, 255, 255, 0.8);

            .text {
                max-width: 4rem;
                font-size: 0.3rem;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
            }

            .van-icon {
                padding-left: 0.2rem;
            }
        }
    }
}

.functionButtons {
    color: #fff;
    height: 1.5rem;
    padding: 0.1rem;
    margin-bottom: 0.2rem;

    .van-col {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

}
</style>