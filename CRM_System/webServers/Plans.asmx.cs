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

		[WebMethod]
		public List<Model.Plans> GetPlansByChanID(int ChanID) {
			string sql = string.Format(@"select * from Plans where ChanID=@ChanID");
			SqlParameter[] sp = new SqlParameter[] {
				new SqlParameter("@ChanID",ChanID)
			};
			return DalBase.SelectsByWhere<Model.Plans>(sql,sp);

		}
	}
}
