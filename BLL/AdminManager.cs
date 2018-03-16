using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL;
using Model;
namespace BLL
{
    public class AdminManager
    {
        /// <summary>
        /// 根据用户名查询管理员信息
        /// </summary>
        /// <param name="loginId"></param>
        /// <returns></returns>
        public static Admin SelectAdminByLoginId(string loginId)
        {
            return AdminService.SelectAdminByLoginId(loginId);
        }

        /// <summary>
        /// 修改密码
        /// </summary>
        /// <param name="loginId"></param>
        /// <param name="pwd"></param>
        /// <returns></returns>
        public static int UpdateAdminPwd(string loginId,string pwd)
        {
            return AdminService.UpdateAdminPwd(loginId, pwd);
        }
    }
}
