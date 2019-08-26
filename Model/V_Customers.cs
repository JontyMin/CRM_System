using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Model
{
		[KeyInfo("CLID")]
		public class V_Customers :ModelBase
		{
			public System.Int32 ? CusID {get; set;}
			public System.Int32 ? UserID {get; set;}
			public System.String CusName {get; set;}
			public System.String CusAddress {get; set;}
			public System.String CusZip {get; set;}
			public System.String CusFax {get; set;}
			public System.String CusWebsite {get; set;}
			public System.String CusLicenceNo {get; set;}
			public System.String CusChieftain {get; set;}
			public System.Int32 ? CusBankroll {get; set;}
			public System.Int32 ? CusTurnover {get; set;}
			public System.String CusBank {get; set;}
			public System.String CusBankNo {get; set;}
			public System.String CusLocalTaxNo {get; set;}
			public System.String CusNationalTaxNo {get; set;}
			public System.DateTime ? CusDate {get; set;}
			public System.Int32 ? CusState {get; set;}
			public System.String UserName {get; set;}
		}
}
