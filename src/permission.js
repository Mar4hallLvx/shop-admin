import router from "~/router/index.js";
import { getToken } from "~/composables/auth"

import { toast, showFullLoading, hideFullLoading } from "~/composables/util"
import store from "./store";

//全局前置守卫

router.beforeEach(async (to, from, next) => {

    //显示loading
    showFullLoading()

    console.log("转换前路径", "转换后路径", to, from)
    const token = getToken()
    //  没有登录,强制跳转回登陆页
    if (!token && to.path != "/login") {
        console.log("请先登录!!!")
        toast("请先登录", "error")
        return next({ path: "/login" })
    }
    //防止重复登录
    if (token && to.path == '/login') {
        toast("请勿重复登陆", "error")
        return next({ path: from.path ? from.path : "/" })
    }
    //如果用户登陆了，自动获取用户信息 并存储在vuex当中
    if (token) {
        await store.dispatch("getInfo")
    }
    //设置页面标题
    console.log(to)
    let title = (to.meta.title ? to.meta.title : "") + "-砚汀"
    document.title = title
    //放行
    next()
})

router.afterEach((to, from) => {
    hideFullLoading()
}); 