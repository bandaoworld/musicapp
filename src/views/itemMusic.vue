<template>
    <itemMusicTop :playlist="state.playlist"></itemMusicTop>
    <itemMusicList :itemList="state.itemList" :subscribedCount="state.playlist.subscribedCount"></itemMusicList>
</template>

<script>
import { useRoute } from 'vue-router'
import { reactive, onMounted } from 'vue'
import { getMusicItemList, getItemList } from '@/request/api/item'
import itemMusicTop from '@/components/item/itemMusicTop'
import itemMusicList from '@/components/item/itemMusicList'
export default {
    name: "itemMusic",
    setup() {
        const state = reactive({
            // 歌单详情页数据
            playlist: {},
            // 歌单歌曲
            itemList: {}
        })
        onMounted(async () => {
            let playlistId = useRoute().query.id

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
            state
        }
    },
    components: {
        itemMusicTop,
        itemMusicList
    }
}
</script>

<style lang="less" scoped>
</style>