using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Model
{
    /// <summary>
    /// 审核表
    /// </summary>
    public class Audit
    {
        /// <summary>
        /// 编号
        /// </summary>
        public int A_Id { get; set; }
        /// <summary>
        /// 管理员
        /// </summary>
        public string A_Admin { get; set; }
        /// <summary>
        /// 相关邮件
        /// </summary>
        public int A_Complaint { get; set; }
        /// <summary>
        /// 处理结果
        /// </summary>
        public string A_Content { get; set; }
    }
}
