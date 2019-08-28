﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using Dal;
using Model;

namespace CRM_System.webServers
{
	/// <summary>
	/// Users 的摘要说明
	/// </summary>
	[WebService(Namespace = "http://tempuri.org/")]
	[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
	[System.ComponentModel.ToolboxItem(false)]
	// 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
	[System.Web.Script.Services.ScriptService]
	public class Users : System.Web.Services.WebService
	{

		[WebMethod]
		public string HelloWorld()
		{
			return "Hello World";
		}

		#region 登录
		/// <summary>
		/// 登录判断
		/// </summary>
		/// <param name="UserLName"></param>
		/// <param name="UserLPWD"></param>
		/// <returns></returns>
		[WebMethod(EnableSession = true)]

		public int UsersLogin(string UserLName, string UserLPWD)
		{
			string sql = string.Format(@"select count(*) from Users where UserLName=@UserLName and UserLPWD=@UserLPWD");
			SqlParameter[] sp = new SqlParameter[]{
				new SqlParameter("@UserLName",UserLName),
				new SqlParameter("@UserLPWD",UserLPWD),
			};
			int count = DalBase.SelectObj(sql, sp);
			if (count > 0)
			{
				Session["UserLName"] = UserLName;
				return 1;
			}
			else
			{
				return -1;
			}
		}
		#endregion


		/// <summary>
		/// 查询所有用户信息
		/// </summary>
		/// <returns></returns>
		[WebMethod]
		public List<Model.View_Users> GetUsers() {
			return DalBase.SelectAll<Model.View_Users>();

		}


		/// <summary>
		/// 根据id删除用户
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		[WebMethod]
		public int DelUsersById(int id) {
			return DalBase.Delete<Model.Users>(id);
		}


		/// <summary>
		/// 添加用户
		/// </summary>
		/// <param name="users"></param>
		/// <returns></returns>
		[WebMethod]
		public int AddUsers(Model.Users users){
			int id = -1;
			if (DalBase.Insert(users)>0)
			{
				id = Convert.ToInt32(DalBase.GetMax<Model.Users>());
			}
			return id;

		}


		/// <summary>
		/// 根据id查询
		/// </summary>
		/// <param name="uid"></param>
		/// <returns></returns>
		[WebMethod]
		public List<Model.Users> GetUser(int uid) {
			string sql = "select * from Users where UserID=@UserID";
			SqlParameter[] sp = new SqlParameter[] {
				new SqlParameter("@UserID",uid)
			};
			return DalBase.SelectsByWhere<Model.Users>(sql,sp);
		}


		/// <summary>
		/// 对象修改
		/// </summary>
		/// <param name="users"></param>
		/// <returns></returns>
		[WebMethod]
		public int UpdUser(Model.Users users) {
			return DalBase.Updata(users);
		}
	}
}
