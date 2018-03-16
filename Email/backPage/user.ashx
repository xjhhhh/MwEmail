<%@ WebHandler Language="C#" Class="user" %>

using System;
using System.Web;
using System.Collections.Generic;
using System.Runtime.Serialization.Json;
using BLL;
using Model;

public class user : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        //context.Response.Write("Hello World");
        string id = context.Request["Id"].ToString();
        if (id=="0")
        {
            List<Model.Users> list = UserManager.GetAllUsers();
            DataContractJsonSerializer dc = new DataContractJsonSerializer(typeof(List<Model.Users>));
            dc.WriteObject(context.Response.OutputStream, list);
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