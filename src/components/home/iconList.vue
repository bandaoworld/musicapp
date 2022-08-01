<template>
    <van-row justify="space-around" align="center" class="iconList">
        <van-col span="6">
            <svg class="icon" aria-hidden="true">
                <use xlink:href='#icon-fanjutuijian'></use>
            </svg>
            <span>每日推荐</span>
        </van-col>
        <van-col span="6">
            <svg class="icon" aria-hidden="true">
                <use xlink:href='#icon-airec'></use>
            </svg>
            <span>私人FM</span>
        </van-col>
        <van-col span="6">
            <svg class="icon" aria-hidden="true">
                <use xlink:href='#icon-gedan'></use>
            </svg>
            <span>歌单</span>
        </van-col>
        <van-col span="6">
            <svg class="icon" aria-hidden="true">
                <use xlink:href='#icon-paihangbang'></use>
            </svg>
            <span>排行榜</span>
        </van-col>
    </van-row>
</template>

<script>
export default {
    name: "iconList",

}
</script>

<style lang="less" scoped>
.iconList {
    height: 2rem;
    .van-col {
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon {
            width: 1rem;
            height: 1rem;
        }
    }
}
</style>