$("#chkAll").click(function () {
    $(".chks").prop("checked", $("#chkAll").prop("checked"));
});
function loadData(Func) {
    var href = window.location.toString();
    var uid = window.sessionStorage.Id;
    var gid = href.split("gid=")[1];
    var id = "";
    var datas = {};
    if (gid == null)
        datas = { Index: "0", Id: "0", Uid: uid };
    else
        datas = { Index: "0", Id: "1", Uid: uid, Gid: gid };
    $.ajax({
        url: "friend.ashx",
        type: "get",
        data: datas,
        success: function (dat) {
            $("#t_friend").html("");
            var jsonData = $.parseJSON(dat);
            if (jsonData.length > 0) {
                var html = "";
                $.each(jsonData, function (i, obj) {
                    html += "<tr class='tr' data-id='" + obj.F_Id + "'>" +
                        "<td class='tChk'><input type='checkbox' id='' class='chks' /></td>" +
                        "<td class='tName'>" + obj.F_Fname + "</td>" +
                        "<td class='tMail'>" + obj.F_Mail + "</td>" +
                        "<td class='tPhone'>" + obj.F_Phone + "</td>" +
                        "<td class='tGroup'>" + obj.F_Group.G_Name + "</td>" +
                        "</tr>";
                });
                $("#t_friend").html(html);
                Func();
            }
        }
    })
}
loadData(parent.window.loadData);

//获取选中的邮件地址
function getMails() {
    var members = "";
    $("input[class='chks']:checked").not("#chkAll").each(function () {
        members += $(this).parent().next().next().text() + ";";
    });
    members = members.substring(0, members.length - 1);
    return members;
}
//获取选中的邮件编号
function getChks() {
    var ids = "";
    $("input[class='chks']:checked").not("#chkAll").each(function () {
        ids += $(this).parent().parent().data("id") + ",";
    });
    ids = ids.substring(0, ids.length - 1);
    return ids;
}
//写信事件 
$("#btnWrite").click(function () {
    var members = getMails();
    if (members.length < 1) {
        $(".msg").css("background", "#C98139").text("请先选择联系人");
        $("#divShow").stop().css("display", "none").fadeIn().delay(3000).fadeOut();
        return;
    }
    parent.window.loadParent("cmd=write?member=" + members);
});
//移动到组
$("#btnRemoveGroup").click(function () {
    $("#group").toggle();
    var su = $(".su");
    if (su.html() == "") {
        var uid = window.sessionStorage.Id;
        $.getJSON("group.ashx", { Index: 0, Id: uid }, function (data) {
            var html = "";
            $.each(data, function (i, obj) {
                html += "<li class='sl'  data-id='" + obj.G_Id + "'>" + obj.G_Name + "</li>";
            });
            $(".su").html(html);
            $(".sl").click(function () {
                var ids = getChks();
                if (ids.length < 1) {
                    $(".msg").css("background", "#C98139").text("请先选择联系人");
                    $("#divShow").stop().css("display", "none").fadeIn().delay(3000).fadeOut();
                    return;
                }
                var gid = $(this).data("id");
                $.ajax({
                    url: "friend.ashx",
                    type: "get",
                    data: { Index: 2, Id: uid, Gid: gid, Fid: ids },
                    success: function (text) {
                        if (text == "修改成功") {
                            $("#group").css("display", "none");
                            $(".msg").css("background", "#68af02").text("移动成功");
                            $("#divShow").stop().css("display", "none").fadeIn().delay(3000).fadeOut();
                            loadData(parent.window.loadData);
                        }
                    }
                })
            });
        });
    }
});
//删除联系人
$("#btnDelete").click(function () {
    var ids = getChks();
    if (ids.length < 1) {
        $(".msg").css("background", "#C98139").text("请先选择联系人");
        $("#divShow").stop().css("display", "none").fadeIn().delay(3000).fadeOut();
        return;
    }
    if (confirm("确定从所有分组中彻底删除所选联系人?")) {
        var id = window.sessionStorage.Id;
        $.ajax({
            url: "friend.ashx",
            type: "get",
            data: { Index: "1", Id: id, Ids: ids },
            success: function (text) {
                if (text == "删除成功") {
                    $(".msg").css("background", "#68af02").text("删除成功");
                    $("#divShow").stop().css("display", "none").fadeIn().delay(3000).fadeOut();
                    loadData(parent.window.loadData);
                }
            }
        })
    }
});