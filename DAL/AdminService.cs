using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using Model;

namespace DAL
{
    public class AdminService
    {
        /// <summary>
        /// 根据用户名查询管理员信息
        /// </summary>
        /// <param name="loginId"></param>
        /// <returns></returns>
        public static Admin SelectAdminByLoginId(string loginId)
        {
            Admin a = null;
            string sql = "select * from Admin Where A_LoginId = '" + loginId + "'";
            SqlDataReader dr = DBHelper.ExecuteReader(sql, CommandType.Text);
            if (dr.Read())
            {
                a = new Admin();
                a.A_Id = Convert.ToInt32(dr["A_Id"]);
                a.A_LoginId = dr["A_LoginId"].ToString();
                a.A_Pwd = dr["A_Pwd"].ToString();
                a.A_Power = Convert.ToInt32(dr["A_Power"]);
            }
            dr.Close();
            return a;
        }

        /// <summary>
        /// 修改密码
        /// </summary>
        /// <param name="loginId"></param>
        /// <param name="pwd"></param>
        /// <returns></returns>
        public static int UpdateAdminPwd(string loginId,string pwd)
        {
            int n = 0;
            string sql = "Update Admin set A_Pwd ='" + pwd + "' where A_LoginId='" + loginId + "'";
            n = DBHelper.ExecuteNonQuery(sql, CommandType.Text);
            return n;
        }
    }
}
