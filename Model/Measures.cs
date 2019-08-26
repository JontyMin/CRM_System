using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Model
{
		[KeyInfo("MeID")]
		public class Measures :ModelBase
		{
			public System.Int32 ? MeID {get; set;}
			public System.Int32 ? CLID {get; set;}
			public System.DateTime ? MeDate {get; set;}
			public System.String MeDesc {get; set;}
		}
}
