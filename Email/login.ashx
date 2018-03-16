<%@ WebHandler Language="C#" Class="login" %>

using System;
using System.Web;
using BLL;
using Model;
using System.Net.Mail;

public class login : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        //context.Response.Write("Hello World");

        MailMessage s = new MailMessage();

        string index = context.Request["Index"].ToString();
        if (index == "1")//邮箱登录
        {
            string loginId = context.Request["LoginId"].ToString();
            string num = context.Request["Num"].ToString();
            Users u = UserManager.SelectUserByLoginId(loginId);
            if (u != null)
            {
                if (num == "1")
                {
                    string pwd = context.Request["Pwd"].ToString();
                    if (pwd == u.U_LoginPwd)
                        context.Response.Write("登录成功," + u.U_Id);
                    else
                        context.Response.Write("密码错误");
                }
                else if (num == "2")
                    context.Response.Write("邮箱存在");
            }
            else
                context.Response.Write("邮箱不存在");
        }
        if (index == "2")//手机号登录
        {
            string phone = context.Request["LoginId"].ToString();
            string pwd = context.Request["Pwd"].ToString();
            Users u = UserManager.SelectUserByPhone(phone);
            if (u != null)
            {
                if (pwd == u.U_LoginPwd)
                    context.Response.Write("登录成功");
                else
                    context.Response.Write("密码错误");
            }
            else
                context.Response.Write("用户不存在");
        }
        if (index == "3")
        {
            string email = context.Request["Email"].ToString();
            string pwd = context.Request["Pwd"].ToString();
            string phone = context.Request["Phone"].ToString();
            if (UserManager.SelectUserByPhone(phone) != null)
            {
                context.Response.Write("该手机号码已经注册");
                return;
            }
            int i = UserManager.InsertUser(new Users { U_LoginId = email, U_LoginPwd = pwd, U_Phone = phone });
            if (i > 0)
            {
                Users u = UserManager.SelectUserByLoginId(email);
                string str = UserManager.createTable(u.U_Id.ToString());
                if (str != null)
                    context.Response.Write("注册成功");
            }
            else
                context.Response.Write("注册失败");
        }
        if (index == "4")
        {
            string loginId = context.Request["LoginId"].ToString();
            string pwd = context.Request["Pwd"].ToString();
            int n = UserManager.UpdatePwd(pwd, loginId);
            if (n > 0)
                context.Response.Write("密码修改成功");
            else
                context.Response.Write("密码修改失败");
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