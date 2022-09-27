$(function () {
    // 登录和注册模块的切换
    // 点击“去注册”的链接
    $('#link_reg').click(function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').click(function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })





    // 从 layui中获取表单对象
    var form = layui.form
    // 引入 layui中的 layer
    var layer = layui.layer

    // 通过 form-verify() 函数自定义校验规则
    form.verify({
        // 定义密码的校验规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 自定义重复确认密码的校验规则
        repwd: function (value) {
            //  形参value是重复密码的值
            // 获取设定的密码值
            var pwd = $('.reg-box [name=password]').val()
            if (value !== pwd) {
                return '两次密码不一致'
            }
        }
    })


    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 1. 阻止默认的提交行为
        e.preventDefault()
        // 2. 发起Ajax的POST请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
            // 模拟 “去登录”按钮点击事件
            $('#link_login').click()
        })
    })



    // 监听登录表单的提交事件
    $('#form_login').submit(function (e) {
        // 阻止表单默认提交行为
        e.preventDefault()
        // 发起 Ajax的POST请求
        $.ajax({
            method: 'POST',
            url: '/api/login',
            //   快速获取表单中的所有数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg('登陆失败！')
                }

                layer.msg('登录成功！')
                // 将登录成功得到的 token 保存到 localStorage中
                localStorage.setItem('token', res.token)
                // 登录成功后跳转到后台主页
                location.href = '/index.html'
            }
        })

    })














})










