using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL;
using Model;

namespace BLL
{
    public class GroupManager
    {
        /// <summary>
        /// 获取用户所有分组
        /// </summary>
        /// <param name="uid"></param>
        /// <returns></returns>
        public static List<Group> GetAllGroup(string uid)
        {
            return GroupService.GetAllGroup(uid);
        }

        /// <summary>
        /// 根据编号查询分组
        /// </summary>
        /// <param name="uid"></param>
        /// <param name="gid"></param>
        /// <returns></returns>
        public static Group SelectGroupById(string uid, int gid)
        {
            return GroupService.SelectGroupById(uid, gid);
        }

        /// <summary>
        /// 获取分组联系人数量
        /// </summary>
        /// <param name="uid"></param>
        /// <returns></returns>
        public static List<GroupC> GetGroupCount(string uid)
        {
            return GroupService.GetGroupCount(uid);
        }

        /// <summary>
        /// 添加分组
        /// </summary>
        /// <param name="uid"></param>
        /// <param name="groupName"></param>
        /// <returns></returns>
        public static int InsertGroup(string uid, string groupName)
        {
            return GroupService.InsertGroup(uid, groupName);
        }

        /// <summary>
        /// 删除分组
        /// </summary>
        /// <param name="uid"></param>
        /// <param name="gid"></param>
        /// <returns></returns>
        public static int DeleteGroup(string uid,int gid)
        {
            return GroupService.DeleteGroup(uid, gid);
        }



    }
}