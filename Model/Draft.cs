using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Model
{
    /// <summary>
    /// 草稿表
    /// </summary>
    public class Draft
    {
        /// <summary>
        /// 编号
        /// </summary>
        public int D_Id { get; set; }
        /// <summary>
        /// 所属用户
        /// </summary>
        public string D_LoginId { get; set; }
        /// <summary>
        /// 标题
        /// </summary>
        public string D_Title { get; set; }
        /// <summary>
        /// 收件人
        /// </summary>
        public string D_Receive { get;  set; }
        /// <summary>
        /// 内容
        /// </summary>
        public string D_Content { get; set; }
        /// <summary>
        /// 时间
        /// </summary>
        public DateTime D_Time { get; set; }
    }
}