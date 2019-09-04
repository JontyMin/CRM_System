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
	/// Customers 的摘要说明
	/// </summary>
	[WebService(Namespace = "http://tempuri.org/")]
	[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
	[System.ComponentModel.ToolboxItem(false)]
	// 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
	[System.Web.Script.Services.ScriptService]
	public class Customers : System.Web.Services.WebService
	{

		[WebMethod]
		public string HelloWorld()
		{
			return "Hello World";
		}


		/// <summary>
		/// 查询客户信息
		/// </summary>
		/// <returns></returns>
		[WebMethod]
		public List<Model.V_Customers> GetCustomers() {
			return DalBase.SelectAll<Model.V_Customers>();
		}


		/// <summary>
		/// 条件查询
		/// </summary>
		/// <param name="CusName"></param>
		/// <param name="CusID"></param>
		/// <returns></returns>
		[WebMethod]
		public List<Model.V_Customers> GetVsBy(string CusName,string CusID) {
			string sql = string.Format(@"select * from V_Customers where 1=1");
			if (CusName!=null&& CusName!="")
			{
				sql += " and CusName like @CusName";
			}
			if (CusID!=null&&CusID!="")
			{
				sql += " and CusID=@CusID";
			}
		
			SqlParameter[] sp = new SqlParameter[] {
				new SqlParameter("@CusName","%"+CusName+"%"),
				new SqlParameter("@CusID",CusID)
			};
			return DalBase.SelectsByWhere<Model.V_Customers>(sql,sp);
		}

		/// <summary>
		/// 根据id查询客户
		/// </summary>
		/// <param name="CusID"></param>
		/// <returns></returns>
		[WebMethod]
		public List<Model.V_Customers> GetCustomerBy(int CusID) {
			string sql = string.Format(@"select * from V_Customers where CusID=@CusID");
			SqlParameter[] sp = new SqlParameter[] {
				new SqlParameter("@CusID",CusID)
			};
			return DalBase.SelectsByWhere<Model.V_Customers>(sql,sp);
			
		}


		/// <summary>
		/// 对象修改
		/// </summary>
		/// <param name="customer"></param>
		/// <returns></returns>
		[WebMethod]
		public int UpdCus(Model.Customers customer) {
			return DalBase.Updata(customer);
		}

	}
}
