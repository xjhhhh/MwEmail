using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL;
using Model;

namespace BLL
{
    public class DraftManager
    {
        /// <summary>
        /// 查询用户所有草稿
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public static List<Draft> SelectAllGraftByUser(int pageIndex, string user)
        {
            return DraftService.SelectAllGraftByUser(pageIndex, user);
        }

        /// <summary>
        /// 查询草稿总数量与页数
        /// </summary>
        /// <param name="user"></param>
        /// <param name="count"></param>
        /// <param name="pageCount"></param>
        /// <returns></returns>
        public static string SelectAddGraftCountAndpageCountByUser(string user, out int count, out int pageCount)
        {
            return DraftService.SelectAddGraftCountAndpageCountByUser(user, out count, out pageCount);
        }

        /// <summary>
        /// 根据编号查询草稿
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public static Draft SelectDraftById(int id)
        {
            return DraftService.SelectDraftById(id);
        }

        /// <summary>
        /// 添加草稿
        /// </summary>
        /// <param name="d"></param>
        /// <returns></returns>
        public static int InsertDraft(Draft d)
        {
            return DraftService.InsertDraft(d);
        }

        /// <summary>
        /// 删除草稿
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public static int DeleteDraftById(string ids)
        {
            return DraftService.DeleteDraftById(ids);
        }
    }
}
