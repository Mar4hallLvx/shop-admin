import { ElNotification, ElMessageBox } from "element-plus";

import nProgress from "nprogress";

//消息提示
export function toast(message, type = "success", dangerouslyUseHTMLString = false) {
    ElNotification({
        message,
        type,
        duration: 3000,
        dangerouslyUseHTMLString
    })
}

export function showModal(content = "提示内容", type = "warning", title = "") {
    return ElMessageBox.confirm(
        content,
        title,
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: type,
        }
    )
}

//显示全屏loading
export function showFullLoading() {
    nProgress.start()
}

//隐藏全屏loading

export function hideFullLoading() {
    nProgress.done()
}

