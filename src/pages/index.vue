<template>
    <div>
        <!-- {{ $store.state.user }} -->
        {{ $store.state.user.username }}
        <el-button @click="handlelogout">
            退出登录
        </el-button>
    </div>
</template>

<script setup>
import { logout } from "~/api/manager"
import { showModal, toast } from "~/composables/util"
import { useRouter } from "vue-router"
import { useStore } from "vuex";

const router = useRouter()
const store = useStore();

function handlelogout() {
    showModal("是否要退出登录？").then(res => {
        //console.log("退出登录", res)
        logout().finally(() => {
            store.dispatch("logout")
            //移除cookie里面token


            //清除当前用户状态 vuex

            // 跳转回登录页
            router.push("/login")
            //提示提出登录成功
            toast("退出登录成功")
        })
    }).catch()
}
</script> 
