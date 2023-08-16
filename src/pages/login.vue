<template>
    <el-row class="a">
        <el-col :lg="16" :md="12" class="c">
            <div>
                <div class="hy">欢迎光临</div>
                <div class="ft">CRM-运用管理</div>
            </div>
        </el-col>
        <el-col :lg="8" md="12" class="b">
            <h2 class="font-bold text-3xl text-gray-800">欢迎回来</h2>
            <div class="dd">
                <span class="ee"></span>
                <span>账号密码登录</span>
                <span class="ee"></span>
            </div>
            <el-form ref="formRef" :rules="rules" :model="form" class="df">
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名">
                        <template #prefix>
                            <el-icon>
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password>
                        <template #prefix>
                            <el-icon>
                                <Lock />
                            </el-icon>
                        </template></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button round color="#626aef" class="dg" type="primary" @click="onSubmit" :loading="loading">登
                        录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>


<script  setup>
import { ref, reactive, onMounted, onBeforeMount, onBeforeUnmount } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import {
    setToken
} from '~/composables/auth'

import {
    toast
} from '~/composables/util'

import {
    useStore
} from 'vuex'


const router = useRouter()
const store = useStore()

// do not use same name with ref
const form = reactive({
    userName: "",
    password: ""
})

const rules = {
    username: [
        {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
        }, {
            min: 3, max: 5, message: '用户名长度必须三到五', trigger: 'blur'
        },
    ],
    password: [{
        required: true,
        message: '用户密码不能为空',
        trigger: 'blur'
    }]
}

const formRef = ref(null)

const loading = ref(false)

const onSubmit = () => {
    formRef.value.validate((valid) => {
        if (!valid) {
            return false
        }
        loading.value = true
        console.log("验证通过")
        store.dispatch("login", form).then(res => {
            toast("登录成功")
            router.push("/")
        }).finally(() => {
            loading.value = false
        })
    })
}


//监听回车事件
function onKeyUp(e) {
    console.log(e)
    if (e.key == "Enter") {
        onSubmit()
    }
}
onMounted(() => {
    //添加键盘监听
    document.addEventListener("keyup", onKeyUp)
})

//移除键盘监听
onBeforeUnmount(() => {
    document.removeEventListener("keyup", onKeyUp)
})
</script>

<style>
.a {
    @apply min-h-screen bg-indigo-500
}

;

.b {
    @apply bg-light-50 flex items-center justify-center flex-col
}

;

.c {
    @apply flex items-center justify-center flex-col
}

;

.hy {
    @apply font-bold text-5xl text-light-50 mb-4
}

;

.ee {
    @apply h-[1px] w-16 bg-gray-200
}

;

.ft {
    @apply text-gray-200 text-sm
}

;

.dd {
    @apply flex items-center justify-center my-5 text-gray-300 space-x-2
}

;

.df {
    @apply w-[250px]
}

;

.dg {
    @apply w-[250px]
}

;
</style>
