using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Model;
using Dal;
using System.Data.SqlClient;
using System.Web.Script.Serialization;

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
		/// 分页查询
		/// </summary>
		/// <param name="index"></param>
		/// <param name="size"></param>
		/// <returns></returns>
		[WebMethod]
		public string Paging_Chances(int index, int size)
		{
			int count = DalBase.GetCount<Model.Chances>();
			return new JavaScriptSerializer().Serialize(new
			{
				PagingData = DalBase.Paging<Model.Chances>(index, size),
				PageCount = count % size == 0 ? count / size : count / size + 1
			});
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
		/// 销售机会插入
		/// </summary>
		/// <param name="chances"></param>
		/// <returns></returns>
		[WebMethod]
		public int AddChance(Model.Chances chances) {

			chances.ChanCreateDate = DateTime.Now;
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



		//机会指派界面


		/// <summary>
		/// 查询机会视图
		/// </summary>
		/// <returns></returns>
		[WebMethod]
		public List<Model.V_Chances> GetV_Chances() {
			string sql = string.Format(@"select * from V_Chances");
			return DalBase.SelectsByWhere<Model.V_Chances> (sql,null) ;

		}
		/// <summary>
		/// 多条件判断查询
		/// </summary>
		/// <param name="ChanName"></param>
		/// <param name="ChanLinkMan"></param>
		/// <param name="ChanCreateMan"></param>
		/// <param name="ChanDueMan"></param>
		/// <returns></returns>
		[WebMethod]
		public List<Model.V_Chances> GetV_ChancesBy(string ChanName,string ChanLinkMan,string ChanCreateManName, string ChanDueManName) {
			//ChanName 客户名  ChanLinkMan 联系人  ChanCreateManName 创建人  ChanDueManName 指派人
			string sql = string.Format(@"select * from V_Chances where 1=1 ");

			if (ChanName!=null&& ChanName!="")
			{
				sql += " and ChanName like @ChanName";
			}
			if (ChanLinkMan!=null&& ChanLinkMan!="")
			{
				sql += " and ChanLinkMan like @ChanLinkMan";
			}
			if (ChanCreateManName != null&& ChanCreateManName != "")
			{
				sql += " and ChanCreateManName like @ChanCreateManName";
			}
			if (ChanDueManName != null&& ChanDueManName != "")
			{
				sql += " and ChanDueManName like @ChanDueManName";
			}
			SqlParameter[] sp = new SqlParameter[] {
				new SqlParameter("@ChanName","%"+ChanName+"%"),
				new SqlParameter("@ChanLinkMan","%"+ChanLinkMan+"%"),
				new SqlParameter("@ChanCreateManName","%"+ChanCreateManName+"%"),
				new SqlParameter("@ChanDueManName","%"+ChanDueManName+"%"),
			};
			return DalBase.SelectsByWhere<Model.V_Chances>(sql,sp);
		}


		/// <summary>
		/// 指派销售机会
		/// </summary>
		/// <param name="chance"></param>
		/// <returns></returns>
		[WebMethod]
		public int UpdChanDue(Model.Chances chance) {
			chance.ChanDueDate = DateTime.Now;
			return DalBase.Updata(chance);

		}





		//客户开发计划界面


			/// <summary>
			/// 查询已指派的客户机会
			/// </summary>
			/// <returns></returns>
		[WebMethod]
		public List<Model.V_Chances> GetChanDue() {
			string sql = string.Format(@"select * from V_Chances where ChanState>1");
			return DalBase.SelectsByWhere<Model.V_Chances>(sql,null) ;

		}

	}
}
