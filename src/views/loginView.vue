<template>
    <div class="loginView">
        <van-icon name="arrow-left" @click="router.go(-1)" size="25" style="position: absolute;left: 0.25rem;"
            color="#b11f26" />
        <van-icon name="music-o" size="2rem" color="#c9353f" class="icon" />
        <van-cell-group inset class="input">
            <van-field v-model="phone" type="tel" label="手机号" left-icon="phone-o" right-icon="warning-o"
                placeholder="请输入手机号" clearable />
            <van-field v-model="password" type="password" label="密码" left-icon="closed-eye" placeholder="请输入密码" />
            <van-field v-model="captcha" center clearable label="短信验证码" placeholder="请输入短信验证码">
                <template #button>
                    <van-button size="small" type="primary" @click="getMyCaptcha">发送验证码</van-button>
                </template>
            </van-field>
        </van-cell-group>
        <van-button type="primary" size="large" color="#e34d59" class="loginButton" @click="login">登录</van-button>
    </div>
</template>

<script>
import { getCaptcha, getLoginUser } from '@/request/api/home'
import { reactive, toRefs } from 'vue'
import { useStore } from "vuex";
import { useRouter } from 'vue-router';
export default {
    name: "loginView",
    setup() {
        const $store = useStore();
        const router = useRouter();

        const state = reactive({
            phone: '',
            password: '',
            captcha: ''
        })
        async function login() {
            // let response = await $store.dispatch('getLogin', { phone: state.phone, password: state.password, captcha: state.captcha })

            let response = reactive({
                "code": 200,
                "account": {
                    "id": 357301093,
                },
                "token": "访问不了真实的网址，就只能这样子写了，这个是token",
                "message": "手动写的网页咋可能会有这个错误"
            })
            // if (response.data.code == 200) {
            if (response.code == 200) {
                $store.commit('updateIsLogin', true);
                $store.commit('updateToken', response.token);

                let userResult = await getLoginUser(response.account.id)
                console.log(userResult);
                $store.commit('updateUser', userResult)

                router.push('/infoUser')
            } else {
                console.log(response.message);
                password = ''
            }
        }
        function getMyCaptcha(event) {
            if (state.phone) {
                getCaptcha(state.phone)
            }
        }
        return {
            ...toRefs(state),
            state,
            router,
            login,
            getMyCaptcha
        }
    },
};

</script>

<style lang="less" scoped>
.loginView {
    position: absolute;
    padding: 0.3rem;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    background: linear-gradient(to bottom right, #e34d59, #f9d7d9);

    .icon {
        // padding-right: 1rem;
        width: 100%;
        margin-top: 2.5rem;
    }

    .input {
        width: 100%;
        margin-top: 4rem;
    }

    .loginButton {
        margin-top: 2rem;
    }

}
</style>