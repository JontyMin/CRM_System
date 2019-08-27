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
		/// <summary>
		///根据id删除角色
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		[WebMethod]
		public int DelRole(int id)
		{
			return DalBase.Delete<Model.Role>(id);
		}


		/// <summary>
		/// 新增角色
		/// </summary>
		/// <param name="role"></param>
		/// <returns></returns>
		[WebMethod]
		public int AddRole(Model.Role role) {
			int id = -1;
			if (DalBase.Insert(role)>0)
			{
				id = Convert.ToInt32(DalBase.GetMax<Model.Role>());
			}
			return id;
		}


		/// <summary>
		/// 根据id查询
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		[WebMethod]
		public List<Model.Role> GetRolesById(int id) {
			string sql = string.Format(@"select * from Role where ID="+id);
			return DalBase.SelectsByWhere<Model.Role>(sql,null) ;
		}

		/// <summary>
		/// 对象修改
		/// </summary>
		/// <param name="role"></param>
		/// <returns></returns>
		[WebMethod]
		public int UpdRole(Model.Role role) {

			return DalBase.Updata(role);
		}
		#region MyPage


		/// <summary>
		/// 分页
		/// </summary>
		/// <param name="PageIndex"></param>
		/// <param name="PageSize"></param>
		/// <returns></returns>
		[WebMethod]
		public MyPage<Model.Role> GetMyPage(int PageIndex,int PageSize) {
			string sql = string.Format(@"select top {0} * from Role where ID not in(select top {1} ID from Role)", PageSize, (PageIndex - 1) * PageSize);
			//行数
			int count = DalBase.GetCount<Model.Role>();
			count = count % PageSize == 0 ? count / PageSize : count / PageSize + 1;
			List<Model.Role> list = DalBase.SelectsByWhere<Model.Role>(sql,null);
			MyPage<Model.Role> page = new MyPage<Model.Role>();
			page.PageCount = count;
			page.Data = list;
			return page;

		}
		#endregion
	}
}
