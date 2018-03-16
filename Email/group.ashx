<%@ WebHandler Language="C#" Class="group" %>

using System;
using System.Web;
using System.Collections.Generic;
using System.Runtime.Serialization.Json;
using BLL;
using Model;

public class group : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        //context.Response.Write("Hello World");
        string index = context.Request["Index"].ToString();
        if (index == "0")
        {
            string id = context.Request["Id"].ToString();
            List<Model.Group> list = GroupManager.GetAllGroup(id);
            DataContractJsonSerializer dc = new DataContractJsonSerializer(typeof(List<Model.Group>));
            dc.WriteObject(context.Response.OutputStream, list);
        }

        if (index == "1")
        {
            string id = context.Request["Id"].ToString();
            List<Model.GroupC> list = GroupManager.GetGroupCount(id);
            DataContractJsonSerializer dc = new DataContractJsonSerializer(typeof(List<Model.GroupC>));
            dc.WriteObject(context.Response.OutputStream, list);
        }

        if (index == "2")
        {
            string id = context.Request["Id"].ToString();
            string gName = context.Request["GroupName"].ToString();
            int n = GroupManager.InsertGroup(id, gName);
            if (n > 0)
                context.Response.Write("添加成功");
        }
        if (index == "3")
        {
            string id = context.Request["Id"].ToString();
            int gid = Convert.ToInt32(context.Request["Gid"]);
            int n = GroupManager.DeleteGroup(id, gid);
            if (n > 0)
                context.Response.Write("删除成功");
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