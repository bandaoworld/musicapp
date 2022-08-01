<template>
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
                <van-icon name="tv-o" class="tv" v-if="item.mv != 0" size="30" @click="mvClick(item.mv)" />
                <van-icon name="wap-nav" class="nav" size="30" />
            </van-col>
        </van-row>
    </div>
    <div style="height: 1.4rem;"></div>
</template>

<script>
import { reactive } from 'vue'
import { mapMutations } from 'vuex'
export default {
    name: "musicPlaylist",
    props: ['itemList'],
    setup() {

        function showAuthor(authorList) {
            const authors = reactive([])
            for (let i = 0; i < authorList.length; i++) {
                authors.push(authorList[i].name)
            }
            let author = authors.join(' / ')
            return author
        }
        function mvClick(mv) {
            try {
                location.assign('https://music.163.com/#/mv?id=' + mv)
            }
            catch {
                console.log("MV打开失败");
            }
        }
        return {
            showAuthor,
            mvClick
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