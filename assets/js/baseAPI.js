//注意：每次发送 $.get() 或 $.post()或 $.ajax()的时候，
//  会先调用ajaxPrefilter()这个函数
// 在这个函数中 可以拿到我们给 ajax提供的配置对象
// options 是请求的选项
$.ajaxPrefilter(function (options) {
    // 得到发起请求的接口地址
    // console.log(options.url)
    // 拼接完整的路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    console.log(options.url);

})