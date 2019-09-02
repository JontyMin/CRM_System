using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Model
{
		[KeyInfo("")]
		public class View_Chance :ModelBase
		{
			public System.Int32 ? ChanID {get; set;}
			public System.String ChanName {get; set;}
			public System.Int32 ? ChanRate {get; set;}
			public System.String ChanLinkMan {get; set;}
			public System.String ChanLinkTel {get; set;}
			public System.String ChanTitle {get; set;}
			public System.String ChanDesc {get; set;}
			public System.Int32 ? ChanCreateMan {get; set;}
			public System.DateTime ? ChanCreateDate {get; set;}
			public System.Int32 ? ChanDueMan {get; set;}
			public System.DateTime ? ChanDueDate {get; set;}
			public System.Int32 ? ChanState {get; set;}
			public System.String ChanError {get; set;}
			public System.String UserName {get; set;}
		}
}
