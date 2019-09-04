using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Dal;
using Model;
using System.Data.SqlClient;
namespace CRM_System.webServers
{
	/// <summary>
	/// Activitys 的摘要说明
	/// </summary>
	[WebService(Namespace = "http://tempuri.org/")]
	[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
	[System.ComponentModel.ToolboxItem(false)]
	// 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
	[System.Web.Script.Services.ScriptService]
	public class Activitys : System.Web.Services.WebService
	{

		[WebMethod]
		public string HelloWorld()
		{
			return "Hello World";
		}

		/// <summary>
		/// 根据客户id查询交往记录
		/// </summary>
		/// <param name="CusID"></param>
		/// <returns></returns>
		[WebMethod]
		public List<Model.Activitys>GetActivitys(int CusID){
			string sql = string.Format(@"select *from Activitys where CusID=@CusID");
			SqlParameter[] sp = new SqlParameter[] {
				new SqlParameter("@CusID",CusID)
			};
			return DalBase.SelectsByWhere<Model.Activitys>(sql,sp);
		}

		/// <summary>
		/// 根据id查询交往记录
		/// </summary>
		/// <param name="CusID"></param>
		/// <returns></returns>
		[WebMethod]
		public List<Model.Activitys> GetActivityBy(int ActID)
		{
			string sql = string.Format(@"select *from Activitys where ActID=@ActID");
			SqlParameter[] sp = new SqlParameter[] {
				new SqlParameter("@ActID",ActID)
			};
			return DalBase.SelectsByWhere<Model.Activitys>(sql, sp);
		}


		/// <summary>
		/// 新增交往记录
		/// </summary>
		/// <param name="activity"></param>
		/// <returns></returns>
		[WebMethod]
		public int InsertAct(Model.Activitys activity) {
			int id = -1;
			if (DalBase.Insert(activity)>0)
			{
				id = DalBase.GetMax<Model.Activitys>();
			}
			return id;
		}

		/// <summary>
		/// 修改交往记录
		/// </summary>
		/// <param name="activity"></param>
		/// <returns></returns>
		[WebMethod]
		public int UpdAct(Model.Activitys activity) {
			return DalBase.Updata(activity);
		}


		/// <summary>
		/// 根据id删除
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		[WebMethod]
		public int delAct(int id) {
			return DalBase.Delete<Model.Activitys>(id);
		}
	}
}
