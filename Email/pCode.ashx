<%@ WebHandler Language="C#" Class="ashx" %>

using System;
using System.Web;
using System.Text;
using BLL;
using Model;

public class ashx : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        //context.Response.Write("Hello World");

        string index = context.Request["Index"].ToString();
        if (index == "1")   //注册发送验证码
        {
            //获取手机号
            string number = context.Request["number"].ToString();
            if (number != null || number != "")
                context.Response.Write(SendCode(number, GetCode()));
        }
        if (index == "2")   //找回密码发送验证码
        {
            string loginId = context.Request["LoginId"].ToString();
            Users u = UserManager.SelectUserByLoginId(loginId);
            if (u != null)
                context.Response.Write(SendCode(u.U_Phone, GetCode()));
        }
    }

    //发送验证码
    public string SendCode(string num, string code)
    {
        //StringBuilder sb = new StringBuilder();
        //sb.AppendFormat("{0}", code); //您注册{1}网站的验证码为{2}，请于{3}分钟内正确输入验证码
        //string serverIp = "api.ucpaas.com";
        //string serverPort = "443";
        //string account = "2dcda6e489f7985a7bb54076a4dc029a";    //用户sid
        //string token = "6a1974e1ff8e7416f713ae8ec4dfe33f";      //用户sid对应的token
        //string appId = "bf08a2b5e6aa4afe8df8a5d857989e21";      //对应的应用id，非测试应用需上线使用
        //string templatedId = "234746";                          //短信模板id，需通过审核
        //UCSRestRequest api = new UCSRestRequest();
        //api.init(serverIp, serverPort);
        //api.setAccount(account, token);
        //api.enabeLog(true);
        //api.setAppId(appId);
        //api.enabeLog(true);
        //api.SendSMS(num, templatedId, sb.ToString());
        return code;
    }

    //获取随机码
    public string GetCode()
    {
        string str = "";
        Random rand = new Random();
        for (int i = 0; i < 4; i++)
            str += rand.Next(0, 10);
        return str;
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
}
