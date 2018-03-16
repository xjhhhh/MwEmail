using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Model
{
    /// <summary>
    /// 用户表
    /// </summary>
    public class Users
    {
        /// <summary>
        /// 用户编号
        /// </summary>
        public int U_Id { get; set; }
        /// <summary>
        /// 用户名
        /// </summary>
        public string U_LoginId { get; set; }
        /// <summary>
        /// 密码
        /// </summary>
        public string U_LoginPwd { get; set; }
        /// <summary>
        /// 手机号码
        /// </summary>
        public string U_Phone { get; set; }
    }
}
