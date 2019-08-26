using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Model
{
		[KeyInfo("PlanID")]
		public class Plans :ModelBase
		{
			public System.Int32 ? PlanID {get; set;}
			public System.Int32 ? ChanID {get; set;}
			public System.DateTime ? PlanDate {get; set;}
			public System.String PlanContent {get; set;}
			public System.DateTime ? PlanResultDate {get; set;}
			public System.String PlanResult {get; set;}
		}
}
