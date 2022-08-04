<template>
    <topNav/>
    <swiperTop/>
    <iconList/>
    <hr>
    <musicList/>
</template>

<script>
// @ is an alias to /src
import topNav from "../components/home/topNav";
import swiperTop from "../components/home/swiperTop";
import iconList from "../components/home/iconList";
import musicList from "../components/home/musicList";

export default {
    name: "HomeView",
    components: {
        topNav,
        swiperTop,
        iconList,
        musicList
    },
};
</script>
<style lang="less" scoped>
hr {
    background-color: #a6a6a691;
    height: 0.01rem;
    border: none;
}
</style>