using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using Model;

namespace DAL
{
    public class DraftService
    {
        /// <summary>
        /// 查询用户所有草稿
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public static List<Draft> SelectAllGraftByUser(int pageIndex, string user)
        {
            //当前页第一条记录对应的行号
            int start = (pageIndex - 1) * 16 + 1;
            //当前页最后一条记录对应的行号
            int end = start + 15;
            List<Draft> list = new List<Draft>();
            try
            {
                SqlParameter[] para = new SqlParameter[]
                        {
                    new SqlParameter("@start",start),
                    new SqlParameter("@end",end),
                    new SqlParameter("@user",user)
                        };
                DataSet ds = DBHelper.GetDataSet("SelectDraftByUser", CommandType.StoredProcedure, para);
                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    Draft d = new Draft();
                    d.D_Id = Convert.ToInt32(row["D_Id"]);
                    d.D_LoginId = row["D_LoginId"].ToString();
                    d.D_Title = row["D_Title"].ToString();
                    d.D_Receive = row["D_Receive"].ToString();
                    d.D_Content = row["D_Content"].ToString();
                    d.D_Time = Convert.ToDateTime(row["D_Time"]);
                    list.Add(d);
                }
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }


        /// <summary>
        /// 查询草稿总数量与页数
        /// </summary>
        /// <param name="user"></param>
        /// <param name="count"></param>
        /// <param name="pageCount"></param>
        /// <returns></returns>
        public static string SelectAddGraftCountAndpageCountByUser(string user, out int count, out int pageCount)
        {
            try
            {
                SqlParameter[] para = new SqlParameter[]
                    {
                new SqlParameter("@user",user),
                new SqlParameter("@count",SqlDbType.Int),       //输出参数一定要指定在数据库中的类型
                new SqlParameter("@pageCount",SqlDbType.Int)
                    };
                para[1].Direction = ParameterDirection.Output;      //指定参数为输出参数
                para[2].Direction = ParameterDirection.Output;
                DataSet ds = DBHelper.GetDataSet("SelectDraftCountAndPageCountByUser", CommandType.StoredProcedure, para);
                count = Convert.ToInt32(para[1].Value);
                pageCount = Convert.ToInt32(para[2].Value);
                return "/";
            }
            catch (Exception)
            {
                count = 0;
                pageCount = 0;
                return "/";
            }
        }

        /// <summary>
        /// 根据编号查询草稿
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public static Draft SelectDraftById(int id)
        {
            Draft e = null;
            string sql = "Select * from Draft where D_Id ='" + id + "'";
            try
            {
                SqlDataReader dr = DBHelper.ExecuteReader(sql, CommandType.Text);
                if (dr.Read())
                {
                    e = new Draft();
                    e.D_Id = Convert.ToInt32(dr["D_Id"]);
                    e.D_LoginId = dr["D_LoginId"].ToString();
                    e.D_Title = dr["D_Title"].ToString();
                    e.D_Receive = dr["D_Receive"].ToString();
                    e.D_Content = dr["D_Content"].ToString();
                    e.D_Time = Convert.ToDateTime(dr["D_Time"]);
                }
                dr.Close();
                return e;
            }
            catch (Exception)
            {
                
                return null;
            }
        }

        /// <summary>
        /// 添加草稿
        /// </summary>
        /// <param name="d"></param>
        /// <returns></returns>
        public static int InsertDraft(Draft d)
        {
            string sql = "Insert into Draft values('" + d.D_LoginId + "','" + d.D_Title + "','" + d.D_Receive + "','" + d.D_Content + "','" + d.D_Time + "')";
            int n = DBHelper.ExecuteNonQuery(sql, CommandType.Text);
            return n;
        }

        /// <summary>
        /// 删除草稿
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public static int DeleteDraftById(string ids)
        {
            int n = 0;
            string sql = "Delete Draft where D_Id in(" + ids + ")";
            n = DBHelper.ExecuteNonQuery(sql, CommandType.Text);
            return n;
        }
    }
}
