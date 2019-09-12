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
	/// CustomServices 的摘要说明
	/// </summary>
	[WebService(Namespace = "http://tempuri.org/")]
	[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
	[System.ComponentModel.ToolboxItem(false)]
	// 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
	[System.Web.Script.Services.ScriptService]
	public class CustomServices : System.Web.Services.WebService
	{

		[WebMethod]
		public string HelloWorld()
		{
			return "Hello World";
		}


		/// <summary>
		/// 创建服务
		/// </summary>
		/// <param name="customser"></param>
		/// <returns></returns>
		[WebMethod]
		public int InsertSer(Model.CustomServices customser) {

				customser.CSState = 1;
				customser.CSCreateDate = DateTime.Now;
				return DalBase.Insert(customser);
		}

		/// <summary>
		/// 获取登录人id
		/// </summary>
		/// <returns></returns>
		[WebMethod(EnableSession = true)]
		public int GetRid() {
			string UserLName = Session["UserLName"].ToString();
			//当前登录人角色id
			string sql1 = string.Format(@"select RoleID from Users where UserLName=@UserLName");
			SqlParameter[] sp1 = new SqlParameter[] {
				new SqlParameter("@UserLName",UserLName)
			};
			int rid = DalBase.SelectObj(sql1, sp1);
			return rid;
		}

		/// <summary>
		/// 查询未指派服务
		/// </summary>
		/// <returns></returns>
		[WebMethod(EnableSession = true)]
		public List<Model.V_CustomServices> GetCustomServices()
		{

			if (GetRid()<3)
			{
				string sql = string.Format(@"select * from v_CustomServices order by CSID desc");
				return DalBase.SelectsByWhere<Model.V_CustomServices>(sql, null);
			}
			return null;
		}


		/// <summary>
		/// 对象修改
		/// </summary>
		/// <param name="service"></param>
		/// <returns></returns>
		[WebMethod]
		public int UpdSer(Model.CustomServices service) {
			service.CSDueDate = DateTime.Now;
			return DalBase.Updata(service);
		}




		/// <summary>
		/// 根据状态查询
		/// </summary>后期加入登录用户id，查询分配给登录用户的服务
		/// <returns></returns>
		[WebMethod(EnableSession =true)]
		public List<Model.V_CustomServices> GetServicesBy(int CSState)
		{
			//当前登录人id
			string UserLName = Session["UserLName"].ToString();
			string sql1 = string.Format(@"select UserID from Users where UserLName=@UserLName");
			SqlParameter[] sp1 = new SqlParameter[] {
				new SqlParameter("@UserLName",UserLName)
			};
			int uid = DalBase.SelectObj(sql1, sp1);
			int rid = GetRid();

			if (rid < 3 || CSState==3)
			{
				string sql = string.Format(@"select * from [dbo].[v_CustomServices] where CSState = @CSState order by CSID desc");
				SqlParameter[] sp = new SqlParameter[] {
				new SqlParameter("@CSState",CSState)
			};
				return DalBase.SelectsByWhere<Model.V_CustomServices>(sql, sp);
			}
			else if (rid==3&&CSState==2)
			{
				string sql3 = string.Format(@"select * from [dbo].[v_CustomServices] where CSState = 2 and CSDueID=@CSDueID order by CSID desc");
				SqlParameter[] sp3 = new SqlParameter[] {
					new SqlParameter("@CSDueID",uid)
				};
				return DalBase.SelectsByWhere<Model.V_CustomServices>(sql3,sp3);
			}

			return null;
		}


		/// <summary>
		/// 根据服务id查询
		/// </summary>
		/// <returns></returns>
		[WebMethod]
		public List<Model.V_CustomServices> GetServicesByID(int CSID)
		{
			string sql = string.Format(@"select * from [dbo].[v_CustomServices] where CSID=@CSID");
			SqlParameter[] sp = new SqlParameter[] {
				new SqlParameter("@CSID",CSID)
			};
			return DalBase.SelectsByWhere<Model.V_CustomServices>(sql, sp);
		}


		/// <summary>
		/// 服务处理
		/// </summary>
		/// <param name="service"></param>
		/// <returns></returns>
		[WebMethod]
		public int UpdDeal(Model.CustomServices service) {
			service.CSState = 3;
			service.CSDealDate = DateTime.Now;
			return DalBase.Updata(service);

		}

		/// <summary>
		/// 服务反馈
		/// </summary>
		/// <param name="service"></param>
		/// <returns></returns>
		[WebMethod]
		public int UpdResult(Model.CustomServices service)
		{
			service.CSState = 4;
			return DalBase.Updata(service);

		}


		/// <summary>
		/// 条件查询
		/// </summary>
		/// <param name="CusName"></param>
		/// <param name="STID"></param>
		/// <returns></returns>
		[WebMethod(EnableSession =true)]
		public List<Model.V_CustomServices> GetV_CustomServicesBy(string CusName,string STID) {

			if (GetRid()<=3)
			{
				string sql = string.Format(@"select * from v_CustomServices where CSState=4");
				if (CusName != null && CusName != "")
				{
					sql += " and CusName like @CusName";
				}
				if (STID != null && STID != "")
				{
					sql += " and STID=@STID";
				}
				SqlParameter[] sp = new SqlParameter[] {
				new SqlParameter("@CusName",CusName),
				new SqlParameter("@STID",STID)
			};
				return DalBase.SelectsByWhere<Model.V_CustomServices>(sql, sp);
			}
			return null;
		}
	}
}
