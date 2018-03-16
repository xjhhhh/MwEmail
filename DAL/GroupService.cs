using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using Model;

namespace DAL
{
    public class GroupService
    {
        /// <summary>
        /// 获取用户所有分组
        /// </summary>
        /// <param name="uid"></param>
        /// <returns></returns>
        public static List<Group> GetAllGroup(string uid)
        {
            List<Group> list = new List<Group>();
            string table = "Group_" + uid;
            string sql = "select * from " + table;
            try
            {
                DataSet ds = DBHelper.GetDataSet(sql, CommandType.Text);
                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    Group g = new Group();
                    if (Convert.ToInt32(row["G_Id"]) == 1)
                        continue;
                    g.G_Id = Convert.ToInt32(row["G_Id"]);
                    g.G_Name = row["G_Name"].ToString();
                    list.Add(g);
                }
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// 根据编号查询分组
        /// </summary>
        /// <param name="uid"></param>
        /// <param name="gid"></param>
        /// <returns></returns>
        public static Group SelectGroupById(string uid, int gid)
        {
            Group g = null;
            string table = "Group_" + uid;
            string sql = "select * from " + table + " where G_Id=" + gid;
            SqlDataReader dr = DBHelper.ExecuteReader(sql, CommandType.Text);
            if (dr.Read())
            {
                g = new Group();
                g.G_Id = Convert.ToInt32(dr["G_Id"]);
                g.G_Name = dr["G_Name"].ToString();
            }
            dr.Close();
            return g;
        }

        /// <summary>
        /// 获取分组联系人数量
        /// </summary>
        /// <param name="uid"></param>
        /// <returns></returns>
        public static List<GroupC> GetGroupCount(string uid)
        {
            List<GroupC> list = new List<GroupC>();
            string table1 = "Friend_" + uid;
            string table2 = "Group_" + uid;
            string sql = "select G_Id,COUNT(G_Id) as gCount from " + table1 + " f," + table2 + " g where f.F_Group = g.G_Id group by G_Id";
            DataSet ds = DBHelper.GetDataSet(sql, CommandType.Text);
            foreach (DataRow row in ds.Tables[0].Rows)
            {
                GroupC g = new GroupC();
                g.G_Id = Convert.ToInt32(row["G_Id"]);
                g.G_Count = Convert.ToInt32(row["gCount"]);
                list.Add(g);
            }
            return list;
        }

        /// <summary>
        /// 添加分组
        /// </summary>
        /// <param name="uid"></param>
        /// <param name="groupName"></param>
        /// <returns></returns>
        public static int InsertGroup(string uid, string groupName)
        {
            string table = "Group_" + uid;
            string sql = "Insert into " + table + " values('" + groupName + "')";
            int n = DBHelper.ExecuteNonQuery(sql, CommandType.Text);
            return n;
        }

        /// <summary>
        /// 删除分组
        /// </summary>
        /// <param name="uid"></param>
        /// <param name="gid"></param>
        /// <returns></returns>
        public static int DeleteGroup(string uid,int gid)
        {
            string table = "Group_" + uid;
            string sql = "Delete " + table + " where G_Id='" + gid + "'";
            int n = DBHelper.ExecuteNonQuery(sql, CommandType.Text);
            return n;
        }

    }
}