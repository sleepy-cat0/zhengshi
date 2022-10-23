$(function () {
    const form = layui.form
    const layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '必须输入 1-6 个非空字符'
            }
        }
    })

    function initInfo() {
        $.ajax({
            url: '/my/userinfo',
            success(res) {
                if (res.status !== 0) return layer.msg('请求信息失败！')
                // console.log(res)
                form.val('userForm', res.data)
            }
        })
    }
    initInfo()

    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initInfo()
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: form.val('userForm'),
            success(res) {
                if (res.status !== 0) return layer.msg('更新用户信息失败！')
                window.parent.getUserInfo()
                layer.msg('更新用户信息成功！')
            }
        })
    })
})