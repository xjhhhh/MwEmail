//产生验证码事件
function showCode() {
    //var cv = document.getElementById("myCon");

    var cv = document.getElementById("myCon");
    var width = cv.width;
    var height = cv.height;
    var cvCon = cv.getContext('2d');
    //cvCon.textBaseline = 'bottom';
    cvCon.clearRect(0, 0, width, height);
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
    cvCon.fillText(code, 30, 22);
}
showCode();

$("#myCon").click(function () {
    showCode();
})


function checkInput() {
    var email = $("#txtEmail");
    var code = $("#txtCode");
    var lblE = $("#lblCemail");
    var lblC = $("#lblCcode");
    if (email.val() == "" || email.val() == null) {
        lblE.text("请输入要找回的电子邮箱地址").addClass("opacity");
        email.focus();
        return false;
    }
    if (code.val() == "" || code.val() == null) {
        lblC.text("请输入验证码").addClass("opacity");
        code.focus();
        return false;
    }
    if (lblE.hasClass("opacity")) {
        email.focus();
        return false;
    }
    else if (lblC.hasClass("opacity")) {
        code.focus();
        return false;
    }
    return true;
}
function checkPwd() {
    var pwd = $("#txtPwd");
    var pwd2 = $("#txtPwd2");
    var lblP1 = $("#lblPwd");//.text(judgePwd(pwd)).removeClass("lbl3").removeClass("lbl4").addClass("lbl5");
    var lblP2 = $("#lblPwd2");
    if (pwd.val() == "" || pwd.val() == null) {
        lblP1.text("请输入密码").removeClass("lbl3").removeClass("lbl5").addClass("lbl4");
        pwd.focus();
        return false;
    }

    else if (pwd2.val() == "" || pwd2.val() == null) {
        lblP2.text("请再次输入密码").removeClass("lbl3").removeClass("lbl5").addClass("lbl4");
        pwd2.focus();
        return false;
    }
    else if (pwd2.val() != pwd.val()) {
        lblP2.text("两次密码输入不一致").removeClass("lbl3").removeClass("lbl5").addClass("lbl4");
        pwd2.focus();
        return false;
    }
    else if (lblP.hasClass("lbl4")) {
        pwd.focus();
        return false;
    }
    else if (lblP2.hasClass("lbl4")) {
        pwd2.focus();
        return false;
    }
    return true;
}

$("#txtEmail").blur(function () {
    var email = $("#txtEmail").val();
    if (email != "") {
        var reg = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (reg.test(email)) {
            $.ajax({
                url: "login.ashx",
                type: "get",
                data: {
                    LoginId: email,
                    Index: "1",
                    Num: "2"
                },
                success: function (text) {
                    if (text == "邮箱不存在") {
                        $("#lblCemail").addClass("opacity");
                    }
                    else
                        $("#lblCemail").removeClass("opacity");
                }
            })
        }
        else
            $("#lblCemail").text("邮箱地址格式不正确").addClass("opacity");
    }
    else
        $("#lblCemail").removeClass("opacity");
});
$("#txtCode").blur(function () {
    var code = $("#txtCode").val();
    if (code != "") {
        if (code != $("#myCon").data("code"))
            $("#lblCcode").text("验证码错误").addClass("opacity");
        else
            $("#lblCcode").removeClass("opacity");
    }
    else
        $("#lblCcode").removeClass("opacity");

});

$("#btnNext").click(function () {
    if (checkInput()) {
        $("#firstMain").css("display", "none");
        $("#secodeMain").css("display", "block");
        $("#pTitle").text("安全验证");
        var loginId = $("#txtEmail").val();
        $.ajax({             //自动发送验证码到用户手机
            url: "pCode.ashx",
            type: "get",
            data: { LoginId: loginId, Index: "2" },
            success: function (text) {
                $("#txtPcode").data("code", text);
            }
        });
    }
});
$("#btnPrev").click(function () {
    $("#secodeMain").css("display", "none");
    $("#firstMain").css("display", "block");
    $("#pTitle").text("输入邮箱帐号");
    $("#txtEmail").val("");
    $("#txtCode").val("");
    showCode();
});
$("#btnNext2").click(function () {
    var loginId = $("#txtEmail").val();
    var pCode = $("#txtPcode").val();
    if (pCode == "") {
        $("#lblPcode").addClass("opacity");
        return;
    }
    else {
        if (pCode == $("#txtPcode").data("code")) {
            $("#lblPcode").removeClass("opacity");
            $("#secodeMain").css("display", "none");
            $("#thirdMain").css("display", "block");
            $("#pTitle").text("设置新密码");
        }
        else {
            $("#lblPcode").text("验证码错误").addClass("opacity");
        }
    }
});

$("#btnPrev2").click(function () {
    $("#thirdMain").css("display", "none");
    $("#secodeMain").css("display", "block");
    $("#pTitle").text("安全验证");
    $("#txtPcode").val("");
})
$("#btnOK").click(function () {
    if (checkPwd()) {
        var loginId = $("#txtEmail").val();
        var pwd = $("#txtPwd").val();
        //alert("密码重量成功");
        $.ajax({
            url: "login.ashx",
            type: "get",
            data: {
                LoginId: loginId,
                Pwd: pwd,
                Index: "4"
            },
            success: function (text) {
                if (text == "密码修改成功") {
                    if (confirm("修改成功，是否立即登录")) {
                        //window.location.href = "login.html";
                    }
                    else {
                        alert(text);
                    }
                }
            }
        })
    }


    //alert("密码重量成功");
    //window.location.href = "login.html";
});
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

