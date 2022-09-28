$(function () {
    // 获取用户信息
    getUserInfo()

    // 点击按钮 实现退出功能
    $('.btnLogout').on('click', function () {
        layer.confirm('确认退出吗?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1.清空本地存储里面的 token
            localStorage.removeItem('token')
            // 2.跳转到登录页面
            location.href = '/login.html'
            layer.close(index);
        });




    })

})


var layer = layui.layer

// 获取用户信息
function getUserInfo() {
    // 发起 ajax请求 得到用户信息
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers就是请求头配置对象
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取用户基本信息失败！')
            }
            // 渲染用户的头像
            renderAvatar(res.data)
        },
        // 无论请求成功还是失败都会执行 complete函数

    })

}




// 渲染用户的头像
function renderAvatar(user) {
    // 1.获取用户的名称
    var name = user.usernick || user.username
    // 2.设计欢迎的文本
    $('.welcome').html('欢迎&nbsp; &nbsp;' + name)
    // 3.按需渲染用户的头像
    if (user.user_pic !== null) {
        // 获取图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()

    } else {
        // 获取文字头像
        // 取用户名的第一个字符并转换为大写   字符串当数组取
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
        $('.layui-nav-img').hide()

    }
}