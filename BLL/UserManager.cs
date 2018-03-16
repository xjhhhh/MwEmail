using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL;
using Model;

namespace BLL
{
    public class UserManager
    {

        /// <summary>
        /// 获取所有用户信息
        /// </summary>
        /// <returns></returns>
        public static List<Users> GetAllUsers()
        {
            return UserService.GetAllUsers();
        }

        /// <summary>
        /// 根据用户名查询用户
        /// </summary>
        /// <param name="loginId"></param>
        /// <returns></returns>
        public static Users SelectUserByLoginId(string loginId)
        {
            return UserService.SelectUserByLoginId(loginId);
        }

        /// <summary>
        /// 根据手机号查询用户
        /// </summary>
        /// <param name="phone"></param>
        /// <returns></returns>
        public static Users SelectUserByPhone(string phone)
        {
            return UserService.SelectUserByPhone(phone);
        }

        /// <summary>
        /// 添加用户
        /// </summary>
        /// <param name="u"></param>
        /// <returns></returns>
        public static int InsertUser(Users u)
        {
            return UserService.InsertUser(u);
        }

        /// <summary>
        /// 修改密码
        /// </summary>
        /// <param name="u"></param>
        /// <returns></returns>
        public static int UpdatePwd(string loginPwd, string loginId)
        {
            return UserService.UpdatePwd(loginPwd, loginId);
        }

        /// <summary>
        /// 动态生成联系人表
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public static string createTable(string id)
        {
            return UserService.createTable(id);
        }
    }
}