using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
 public	class KeyInfoAttribute:Attribute
	{
		public string KeyName { get; set; }
		public KeyInfoAttribute(string name)
		{
			KeyName = name;
		}
	}
}
