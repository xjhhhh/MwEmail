/// <reference path="../index.html" />
/// <reference path="../index.html" />
//验证输入信息完整
function checkInput() {
    var loginId = $("#txtLogin").val();
    var pwd = $("#txtPwd").val();
    var code = $("#txtCcode").val();
    if (loginId == null || loginId == "") {
        message = "请输入您的邮箱帐号！";
        alert("请输入您的邮箱帐号！");
        $("#txtLogin").focus();
        return false;
    } else if (pwd == null || pwd == "") {
        alert("请输入密码!");
        $("#txtPwd").focus();
        return false;
    } else if (code == null || code == "") {
        alert("请输入验证码！");
        $("#txtCcode").focus();
        return false;
    } else if (code != $("#myCon").data("code")) {
        alert("验证码错误!");
        showCode();
        $("#txtCcode").focus().val("");
        return false;
    }
    return true;
}

//验证码事件
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

function clearInfo() {
    $(":text").val("");
    $(":password").val("");
    $(':checkbox:enabled').prop("checked", false);
}

$(function () {

    $("#txtCcode").val("");
    $("#txtPwd").val("");

    $(".chks,.lbls").attr("title", "为了确保您的信息安全，不建议在网吧等公共环境勾选此项");

    //读取 localStage 本地存储，填充用户名密码,如果自动登录有值直接跳转；  
    //相反，跳转到本页面,等待登陆处理  
    var storage = window.localStorage;
    var getLoginId = storage["loginId"];
    var getPwd = storage["pwd"];
    var getIsSavePwd = storage["issavepwd"];
    var getIsAutologin = storage["isautologin"];
    if (getIsAutologin == "yes") { //自动登录
        $("#txtLogin").val(getLoginId);
        $("#txtPwd").val(getPwd);
        $("#chkSavePwd").attr("checked", "checked");
        $("#chkAutoLogin").attr("checked", "checked");
        $("#btnLogin").click();
        //自动跳转至目标页面
        $(location).attr("href", "index.html");
    } else {
        if (getIsSavePwd == "yes") //记住密码
        {
            $("#txtLogin").val(getLoginId);
            $("#txtPwd").val(getPwd);
            $("#chkSavePwd").attr("checked", "checked");
        }
    }

    //显示验证码
    showCode();

    //登录
    $("#btnLogin").click(function () {
        if (checkInput()) {
            var loginId = $("#txtLogin").val();
            var pwd = $("#txtPwd").val();
            var index = 1;
            if (/^\d{11}$/.test(loginId))
                index = 2;
            $.ajax({
                url: "login.ashx",
                type: "get",
                data: {
                    LoginId: loginId,
                    Pwd: pwd,
                    Index: index,
                    Num:"1"
                },
                success: function (text) {
                    var data = text.toString().split(',');
                    if (data[0] == "登录成功") {
                        var storage = window.localStorage;
                        if (document.getElementById("chkAutoLogin").checked) {
                            storage["loginId"] = loginId;
                            storage["pwd"] = pwd;
                            storage["issavepwd"] = "yes";
                            storage["isautologin"] = "yes";
                        } else if (document.getElementById("chkSavePwd").checked) {
                            storage["loginId"] = loginId;
                            storage["pwd"] = pwd;
                            storage["issavepwd"] = "yes";
                            storage["isautologin"] = "no";
                        } else {
                            storage["loginId"] = loginId;
                            storage["issavepwd"] = "no";
                            storage["isautologin"] = "no";
                        }
                        $(location).attr("href", "index.html");
                        window.sessionStorage.Name = loginId;
                        window.sessionStorage.Id = data[1];
                    } else {
                        alert(text);
                        clearInfo();
                    }
                },
                error: function () {
                    alert("系统出错！");
                }
            });
        }
    });

    $("#chkAutoLogin").change(function () {
        document.getElementById("chkSavePwd").checked = true;
    })

    //验证码点击事件（更换验证码）
    $("#myCon").click(showCode);

    $("body").keydown(function () {
        if (event.keyCode == "13") {
            $("#btnLogin").click();
        }
    });


});