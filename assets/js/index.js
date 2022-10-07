let layer = layui.layer

$(function () {
    getUserInfo()
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success(res) {
            if (res.code !== 0) return layer.msg(res.message)

            renderAvatar(res)
        }
    })
}

function renderAvatar(res) {
    // if (res.user_pic) {
    if (res.data.user_pic) {
        $('.text-avatar').hide()
        // $('.user-box img').css('src', res.user_pic).show()
        $('.user-box img').attr('src', res.data.user_pic).show()
    } else {
        $('.layui-nav-img').hide()
        const name = res.data.nickname || res.data.username
        const char = name[0].toUpperCase()
        $('.text-avatar').css('display', 'flex').html(char).show()
    }
    $('.text').html(`欢迎&nbsp;&nbsp;${res.data.username}`)
}

$('#btnLogout').on('click', function () {
    layer.confirm('确认退出吗？', { icon: 3, title: '提示' },
        function (index) {
            localStorage.removeItem('token')
            location.href = './login.html'

            layer.close(index)
        })
})