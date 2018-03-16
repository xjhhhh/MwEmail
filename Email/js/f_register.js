function clearInfo() {
    $(":text").val("");
    $(":password").val("");
    $("#lblEmail").text("6~18个字符，可作用字母、数字、下划线").removeClass("lbl5");
    $("#lblPwd").text("6~16个字符，区分大小写").removeClass("lbl5");
    $("#lblPwd2").text("请再次填写密码").removeClass("lbl5");
    $("#lblPhone").text("忘记密码时，可以通过该手机号码快速找回密码").removeClass("lbl5");
    $("#lblCode").text("请输入右侧的验证码，不区分大小写").removeClass("lbl5");
    $("#sel").val("meiwo.com");
}

$(function () {

    $("#btnRegister").click(function () {
        if (checkInput()) {
            var email = $("#txtEmail").val() + "@" + $("#sel").val();
            var pwd = $("#txtPwd").val();
            var phone = $("#txtNum").val();
            $.ajax({
                url: "login.ashx",
                type: "get",
                data: {
                    Email: email,
                    Pwd: pwd,
                    Phone: phone,
                    Index: "3"
                },
                success: function (text) {
                    if (text == "注册成功") {
                        if (confirm("注册成功，是否直接登录？"))
                            $(location).attr("href", "login.html");
                        else
                            clearInfo();
                    }
                    else if (text == "该手机号码已经注册") {
                        if (confirm("该手机号码已经注册，是否直接登录？"))
                            $(location).attr("href", "login.html");
                        clearInfo();
                    }
                    else {
                        alert(text);
                        clearInfo();
                    }
                }
            })

        }
    });

})


//产生验证码事件
function showCode() {
    var cv = document.getElementById("myCon");
    var cvCon = cv.getContext("2d");
    cvCon.clearRect(0, 0, 70, 34);
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    //产生随机字符
    function generateMixed(n) {
        var res = "";
        for (var i = 0; i < n; i++) {
            //产生随机数
            var id = Math.floor(Math.random() * 62);
            res += chars[id];
        }
        return res;
    }
    var code = generateMixed(4);
    $("#myCon").data("code", code.toLowerCase());
    //绘制文本
    cvCon.fillStyle = "red";
    //注意顺序(要先写大小，再写字体)
    cvCon.font = "20px 宋体";
    //cvCon.font = "宋体 50px"; //没反应
    cvCon.fillText(code, 15, 25);
}

$(function () {

    //显示验证码
    showCode();
    //验证码点击事件
    $("#myCon").click(showCode);
    //文本框得到焦点事件
    $(".txts").focus(function () {
        $(this).parent().next().children().addClass("lbl3");
    });
    //邮箱地址文本框失去焦点事件
    $("#txtEmail").blur(function () {
        var email = $("#txtEmail").val();
        if (email == "")
            $("#lblEmail").text("6~18个字符，可作用字母、数字、下划线").removeClass("lbl3").removeClass("lbl4").removeClass("lbl5");
        else {
            if (/[^0-9a-zA-Z_]/.test(email)) {
                $("#lblEmail").text("邮件地址需由字母、数字或下划线组成").removeClass("lbl3").removeClass("lbl5").addClass("lbl4");
                return;
            }
            if (email.length >= 6 && email.length <= 18) {
                $.ajax({
                    type: "get",
                    url: "login.ashx",
                    data: {
                        LoginId: email + "@" + $("#sel").val(),
                        Index: "1",
                        Num: "2"
                    },
                    success: function (text) {
                        if (text == "邮箱不存在")
                            $("#lblEmail").text("恭喜，该邮箱地址可注册").removeClass("lbl3").removeClass("lbl4").addClass("lbl5");
                        else
                            $("#lblEmail").text("该邮箱地址已被注册").removeClass("lbl3").removeClass("lbl5").addClass("lbl4");

                    }
                });
            } else
                $("#lblEmail").text("长度应为6~18个字符").removeClass("lbl3").removeClass("lbl5").addClass("lbl4");
        }
    })
    //密码框失去焦点事件
    $("#txtPwd").blur(function () {
        var pwd = $("#txtPwd").val();
        if (pwd == "") {
            $("#lblPwd").text("6~16个字符，区分大小写").removeClass("lbl3").removeClass("lbl4").removeClass("lbl5");
        } else {
            if (/ /.test(pwd)) {
                $("#lblPwd").text("密码不能包含空格").removeClass("lbl3").removeClass("lbl5").addClass("lbl4");
                return;
            }
            if (pwd.length >= 6 && pwd.length <= 16)
                $("#lblPwd").text(judgePwd(pwd)).removeClass("lbl3").removeClass("lbl4").addClass("lbl5");
            else
                $("#lblPwd").text("密码长度应为6~16个字符").removeClass("lbl3").removeClass("lbl5").addClass("lbl4");
        }
    });
    //确认密码框失去焦点事件
    $("#txtPwd2").blur(function () {
        var pwd = $("#txtPwd").val();
        var pwd2 = $("#txtPwd2").val();
        if (pwd2 == "") {
            $("#lblPwd2").text("请再次填写密码").removeClass("lbl3").removeClass("lbl4").removeClass("lbl5");
        } else {
            if (pwd2 == pwd)
                $("#lblPwd2").text("密码验证通过").removeClass("lbl3").removeClass("lbl4").addClass("lbl5");
            else
                $("#lblPwd2").text("两次密码输入不一致").removeClass("lbl3").removeClass("lbl5").addClass("lbl4");
        }

    });
    //手机号码框失去焦点事件
    $("#txtNum").blur(function () {
        var phone = $("#txtNum").val();
        if (phone == "") {
            $("#lblPhone").text("忘记密码时，可以通过该手机号码快速找回密码").removeClass("lbl3").removeClass("lbl4").removeClass("lbl5");
        } else {
            if (/1[3578]\d{9}$/.test(phone))
                $("#lblPhone").text("该手机号码可用").removeClass("lbl3").removeClass("lbl4").addClass("lbl5");
            else
                $("#lblPhone").text("请输入正确的手机号码").removeClass("lbl3").removeClass("lbl5").addClass("lbl4");

        }
    });
    //验证码杠失去焦点事件
    $("#txtCcode").blur(function () {
        var cCode = $("#txtCcode").val().toLowerCase();
        if (cCode == "") {
            $("#lblCode").text("请输入右侧的验证码，不区分大小写").removeClass("lbl3").removeClass("lbl4").removeClass("lbl5");
        } else {
            if (cCode == $("#myCon").data("code"))
                $("#lblCode").text("验证通过").removeClass("lbl3").removeClass("lbl4").addClass("lbl5");
            else
                $("#lblCode").text("验证码错误").removeClass("lbl3").removeClass("lbl5").addClass("lbl4");

        }
    });
    //手机验证码框失去焦点事件
    $("#txtPcode").blur(function () {
        $("#lblPcode").text("请查收手机短信，并填写短信中的验证码").removeClass("lbl3").removeClass("lbl4");
    });
    //服务条款选择事件
    $("#chkAgree").change(function () {
        var chk = document.getElementById("chkAgree");
        if (chk.checked)
            $("#lblService").removeClass("lbl4");
        else
            $("#lblService").addClass("lbl4");
    });

    //发送验证码事件
    $("#btnSendCode").click(function () {
        var num = $("#txtNum").val();
        var code = $("#txtCcode").val();
        if (num == "" || !/1[3578]\d{9}$/.test(num)) {
            $("#lblPhone").text("请输入正确的手机号码").removeClass("lbl3").removeClass("lbl5").addClass("lbl4");
            return;
        }
        //手机号码通过验证
        if (/1[3578]\d{9}$/.test(num)) {
            if (code == "") {
                $("#lblCode").text("请输入验证码").removeClass("lbl3").removeClass("lbl5").addClass("lbl4");
                return;
            }
            if (code != $("#myCon").data("code")) {
                $("#lblCode").text("验证码错误").removeClass("lbl3").removeClass("lbl5").addClass("lbl4");
                return;
            }
            $.ajax({
                url: "pCode.ashx",
                type: "get",
                data: { number: num, Index: "1" },
                success: function (text) {
                    $("#txtPcode").data("code", text);
                }
            });
            var wait = 60;
            function time() {
                if (wait == 0) {
                    $("#btnSendCode").val("免费获取验证码").removeAttr("disabled").css({ "opacity": "1", "cursor": "pointer" });
                    wait = 60;
                } else {
                    $("#btnSendCode").val(wait + "秒后重新获取").attr("disabled", true).css({ "opacity": "0.5", "cursor": "default" });
                    wait--;
                    setTimeout(time, 1000);
                }
            }
            time();

        }
    });

})

//判断密码强度
function judgePwd(val) {
    var level = 0;
    var strength = "";
    if (/\d/.test(val))
        level++; //数字
    if (/[a-z]/.test(val))
        level++; //小写
    if (/[A-Z]/.test(val)) level++; //大写  
    if (/\W/.test(val)) level++; //特殊字符
    switch (level) {
        case 1:
            strength = "密码强度：低";
            break;
        case 2:
            if (val.length <= 8)
                strength = "密码强度：低";
            else
                strength = "密码强度：中";
            break;
        case 3:
        case 4:
            if (val.length <= 8)
                strength = "密码强度：中";
            else
                strength = "密码强度：高";
            break;
    }
    return strength;
}


//检验输入完整性
function checkInput() {
    var email = $("#txtEmail").val();
    var pwd = $("#txtPwd").val();
    var pwd2 = $("#txtPwd2").val();
    var phone = $("#txtNum").val();
    var code = $("#txtCcode").val().toLowerCase();
    var pCode = $("#txtPcode").val();
    var chk = document.getElementById("chkAgree");
    if (email == "" || email == null) {
        $("#lblEmail").text("请填写邮箱地址").removeClass("lbl3").removeClass("lbl5").addClass("lbl4");
        $("#txtEmail").focus();
        return false;
    }
    else if (pwd == "" || pwd == null) {
        $("#lblPwd").text("请填写密码").removeClass("lbl3").removeClass("lbl5").addClass("lbl4");
        $("#txtPwd").focus();
        return false;
    }
    else if (pwd2 == "" || pwd2 == null) {
        $("#lblPwd2").text("请再次填写密码").removeClass("lbl3").removeClass("lbl5").addClass("lbl4");
        $("#txtPwd2").focus();
        return false;
    }
    else if (pwd2 != pwd) {
        $("#lblPwd2").text("两次密码输入不一致").removeClass("lbl3").removeClass("lbl5").addClass("lbl4");
        $("#txtPwd2").focus();
        return false;
    }
    else if ($("#lblPwd").hasClass("lbl4")) {
        $("#txtPwd").focus();
        return false;
    }
    else if (phone == "" || phone == null) {
        $("#lblPhone").text("请输入手机号码").removeClass("lbl3").removeClass("lbl5").addClass("lbl4");
        $("#txtNum").focus();
        return false;
    }
    else if (code == "" || code == null) {
        $("#lblCode").text("请输入验证码").removeClass("lbl3").removeClass("lbl5").addClass("lbl4");
        $("#txtCcode").focus();
        return false;
    }
    else if (code != $("#myCon").data("code")) {
        $("#lblCode").text("验证码错误").removeClass("lbl3").removeClass("lbl5").addClass("lbl4");
        $("#txtCcode").focus();
        return false;
    }
    else if (pCode == "" || pCode == null) {
        $("#lblPcode").text("请输入手机验证码").removeClass("lbl3").removeClass("lbl5").addClass("lbl4");
        $("#txtPcode").focus();
        return false;
    }
    else if (pCode != $("#txtPcode").data("code")) {
        $("#lblPcode").text("手机验证码错误").removeClass("lbl3").removeClass("lbl5").addClass("lbl4");
        $("#txtPcode").focus();
        return false;
    }
    else if (!chk.checked)
        return false;
    return true;
}

