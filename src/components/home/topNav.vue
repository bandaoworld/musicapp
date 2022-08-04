<template>
    <van-row justify="space-between" align="center" class="topNav">
        <van-col span="2">
            <van-icon name="wap-nav" size=".6rem" />
        </van-col>
        <van-col span="14">
            <van-row justify="space-between" align="center" class="topContent">
                <van-col span="6" @click="router.push('/infoUser')">登录</van-col>
                <van-col span="6" class="active">发现</van-col>
                <van-col span="6" @click="clickYunCun">云村</van-col>
                <van-col span="6">
                    音乐
                </van-col>
            </van-row>
        </van-col>
        <van-col span="2" class="topRight">
            <van-icon name="search" size=".6rem" @click="router.push('/search')" />
        </van-col>
    </van-row>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from 'vue-router';
export default {
    name: 'topNav',
    setup() {
        const $store = useStore();
        const router = useRouter();
        function clickYunCun(event) {
            $store.commit('updateToken', "哟，前面进来的，还有另外一种进来的方式嗷");
            router.push('/infoUser')
        }
        return {
            clickYunCun,
            router
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