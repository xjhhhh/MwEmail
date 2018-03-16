using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Model
{
    /// <summary>
    /// 管理员表
    /// </summary>
    public class Admin
    {
        /// <summary>
        /// 编号
        /// </summary>
        public int A_Id { get; set; }
        /// <summary>
        /// 帐号
        /// </summary>
        public string A_LoginId { get; set; }
        /// <summary>
        /// 密码
        /// </summary>
        public string A_Pwd { get; set; }
        /// <summary>
        /// 权限
        /// </summary>
        public int A_Power { get; set; }
    }
}
