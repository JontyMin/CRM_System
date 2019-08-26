using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Model
{
		[KeyInfo("OrderID")]
		public class Orders :ModelBase
		{
			public System.Int32 ? OrderID {get; set;}
			public System.String CusID {get; set;}
			public System.DateTime ? OrderDate {get; set;}
		}
}
