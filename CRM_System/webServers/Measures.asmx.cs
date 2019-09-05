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
	/// Measures 的摘要说明
	/// </summary>
	[WebService(Namespace = "http://tempuri.org/")]
	[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
	[System.ComponentModel.ToolboxItem(false)]
	// 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
	[System.Web.Script.Services.ScriptService]
	public class Measures : System.Web.Services.WebService
	{

		[WebMethod]
		public string HelloWorld()
		{
			return "Hello World";
		}


		/// <summary>
		/// 查询暂缓措施
		/// </summary>
		/// <param name="CLID">流失客户id</param>
		/// <returns></returns>
		[WebMethod]
		public List<Model.Measures> GetMeasureBy(int CLID)
		{
			string sql = string.Format(@"select * from Measures where CLID=@CLID");
			SqlParameter[] sp = new SqlParameter[] {
				new SqlParameter("@CLID",CLID)
			};
			return DalBase.SelectsByWhere<Model.Measures>(sql, sp);
		}


		/// <summary>
		/// 添加暂缓计划
		/// </summary>
		/// <param name="measure"></param>
		/// <returns></returns>
		[WebMethod]
		public int InsertMea(Model.Measures measure) {
			measure.MeDate = DateTime.Now;
			int id = -1;
			if (DalBase.Insert(measure)>0)
			{
				Model.CustomLosts c = new Model.CustomLosts() {
					CLState=2,
					CLID=measure.CLID,
				};
				id=UpdLost(c);
			}
			return id;
		}

		public int UpdLost(Model.CustomLosts losts)
		{
			return DalBase.Updata(losts);
		}
	}
}
