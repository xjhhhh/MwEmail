using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using Model;

namespace DAL
{
    public class UserService
    {

        /// <summary>
        /// 获取所有用户信息
        /// </summary>
        /// <returns></returns>
        public static List<Users> GetAllUsers()
        {
            List<Users> list = new List<Users>();
            string sql = "select * from Users";
            DataSet ds = DBHelper.GetDataSet(sql, CommandType.Text);
            foreach (DataRow row in ds.Tables[0].Rows)
            {
                Users u = new Users();
                u.U_Id = Convert.ToInt32(row["U_Id"]);
                u.U_LoginId = row["U_LoginId"].ToString();
                u.U_LoginPwd = row["U_LoginPwd"].ToString();
                u.U_Phone = row["U_Phone"].ToString();
                list.Add(u);
            }
            return list;
        }


        /// <summary>
        /// 根据用户名查询用户
        /// </summary>
        /// <param name="loginId"></param>
        /// <returns></returns>
        public static Users SelectUserByLoginId(string loginId)
        {
            Users u = null;
            string sql = "select * from Users where U_LoginId = '" + loginId + "'";
            SqlDataReader dr = DBHelper.ExecuteReader(sql, CommandType.Text);
            if (dr.Read())
            {
                u = new Users();
                u.U_Id = Convert.ToInt32(dr["U_Id"]);
                u.U_LoginId = dr["U_LoginId"].ToString();
                u.U_LoginPwd = dr["U_LoginPwd"].ToString();
                u.U_Phone = dr["U_Phone"].ToString();
            }
            dr.Close();
            return u;
        }

        /// <summary>
        /// 根据手机号查询用户
        /// </summary>
        /// <param name="phone"></param>
        /// <returns></returns>
        public static Users SelectUserByPhone(string phone)
        {
            Users u = null;
            string sql = "select * from Users where U_Phone = '" + phone + "'";
            SqlDataReader dr = DBHelper.ExecuteReader(sql, CommandType.Text);
            if (dr.Read())
            {
                u = new Users();
                u.U_Id = Convert.ToInt32(dr["U_Id"]);
                u.U_LoginId = dr["U_LoginId"].ToString();
                u.U_LoginPwd = dr["U_LoginPwd"].ToString();
                u.U_Phone = dr["U_Phone"].ToString();
            }
            dr.Close();
            return u;
        }

        /// <summary>
        /// 添加用户
        /// </summary>
        /// <param name="u"></param>
        /// <returns></returns>
        public static int InsertUser(Users u)
        {
            int n = 0;
            string sql = "Insert into Users(U_LoginId,U_LoginPwd,U_Phone) values(@U_LoginId,@U_LoginPwd,@U_Phone)";
            SqlParameter[] para = new SqlParameter[]
            {
                new SqlParameter("@U_LoginId",u.U_LoginId),
                new SqlParameter("@U_LoginPwd",u.U_LoginPwd),
                new SqlParameter("@U_Phone",u.U_Phone)
            };
            n = DBHelper.ExecuteNonQuery(sql, CommandType.Text, para);
            return n;
        }

        /// <summary>
        /// 修改密码
        /// </summary>
        /// <param name="u"></param>
        /// <returns></returns>
        public static int UpdatePwd(string loginPwd, string loginId)
        {
            int n = 0;
            string sql = "Update Users set U_LoginPwd = '" + loginPwd + "' where U_LoginId = '" + loginId + "' ";
            n = DBHelper.ExecuteNonQuery(sql, CommandType.Text);
            return n;
        }

        /// <summary>
        /// 动态生成联系人表
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public static string createTable(string id)
        {
            try
            {
                string fname = "friend_" + id;
                string gname = "group_" + id;
                SqlParameter[] para = new SqlParameter[]
                    {
                    new SqlParameter("@fname",fname),
                    new SqlParameter("@gname",gname)
                    };
                DataSet ds = DBHelper.GetDataSet("createtable", CommandType.StoredProcedure, para);
                return "成功";
            }
            catch (Exception)
            {
                return null;
            }
        }

    }
}
