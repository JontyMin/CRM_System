using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using Model;
using System.Reflection;
namespace Dal
{
    public class DalBase
    {

		/// <summary>
		/// 配置文件连接字符串
		/// </summary>
		private static readonly string connStr = System.Configuration.ConfigurationManager.ConnectionStrings["conn"].ToString();

		#region DBHelp
		#region MyExecuteNonQuery
		/// <summary>
		/// ExecuteNonQuery方法
		/// </summary>
		/// <param name="sql">SQL语句</param>
		/// <param name="sp">参数化</param>
		/// <returns>int影响行数</returns>
		private static int MyExecuteNonQuery(string sql, SqlParameter[] sp)
		{
			using (SqlConnection conn = new SqlConnection(connStr))
			{
				conn.Open();
				SqlCommand cmd = new SqlCommand(sql, conn);
				if (sp != null)
				{
					cmd.Parameters.AddRange(sp);
				}
				return cmd.ExecuteNonQuery();
			}
		}
		#endregion


		#region ExecuteSqlDataReader
		/// <summary>
		/// ExecuteSqlDataReader
		/// </summary>
		/// <param name="sql"></param>
		/// <param name="sp"></param>
		/// <returns></returns>
		private static SqlDataReader ExecuteSqlDataReader(string sql, SqlParameter[] sp)
		{
			SqlConnection conn = new SqlConnection(connStr);
			conn.Open();
			SqlCommand cmd = new SqlCommand(sql, conn);
			if (sp != null)
			{
				cmd.Parameters.AddRange(sp);
			}
			SqlDataReader sd = cmd.ExecuteReader(CommandBehavior.CloseConnection);
			return sd;
		}
		#endregion


		#region ExecuteObject
		/// <summary>
		/// ExecuteObject
		/// </summary>
		/// <param name="sql"></param>
		/// <returns></returns>
		private static object ExecuteObject(string sql, SqlParameter[] sp)
		{
			using (SqlConnection conn = new SqlConnection(connStr))
			{
				conn.Open();
				SqlCommand cmd = new SqlCommand(sql, conn);
				if (sp != null)
				{
					cmd.Parameters.AddRange(sp);
				}
				return cmd.ExecuteScalar();

			}
		}
		#endregion
		#endregion

		/// <summary>
		/// 分页
		/// </summary>
		/// <typeparam name="T"></typeparam>
		/// <param name="index"></param>
		/// <param name="size"></param>
		/// <returns></returns>
		public static List<T> Paging<T>(int index, int size) where T : ModelBase
		{
			Type type = typeof(T);
			string TableName = type.Name;
			string KeyName = "";

			object[] co = type.GetCustomAttributes(true);
			if (co.Length > 0)
			{
				KeyName = (co[0] as KeyInfoAttribute).KeyName;
			}
			string sql = string.Format(@"select top {0} * from {1} where {2} not in (select top {3} {2} from {1})", size, TableName, KeyName, (index - 1) * size);
			List<T> models = new List<T>();
			using (SqlDataReader sqlDataReader = ExecuteSqlDataReader(sql, null))
			{
				while (sqlDataReader.Read())
				{
					T model = Activator.CreateInstance<T>();
					PropertyInfo[] propertyInfos = model.GetType().GetProperties();
					for (int i = 0; i < sqlDataReader.FieldCount; i++)
					{
						string colName = sqlDataReader.GetName(i);
						foreach (PropertyInfo item in propertyInfos)
						{
							if (item.Name.ToLower() == colName.ToLower())
							{
								if (sqlDataReader[colName] != DBNull.Value)
								{
									item.SetValue(model, sqlDataReader[colName], null);
								}
								else
								{
									item.SetValue(model, null, null);
								}
								break;
							}
						}
					}
					models.Add(model);
				}
			}
			return models;
		}



		/// <summary>
		/// 插入数据
		/// </summary>
		/// <param name="s"></param>
		/// <returns>int影响行数</returns>
		public static int Insert(ModelBase s) {
			Type t = s.GetType();//反射
			string tname = t.Name;//表名
			List<SqlParameter> list = new List<SqlParameter>();
			StringBuilder sb = new StringBuilder();
			StringBuilder sb1 = new StringBuilder();
			sb.Append("insert into ");
			sb.Append(tname);
			sb.Append("(");
			PropertyInfo[] pi = t.GetProperties();
			foreach (PropertyInfo item in pi)
			{
				if (item.GetValue(s,null)!=null)
				{
					sb.Append(item.Name);
					sb.Append(",");
					SqlParameter p = new SqlParameter("@"+item.Name,item.GetValue(s,null));
					list.Add(p);
					sb1.Append("@"+item.Name);
					sb1.Append(",");
				}
			}
			sb.Remove(sb.Length-1,1);
			sb.Append(")");
			sb.Append(" values (");
			sb1.Remove(sb1.Length-1,1);
			sb.Append(sb1+")");
			Console.WriteLine(sb);
			return MyExecuteNonQuery(sb.ToString(),list.ToArray());
		}


		/// <summary>
		/// 查询所有数据
		/// </summary>
		/// <typeparam name="T"></typeparam>
		/// <returns></returns>
		public static List<T> SelectAll<T>() where T : ModelBase {
			List<T> list = new List<T>();
			Type t = typeof(T);
			string sql = "select * from " + t.Name;
			using (SqlDataReader sd=ExecuteSqlDataReader(sql,null))
			{
				while (sd.Read())
				{
					T t1 = Activator.CreateInstance<T>();
					PropertyInfo[] ps = t.GetProperties();
					foreach (PropertyInfo item in ps)
					{
						if (sd[item.Name]!=DBNull.Value)
						{
							item.SetValue(t1,sd[item.Name]);
						}
					}
					list.Add(t1);
				}

			}
			return list;
		}

		/// <summary>
		/// 条件查询
		/// </summary>
		/// <typeparam name="T"></typeparam>
		/// <param name="sql"></param>
		/// <param name="sp"></param>
		/// <returns></returns>
		public static List<T> SelectByid<T>(string sql,SqlParameter[]sp) where T:ModelBase
		{
			List<T> list = new List<T>();
			Type t = typeof(T);
			using (SqlDataReader sd=ExecuteSqlDataReader(sql,sp))
			{
				T t1 = Activator.CreateInstance<T>();
				PropertyInfo[] pi = t.GetProperties();
				foreach (PropertyInfo item in pi)
				{
					if (sd[item.Name]!=DBNull.Value)
					{
						item.SetValue(t1,sd[item.Name]);
					}
				}
				list.Add(t1);
			}
			return list;
		}
		public static List<T> SelectsByWhere<T>(string sql,SqlParameter[]sp) where T : ModelBase
		{
			// 反射
			//1.类型反射
			List<T> ls = new List<T>();
			//Type t = typeof(T);
			//string tableName = t.Name;
			//string sql = string.Format("select * from {0}", tableName);
			using (SqlDataReader sd = ExecuteSqlDataReader(sql,sp))
			{
				while (sd.Read())
				{
					//动态类型创建
					// UserTable user = new UserTable();
					// user.Uid = Convert.ToInt32( sd["uid"]);
					T obj = Activator.CreateInstance<T>();

					//对象反射
					Type t1 = obj.GetType();
					//得到了当前创建的类型里面的所有的属性
					PropertyInfo[] ps = t1.GetProperties();
					for (int i = 0; i < sd.FieldCount; i++)
					{
						//得到数据库里面的列名
						string f_name = sd.GetName(i);
						//循环模型类里面所有的属性
						foreach (PropertyInfo p in ps)
						{
							//用数据库里面的列名和属性名进行比较，如果相同那么进行赋值操作
							if (f_name.ToLower() == p.Name.ToLower())
							{

								if (sd[f_name] != DBNull.Value)
								{
									//给属性赋值
									p.SetValue(obj, sd[f_name], null);
								}
								else
								{
									p.SetValue(obj, null, null);
								}
								break;
							}
						}
					}
					ls.Add(obj);

				}
			}
			return ls;
		}
		/// <summary>
		/// 修改
		/// </summary>
		/// <param name="s"></param>
		/// <returns></returns>
		public static int Updata(ModelBase s) {
			Type t = s.GetType();
			string tname = t.Name;
			StringBuilder sb = new StringBuilder();
			sb.Append(" update ");
			sb.Append(tname);
			sb.Append(" set ");
			string keyname = "";
			object[] objs = t.GetCustomAttributes(true);
			List<SqlParameter> list = new List<SqlParameter>();
			if (objs.Length>0)
			{
				keyname = (objs[0] as KeyInfoAttribute).KeyName;
			}
			else
			{
				throw new Exception("get out");
			}
			string where = "";
			foreach (PropertyInfo item in t.GetProperties())
			{
				if (item.Name.ToLower() != keyname.ToLower())
				{
					if (item.GetValue(s, null) != null)
					{
						sb.Append(item.Name);
						sb.Append(" = ");
						sb.Append("@"+item.Name);
						sb.Append(",");

						list.Add(new SqlParameter("@"+item.Name,item.GetValue(s,null)));
					}
				}
				else
				{
					where = " where " + keyname + " = " + "@" + item.Name;
					list.Add(new SqlParameter("@" + item.Name, item.GetValue(s, null)));
				}
			}
			sb.Remove(sb.Length-1,1);
			sb.Append(where);

			return MyExecuteNonQuery(sb.ToString(), list.ToArray()); ;
		}
		/// <summary>
		///删除
		/// </summary>
		/// <typeparam name="T"></typeparam>
		/// <param name="o"></param>
		/// <returns></returns>
		public static int Delete<T>(object o) {
			Type t = typeof(T);
			string tname = t.Name;
			StringBuilder sb = new StringBuilder();
			sb.Append("delete from ");
			sb.Append(tname);
			sb.Append(" where ");
			string keyname = "";
			object[] objs = t.GetCustomAttributes(true);
			List<SqlParameter> list = new List<SqlParameter>();
			if (objs.Length > 0)
			{
				keyname = (objs[0] as KeyInfoAttribute).KeyName;
			}
			else
			{
				throw new Exception("get out");
			}
			sb.Append(keyname);
			sb.Append("=");
			sb.Append("@"+keyname);
			SqlParameter sp = new SqlParameter("@" + keyname, o);
			return MyExecuteNonQuery(sb.ToString(),new SqlParameter[] { sp}) ;
		}

		public static int GetCount<T>() where T : ModelBase
		{
			Type t = typeof(T);
			string tableName = t.Name;
			string sql = "select count(*) from " + tableName + "";
			return Convert.ToInt32(ExecuteObject(sql,null));
		}

		public static int SelectObj(string sql,SqlParameter[]sp) {
			return Convert.ToInt32( ExecuteObject(sql,sp));

		}


		public static int Insert(string sql, SqlParameter[] sp)
		{
			return MyExecuteNonQuery(sql,sp);

		}
		public static int GetMax<T>() where T : ModelBase
		{
			Type t = typeof(T);
			string keyname = "";
			object[] objs = t.GetCustomAttributes(true);
			if (objs.Length > 0)
			{
				keyname = (objs[0] as KeyInfoAttribute).KeyName;
			}
			else
			{
				throw new Exception("get out");
			}
			string tableName = t.Name;
			string sql = "select Max("+keyname+") from " + tableName + "";
			return Convert.ToInt32(ExecuteObject(sql,null));
		}
	}
}
