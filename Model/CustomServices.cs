using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Model
{
		[KeyInfo("CSID")]
		public class CustomServices :ModelBase
		{
			public System.Int32 ? CSID {get; set;}
			public System.Int32 ? STID {get; set;}
			public System.String CusID {get; set;}
			public System.String CSTitle {get; set;}
			public System.Int32 ? CSState {get; set;}
			public System.String CSDesc {get; set;}
			public System.Int32 ? CSCreateID {get; set;}
			public System.DateTime ? CSCreateDate {get; set;}
			public System.Int32 ? CSDueID {get; set;}
			public System.DateTime ? CSDueDate {get; set;}
			public System.String CSDeal {get; set;}
			public System.DateTime ? CSDealDate {get; set;}
			public System.String CSResult {get; set;}
			public System.Int32 ? CSSatisfy {get; set;}
		}
}
