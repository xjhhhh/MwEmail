window.onload = function () {
    $("#prev").css("display", "none");
    setMail({ Index: 1 });
    var href = window.location.toString();
    var data = href.split('?');
    if (data.length>1) {
        $("#divShow").fadeIn().delay(3000).fadeOut();
    }
}
$("#prev").click(function () {
    var page = $("#pageInfo").data("pageindex");
    var pageCount = $("#pageInfo").data("pagecount");
    page = page - 1;
    setMail({ PageIndex: page });
    $("#next").css("display", "initial");
    $("#pageInfo").data("pageindex", page);
    $("#pageInfo").text(page + "/" + pageCount + "页");
    if (page == 1)
        $("#prev").css("display", "none");
    else
        $("#prev").css("display", "initial");
})

$("#next").click(function () {
    var page = $("#pageInfo").data("pageindex");
    var pageCount = $("#pageInfo").data("pagecount");
    page = page + 1;
    setMail({ PageIndex: page });
    $("#prev").css("display", "initial");
    $("#pageInfo").data("pageindex", page);
    $("#pageInfo").text(page + "/" + pageCount + "页");
    if (page == pageCount)
        $("#next").css("display", "none");
    else
        $("#next").css("display", "initial");
});

$("#btnRefresh").click(function () {
    $("#prev").css("display", "none");
    setMail({ Index: 1 });
})

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

//删除事件
$("#btnDelete").click(function () {
    if (getChks().length < 1) {
        alert("请选择要操作的邮件！");
        return;
    }
    $.ajax({
        url: "draft.ashx",
        type: "get",
        data: { Id: "2", Ids: getChks() },
        success: function (text) {
            $("#prev").css("display", "none");
            setMail();
            $("#divShow").fadeIn().delay(3000).fadeOut();
        }
    });
});


//加载邮件
function setMail(para) {
    var user = window.sessionStorage.Name;    //从内存获取
    var defaultIndex = {
        PageIndex: 1,
        Index: 0
    }
    $.extend(defaultIndex, para);
    $("#pageInfo").data("pageindex", defaultIndex.PageIndex);
    loadMail({ Id: "0", LoginId: user, PageIndex: defaultIndex.PageIndex }, { Id: "1", LoginId:user }, defaultIndex.Index);
}
//获取数据并加载
function loadMail(datas, data2, index) {
    $("#t_mail").html("");
    $.getJSON("draft.ashx", datas, function (data) {
        var s = data.length;
        if (s > 0) {
            var html = "";
            $.each(data, function (i, obj) {
                if (obj.D_Title == "" || obj.D_Title == null)
                    obj.D_Title = "(无主题)";
                if (obj.D_Receive == "" || obj.D_Receive == null)
                    obj.D_Receive = "(收件人未填写)";
                html += "<tr class='tr' data-id='" + obj.D_Id + "'>" +
                    "<td class='tChk'><input type='checkbox' id='' class='chks' /></td>" +
                    "<td class='tReceive'>" + obj.D_Receive + "</td>" +
                    "<td class='tTitle'>" + obj.D_Title + "</td>" +
                    "<td class='tTime'>" + TestIt(obj.D_Time) + "</td>" +
                    "</tr>";
            });
            $("#t_mail").html(html);
            $(".tChk").click(function (e) {
                e.stopPropagation();
            });
            $(".tr").click(function () {
                var id = $(this).data("id");
                //$(location).attr("href", "f_write.html?cmd=draft?id=" + id + "");
                parent.window.liClick("", "li_write", "cmd=draft?id=" + id);
            })
            $("#chkAll").prop("checked", false);
            if (index == 1) {
                $.ajax({
                    url: "draft.ashx",
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