using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Model;
using Dal;
using System.Data.SqlClient;
namespace CRM_System.webServers
{
	/// <summary>
	/// Plans 的摘要说明
	/// </summary>
	[WebService(Namespace = "http://tempuri.org/")]
	[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
	[System.ComponentModel.ToolboxItem(false)]
	// 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
	[System.Web.Script.Services.ScriptService]
	public class Plans : System.Web.Services.WebService
	{

		[WebMethod]
		public string HelloWorld()
		{
			return "Hello World";
		}


		/// <summary>
		/// 根据计划id查询
		/// </summary>
		/// <param name="ChanID"></param>
		/// <returns></returns>
		[WebMethod]
		public List<Model.Plans> GetPlansByChanID(int ChanID) {
			string sql = string.Format(@"select * from Plans where ChanID=@ChanID");
			SqlParameter[] sp = new SqlParameter[] {
				new SqlParameter("@ChanID",ChanID)
			};
			return DalBase.SelectsByWhere<Model.Plans>(sql,sp);

		}


		/// <summary>
		/// 新增计划
		/// </summary>
		/// <param name="plan"></param>
		/// <returns></returns>
		[WebMethod]
		public int InsertNewPlan(Model.Plans plan) {
			plan.PlanDate = DateTime.Now;
			int id = -1;
			if (DalBase.Insert(plan)>0)
			{
				id = DalBase.GetMax<Model.Plans>();
			}
			return id;
		 }


		/// <summary>
		/// 计划结果
		/// </summary>
		/// <param name="plan"></param>
		/// <returns></returns>
		[WebMethod]
		public int UpdPlan(Model.Plans plan) {
			plan.PlanResultDate = DateTime.Now;
			return DalBase.Updata(plan);
		}
	}
}
