<%@ WebHandler Language="C#" Class="friend" %>

using System;
using System.Web;
using System.Collections.Generic;
using System.Runtime.Serialization.Json;
using BLL;
using Model;

public class friend : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        //context.Response.Write("Hello World");
        string index = context.Request["Index"].ToString();
        if (index == "0")
        {
            string id = context.Request["Id"].ToString();
            string uid = context.Request["Uid"].ToString();
            List<Model.Friend> list = new List<Friend>();
            DataContractJsonSerializer dc = new DataContractJsonSerializer(typeof(List<Model.Friend>));
            if (id == "0")
                list = FriendManager.GetAllFriend(uid);
            if (id == "1")
            {
                string gid = context.Request["Gid"].ToString();
                list = FriendManager.SelectFriendByGroup(uid, gid);
            }
            dc.WriteObject(context.Response.OutputStream, list);

        }
        if (index == "1")
        {
            string id = context.Request["Id"].ToString();
            string ids = context.Request["Ids"].ToString();
            int n = FriendManager.DeleteFriend(id, ids);
            if (n > 0)
                context.Response.Write("删除成功");
        }
        if (index == "2")
        {
            string id = context.Request["Id"].ToString();
            int gid = Convert.ToInt32(context.Request["Gid"]);
            string fid = context.Request["Fid"].ToString();
            int n = FriendManager.UpdateGroup(id, gid, fid);
            if (n > 0)
                context.Response.Write("修改成功");
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