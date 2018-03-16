using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using Model;

namespace DAL
{
    public class FriendService
    {

        /// <summary>
        /// 查询用户所有联系人
        /// </summary>
        /// <param name="uid"></param>
        /// <returns></returns>
        public static List<Friend> GetAllFriend(string uid)
        {
            List<Friend> list = new List<Friend>();
            string table = "Friend_" + uid;
            string sql = "select * from " + table;
            try
            {
                DataSet ds = DBHelper.GetDataSet(sql, CommandType.Text);
                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    Friend f = new Friend();
                    f.F_Id = Convert.ToInt32(row["F_Id"]);
                    f.F_User = row["F_User"].ToString();
                    f.F_Mail = row["F_Mail"].ToString();
                    f.F_Fname = row["F_Fname"].ToString();
                    f.F_Phone = row["F_Phone"].ToString();
                    f.F_Group = GroupService.SelectGroupById(uid, Convert.ToInt32(row["F_Group"]));
                    list.Add(f);
                }
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }

        /// <summary>
        /// 根据分组查询联系人
        /// </summary>
        /// <param name="uid"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public static List<Friend>SelectFriendByGroup(string uid,string id)
        {
            List<Friend> list = new List<Friend>();
            string table = "Friend_" + uid;
            string sql = "select * from " + table + " where F_Group='" + id + "'";
            DataSet ds = DBHelper.GetDataSet(sql, CommandType.Text);
            foreach (DataRow row in ds.Tables[0].Rows)
            {
                Friend f = new Friend();
                f.F_Id = Convert.ToInt32(row["F_Id"]);
                f.F_User = row["F_User"].ToString();
                f.F_Mail = row["F_Mail"].ToString();
                f.F_Fname = row["F_Fname"].ToString();
                f.F_Phone = row["F_Phone"].ToString();
                f.F_Group = GroupService.SelectGroupById(uid, Convert.ToInt32(row["F_Group"]));
                list.Add(f);
            }
            return list;
        }


        /// <summary>
        /// 修改联系人备注
        /// </summary>
        /// <param name="uid"></param>
        /// <param name="fid"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        public static int UpdateFriendDesc(string uid,int fid,string name)
        {
            string table = "Friend_" + uid;
            string sql = "update " + table + " set F_Fname='" + name + "' where F_Id=" + fid;
            int n = DBHelper.ExecuteNonQuery(sql, CommandType.Text);
            return n;
        }


        /// <summary>
        /// 修改联系人所在分组
        /// </summary>
        /// <param name="uid"></param>
        /// <param name="fid"></param>
        /// <param name="gid"></param>
        /// <returns></returns>
        public static int UpdateGroup(string uid,int gid,string fid)
        {
            string table = "Friend_" + uid;
            string sql = "update " + table + " set F_Group=" + gid + " where F_Id in(" + fid + ")";
            int n = DBHelper.ExecuteNonQuery(sql, CommandType.Text);
            return n;
        }

        /// <summary>
        /// 删除联系人
        /// </summary>
        /// <param name="uid"></param>
        /// <param name="ids"></param>
        /// <returns></returns>
        public static int DeleteFriend(string uid,string ids)
        {
            string table = "Friend_" + uid;
            string sql = "Delete From " + table + " where F_Id in(" + ids + ")";
            int n = DBHelper.ExecuteNonQuery(sql, CommandType.Text);
            return n;
        }

    }
}
