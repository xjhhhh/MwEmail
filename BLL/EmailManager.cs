using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL;
using Model;

namespace BLL
{
    public class EmailManager
    {

        /// <summary>
        /// 获取所有邮件
        /// </summary>
        /// <returns></returns>
        public static List<Email> GetAllEmail()
        {
            return EmailService.GetAllEmail();
        }

        /// <summary>
        /// 获取所有投诉邮件
        /// </summary>
        /// <returns></returns>
        public static List<Email> GetAllReportEmail()
        {
            return EmailService.GetAllReportEmail();
        }

        /// <summary>
        /// 查询某一用户所有邮件（分页查询）
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static List<Email> GetEmailByUser(int pageIndex, string user)
        {
            return EmailService.GetEmailByUser(pageIndex, user);
        }

        /// <summary>
        /// 查询某一用户所有邮件的总记录数和页数
        /// </summary>
        /// <param name="user"></param>
        /// <param name="delete"></param>
        /// <param name="count"></param>
        /// <param name="pageCount"></param>
        /// <returns></returns>
        public static string SelectEmailCountAndpageCountByUser(string user, out int count, out int pageCount)
        {
            return EmailService.SelectEmailCountAndpageCountByUser(user, out count, out pageCount);
        }

        /// <summary>
        /// 查询某一用户所有已删除邮件(分页查询)
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static List<Email> GetDeleteEmailByUser(int pageIndex, string user)
        {
            return EmailService.GetDeleteEmailByUser(pageIndex, user);
        }

        /// <summary>
        /// 查询某一用户所有已删除邮件的总记录数和页数
        /// </summary>
        /// <param name="user"></param>
        /// <param name="count"></param>
        /// <param name="pageCount"></param>
        /// <returns></returns>
        public static string SelectDeleteEmailCountAndpageCountByUser(string user, out int count, out int pageCount)
        {
            return EmailService.SelectDeleteEmailCountAndpageCountByUser(user, out count, out pageCount);
        }


        /// <summary>
        /// 查询某一用户已读邮件或未读邮件（分页查询）
        /// </summary>
        /// <param name="user"></param>
        /// <param name="read">只能是已读或者未读</param>
        /// <returns></returns>
        public static List<Email> GetAllReadEamilByUser(int pageIndex, string user, string read)
        {
            return EmailService.GetAllReadEamilByUser(pageIndex,user, read);
        }

        /// <summary>
        /// 查询某一用户已读邮件或未读邮件的总记录数和页数
        /// </summary>
        /// <param name="user"></param>
        /// <param name="read"></param>
        /// <param name="count"></param>
        /// <param name="pageCount"></param>
        /// <returns></returns>
        public static string SelectAllReadEamilCountAndpageCountByUser(string user, string read, out int count, out int pageCount)
        {
            return EmailService.SelectAllReadEamilCountAndpageCountByUser(user, read, out count, out pageCount);
        }

        /// <summary>
        /// 查询用户所有已发送邮件
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="user"></param>
        /// <param name="read"></param>
        /// <returns></returns>
        public static List<Email> GetAllSendEmailByUser(int pageIndex, string user)
        {
            return EmailService.GetAllSendEmailByUser(pageIndex, user);    
        }

        /// <summary>
        /// 查询用户所有已发送邮件数量与页数
        /// </summary>
        /// <param name="user"></param>
        /// <param name="count"></param>
        /// <param name="pageCount"></param>
        /// <returns></returns>
        public static string SelectAllSendEmailCountAndPageCountByUser(string user, out int count, out int pageCount)
        {
            return EmailService.SelectAllSendEmailCountAndPageCountByUser(user, out count, out pageCount);
        }

        /// <summary>
        /// 查询所有垃圾邮件
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static List<Email> GetLitterEamilByUser(int pageIndex, string user)
        {
            return EmailService.GetLitterEamilByUser(pageIndex, user);
        }

        /// <summary>
        /// 获取垃圾邮件数量和页数
        /// </summary>
        /// <param name="user"></param>
        /// <param name="count"></param>
        /// <param name="pageCount"></param>
        /// <returns></returns>
        public static string SelectLitterEamilCountAndpageCountByUser(string user, out int count, out int pageCount)
        {
            return EmailService.SelectLitterEamilCountAndpageCountByUser(user, out count, out pageCount);
        }

        /// <summary>
        /// 将邮件标记为垃圾或取消标记
        /// </summary>
        /// <param name="ids"></param>
        /// <param name="cmd"></param>
        /// <returns></returns>
        public static int UpdateEmailLitterById(string ids, string cmd)
        {
            return EmailService.UpdateEmailLitterById(ids, cmd);
        }

        /// <summary>
        /// 根据编号查询邮件
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public static Email SelectEmailById(int id)
        {
            return EmailService.SelectEmailById(id);
        }

        /// <summary>
        /// 修改邮件已读状态
        /// </summary>
        /// <param name="ids"></param>
        /// <param name="cmd"></param>
        /// <returns></returns>
        public static int UpdateEmailReadById(string ids, string cmd)
        {
            return EmailService.UpdateEmailReadById(ids, cmd);
        }

        /// <summary>
        /// 删除邮件和撤回删除
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public static int DeleteEmailById(string ids, string cmd)
        {
            return EmailService.DeleteEmailById(ids, cmd);
        }

        /// <summary>
        /// 完全删除邮件
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public static int DeleteComEmailById(string ids)
        {
            return EmailService.DeleteComEmailById(ids);
        }

        /// <summary>
        /// 添加邮件
        /// </summary>
        /// <param name="e"></param>
        /// <returns></returns>
        public static int InsertEmail(Email e)
        {
            return EmailService.InsertEmail(e);
        }


        /// <summary>
        /// 举报邮件
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public static int ReportEmail(string ids)
        {
            return EmailService.ReportEmail(ids);
        }
    }
}
