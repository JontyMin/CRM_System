using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Model
{
		[KeyInfo("ID")]
		public class Role :ModelBase
		{
			public System.Int32 ? ID {get; set;}
			public System.String RoleName {get; set;}
		}
}
