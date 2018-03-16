function loadData() {
    var uid = window.sessionStorage.Id;
    var datas = { Index: 0, Id: uid };
    $.ajax({
        url: "group.ashx",
        data: datas,
        type: "get",
        success: function (data) {
            var jsonData = $.parseJSON(data);
            var html = "";
            var html2 = "";
            $.each(jsonData, function (i, obj) {
                html += "<div class='group' id='sg" + obj.G_Id + "'><div class='gn' data-id='" + obj.G_Id + "'>" + obj.G_Name + "(<a class='ag' id='" + obj.G_Id + "'><a/>)</div></div>";
                html2 += "<div class='group2' id='g" + obj.G_Id + "'><div class='gn'  data-id='" + obj.G_Id + "'>" + obj.G_Name + "</div><img class='sc' src='img/del.png' data-id='" + obj.G_Id + "' /></div>";
            });
            $("#d-group").html(html);
            $("#cover").html(html2);
            $(".group").not("#d-all-c").click(function () {
                gClick(this);
            });



            $.getJSON("group.ashx", { Index: 1, Id: uid }, function (data) {
                var count = 0;
                $.each(data, function (i, obj) {
                    $("#" + (obj.G_Id)).text(obj.G_Count);
                    count += obj.G_Count;
                });
                $("#all-c").text(count);
                $(".ag").each(function () {
                    if ($(this).text() == "")
                        $(this).text("0");
                });
            });
            $(".sc").click(function (e) {
                e.stopPropagation();
                if (confirm("您确定删除该分组吗？")) {
                    var gid = $(this).data("id");
                    alert(gid);
                    $.ajax({
                        url: "group.ashx",
                        type: "get",
                        data: { Index: 3, Id: uid, Gid: gid },
                        success: function (text) {
                            if (text == "删除成功") {
                                alert("删除成功");
                                $("#sg" + gid).remove();
                                $("#g" + gid).remove();
                            }
                        }
                    });
                }
            });
        }
    })
}

function gClick(me) {
    $(me).addClass("gc");
    $(".group").not(me).removeClass("gc");
    var id = $(me).children("div.gn").data("id");
    $("#frame").attr("src", "f_friend.html?gid=" + id);
}

function loadParent(str) {
    parent.window.liClick("", "li_write", str);
}

//添加组
$("#add-g").click(function () {
    $("#cover").css("display", "block");
    $("#d-group").css("display", "none");
    $("#adg-txt,#adg-btn").css("display", "block");
    $(".group2").css("cursor", "not-allowed").attr("contenteditable", "false");
    $("#txtGroup").focus();
    $("#adg-save").data("id", "1");

});
//管理组
$("#a-man-g").click(function () {
    $("#cover").css("display", "block");
    $("#d-group").css("display", "none");
    $("#adg-txt").css("display", "none");
    $("#adg-btn").css("display", "block");
    $(".group2").css("cursor", "default").attr("contenteditable", "true");
    $("#adg-save").data("id", "2");
    $(".sc").css({ "display": "block", "cursor": "pointer" });
});
//取消
$("#adg-cancel").click(function () {
    $("#cover").css("display", "none");
    $("#d-group").css("display", "block");
    $("#adg-txt,#adg-btn").css("display", "none");
    $(".sc").css("display", "none");
    $("#cover").css("display", "none");

});
//保存
$("#adg-save").click(function () {
    if ($(this).data("id") == "1") {
        var gName = $("#txtGroup").val();
        if (gName == "") {
            $("#txtGroup").focus();
            return;
        }
        var uid = window.sessionStorage.Id;
        $.ajax({
            url: "group.ashx",
            type: "get",
            data: { Index: 2, Id: uid, GroupName: gName },
            success: function (text) {
                if (text == "添加成功") {
                    $("#txtGroup").val("");
                    $("#adg-txt,#adg-btn").css("display", "none");
                    $("#cover").css("display", "none");
                    $("#d-group").css("display", "block");
                    loadData();
                }
            }
        });
    }
    else {
        $("#cover").css("display", "none");
        $("#d-group").css("display", "block");
        $("#adg-txt,#adg-btn").css("display", "none");
        $(".sc").css("display", "none");
        $("#cover").css("display", "none");
    }
});


$(".adg-no").click(function () {
    $("#adg").css("display", "none");
});
$(".adg-ok").click(function () {
    var uid = window.sessionStorage.Id;
    var gName = $("#txtGroup").val();
    if (gName == "") {
        $("#txtGroup").focus();
        return;
    }
    $.ajax({
        url: "group.ashx",
        type: "get",
        data: { Index: 2, Id: uid, GroupName: gName },
        success: function (text) {
            if (text == "添加成功") {
                $("#txtGroup").val("");
                $("#adg").css("display", "none");
                loadData();
            }
        }
    });
});
$("#d-all-c").click(function () {
    $("#frame").attr("src", "f_friend.html");
});