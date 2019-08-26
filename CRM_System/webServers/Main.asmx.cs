using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace CRM_System.webServers
{
	/// <summary>
	/// Main 的摘要说明
	/// </summary>
	[WebService(Namespace = "http://tempuri.org/")]
	[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
	[System.ComponentModel.ToolboxItem(false)]
	// 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消注释以下行。 
	[System.Web.Script.Services.ScriptService]
	public class Main : System.Web.Services.WebService
	{

		[WebMethod]
		public string HelloWorld()
		{
			return "Hello World";
		}


		/// <summary>
		/// 判断登录状态
		/// </summary>
		/// <returns></returns>
		[WebMethod(EnableSession = true)]
		public object GetUsersInfo() {

			if (Session["UserLName"]!=null)
			{
				return new { status = true, UserLName = Session["UserLName"] };
			}
			else
			{
				return new { status = false, UserLName = "未登录"};
			}
		}

		[WebMethod]
		public string GetDate() {
			string date = "今天是：" + DateTime.Now.ToLongDateString().ToString()+" "+ DateTime.Now.DayOfWeek.ToString(); ;
			return date;
		}

		//#region 根据年月日计算星期几(Label2.Text=CaculateWeekDay(xxxx,xx,xx);)
		///// <summary>
		///// 根据年月日计算星期几(Label2.Text=CaculateWeekDay(2004,12,9);)
		///// </summary>
		///// <param name="y">年</param>
		///// <param name="m">月</param>
		///// <param name="d">日</param>
		///// <returns></returns>
		//public static string CaculateWeekDay(int y, int m, int d)
		//{
		//	if (m == 1) m = 13;
		//	if (m == 2) m = 14;
		//	int week = (d + 2 * m + 3 * (m + 1) / 5 + y + y / 4 - y / 100 + y / 400) % 7 + 1;
		//	string weekstr = "";
		//	switch (week)
		//	{
		//		case 1: weekstr = "星期一"; break;
		//		case 2: weekstr = "星期二"; break;
		//		case 3: weekstr = "星期三"; break;
		//		case 4: weekstr = "星期四"; break;
		//		case 5: weekstr = "星期五"; break;
		//		case 6: weekstr = "星期六"; break;
		//		case 7: weekstr = "星期日"; break;
		//	}

		//	return weekstr;
		//}
		//#endregion
	}
}
