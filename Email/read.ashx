<%@ WebHandler Language="C#" Class="read" %>

using System;
using System.Web;
using BLL;
using Model;

public class read : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        //context.Response.Write("Hello World");
        //string type = context.Request["Type"].ToString();
        //if (type != "" || type != null)
        //{
        //    int id = Convert.ToInt32(context.Request["Id"]);
        //    switch (type)
        //    {
        //        case "email":
        //        case "garbage":
        //            Email e = EmailManager.SelectEmailById(id);
        //            context.Response.Write(e.E_Title + "," + e.E_SendMan + "," + e.E_ReceiveMan + "," + e.E_Time + "," + e.E_Content);
        //            break;
        //        case "draft":
        //            //Draft d = DraftManager.SelectDraftById(id);
        //            break;
        //    }
        //}

        string index = context.Request["Index"].ToString();
        if (index == "0")
        {
            int id = Convert.ToInt32(context.Request["Id"]);
            if (id > 0)
            {
                Email e = EmailManager.SelectEmailById(id);
                context.Response.Write(e.E_Title + "," + e.E_SendMan + "," + e.E_ReceiveMan + "," + e.E_Time + "," + e.E_Content);
            }
        }
        if (index == "1")
        {
            int id = Convert.ToInt32(context.Request["Id"]);
            if (id > 0)
            {
                Draft d = DraftManager.SelectDraftById(id);
                context.Response.Write(d.D_Receive + "," + d.D_Title + "," + d.D_Content);
            }
        }
        if (index == "2")
        {

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