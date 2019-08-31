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
	/// Chances 的摘要说明
	/// </summary>
	[WebService(Namespace = "http://tempuri.org/")]
	[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
	[System.ComponentModel.ToolboxItem(false)]
	// 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
	[System.Web.Script.Services.ScriptService]
	public class Chances : System.Web.Services.WebService
	{

		[WebMethod]
		public string HelloWorld()
		{
			return "Hello World";
		}


		/// <summary>
		/// 查询所有销售机会
		/// </summary>
		/// <returns></returns>
		[WebMethod]
		public List<Model.Chances> GetChances() {
			return DalBase.SelectAll<Model.Chances>();
		}


		/// <summary>
		/// 根据id删除
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		[WebMethod]
		public int DelChance(int id) {
			return DalBase.Delete<Model.Chances>(id);
		}

		/// <summary>
		/// 根据登录用户查询id
		/// </summary>
		/// <returns></returns>
		[WebMethod(EnableSession =true)]
		public int GetUsersID(){
			string UserLName = Session["UserLName"].ToString();
			string sql = string.Format(@"select UserID from Users where UserLName=@UserLName");
			SqlParameter[] sp = new SqlParameter[] {
				new SqlParameter("@UserLName",UserLName)
			};
			return DalBase.SelectObj(sql,sp) ;
		}


		/// <summary>
		/// 销售机会插入
		/// </summary>
		/// <param name="chances"></param>
		/// <returns></returns>
		[WebMethod]
		public int AddChance(Model.Chances chances) {

			chances.ChanDueDate = DateTime.Now;
			int id = -1;
			if (DalBase.Insert(chances)>0)
			{
				id = Convert.ToInt32(DalBase.GetMax<Model.Chances>());
			}
			return id;
		}


		/// <summary>
		/// 根据id查询
		/// </summary>
		/// <param name="ChanID"></param>
		/// <returns></returns>
		[WebMethod]
		public List<Model.Chances> GetChance(int ChanID) {
			string sql = string.Format("select * from Chances where ChanID=@ChanID");
			SqlParameter[] sp = new SqlParameter[] {
				new SqlParameter("@ChanID",ChanID)
			};
			return DalBase.SelectsByWhere<Model.Chances>(sql,sp);

		}

		/// <summary>
		/// 对象修改
		/// </summary>
		/// <param name="chances"></param>
		/// <returns></returns>
		[WebMethod]
		public int UpdChance(Model.Chances chances) {
			return DalBase.Updata(chances);
		}
	}
}
