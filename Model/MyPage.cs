using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
	public class MyPage<T> where T:ModelBase
	{
		public int PageCount { get; set; }
		public List<T> Data { get; set; }

	}
}
