using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace DAL
{
    public class DBHelper
    {
        private static SqlConnection conn;
        public static SqlConnection Conn
        {
            get
            {
                //获取表示层配置文件Web.Config文件中的连接字符串
                string str = ConfigurationManager.ConnectionStrings["connStr"].ToString();
                if (conn == null)
                {
                    conn = new SqlConnection(str);
                    conn.Open();
                }
                else if (conn.State == ConnectionState.Closed)
                    conn.Open();
                else if (conn.State == ConnectionState.Broken)
                {
                    conn.Close();
                    conn.Open();
                }
                
                return conn;
            }
        }

        /// <summary>
        /// 执行Insert/Update/Delete更新语句
        /// </summary>
        /// <param name="cmdText"></param>
        /// <param name="cmdType"></param>
        /// <param name="cmdParas"></param>
        /// <returns></returns>
        public static int ExecuteNonQuery(string cmdText,CommandType cmdType,params SqlParameter[] cmdParas)
        {
            SqlCommand cmd = new SqlCommand(cmdText,Conn);
            cmd.CommandType = cmdType;
            cmd.Parameters.AddRange(cmdParas);
            return cmd.ExecuteNonQuery();
        }

        /// <summary>
        /// 执行Select查询语句，返回数据读取器对象
        /// </summary>
        /// <param name="cmdText"></param>
        /// <param name="cmdType"></param>
        /// <param name="cmdParas"></param>
        /// <returns></returns>
        public static DataSet GetDataSet(string cmdText,CommandType cmdType,params SqlParameter[] cmdParas)
        {
            DataSet ds = new DataSet();
            SqlDataAdapter sda = new SqlDataAdapter(cmdText, Conn);
            sda.SelectCommand.CommandType = cmdType;
            sda.SelectCommand.Parameters.AddRange(cmdParas);
            sda.Fill(ds);
            return ds;
        }

        /// <summary>
        /// 执行Select查询语句，返回数据读取器对象
        /// </summary>
        /// <param name="cmdText"></param>
        /// <param name="cmdType"></param>
        /// <param name="cmdParas"></param>
        /// <returns></returns>
        public static SqlDataReader ExecuteReader(string cmdText,CommandType cmdType,params SqlParameter[] cmdParas)
        {
            SqlCommand cmd = new SqlCommand(cmdText, Conn);
            cmd.CommandType = cmdType;
            cmd.Parameters.AddRange(cmdParas);
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            return dr;
        }


    }
}
