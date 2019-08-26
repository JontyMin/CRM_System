using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Model
{
		[KeyInfo("LMID")]
		public class LinkMans :ModelBase
		{
			public System.Int32 ? LMID {get; set;}
			public System.Int32 ? CusID {get; set;}
			public System.String LMName {get; set;}
			public System.String LMSex {get; set;}
			public System.String LMDuty {get; set;}
			public System.String LMMobileNo {get; set;}
			public System.String LMOfficeNo {get; set;}
			public System.String LMMemo {get; set;}
		}
}
