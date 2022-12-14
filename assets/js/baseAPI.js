//注意：每次发送 $.get() 或 $.post()或 $.ajax()的时候，
//  会先调用ajaxPrefilter()这个函数
// 在这个函数中 可以拿到我们给 ajax提供的配置对象
// options 是请求的选项
$.ajaxPrefilter(function (options) {
    // 得到发起请求的接口地址
    // console.log(options.url)
    // 在发起真正的请求之前 统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    // console.log(options.url);

    // 统一为有权限的接口，设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一挂载 complete函数
    // 无论请求成功还是失败都会执行 complete函数
    options.complete = function (res) {
        // console.log('执行了complete回调')
        // console.log(res)
        // 在 complete回调函数中，可以通过 res.responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1.强制清空 token
            localStorage.removeItem('token')
            // 2.强制跳转到登录页面
            location.href = '/login.html'
        }
    }

})