$(function () {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return ('新旧密码不能相同')
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return ('两次密码不一致')
            }
        }
    })


    // 表单绑定提交事件
    $('.layui-form').submit(function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改密码失败! ' + res.message)
                }
                layer.msg('修改密码成功！')

                // 重置表单    Dom对象的 reset方法
                // jquery对象[0]可以转换为 Dom对象
                $('.layui-form')[0].reset()
            }


        })
    })



})