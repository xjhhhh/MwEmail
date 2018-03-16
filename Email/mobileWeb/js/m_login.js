$(".btnL").click(function () {
    var login = $("#txtLogin").val();
    var pwd = $("#txtPwd").val();
    if (login == "") {
        showMsg(1);
        $("#txtLogin").focus();
        return;
    }
    if (pwd == "") {
        showMsg(2);
        $("#txtPwd").focus();
        return;
    }
    var index = 1;
    if (/^\d{11}$/.test(login))
        index = 2;
    $.ajax({
        url: "../login.ashx",
        type: "get",
        data: {
            LoginId: login,
            Pwd: pwd,
            Index: index,
            Num: "1"
        },
        success: function (text) {
            var data = text.toString().split(',');
            if (data[0] == "登录成功") {
                $(location).attr("href", "m_index.html");
                window.sessionStorage.Name = login;
                window.sessionStorage.Id = data[1];
            }
            else
                showMsg(3);
        }
    });
});

$("body").keydown(function () {
    if (event.keyCode == "13") {
        $(".btnL").click();
    }
});

//显示提示信息
function showMsg(i) {
    var text = "";
    switch (i) {
        case 1:
            text = "请输入帐号";
            break;
        case 2:
            text = "请输入密码";
            break;
        case 3:
            text = "帐号或密码错误";
            break;
    }
    $(".msg").stop().text(text).fadeIn().delay(3000).fadeOut();
}