using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Data.SqlClient;
using Dal;
using Model;
namespace CRM_System.webServers
{
	/// <summary>
	/// LinkMans 的摘要说明
	/// </summary>
	[WebService(Namespace = "http://tempuri.org/")]
	[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
	[System.ComponentModel.ToolboxItem(false)]
	// 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
	[System.Web.Script.Services.ScriptService]
	public class LinkMans : System.Web.Services.WebService
	{

		[WebMethod]
		public string HelloWorld()
		{
			return "Hello World";
		}


		/// <summary>
		/// 根据客户id查询联系人
		/// </summary>
		/// <param name="CusID"></param>
		/// <returns></returns>
		[WebMethod]
		public List<Model.LinkMans> GetLinkManBy(int CusID) {
			string sql = string.Format(@"select * from LinkMans where CusID=@CusID");
			SqlParameter[] sp = new SqlParameter[] {
				new SqlParameter("@CusID",CusID)
			};
			return DalBase.SelectsByWhere<Model.LinkMans>(sql,sp);
		}


		/// <summary>
		/// 根据联系人id查询
		/// </summary>
		/// <param name="LMID"></param>
		/// <returns></returns>
		[WebMethod]
		public List<Model.LinkMans> GetLinkManByLM(int LMID) {
			string sql = string.Format(@"select * from LinkMans where LMID=@LMID");
			SqlParameter[] sp = new SqlParameter[] {
				new SqlParameter("@LMID",LMID)
			};
			return DalBase.SelectsByWhere<Model.LinkMans>(sql,sp);
		}
		

		/// <summary>
		/// 修改联系人
		/// </summary>
		/// <param name="link"></param>
		/// <returns></returns>
		[WebMethod]
		public int UpdLink(Model.LinkMans link) {
			return DalBase.Updata(link);
		}


		/// <summary>
		/// 新增联系人
		/// </summary>
		/// <param name="link"></param>
		/// <returns></returns>
		[WebMethod]
		public int InsertLink(Model.LinkMans link) {
			int id = -1;
			if (DalBase.Insert(link)>0)
			{
				id = DalBase.GetMax<Model.LinkMans>();
			}
			return id;
		}
		/// <summary>
		/// 根据id删除
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		[WebMethod]
		public int delLink(int id)
		{
			return DalBase.Delete<Model.LinkMans>(id);

		}
	}
}
