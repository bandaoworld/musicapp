<template>
    <van-row justify="space-between" align="center" class="topNav">
        <van-col span="2">
            <van-icon name="wap-nav" size=".6rem" />
        </van-col>
        <van-col span="14">
            <van-row justify="space-between" align="center" class="topContent">
                <van-col span="6" @click="$router.push('/infoUser')">我的</van-col>
                <van-col span="6" class="active">发现</van-col>
                <van-col span="6" @click="clickYunCun">云村</van-col>
                <van-col span="6">视频</van-col>
            </van-row>
        </van-col>
        <van-col span="2" class="topRight">
            <van-icon name="search" size=".6rem" @click="$router.push('/search')" />
        </van-col>
    </van-row>
</template>

<script>
export default {
    name: 'topNav',
    methods: {
        clickYunCun(event) {
            this.$store.commit('updateToken', "哟，前面进来的，还有另外一种进来的方式嗷");
            this.$router.push('/infoUser')
        }
    }
}
</script>

<style lang="less" scoped>
.topNav {
    padding: 0.25rem;
}

.van-row {
    text-align: center;
    font-size: 0.45rem;

    .topContent {

        // align-items: center;
        .active {
            font-weight: 900;
        }
    }
}
</style>