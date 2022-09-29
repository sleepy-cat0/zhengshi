$(function () {
    // 点击"去注册账号"的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击"去登录"的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })


    // 从 layui 中获取 form 对象
    const form = layui.form
    // 从 layui 中获取 layer 对象
    const layer = layui.layer
    // 通过 form.verify() 函数自定义校验规则
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败，则return一个提示消息即可
            let pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    /* // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 1. 阻止默认的提交行为
        e.preventDefault()
        const data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        // 2. 发起Ajax的post请求
        $.ajax({
            method: 'POST',
            url: `${baseUrl}/api/reguser`,
            data,
            success(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录！')
                // 模拟人的点击行为
                $('#link_login').click()
            }
        })
    }) */

    // 将key=value形式的数据，转成json格式的字符串
    const formatToJson = (source) => {
        let target = {}
        source.split('&').forEach(el => {
            let kv = el.split('=')
            target[kv[0]] = kv[1]
        })
        return JSON.stringify(target)
    }

    // 给注册表单添加提交事件（会刷新浏览器）
    $('#form_reg').on('submit', function (e) {
        // 阻止默认提交动作
        e.preventDefault()
        // 发送Ajax请求
        $.ajax({
            method: 'POST',
            url: 'http://big-event-vue-api-t.itheima.net/api/reg',
            contentType: 'application/json',
            // 可以将对象转成json格式的字符串
            // data: JSON.stringify({
            //     username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val(),
            //     repassword: $('#form_reg [name=repassword]').val()
            // }),
            data: formatToJson($(this).serialize()),
            success(res) {
                if (res.code !== 0) return layer.msg(res.message)
                $('#link_login').click()
                layer.msg('注册成功')
            }
        })
    })
})
