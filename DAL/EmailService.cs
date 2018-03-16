using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using Model;

namespace DAL
{
    public class EmailService
    {

        /// <summary>
        /// 获取所有邮件
        /// </summary>
        /// <returns></returns>
        public static List<Email> GetAllEmail()
        {
            List<Email> list = new List<Email>();
            string sql = "select * from Email";
            DataSet ds = DBHelper.GetDataSet(sql, CommandType.Text);
            foreach (DataRow row in ds.Tables[0].Rows)
            {
                Email e = new Email();
                e.E_Id = Convert.ToInt32(row["E_Id"]);
                e.E_Title = row["E_Title"].ToString();
                e.E_Time = Convert.ToDateTime(row["E_Time"]);
                e.E_SendMan = row["E_SendMan"].ToString();
                e.E_ReceiveMan = row["E_ReceiveMan"].ToString();
                e.E_Content = row["E_Content"].ToString();
                e.E_Litter = row["E_Litter"].ToString();
                e.E_Read = row["E_Read"].ToString();
                e.E_Delete = row["E_Delete"].ToString();
                e.E_Report = row["E_Report"].ToString();
                list.Add(e);
            }
            return list;
        }

        /// <summary>
        /// 获取所有投诉邮件
        /// </summary>
        /// <returns></returns>
        public static List<Email> GetAllReportEmail()
        {
            List<Email> list = new List<Email>();
            string sql = "select * from Email where E_Report='是'";
            DataSet ds = DBHelper.GetDataSet(sql, CommandType.Text);
            foreach (DataRow row in ds.Tables[0].Rows)
            {
                Email e = new Email();
                e.E_Id = Convert.ToInt32(row["E_Id"]);
                e.E_Title = row["E_Title"].ToString();
                e.E_Time = Convert.ToDateTime(row["E_Time"]);
                e.E_SendMan = row["E_SendMan"].ToString();
                e.E_ReceiveMan = row["E_ReceiveMan"].ToString();
                e.E_Content = row["E_Content"].ToString();
                e.E_Litter = row["E_Litter"].ToString();
                e.E_Read = row["E_Read"].ToString();
                e.E_Delete = row["E_Delete"].ToString();
                e.E_Report = row["E_Report"].ToString();
                list.Add(e);
            }
            return list;
        }


        /// <summary>
        /// 查询某一用户所有邮件（分页查询）
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static List<Email> GetEmailByUser(int pageIndex, string user)
        {
            //当前页第一条记录对应的行号
            int start = (pageIndex - 1) * 16 + 1;
            //当前页最后一条记录对应的行号
            int end = start + 15;
            List<Email> list = new List<Email>();
            try
            {
                SqlParameter[] para = new SqlParameter[]
                {
                    new SqlParameter("@start",start),
                    new SqlParameter("@end",end),
                    new SqlParameter("@user",user)
                };
                DataSet ds = DBHelper.GetDataSet("P_Email_SelectEmailByUser", CommandType.StoredProcedure, para);

                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    Email e = new Email();
                    e.E_Id = Convert.ToInt32(row["E_Id"]);
                    e.E_Title = row["E_Title"].ToString();
                    e.E_Time = Convert.ToDateTime(row["E_Time"]);
                    e.E_SendMan = row["E_SendMan"].ToString();
                    e.E_ReceiveMan = row["E_ReceiveMan"].ToString();
                    e.E_Content = row["E_Content"].ToString();
                    e.E_Litter = row["E_Litter"].ToString();
                    e.E_Read = row["E_Read"].ToString();
                    e.E_Delete = row["E_Delete"].ToString();
                    e.E_Report = row["E_Report"].ToString();
                    list.Add(e);
                }
                return list;
            }
            catch (Exception)
            {
                return null;
            }
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
            try
            {
                SqlParameter[] para = new SqlParameter[]
                        {
                    new SqlParameter("@user",user),
                    new SqlParameter("@count",SqlDbType.Int),
                    new SqlParameter("@pageCount",SqlDbType.Int)   //输出参数一定要指定在DB中的数据类型
                        };
                para[1].Direction = ParameterDirection.Output;      //指定参数为输出参数
                para[2].Direction = ParameterDirection.Output;
                DataSet ds = DBHelper.GetDataSet("P_Email_SelectEmailCountAndPageCount", CommandType.StoredProcedure, para);
                count = Convert.ToInt32(para[1].Value);
                pageCount = Convert.ToInt32(para[2].Value);
                return "/";
            }
            catch (Exception)
            {
                pageCount = 0;
                count = 0;
                return "/";
            }
        }



        /// <summary>
        /// 查询某一用户所有已删除邮件(分页查询)
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static List<Email>GetDeleteEmailByUser(int pageIndex,string user)
        {
            //当前页第一条记录对应的行号
            int start = (pageIndex - 1) * 16 + 1;
            //当前页最后一条记录对应的行号
            int end = start + 15;
            List<Email> list = new List<Email>();
            try
            {
                SqlParameter[] para = new SqlParameter[]
                {
                    new SqlParameter("@start",start),
                    new SqlParameter("@end",end),
                    new SqlParameter("@user",user)
                };
                DataSet ds = DBHelper.GetDataSet("P_Email_SelectDeleteEmailByUser", CommandType.StoredProcedure, para);

                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    Email e = new Email();
                    e.E_Id = Convert.ToInt32(row["E_Id"]);
                    e.E_Title = row["E_Title"].ToString();
                    e.E_Time = Convert.ToDateTime(row["E_Time"]);
                    e.E_SendMan = row["E_SendMan"].ToString();
                    e.E_ReceiveMan = row["E_ReceiveMan"].ToString();
                    e.E_Content = row["E_Content"].ToString();
                    e.E_Litter = row["E_Litter"].ToString();
                    e.E_Read = row["E_Read"].ToString();
                    list.Add(e);
                }
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// 查询某一用户所有已删除邮件的总记录数和页数
        /// </summary>
        /// <param name="user"></param>
        /// <param name="count"></param>
        /// <param name="pageCount"></param>
        /// <returns></returns>
        public static string SelectDeleteEmailCountAndpageCountByUser(string user,out int count, out int pageCount)
        {
            try
            {
                SqlParameter[] para = new SqlParameter[]
                        {
                    new SqlParameter("@user",user),
                    new SqlParameter("@count",SqlDbType.Int),
                    new SqlParameter("@pageCount",SqlDbType.Int)   //输出参数一定要指定在DB中的数据类型
                        };
                para[1].Direction = ParameterDirection.Output;      //指定参数为输出参数
                para[2].Direction = ParameterDirection.Output;
                DataSet ds = DBHelper.GetDataSet("P_Email_SelectDeleteEmailCountAndPageCount", CommandType.StoredProcedure, para);
                count = Convert.ToInt32(para[1].Value);
                pageCount = Convert.ToInt32(para[2].Value);
                return "/";
            }
            catch (Exception)
            {
                pageCount = 0;
                count = 0;
                return "/";
            }
        }




        /// <summary>
        /// 查询某一用户已读邮件或未读邮件（分页查询）
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="user"></param>
        /// <param name="read">只能是已读或未读</param>
        /// <returns></returns>
        public static List<Email> GetAllReadEamilByUser(int pageIndex, string user, string read)
        {
            //当前页第一条记录对应的行号
            int start = (pageIndex - 1) * 16 + 1;
            //当前页最后一条记录对应的行号
            int end = start + 15;
            List<Email> list = new List<Email>();
            try
            {
                SqlParameter[] para = new SqlParameter[]
                {
                    new SqlParameter("@start",start),
                    new SqlParameter("@end",end),
                    new SqlParameter("@user",user),
                    new SqlParameter("@read",read)
                };
                DataSet ds = DBHelper.GetDataSet("P_Email_SelectReadorNread", CommandType.StoredProcedure, para);
                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    Email e = new Email();
                    e.E_Id = Convert.ToInt32(row["E_Id"]);
                    e.E_Title = row["E_Title"].ToString();
                    e.E_Time = Convert.ToDateTime(row["E_Time"]);
                    e.E_SendMan = row["E_SendMan"].ToString();
                    e.E_ReceiveMan = row["E_ReceiveMan"].ToString();
                    e.E_Content = row["E_Content"].ToString();
                    e.E_Litter = row["E_Litter"].ToString();
                    e.E_Read = row["E_Read"].ToString();
                    e.E_Delete = row["E_Delete"].ToString();
                    list.Add(e);
                }
                return list;
            }
            catch (Exception)
            {
                return null;
            }
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
            try
            {
                SqlParameter[] para = new SqlParameter[]
                        {
                    new SqlParameter("@user",user),
                    new SqlParameter("@read",read),
                    new SqlParameter("@count",SqlDbType.Int),
                    new SqlParameter("@pageCount",SqlDbType.Int)   //输出参数一定要指定在DB中的数据类型
                        };
                para[2].Direction = ParameterDirection.Output;      //指定参数为输出参数
                para[3].Direction = ParameterDirection.Output;
                DataSet ds = DBHelper.GetDataSet("P_Email_SelectReadorNreadCountAndPageCount", CommandType.StoredProcedure, para);
                count = Convert.ToInt32(para[2].Value);
                pageCount = Convert.ToInt32(para[3].Value);
                return "/";
            }
            catch (Exception)
            {
                pageCount = 0;
                count = 0;
                return "/";
            }
        }

        /// <summary>
        /// 查询所有垃圾邮件
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static List<Email> GetLitterEamilByUser(int pageIndex, string user)
        {
            //当前页第一条记录对应的行号
            int start = (pageIndex - 1) * 16 + 1;
            //当前页最后一条记录对应的行号
            int end = start + 15;
            List<Email> list = new List<Email>();
            try
            {
                SqlParameter[] para = new SqlParameter[]
                {
                    new SqlParameter("@start",start),
                    new SqlParameter("@end",end),
                    new SqlParameter("@user",user)
                };
                DataSet ds = DBHelper.GetDataSet("SelectLitterByUser", CommandType.StoredProcedure, para);
                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    Email e = new Email();
                    e.E_Id = Convert.ToInt32(row["E_Id"]);
                    e.E_Title = row["E_Title"].ToString();
                    e.E_Time = Convert.ToDateTime(row["E_Time"]);
                    e.E_SendMan = row["E_SendMan"].ToString();
                    e.E_ReceiveMan = row["E_ReceiveMan"].ToString();
                    e.E_Content = row["E_Content"].ToString();
                    e.E_Litter = row["E_Litter"].ToString();
                    e.E_Read = row["E_Read"].ToString();
                    e.E_Delete = row["E_Delete"].ToString();
                    list.Add(e);
                }
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// 查询所有垃圾邮件的数量和页数
        /// </summary>
        /// <param name="user"></param>
        /// <param name="count"></param>
        /// <param name="pageCount"></param>
        /// <returns></returns>
        public static string SelectLitterEamilCountAndpageCountByUser(string user, out int count, out int pageCount)
        {
            try
            {
                SqlParameter[] para = new SqlParameter[]
                {
                    new SqlParameter("@user",user),
                    new SqlParameter("@count",SqlDbType.Int),
                    new SqlParameter("@pageCount",SqlDbType.Int)   //输出参数一定要指定在DB中的数据类型
                };
                para[1].Direction = ParameterDirection.Output;      //指定参数为输出参数
                para[2].Direction = ParameterDirection.Output;
                DataSet ds = DBHelper.GetDataSet("P_Email_SelectLitterCountAndPageCount", CommandType.StoredProcedure, para);
                count = Convert.ToInt32(para[1].Value);
                pageCount = Convert.ToInt32(para[2].Value);
                return "/";
            }
            catch (Exception)
            {
                pageCount = 0;
                count = 0;
                return "/";
            }
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
            //当前页第一条记录对应的行号
            int start = (pageIndex - 1) * 16 + 1;
            //当前页最后一条记录对应的行号
            int end = start + 15;
            List<Email> list = new List<Email>();
            try
            {
                SqlParameter[] para = new SqlParameter[]
                {
                    new SqlParameter("@start",start),
                    new SqlParameter("@end",end),
                    new SqlParameter("@user",user)
                };
                DataSet ds = DBHelper.GetDataSet("SelectSendEmailByUser", CommandType.StoredProcedure, para);

                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    Email e = new Email();
                    e.E_Id = Convert.ToInt32(row["E_Id"]);
                    e.E_Title = row["E_Title"].ToString();
                    e.E_Time = Convert.ToDateTime(row["E_Time"]);
                    e.E_SendMan = row["E_SendMan"].ToString();
                    e.E_ReceiveMan = row["E_ReceiveMan"].ToString();
                    e.E_Content = row["E_Content"].ToString();
                    e.E_Litter = row["E_Litter"].ToString();
                    e.E_Read = row["E_Read"].ToString();
                    list.Add(e);
                }
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// 查询用户所有已发送邮件数量与页数 
        /// </summary>
        /// <param name="user"></param>
        /// <param name="count"></param>
        /// <param name="pageCount"></param>
        /// <returns></returns>
        public static string SelectAllSendEmailCountAndPageCountByUser(string user,out int count,out int pageCount)
        {
            try
            {
                SqlParameter[] para = new SqlParameter[]
                {
                    new SqlParameter("@user",user),
                    new SqlParameter("@count",SqlDbType.Int),
                    new SqlParameter("@pageCount",SqlDbType.Int)   //输出参数一定要指定在DB中的数据类型
                };
                para[1].Direction = ParameterDirection.Output;      //指定参数为输出参数
                para[2].Direction = ParameterDirection.Output;
                DataSet ds = DBHelper.GetDataSet("SelectSendEmailCountAndPageCount", CommandType.StoredProcedure, para);
                count = Convert.ToInt32(para[1].Value);
                pageCount = Convert.ToInt32(para[2].Value);
                return "/";
            }
            catch (Exception)
            {
                pageCount = 0;
                count = 0;
                return "/";
            }
        }

        /// <summary>
        /// 将邮件标记为垃圾或取消标记
        /// </summary>
        /// <param name="ids"></param>
        /// <param name="cmd"></param>
        /// <returns></returns>
        public static int UpdateEmailLitterById(string ids, string cmd)
        {
            int n = 0;
            string sql = "Update Email set E_Litter='" + cmd + "' where E_Id in (" + ids + ")";
            n = DBHelper.ExecuteNonQuery(sql, CommandType.Text);
            return n;
        }


        /// <summary>
        /// 根据编号查询邮件
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public static Email SelectEmailById(int id)
        {
            Email e = null;
            string sql = "Select * from Email where E_Id ='" + id + "'";
            SqlDataReader dr = DBHelper.ExecuteReader(sql, CommandType.Text);
            if (dr.Read())
            {
                e = new Email();
                e.E_Id = Convert.ToInt32(dr["E_Id"]);
                e.E_Title = dr["E_Title"].ToString();
                e.E_Time = Convert.ToDateTime(dr["E_Time"]);
                e.E_SendMan = dr["E_SendMan"].ToString();
                e.E_ReceiveMan = dr["E_ReceiveMan"].ToString();
                e.E_Content = dr["E_Content"].ToString();
                e.E_Litter = dr["E_Litter"].ToString();
                e.E_Read = dr["E_Read"].ToString();
                e.E_Delete = dr["E_Delete"].ToString();
                e.E_Report = dr["E_Report"].ToString();
            }
            dr.Close();
            return e;
        }

        /// <summary>
        /// 修改邮件已读状态
        /// </summary>
        /// <param name="ids"></param>
        /// <param name="cmd">cmd为已读或未读</param>
        /// <returns></returns>
        public static int UpdateEmailReadById(string ids, string cmd)
        {
            int n = 0;
            string sql = "Update Email set E_Read='" + cmd + "' where E_Id in (" + ids + ")";
            n = DBHelper.ExecuteNonQuery(sql, CommandType.Text);
            return n;
        }

        /// <summary>
        /// 删除邮件和撤回删除
        /// </summary>
        /// <param name="ids">cmd为是或否</param>
        /// <returns></returns>
        public static int DeleteEmailById(string ids, string cmd)
        {
            int n = 0;
            string sql = "Update Email set E_Delete='" + cmd + "' where E_Id in(" + ids + ")";
            n = DBHelper.ExecuteNonQuery(sql, CommandType.Text);
            return n;
        }

        /// <summary>
        /// 完全删除邮件
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public static int DeleteComEmailById(string ids)
        {
            int n = 0;
            string sql = "Delete Email where E_Id in(" + ids + ")";
            n = DBHelper.ExecuteNonQuery(sql, CommandType.Text);
            return n;
        }

        /// <summary>
        /// 添加邮件
        /// </summary>
        /// <param name="e"></param>
        /// <returns></returns>
        public static int InsertEmail(Email e)
        {
            string sql = "Insert into Email(E_Title,E_Time,E_SendMan,E_ReceiveMan,E_Content,E_Litter,E_Read,E_Delete,E_Report) values(@title,@time,@sendMan,@receiveMan,@content,@litter,@read,@delete,@report)";
            SqlParameter[] para = new SqlParameter[]
            {
                    new SqlParameter("@title",e.E_Title),
                    new SqlParameter("@time",e.E_Time),
                    new SqlParameter("@sendMan",e.E_SendMan),
                    new SqlParameter("@receiveMan",e.E_ReceiveMan),
                    new SqlParameter("@content",e.E_Content),
                    new SqlParameter("@litter",e.E_Litter),
                    new SqlParameter("@read",e.E_Read),
                    new SqlParameter("@delete",e.E_Delete),
                    new SqlParameter("@report",e.E_Report)
            };
            int n = DBHelper.ExecuteNonQuery(sql, CommandType.Text, para);
            return n;
        }

        /// <summary>
        /// 举报邮件
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public static int ReportEmail(string ids)
        {
            string sql = "update Email set E_Report='是',E_Litter='是' where E_Id in(" + ids + ")";
            int n = DBHelper.ExecuteNonQuery(sql, CommandType.Text);
            return n;
        }


    }
}