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
	/// Menu 的摘要说明
	/// </summary>
	[WebService(Namespace = "http://tempuri.org/")]
	[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
	[System.ComponentModel.ToolboxItem(false)]
	// 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
	[System.Web.Script.Services.ScriptService]
	public class Menu : System.Web.Services.WebService
	{

		[WebMethod]
		public string HelloWorld()
		{
			return "Hello World";
		}

		/// <summary>
		/// 根据登录用户角色id查询菜单项
		/// </summary>
		/// <returns></returns>
		[WebMethod(EnableSession = true)]
		public List<Model.Menu> GetMenus() {
			string sql = string.Format(@"select * from Menu where ID in(select MenuID from power where RoleID=(select RoleID from Users where UserLName =@UserLName))");
			SqlParameter[] sp = new SqlParameter[] {
				new SqlParameter("@UserLName",Session["UserLName"])
			};
			return DalBase.SelectsByWhere<Model.Menu>(sql,sp);
		}
	}
}
