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
	/// CustomLosts 的摘要说明
	/// </summary>
	[WebService(Namespace = "http://tempuri.org/")]
	[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
	[System.ComponentModel.ToolboxItem(false)]
	// 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
	[System.Web.Script.Services.ScriptService]
	public class CustomLosts : System.Web.Services.WebService
	{

		[WebMethod]
		public string HelloWorld()
		{
			return "Hello World";
		}

		/// <summary>
		/// 查询所有流失记录
		/// </summary>
		/// <returns></returns>
		[WebMethod]
		public List<Model.V_customlosts> GetLosts() {
			return DalBase.SelectAll<Model.V_customlosts>();
		}


		/// <summary>
		/// 根据id查询
		/// </summary>
		/// <param name="CLID"></param>
		/// <returns></returns>
		[WebMethod]
		public List<Model.CustomLosts> GetLostBy(int CLID) {
			string sql = string.Format(@"select CLReason from CustomLosts where CLID=@CLID");
			SqlParameter[] sp = new SqlParameter[] {
				new SqlParameter("@CLID",CLID)
			};
			return DalBase.SelectsByWhere<Model.CustomLosts>(sql,sp);
		}

		/// <summary>
		/// 修改报警状态
		/// </summary>
		/// <param name="losts"></param>
		/// <returns></returns>
		[WebMethod]
		public int UpdLost(Model.CustomLosts lost) {
			lost.CLState = 3;
			lost.CLEnterDate = DateTime.Now;
			return DalBase.Updata(lost);
		}

	}
}
