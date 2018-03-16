<%@ WebHandler Language="C#" Class="email" %>

using System;
using System.Web;
using System.Collections.Generic;
using System.Runtime.Serialization.Json;
using BLL;
using Model;
using System.Linq;

public class email : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        //context.Response.Write("Hello World");
        string Id = context.Request["Id"].ToString();
        if (Id == "0")  //查询操作
        {
            string index = context.Request["Index"].ToString();
            string user = context.Request["LoginId"].ToString();
            int pageIndex = Convert.ToInt32(context.Request["PageIndex"]);
            List<Model.Email> list = new List<Email>();
            switch (index)
            {
                case "0":    //获取所有未删除邮件
                    list = EmailManager.GetEmailByUser(pageIndex, user);
                    break;
                case "1":    //获取已删除邮件
                    list = EmailManager.GetDeleteEmailByUser(pageIndex, user);
                    break;
                case "2":    //获取所有未删除已读邮件
                    list = EmailManager.GetAllReadEamilByUser(pageIndex, user, "已读");
                    break;
                case "3":   //获取所有未删除未读邮件
                    list = EmailManager.GetAllReadEamilByUser(pageIndex, user, "未读");
                    break;
                case "4":   //获取所有垃圾邮件
                    list = EmailManager.GetLitterEamilByUser(pageIndex, user);
                    break;
                case "5":   //获取所有已发送邮件
                    list = EmailManager.GetAllSendEmailByUser(pageIndex, user);
                    break;
            }
            DataContractJsonSerializer dc = new DataContractJsonSerializer(typeof(List<Model.Email>));
            dc.WriteObject(context.Response.OutputStream, list);
        }
        if (Id == "1")  //编辑操作
        {
            string index = context.Request["Index"].ToString();
            string ids = context.Request["Ids"].ToString();
            int n = 0;
            switch (index)
            {
                case "0":
                    n = EmailManager.DeleteEmailById(ids, "是");      //将邮件删除
                    break;
                case "1":
                    n = EmailManager.DeleteEmailById(ids, "否");      //撤回删除邮件
                    break;
                case "2":
                    n = EmailManager.DeleteComEmailById(ids);         //彻底删除邮件
                    break;
                case "3":
                    n = EmailManager.UpdateEmailReadById(ids, "已读");//将邮件设为已读
                    break;
                case "4":
                    n = EmailManager.UpdateEmailReadById(ids, "未读");//将邮件设为未读
                    break;
                case "5":
                    n = EmailManager.UpdateEmailLitterById(ids, "是");//将邮件标记为垃圾
                    break;
                case "6":
                    n = EmailManager.UpdateEmailLitterById(ids, "否");//取消垃圾邮件标记
                    break;
                case "7":
                    n = EmailManager.ReportEmail(ids);                //举报邮件
                    break;
            }
            if (n > 0)
                context.Response.Write("成功");
        }
        if (Id == "2")  //查询邮件数量与页数操作
        {
            string index = context.Request["Index"].ToString();
            string user = context.Request["LoginId"].ToString();
            int count, pageCount;
            string s;
            switch (index)
            {
                case "0":   //获取所有邮件数量与页数信息
                    s = EmailManager.SelectEmailCountAndpageCountByUser(user, out count, out pageCount);
                    break;
                case "1":   //获取所有已删除邮件数量与页数信息
                    s = EmailManager.SelectDeleteEmailCountAndpageCountByUser(user, out count, out pageCount);
                    break;
                case "2":   //获取所有已读邮件数量与页数信息
                    s = EmailManager.SelectAllReadEamilCountAndpageCountByUser(user, "已读", out count, out pageCount);
                    break;
                case "3":   //获取所有未读邮件数量与页数信息
                    s = EmailManager.SelectAllReadEamilCountAndpageCountByUser(user, "未读", out count, out pageCount);
                    break;
                case "4":   //获取所有垃圾邮件数量与页数信息
                    s = EmailManager.SelectLitterEamilCountAndpageCountByUser(user, out count, out pageCount);
                    break;
                case "5":   //获取所有已发送邮件数量与页数信息
                    s = EmailManager.SelectAllSendEmailCountAndPageCountByUser(user, out count, out pageCount);
                    break;
                default:
                    count = 0;
                    pageCount = 0;
                    s = "/";
                    break;
            }
            context.Response.Write(count + s + pageCount);
        }
        if (Id == "3")    //添加邮件
        {
            string title = context.Request["Title"].ToString();
            DateTime time = DateTime.Now.ToLocalTime();
            string sendMan = context.Request["SendMan"].ToString();
            string receiveMan = context.Request["ReceiveMan"].ToString();
            string content = context.Request["Content"].ToString();
            string litter = "否";
            string read = "未读";
            string delete = "否";
            string report = "否";
            Email e = new Email
            {
                E_Title = title,
                E_Time = time,
                E_SendMan = sendMan,
                E_ReceiveMan = receiveMan,
                E_Content = content,
                E_Litter = litter,
                E_Read = read,
                E_Delete = delete,
                E_Report = report
            };
            int n = EmailManager.InsertEmail(e);
            if (n > 0)
                context.Response.Write("添加成功");
        }
        if (Id == "4")
        {
            string index = context.Request["Index"].ToString();
            List<Model.Email> list = new List<Email>();
            if (index == "0")
                list = EmailManager.GetAllEmail();
            if (index == "1")
                list = EmailManager.GetAllReportEmail();
            DataContractJsonSerializer dc = new DataContractJsonSerializer(typeof(List<Model.Email>));
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