import service from '..'

//获取歌单详情页数据
export function getMusicItemList(playlistId) {
    return service({
        method: 'GET',
        url: '/playlist/detail',
        params: {
            id: playlistId
        }
    })
}

//获取歌单所有歌曲
export function getItemList(playlistId) {
    return service({
        method: 'GET',
        url: '/playlist/track/all',
        params: {
            id: playlistId,
            limit: 35,
            offset: 0
        }
    })
}
//获取歌单歌词
export function getMusicLyric(musicId) {
    return service({
        method: 'GET',
        url: '/lyric',
        params: {
            id: musicId,
        }
    })
}