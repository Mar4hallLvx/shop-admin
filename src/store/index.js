import { createStore } from "vuex";
import { login, getinfo } from '~/api/manager'
import {
    setToken, removeToken
} from '~/composables/auth'

// 创建一个新的 store 实例
const store = createStore({
    state() {
        return {
            user: {
                //  用户信息
            }
        }
    },
    mutations: {
        //记录用户信息
        SET_USERINFO(state, user) {
            state.user = user
        }
    },
    actions: {
        //登录1
        login({ commit }, { username, password }) {
            return new Promise((resolve, reject) => {
                login(username, password).then(res => {
                    setToken(res.token)
                    resolve(res)
                }).catch(err => reject(res))
            })
        },
        //获取当前登陆用户信息
        getInfo({ commit }) {
            return new Promise((resolve, reject) => {
                getinfo().then(res => {
                    commit("SET_USERINFO", res)
                    resolve(res)
                }).catch(err => reject(err))
            })
        },
        //退出登录
        logout({ commit }) {

            //移除cookied里面token
            removeToken()
            //清湖当前用户状态vuex
            commit("SET_USERINFO", {})
        }

    }
})

export default store