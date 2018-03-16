using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Model
{
    /// <summary>
    /// 联系人表
    /// </summary>
    public class Friend
    {
        /// <summary>
        /// 关系编号
        /// </summary>
        public int F_Id { get; set; }
        /// <summary>
        /// 用户名
        /// </summary>
        public string F_User { get; set; }
        /// <summary>
        /// 好友邮箱
        /// </summary>
        public string F_Mail { get; set; }
        /// <summary>
        /// 好友姓名
        /// </summary>
        public string F_Fname { get; set; }
        /// <summary>
        /// 电话
        /// </summary>
        public string F_Phone { get; set; }
        /// <summary>
        /// 所在分组
        /// </summary>
        public Group F_Group { get; set; }
    }
}
