<template>
    <router-view></router-view>
    <footerMusic v-show="$store.state.isFooterMusic"></footerMusic>
</template>
<script>
import footerMusic from '@/components/footer/footerMusic'
export default {
    components: {
        footerMusic
    },
    setup() {

    }
}
</script>
<style lang="less">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;

    // https://juejin.cn/post/6997011443967066143
    &::-webkit-scrollbar {
        padding-right: 5px;
        width: 5px;
        height: 5px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 0.4rem;
        background: #c5c5c56b;
    }

    &::-webkit-scrollbar-button {}

    &::-webkit-scrollbar-track {
        border-radius: 0.4rem;
        background: #c5c5c523;
    }
}

.icon {
    width: .5rem;
    height: .5rem;
}

a {
    color: black;
}
</style>
