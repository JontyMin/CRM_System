using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Model;
using Dal;
namespace CRM_System.webServers
{
	/// <summary>
	/// Power 的摘要说明
	/// </summary>
	[WebService(Namespace = "http://tempuri.org/")]
	[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
	[System.ComponentModel.ToolboxItem(false)]
	// 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
	[System.Web.Script.Services.ScriptService]
	public class Power : System.Web.Services.WebService
	{

		[WebMethod]
		public string HelloWorld()
		{
			return "Hello World";
		}


		/// <summary>
		/// 根据角色id更改权限
		/// </summary>
		/// <param name="rid"></param>
		/// <param name="ids"></param>
		/// <returns></returns>
		[WebMethod]
		public bool ChangePower(int rid,List<int>ids) {

			HashSet<int> hs = new HashSet<int>(ids);

			try
			{
				//先根据角色id删除已有权限
				//Model.Power p = new Model.Power() {RoleID=rid };
				DalBase.Delete<Model.Power>(rid);
				foreach (int item in hs)
				{
					Model.Power p1 = new Model.Power() {
						MenuID=item,
						RoleID=rid
					};
					DalBase.Insert(p1);
				}
				return true;
			}
			catch (Exception)
			{

				return false;
			}
		}

		
	}
}
