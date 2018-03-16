<%@ WebHandler Language="C#" Class="draft" %>

using System;
using System.Web;
using System.Collections.Generic;
using System.Runtime.Serialization.Json;
using BLL;
using Model;

public class draft : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        //context.Response.Write("Hello World");
        string id = context.Request["Id"].ToString();
        if (id == "0")  //查询所有草稿
        {
            string user = context.Request["LoginId"].ToString();
            int pageIndex = Convert.ToInt32(context.Request["PageIndex"]);
            List<Model.Draft> list = DraftManager.SelectAllGraftByUser(pageIndex, user);
            DataContractJsonSerializer dc = new DataContractJsonSerializer(typeof(List<Model.Draft>));
            dc.WriteObject(context.Response.OutputStream, list);
        }
        if (id == "1")  //获取草稿数量与页数信息
        {
            string user = context.Request["LoginId"].ToString();
            int count, pageCount;
            string str = DraftManager.SelectAddGraftCountAndpageCountByUser(user, out count, out pageCount);
            context.Response.Write(count + "/" + pageCount);
        }
        if (id == "2")  //删除草稿
        {
            string ids = context.Request["Ids"].ToString();
            int n = DraftManager.DeleteDraftById(ids);
            if (n > 0)
                context.Response.Write("成功");
        }
        if (id == "3")  //添加草稿
        {
            string loginId = context.Request["LoginId"].ToString();
            string title = context.Request["Title"].ToString();
            string receive = context.Request["Receive"].ToString();
            string content = context.Request["Content"].ToString();
            DateTime time = DateTime.Now.ToLocalTime();
            Draft d = new Draft { D_LoginId = loginId, D_Title = title, D_Receive = receive, D_Content = content, D_Time = time };
            int n = DraftManager.InsertDraft(d);
            if (n > 0)
                context.Response.Write("添加成功");
        }
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}