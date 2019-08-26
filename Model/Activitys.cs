using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Model
{
		[KeyInfo("ActID")]
		public class Activitys :ModelBase
		{
			public System.Int32 ? ActID {get; set;}
			public System.Int32 ? CusID {get; set;}
			public System.DateTime ? ActDate {get; set;}
			public System.String ActAdd {get; set;}
			public System.String ActTitle {get; set;}
			public System.String ActMemo {get; set;}
			public System.String ActDesc {get; set;}
		}
}
