using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Dal;
using Model;


namespace CRM_System.webServers
{
	/// <summary>
	/// Role 的摘要说明
	/// </summary>
	[WebService(Namespace = "http://tempuri.org/")]
	[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
	[System.ComponentModel.ToolboxItem(false)]
	// 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
	[System.Web.Script.Services.ScriptService]
	public class Role : System.Web.Services.WebService
	{

		[WebMethod]
		public string HelloWorld()
		{
			return "Hello World";
		}


		/// <summary>
		/// 拿到所有角色
		/// </summary>
		/// <returns></returns>
		[WebMethod]
		public List<Model.Role> GetRoles() {

			return DalBase.SelectAll<Model.Role>();
		}

		/// <summary>
		/// 根据id查询角色
		/// </summary>
		[WebMethod]
		public List<Model.Role> GetRole(int rid) {
			string sql = "select RoleName from Role where ID="+rid;
			return DalBase.SelectsByWhere<Model.Role>(sql,null);
		}
	}
}
