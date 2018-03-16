//加载数据
function loadMail() {
    var href = window.location.toString();
    var id = href.split('id=')[1];
    var read = href.split('?')[2].split('=')[1];
    var type = href.split('?')[1];
    if (type == "cmd=garbage")
        $("#btnDelete").css("display", "none");
    else
        $("#btnDelete").css("display", "inline-block");
    $.ajax({
        url: "read.ashx",
        type: "get",
        data: { Id: id, Index: 0 },
        success: function (text) {
            var cont = text.split(',');
            $(".pTitle").text(cont[0]);
            $("#aSend").text(cont[1]);
            $("#aReceive").text(cont[2]);
            $("#aTime").text(cont[3]);
            $(".content").html(cont[4]);
            if (read == 0) {
                $.ajax({
                    url: "email.ashx",
                    type: "get",
                    data: { Id: "1", Ids: id, Index: "3" }
                });
            }
        }
    });
}
loadMail();
//返回事件
$("#btnReturn").click(function () {
    ret("a");
});

//返回
function ret(i) {
    var href = window.location.toString();
    var type = href.split('?')[1];
    switch (type) {
        case "cmd=mail":
            $(location).attr("href", "f_mail.html?id=" + i);
            break;
        case "cmd=mail1":
            parent.window.liClick("", "li_mail", "id=" + i);
            break;
        case "cmd=garbage":
            $(location).attr("href", "f_garbage.html?id=" + i);
            break;
        case "cmd=garbage1":
            parent.window.liClick("", "li_garbage", "id=" + i);
            break;
        case "cmd=forward1":
            parent.window.liClick("", "li_mail", "");
            break;
        case "cmd=forward2":
            parent.window.liClick("", "li_garbage", "");
            break;
    }
}

//回复事件
$("#btnRevert").click(function () {
    var href = window.location.toString();
    var type = href.split('?')[1];
    var id = href.split('id=')[1];
    switch (type) {
        case "cmd=mail":
            //$(location).attr("href", "f_write.html?cmd=mail?id=" + id);
            parent.window.liClick("", "li_write", "cmd=mail1?id=" + id);
            break;
        case "cmd=garbage":
            //$(location).attr("href", "f_write.html?cmd=garbage?id=" + id);
            parent.window.liClick("", "li_write", "cmd=garbage1?id=" + id);
            break;
    }
});
//转发事件
$("#btnForward").click(function () {
    var href = window.location.toString();
    var type = href.split('?')[1];
    var id = href.split('id=')[1];

    switch (type) {
        case "cmd=mail":
            parent.window.liClick("", "li_write", "cmd=forward1?id=" + id);
            break;
        case "cmd=garbage":
            parent.window.liClick("", "li_write", "cmd=forward2?id=" + id);
            break;
    }
    parent.window.liClick("", "li_write", "cmd=forward?id=" + id);

});
//删除事件
$("#btnDelete").click(function () {
    var href = window.location.toString();
    var id = href.split('id=')[1];
    var data = { Id: "1", Ids: id, Index: "0" };
    var para = ["", id, 1];
    startCmd(data, para);
    ret(id);
});
//完全删除
$("#btnComDel").click(function () {
    if (confirm("邮件删除后将无法恢复，您确定要删除吗？")) {
        var href = window.location.toString();
        var id = href.split('id=')[1];
        var data = { Id: "1", Ids: id, Index: "2" };
        var para = ["邮件删除成功", "", 0];
        startCmd(data, para);
        ret("b");
    }

});
//举报事件
$("#btnReport").click(function () {
    var href = window.location.toString();
    var type = href.split('?')[1];
    var id = href.split('id=')[1];
    var text = "";
    switch (type) {
        case "cmd=mail":
            text = "举报成功，邮件已移入垃圾箱";
            break;
        case "cmd=garbage":
            text = "举报成功";
            break;
    }
    $.ajax({
        url: "email.ashx",
        type: "get",
        data: { Id: "1", Ids: id, Index: "7" },
        success: function (data) {
            showMsg(text, "", 0);            //////////???继续
        }
    });

});
//标记为未读
$("#btnMarkNread").click(function () {
    var href = window.location.toString();
    var id = href.split('id=')[1];
    var data = { Id: "1", Ids: id, Index: "4" };
    var para = ["邮件标记为未读操作成功", "", 0];
    startCmd(data, para);
});
//提示信息
function showMsg(text, ids, id) {
    $("#divShow").stop().css("display", "none");
    if (id == 0) {           //更改操作
        $("#aCh").text("");
        $(".msg").html(text);
    }
    else {                   //删除操作
        $(".msg").html("删除成功&nbsp;<a id='aCh' data-ids='" + ids + "'>[撤回]</a>");
        $("#aCh").click(function () {
            var datas = { Id: "1", Ids: ids, Index: "1" };
            $.ajax({
                url: "email.ashx",
                type: "get",
                data: datas,
                success: function (text) {
                    showMsg("撤回操作成功", "", 0);
                }
            });
        });
    }
    $("#divShow").fadeIn().delay(3000).fadeOut();
}
//操作邮件
function startCmd(datas, para) {
    $.ajax({
        url: "email.ashx",
        type: "get",
        data: datas,
        success: function () {
            showMsg(para[0], para[1], para[2]);
        }
    });
}