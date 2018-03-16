using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Model
{
    /// <summary>
    /// 邮件表
    /// </summary>
    public class Email
    {
        /// <summary>
        /// 编号
        /// </summary>
        public int E_Id { get; set; }
        /// <summary>
        /// 标题
        /// </summary>
        public string E_Title { get; set; }
        /// <summary>
        /// 时间
        /// </summary>
        public DateTime E_Time { get; set; }
        /// <summary>
        /// 发送人
        /// </summary>
        public string E_SendMan { get; set; }
        /// <summary>
        /// 接收人
        /// </summary>
        public string E_ReceiveMan { get; set; }
        /// <summary>
        /// 内容
        /// </summary>
        public string E_Content { get; set; }
        /// <summary>
        /// 垃圾邮件标记
        /// </summary>
        public string E_Litter { get; set; }
        /// <summary>
        /// 已读标记
        /// </summary>
        public string E_Read { get; set; }
        /// <summary>
        /// 是否删除
        /// </summary>
        public string E_Delete { get; set; }
        /// <summary>
        /// 是否举报
        /// </summary>
        public string E_Report { get; set; }

    }
}