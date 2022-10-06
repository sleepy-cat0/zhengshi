$.ajaxPrefilter(function (config) {
    // 将key=value形式的数据，转成json格式的字符串
    const formatToJson = (source) => {
        let target = {}
        source.split('&').forEach((el) => {
            let kv = el.split('=')
            // 需要对 value 进行解码操作
            target[kv[0]] = decodeURIComponent(kv[1])
        })
        return JSON.stringify(target)
    }

    config.url = 'http://big-event-vue-api-t.itheima.net' + config.url

    config.contentType = 'application/json'

    config.data = config.data && formatToJson(config.data)

    // 统一设置请求头（有条件的添加）
    // 请求路径中有 /my 这样字符串的需要添加
    if (config.url.includes('/my')) {
        // headers 属性是自定义的属性
        config.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    config.error = function (err) {
        if (err.responseJSON.code === 1 && err.responseJSON.message === '身份认证失败！') {
            localStorage.clear()
            location.href = './login.html'
        }
    }
})