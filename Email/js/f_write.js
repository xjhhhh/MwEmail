$("#addPic").click(function () {
    $("#fPic").click();
});

function loadMail() {
    var href = window.location.toString();
    var data = href.split('?');
    if (data.length > 1) {
        var type = data[1];
        switch (type) {
            case "cmd=draft":
                var id = href.split('id=')[1];
                $.ajax({
                    url: "read.ashx",
                    type: "get",
                    data: { Id: id, Index: 1 },
                    success: function (text) {
                        var cont = text.split(',');
                        $("#txtRece").val(cont[0]);
                        $("#txtTheme").val(cont[1]);
                        $("#frame").contents().find("body").html(cont[2]);
                        $("#btnDelete").css("display", "inline-block");
                    }
                });
                break;
            case "cmd=mail":
            case "cmd=garbage":
                var id = href.split('id=')[1];
                $.ajax({
                    url: "read.ashx",
                    type: "get",
                    data: { Id: id, Index: 0 },
                    success: function (text) {
                        var cont = text.split(',');
                        var title = cont[0];
                        if (title == "(无主题)") {
                            title = "来自" + cont[1] + "的邮件";
                        }
                        $("#txtRece").val(cont[1]);
                        $("#txtTheme").val("回复：" + title);
                        var html = "<div><br></div><div><br></div><div style='font-size: 12px;font-family: Arial Narrow;padding:2px 0 2px 0;'>------------------ 原始邮件 ------------------</div>";
                        html += "<div style='font-size: 12px;background:#efefef;padding:8px;'>" +
                            "<div><b>发件人：&nbsp;</b>" + cont[1] + "</div>" +
                            "<div><b>发送时间：&nbsp;</b>" + cont[3] + "</div>" +
                            "<div><b>收件人：&nbsp;</b>" + cont[2] + "</div>" +
                            "<div><b>主题：&nbsp;</b>" + cont[0] + "</div></div><div><br></div>"
                            + "<div>" + cont[4] + "</div>";
                        $("#frame").contents().find("body").html(html);
                    }
                });
                break;
            case "cmd=forward1":
            case "cmd=forward2":
                var id = href.split('id=')[1];
                $.ajax({
                    url: "read.ashx",
                    type: "get",
                    data: { Id: id, Index: 0 },
                    success: function (text) {
                        var cont = text.split(',');
                        var title = cont[0];
                        if (title == "(无主题)") {
                            title = "来自" + cont[1] + "的邮件";
                        }
                        $("#txtTheme").val("回复：" + title);
                        var html = "<div><br></div><div><br></div><div style='font-size: 12px;font-family: Arial Narrow;padding:2px 0 2px 0;'>------------------ 转发邮件信息 ------------------</div>";
                        html += "<div style='font-size: 12px;background:#efefef;padding:8px;'>" +
                            "<div><b>发件人：&nbsp;</b>" + cont[1] + "</div>" +
                            "<div><b>发送时间：&nbsp;</b>" + cont[3] + "</div>" +
                            "<div><b>收件人：&nbsp;</b>" + cont[2] + "</div>" +
                            "<div><b>主题：&nbsp;</b>" + cont[0] + "</div></div><div><br></div>"
                            + "<div>" + cont[4] + "</div>";
                        $("#frame").contents().find("body").html(html);
                    }
                });
            case "cmd=write":
                var members = href.split("member=")[1];
                $("#txtRece").val(members);
                break;
        }

    }

}
loadMail();


//颜色面板
function loadColor() {
    var color = ['#000000', '#993300', '#333300', '#003300', '#003366', '#000080', '#333399', '#333333',
        '#800000', '#FF6600', '#808000', '#008000', '#008080', '#0000FF', '#666699', '#808080',
        '#FF0000', '#FF9900', '#99CC00', '#339966', '#33CCCC', '#3366FF', '#800080', '#999999',
        '#FF00FF', '#FFCC00', '#FFFF00', '#00FF00', '#00FFFF', '#00CCFF', '#993366', '#C0C0C0',
        '#FF99CC', '#FFCC99', '#FFFF99', '#CCFFCC', '#CCFFFF', '#99CCFF', '#CC99FF', '#FFFFFF'];
    var html1 = "";
    var html2 = "";
    for (var i = 0; i < color.length; i++) {
        html1 += "<div class='dfc' title='" + color[i] + "'><div style='background:" + color[i] + "'></div></div>";
        html2 += "<div class='dfc2' title='" + color[i] + "'><div style='background:" + color[i] + "'></div></div>";
    }
    $("#classBoard").html(html1);
    $("#classBoard2").html(html2);
}
loadColor();

//表情面板
function showFace() {
    var face = ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶',
        '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵',
        '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑',
        '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '足球', '乒乓',
        '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便',
        '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK',
        '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极'];
    var html = "";
    for (var i = 0; i < face.length; i++) {
        html += "<div class='dface'><img class='face' title='" + face[i] + "' src='img/face/" + i + ".gif'></div>";
    }
    $("#faceBoard").html(html);
}
showFace();

function loadDraft() {

}

window.onload = function () {


    var editor, butGroup, doc;
    editor = document.getElementById("frame").contentWindow;//获取iframe Window 对象
    doc = document.getElementById("frame").contentDocument; //获取iframe documen 对象
    butGroup = document.getElementById('btnGroups');
    selfontSizeGroup = document.getElementById("selFontSize");
    selfontNameGroup = document.getElementById("selFontName");
    //设置事件监听
    butGroup.addEventListener('click', function (e) {
        //通过e 事件 获取点击的标签 id
        switch (e.target.id) {
            case 'bold':    //加粗
                var obj = $("#bold").parent();
                obj.toggleClass("aclick");
                var str = editor.getSelection().toString();
                if (str != "")
                    bold();
                else {
                    if (obj.hasClass("aclick"))
                        insertHTML('<b>&#8203;</b>');
                    else
                        insertHTML('&#8203;');
                }
                break;
            case 'italic':  //斜体
                var obj = $("#italic").parent();
                obj.toggleClass("aclick");
                var str = editor.getSelection().toString();
                editor.focus();
                if (str != "")
                    italic();
                else {
                    if (obj.hasClass("aclick"))
                        insertHTML('<i>&#8203;</i>');
                    else
                        insertHTML('&#8203;');
                }
                break;
            case 'fontColor':
                $("#classBoard2").removeClass("block");
                $("#classBoard").toggleClass("block");
                break;

            case 'backColor':
                $("#classBoard").removeClass("block");
                $("#classBoard2").toggleClass("block");
                break;
            case 'underline':
                var obj = $("#underline").parent();
                obj.toggleClass("aclick");
                var str = editor.getSelection().toString();
                if (str != "")
                    underline();
                else {
                    if (obj.hasClass("aclick"))
                        insertHTML('<u>&#8203;</u>');
                    else
                        insertHTML('&#8203;');
                }
                break;
            case 'indent': indent(); break;
            case 'outdent': outdent(); break;
            case 'justifyCenter':
                justifyCenter();
                $("#justifyCenter").parent().addClass("aclick");
                $("#justifyLeft").parent().removeClass("aclick");
                $("#justifyRight").parent().removeClass("aclick");
                break;
            case 'justifyLeft':
                justifyLeft();
                $("#justifyLeft").parent().addClass("aclick");
                $("#justifyCenter").parent().removeClass("aclick");
                $("#justifyRight").parent().removeClass("aclick");
                break;
            case 'justifyRight':
                justifyRight();
                $("#justifyRight").parent().addClass("aclick");
                $("#justifyLeft").parent().removeClass("aclick");
                $("#justifyCenter").parent().removeClass("aclick");
                break;
            case 'undo':
                var s = $("#frame").contents().find("body").html();
                alert(s);
                break;
            case 'redo':
                memery.go(1, fn);
                break;
            case 'hr':
                insertHTML("<hr>");
                break;
            case 'removeFormat': removeFormat(); break;
            case 'insertOrderedList':
                insertOrderedList();
                $("#insertOrderedList").parent().toggleClass("aclick");
                $("#insertUnorderedList").parent().removeClass("aclick");
                break;
            case 'insertUnorderedList':
                insertUnorderedList();
                $("#insertUnorderedList").parent().toggleClass("aclick");
                $("#insertOrderedList").parent().removeClass("aclick");
                break;
            case 'addFace':
                $("#faceBoard").toggleClass("block");
                break;
        }

    })
    selfontSizeGroup.addEventListener("change", function (e) {
        var str = editor.getSelection().toString();
        var size = e.target.value;
        if (str != "")
            fontSize(size);
        else
            insertHTML('<font size=' + size + '>&#8203;</font>');
    });
    selfontNameGroup.addEventListener("change", function (e) {
        var str = editor.getSelection().toString();
        var name = e.target.value;
        if (str != "")
            fontName(name);
        else
            insertHTML('<font face=' + name + '>&#8203;</font>');
    })

    $("#fPic").change(function () {
        var fileObj = $(this)[0];
        var dataURL;
        var windowURL = window.URL || window.webkitURL;
        if (fileObj && fileObj.files && fileObj.files[0]) {
            dataURL = windowURL.createObjectURL(fileObj.files[0]);
            insertHTML('<img src=' + dataURL + '>');
        }
    });
    $(".dfc").click(function () {
        var str = editor.getSelection().toString();
        var name = $(this).prop("title");
        $(this).css("borderColor", "black");
        $(".dfc").not(this).css("borderColor", "white");
        if (str != "")
            foreColor(name);
        else
            insertHTML('<font color=' + name + '>&#8203;</font>');
        $("#classBoard").toggleClass("block");
    });
    $(".dfc2").click(function () {
        var str = editor.getSelection().toString();
        var name = $(this).prop("title");
        $(this).css("borderColor", "black");
        $(".dfc2").not(this).css("borderColor", "white");
        if (str != "")
            backColor(name);
        else
            insertHTML('<span style="background-color:' + name + '">&#8203;</span>');
        $("#classBoard2").toggleClass("block");
    });

    $(".face").click(function () {
        var src = $(this).prop("src");
        insertHTML("<img src=" + src + "></img>");
        $("#faceBoard").removeClass("block");
    });

    //只需键入以下设定，iframe立刻变成编辑器。
    editor.document.designMode = 'on';  //打开设计模式
    editor.document.contentEditable = true;// 设置元素为可编辑

    //无序列表
    function insertOrderedList() {
        editor.document.execCommand("insertOrderedList", true, null);
    }
    //有序列表
    function insertUnorderedList() {
        editor.document.execCommand("insertUnorderedList", true, null);
    }
    // 字体大小
    function fontSize(size) {
        //所有字体特效只是使用 execComman() 就能完成。
        editor.document.execCommand("fontSize", true, size);
    }
    //复制方法
    function copy() {
        editor.document.execCommand("copy", true, null);
    }
    //加粗方法
    function bold() {
        editor.document.execCommand("bold", true, null);
    }
    //字体方法
    function fontName(name) {
        editor.document.execCommand("fontName", true, name);
    }
    //字体颜色方法
    function foreColor(name) {
        editor.document.execCommand('foreColor', true, name);
    }
    //加背景色
    var backColor = (name) => { editor.document.execCommand('BackColor', true, name) }  //ES6 的箭头函数写法
    //斜体方法
    function italic() {
        editor.document.execCommand('italic', true, null)
    }
    //加下划线方法
    var underline = () => { editor.document.execCommand('underline', true, null) }  //ES6 的箭头函数写法

    //增加缩进行
    function indent() {
        editor.document.execCommand('indent', true, null);
    }
    //减少缩进行
    function outdent() {
        editor.document.execCommand('outdent', true, null);
    }
    //选中行居中
    function justifyCenter() {
        editor.document.execCommand('justifyCenter', true, null);
    }
    //选中行靠左
    function justifyLeft() {
        editor.document.execCommand('justifyLeft', true, null);
    }
    //选中行靠右
    function justifyRight() {
        editor.document.execCommand('justifyRight', true, null);
    }
    //撤消
    function undo() {
        editor.document.execCommand('undo');
    }
    //重做
    function undo() {
        editor.document.execCommand('redo');
    }
    //插入水平线
    function hr() {
        editor.document.execCommand('InsertHorizontalRule');
    }
    //插入格式
    function insertHTML(format) {
        editor.document.execCommand('insertHTML', true, format);
    }
    //去除格式
    function removeFormat() {
        editor.document.execCommand('selectAll', true, null);
        editor.document.execCommand('removeFormat', true, null);
    }

    //发送事件
    $("#btnSend").click(function () {
        var s = $("#frame").contents().find("body").html();
        var loginId = window.sessionStorage.Name;
        var title = $("#txtTheme").val();
        var receive = $("#txtRece").val();
        var content = $("#frame").contents().find("body").html().toString();
        if (loginId != null || loginId != "") {
            if (title == null || title == "")
                title = "(无主题)";
            $.ajax({
                url: "email.ashx",
                type: "get",
                data: { Id: 3, Title: title, SendMan: loginId, ReceiveMan: receive, Content: content },
                success: function (text) {
                    if (text == "添加成功") {
                        //loadShow("邮件发送成功");
                        $(location).attr("href", "f_finSend.html");
                    }
                }
            })
        }
    });

    //预览事件
    $("#btnLook").click(function () {
        window.sessionStorage.Receive = $("#txtRece").val();
        window.sessionStorage.Theme = $("#txtTheme").val();
        window.sessionStorage.Content = $("#frame").contents().find("body").html();
        window.open("preview.html");
    });

    //存草稿事件
    $("#btnSave").click(function () {
        var loginId = window.sessionStorage.Name;
        var title = $("#txtTheme").val();
        var receive = $("#txtRece").val();
        var content = $("#frame").contents().find("body").html().toString();
        if (loginId != null || loginId != "") {
            $.ajax({
                url: "draft.ashx",
                type: "get",
                data: { Id: 3, LoginId: loginId, Title: title, Receive: receive, Content: content },
                success: function (text) {
                    if (text == "添加成功") {
                        loadShow("邮件成功保存到草稿箱");
                    }
                }
            });
        }
    });

    //删除事件
    $("#btnDelete").click(function () {
        var href = window.location.toString();
        var id = href.split('id=')[1];
        $.ajax({
            url: "draft.ashx",
            type: "get",
            data: { Id: "2", Ids: id },
            success: function (text) {
                $(location).attr("href", "f_draft.html?id=" + id);
            }
        });
    });

    //返回事件
    $("#btnReturn").click(function () {
        var href = window.location.toString();
        var type = href.split('?')[1];
        var id = href.split('id=')[1];
        switch (type) {
            case "cmd=mail1":
                $(location).attr("href", "f_read.html?cmd=mail1?read=1?id=" + id);
                break;
            case "cmd=garbage1":
                $(location).attr("href", "f_read.html?cmd=garbage1?read=1?id=" + id);
                break;
            case "cmd=draft":
                parent.window.liClick("", "li_draft", "");
                break;
            case "cmd=write":
                parent.window.liClick("", "li_contacts", "");
                break;
            case "cmd=forward1":
                $(location).attr("href", "f_read.html?cmd=forward1?read=1?id=" + id);
                break;
            case "cmd=forward2":
                $(location).attr("href", "f_read.html?cmd=forward2?read=1?id=" + id);
                break;
            default:
                parent.window.liClick("", "li_index", "");

                break;
        }
    });

    function loadShow(text) {
        $("#divShow").stop().css({ 'display': 'none', 'z-index': '-1' });
        $(".msg").html(text);
        $("#divShow").css("z-index", '99').fadeIn().delay(3000).fadeOut();
    }

}