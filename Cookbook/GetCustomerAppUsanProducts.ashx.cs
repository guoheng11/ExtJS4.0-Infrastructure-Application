using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetCustomerAppUsanProducts
    /// </summary>
    public class GetCustomerAppUsanProducts : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<CustomerAppUsanProduct> q = db.CustomerAppUsanProducts;

            return new PagedData(q.Select(a => new { a.app_product_id, a.name }));
        }
    }
}