window.onload = function () {
    $("#prev").css("display", "none");
    setMail();
    var href = window.location.toString();
    var data = href.split('id=');
    if (data.length > 1) {
        var id = data[1];
        if (id == "b") {      //完全删除返回
            showMsg("邮件删除成功", "", 0);
        }
        else {                //删除返回
            showMsg("", id, 0);
        }
    }
}

//上一页事件
$("#prev").click(function () {
    var page = $("#pageInfo").data("pageindex");
    var pageCount = $("#pageInfo").data("pagecount");
    page = page - 1;
    setMail({ PageIndex: page,Index:1 });
    $("#next").css("display", "initial");
    $("#pageInfo").data("pageindex", page);
    $("#pageInfo").text(page + "/" + pageCount + "页");
    if (page == 1)
        $("#prev").css("display", "none");
    else
        $("#prev").css("display", "initial");
})

//下一页事件
$("#next").click(function () {
    var page = $("#pageInfo").data("pageindex");
    var pageCount = $("#pageInfo").data("pagecount");
    page = page + 1;
    setMail({ PageIndex: page,Index:1});
    $("#prev").css("display", "initial");
    $("#pageInfo").data("pageindex", page);
    $("#pageInfo").text(page + "/" + pageCount + "页");
    if (page == pageCount)
        $("#next").css("display", "none");
    else
        $("#next").css("display", "initial");
});

//全选事件
$("#chkAll").click(function () {
    $(".chks").prop("checked", $("#chkAll").prop("checked"));
});

//获取选中的邮件编号
function getChks() {
    var ids = "";
    $("input[class='chks']:checked").not("#chkAll").each(function () {
        ids += $(this).parent().parent().data("id") + ",";
    });
    ids = ids.substring(0, ids.length - 1);
    return ids;
}

//完全删除邮件
$("#btnDelete").click(function () {
    var ids = getChks();
    if (ids.length < 1) {
        alert("请选择要操作的邮件！");
        return;
    }
    var data = { Id: "1", Ids: ids, Index: "2" }
    startCmd(data, 1);
    showMsg("邮件删除成功", "", 0);
});
//举报事件
$("#btnReport").click(function () {
    var ids = getChks();
    if (ids.length < 1) {
        alert("请选择要操作的邮件！");
        return;
    }
    var data = { Id: "1", Ids: ids, Index: "7" };
    startCmd(data);
    showMsg("举报成功", "", 0);
});

//邮件设为已读
$("#btnMarkRead").click(function () {
    var ids = getChks();
    if (ids.length < 1) {
        alert("请选择要操作的邮件！");
        return;
    }
    var data = { Id: "1", Ids: ids, Index: "3" }
    startCmd(data, 0);
    showMsg("邮件标记为已读操作成功", "", 0);
});

//邮件设为未读
$("#btnMarkNread").click(function () {
    var ids = getChks();
    if (ids.length < 1) {
        alert("请选择要操作的邮件！");
        return;
    }
    var data = { Id: "1", Ids:ids, Index: "4" }
    startCmd(data, 0);
    showMsg("邮件标记为未读操作成功", "", 0);
});

//信任邮件事件
$("#btnTrust").click(function () {
    var ids = getChks();
    if (ids.length < 1) {
        alert("请选择要操作的邮件！");
        return;
    }
    var data = { Id: "1", Ids: getChks(), Index: "6" }
    startCmd(data, 1);
    showMsg("邮件信任操作成功", "", 0);

})

function showMsg(text, ids, id) {
    $("#divShow").stop().css("display", "none");
    if (id == 0) {           //更改操作
        $("#aCh").text("");
        $(".msg").html(text);
    }
    else {                   //删除操作
        $(".msg").html("删除成功&nbsp;<a id='aCh' data-ids='" + ids + "'>[撤回]</a>");
        $("#aCh").click(function () {
            var ids = $(this).data("ids");
            var datas = { Id: "1", Ids: ids, Index: "1" };
            $.ajax({
                url: "email.ashx",
                type: "get",
                data: datas,
                success: function (text) {
                    selMail();
                    showMsg("撤回操作成功", "", 0);
                }
            });
        });
    }
    $("#divShow").fadeIn().delay(3000).fadeOut();
}


//刷新事件
$("#btnRefresh").click(function () {
    $("#prev").css("display", "none");
    setMail();
});

//操作邮件
function startCmd(datas, index) {
    $.ajax({
        url: "email.ashx",
        type: "get",
        data: datas,
        success: function (text) {
            $("#prev").css("display", "none");
            if (index == 0)
                setMail({ Index: 1 });
            else
                setMail();
        }
    });
}

//加载邮件
function setMail(para) {
    var user = window.sessionStorage.Name;     //从内存获取
    var defaultIndex = {
        PageIndex: 1,
        Index: 0
    }
    $.extend(defaultIndex, para);
    $("#pageInfo").data("pageindex", defaultIndex.PageIndex);
    loadMail({ Id: "0", Index: 4, LoginId: user, PageIndex: defaultIndex.PageIndex }, { Id: "2", Index: 4, LoginId: user }, defaultIndex.Index);
}
//获取数据并加载
function loadMail(datas, data2, index) {
    $("#t_mail").html("");
    $.getJSON("email.ashx", datas, function (data) {
        var s = data.length;
        if (s > 0) {
            var html = "";
            $.each(data, function (i, obj) {
                if (obj.E_Title == "")
                    obj.E_Title = "(无主题)";
                if (obj.E_Read == "已读")
                    html += "<tr class='tr' data-id='" + obj.E_Id + "' data-read='1'>" +
                        "<td class='tChk'><input type='checkbox' id='' class='chks' /></td>" +
                        "<td class='tSend'>" + obj.E_SendMan + "</td>" +
                        "<td class='tTitle'>" + obj.E_Title + "</td>" +
                        "<td class='tTime'>" + TestIt(obj.E_Time) + "</td>" +
                        "</tr>";
                else
                    html += "<tr class='tr' style='font-weight:bold;' data-id='" + obj.E_Id + "' data-read='0'>" +
                        "<td class='tChk'><input type='checkbox' id='' class='chks' /></td>" +
                        "<td class='tSend'>" + obj.E_SendMan + "</td>" +
                        "<td class='tTitle'>" + obj.E_Title + "</td>" +
                        "<td class='tTime'>" + TestIt(obj.E_Time) + "</td>" +
                        "</tr>";
            });
            $("#t_mail").html(html);
            $(".tr").click(function () {
                var id = $(this).data("id");
                var read = $(this).data("read");
                $(location).attr("href", "f_read.html?cmd=garbage?read=" + read + "?id=" + id + "");
            });
            $(".tChk").click(function (e) {
                e.stopPropagation();
            });
            $("#chkAll").prop("checked", false);
            if (index == 0) {
                $.ajax({
                    url: "email.ashx",
                    type: "get",
                    data: data2,
                    success: function (text) {
                        var dat = text.split('/');
                        var pageCount = dat[1];
                        var count = dat[0];
                        var currentPage = $("#pageInfo").data("pageindex");
                        $("#pageInfo").text(currentPage + "/" + pageCount + "页");
                        $("#pageInfo").data("pagecount", pageCount);
                        $("#count").text(count);
                        if (currentPage == pageCount)
                            $("#next").css("display", "none");
                        else
                            $("#next").css("display", "initial");
                    }
                });
            }
        }
        else {
            var html = "<tr class='trOne'><td class='tdOne'>没有邮件</td></tr>";
            $("#t_mail").html(html);
        }
    });

}

//格式化日期参数
function formatDate(dt) {
    var year = dt.getFullYear();
    var month = dt.getMonth() + 1;
    var date = dt.getDate();
    var hour = dt.getHours();
    var minute = dt.getMinutes();
    var second = dt.getSeconds();
    if (month < 10)
        month = "0" + month;
    if (date < 10)
        date = "0" + date;
    if (hour < 10)
        hour = "0" + hour;
    if (second < 10)
        second = "0" + second;
    if (minute < 10)
        minute = "0" + minute;
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}
function TestIt(Dtime) {
    var NewDtime = new Date(parseInt(Dtime.slice(6, 19)));
    return formatDate(NewDtime);
}