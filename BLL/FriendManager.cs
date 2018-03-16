using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL;
using Model;

namespace BLL
{
    public class FriendManager
    {
        /// <summary>
        /// 查询用户所有联系人
        /// </summary>
        /// <param name="uid"></param>
        /// <returns></returns>
        public static List<Friend> GetAllFriend(string uid)
        {
            return FriendService.GetAllFriend(uid);
        }

        /// <summary>
        /// 根据分组查询联系人
        /// </summary>
        /// <param name="uid"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public static List<Friend> SelectFriendByGroup(string uid, string id)
        {
            return FriendService.SelectFriendByGroup(uid, id);
        }

        /// <summary>
        /// 修改联系人备注
        /// </summary>
        /// <param name="uid"></param>
        /// <param name="fid"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        public static int UpdateFriendDesc(string uid, int fid, string name)
        {
            return FriendService.UpdateFriendDesc(uid, fid, name);
        }

        /// <summary>
        /// 修改联系人所在分组
        /// </summary>
        /// <param name="uid"></param>
        /// <param name="fid"></param>
        /// <param name="gid"></param>
        /// <returns></returns>
        public static int UpdateGroup(string uid, int gid, string fid)
        {
            return FriendService.UpdateGroup(uid, gid, fid);
        }

        /// <summary>
        /// 删除联系人
        /// </summary>
        /// <param name="uid"></param>
        /// <param name="fid"></param>
        /// <returns></returns>
        public static int DeleteFriend(string uid, string ids)
        {
            return FriendService.DeleteFriend(uid, ids);
        }

        /// <summary>
        /// 获取分组中联系人数量信息
        /// </summary>
        /// <param name="uid"></param>
        /// <returns></returns>
        public static string SelectGroupCount(string uid)
        {
            List<Friend> list = GetAllFriend(uid);
            int gc = GroupManager.GetAllGroup(uid).Count();
            string text = "";
            for (int i = 0; i < gc-1; i++)
            {
                text += list.FindAll((p) => p.F_Group.ToString() == i.ToString()).Count.ToString()+",";
            }
            text.Substring(0, text.Length - 1);
            return text;
        }

    }
}
