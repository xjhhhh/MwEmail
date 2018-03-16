<%@ WebHandler Language="C#" Class="admin" %>

using System;
using System.Web;
using BLL;
using Model;

public class admin : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        //context.Response.Write("Hello World");
        string index = context.Request["Index"].ToString();
        if (index == "0")
        {
            string loginId = context.Request["LoginId"].ToString();
            string pwd = context.Request["Pwd"].ToString();
            Admin a = AdminManager.SelectAdminByLoginId(loginId);
            if (a != null)
            {
                if (pwd == a.A_Pwd)
                    context.Response.Write("登录成功");
                else
                    context.Response.Write("登录失败");
            }
            else
                context.Response.Write("登录失败");
        }
        if (index == "1")
        {
            string loginId = context.Request["LoginId"].ToString();
            string pwd = context.Request["Pwd"].ToString();
            int n = AdminManager.UpdateAdminPwd(loginId, pwd);
            if (n > 0)
            {
                context.Response.Write("修改成功");
                    /////////////this
            }
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