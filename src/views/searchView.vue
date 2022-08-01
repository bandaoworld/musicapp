<template>
    <div class="searchView">
        <van-row justify="space-between" align="center" class="searchTop">
            <van-col span="2">
                <van-icon name="arrow-left" size="0.6rem" color="#383838" @click="$router.go(-1)" />
            </van-col>
            <van-col span="18">
                <van-icon name="search" size="0.4rem" color="#383838" class="searchIcon" />
                <input type="text" placeholder="陈奕迅" v-model="searchKey" @keydown.enter="enterKey">
            </van-col>
            <van-col span="2">
                <p @click="enterKey">搜索</p>
            </van-col>
        </van-row>

    </div>
    <div class="searchHistory">
        <span class="searchSpan">搜索历史</span>
        <span style="font-size: 0.1rem;visibility: hidden">你猜这里写了啥</span>
        <span v-for="item in keywordList" :key="item" class="spanKey" @click="searchHistory(item)">
            {{ item }}
        </span>
        <span style="font-size: 0.1rem;visibility: hidden;position: absolute;right: 0.2rem;">占位而已</span>
        <van-icon name="delete-o" size="0.6rem" color="#383838" class="deleteIcon" @click="deleteHistory" />
        <musicPlaylist :itemList="resultList"></musicPlaylist>
    </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import { getSearchMusic } from '@/request/api/home'
import musicPlaylist from '@/components/item/musicPlaylist'
export default {
    name: "searchView",
    setup() {
        const state = reactive({
            searchKey: '',
            keywordList: [],
            resultList: []
        })

        async function enterKey() {
            // 如果非空
            if (state.searchKey !== '') {
                state.keywordList.unshift(state.searchKey)
                // 去重
                state.keywordList = [...new Set(state.keywordList)]
                // 固定长度
                if (state.keywordList.length > 10) {
                    state.keywordList.splice(state.keywordList.length - 1, 1)
                }
                localStorage.setItem('keywordList', JSON.stringify(state.keywordList))
                let response = await getSearchMusic(state.searchKey)
                state.resultList = response.data.result.songs
                state.searchKey = ''
                // console.log(state.keywordList);
                // console.log(state);
                console.log("搜索成功");
            }

        }
        async function searchHistory(item) {
            let response = await getSearchMusic(item)
            state.resultList = response.data.result.songs
            console.log(state.resultList);
            console.log("搜索成功");
        }
        function deleteHistory(event) {
            localStorage.removeItem("keywordList")
            state.keywordList = []
        }
        onMounted(() => {
            state.keywordList = JSON.parse(localStorage.getItem('keywordList')) || []
        })
        return {
            state,
            ...toRefs(state),
            enterKey,
            deleteHistory,
            searchHistory,
        }
    }
}
</script>

<style lang="less" scoped>
.searchView {
    padding: 0.2rem;
    // height: 1.2rem;
    text-align: center;

    .searchTop {
        .searchIcon {
            position: absolute;
            padding-top: 0.15rem;
            padding-left: 0.16rem;
        }

        // https://blog.csdn.net/chelen_jak/article/details/84394333
        input {
            // position: relative;
            color: #383838;
            width: 100%;
            height: 0.7rem;
            border-radius: 0.4rem;
            padding-left: 0.65rem;
            padding-right: 0.25rem;
            border: 0.02rem solid #383838;
        }

        p {
            font-size: 0.32rem;
            color: #383838;
        }

    }
}

.searchHistory {
    width: 100%;
    padding: 0.1rem;


    .searchSpan {
        position: absolute;
        padding-left: 0.25rem;
        font-size: 0.42rem;
        font-weight: 900;
        margin-top: 0.1rem;
        color: #383838;
    }

    .spanKey {
        padding: 0.1rem 0.2rem;
        background-color: #f36d78;
        border-radius: 0.4rem;
        margin: 0.1rem 0.2rem;
        display: inline-block;
        font-size: 0.3rem;
        color: #2c2c2c;
    }

    .deleteIcon {
        position: absolute;
        top: 1.3rem;
        right: 0.2rem;
    }
}

</style>