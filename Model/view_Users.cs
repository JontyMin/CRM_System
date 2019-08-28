using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Model
{
		[KeyInfo("")]
		public class View_Users :ModelBase
		{
			public System.Int32 ? UserID {get; set;}
			public System.Int32 ? RoleID {get; set;}
			public System.String UserLName {get; set;}
			public System.String UserLPWD {get; set;}
			public System.String UserName {get; set;}
			public System.String RoleName {get; set;}
		}
}
