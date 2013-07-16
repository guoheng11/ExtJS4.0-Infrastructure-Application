using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Cookbook
{

    public class FilterProject
    {
        public static IQueryable<Project> filterProject(HttpContext context, CookDBDataContext db, User u)
        {
            HttpRequest req = context.Request;
            IQueryable<Project> q = db.Projects;
            q = q.OrderByDescending(a => a.project_id);

            if (!isNull(req.Params.Get("biz_id")))
            {
                int bid = int.Parse(req.Params.Get("biz_id"));
                q = q.Where(a => a.PrimaryBusinessUnit.biz_id == bid
                        || a.ProjectBusinessUnits.Any(b => b.biz_id == bid));
            }

            string prj_nm = req.Params.Get("project_name");
            if (!isNull(prj_nm))
            {
                q = q.Where(a => a.project_name.IndexOf(prj_nm) != -1
                            || a.project_number.IndexOf(prj_nm) != -1);
            }

            if (!isNull(req.Params.Get("project_status")))
            {
                JArray arr = (JArray)JsonConvert.DeserializeObject(req.Params.Get("project_status"));
                List<string> lst = new List<string>();
                for (int i = 0; i < arr.Count(); i++)
                {
                    lst.Add(arr[i].ToString().Replace("\"", ""));
                }
                q = q.Where(a => lst.Contains(a.ProjectStatus.OrderByDescending(b => b.Created.changed).First().status_type));
            }

            string cname = req.Params.Get("company_name");
            if (!isNull(cname))
            {
                q = q.Where(a => a.PrimaryBusinessUnit.Company.company_name.IndexOf(cname) != -1
                    || a.ProjectBusinessUnits.Any(b => b.BusinessUnit.Company.company_name.IndexOf(cname) != -1));
            }

            string appname = req.Params.Get("app_name");
            if (!isNull(appname))
            {
                q = q.Where(a => a.ProjectIngredients.Any(b => b is ApplicationUpdate && ((ApplicationUpdate)b).app_name.Equals(appname)));
            }

            string tablename = req.Params.Get("table_name");
            if (!isNull(tablename))
            {
                q = q.Where(a => a.ProjectIngredients.Any(b => b is TableUpdate && ((TableUpdate)b).table_name.Equals(tablename)));
            }

            string exename = req.Params.Get("exe_name");
            if (!isNull(exename))
            {
                q = q.Where(a => a.ProjectIngredients.Any(b => b is ExecutableUpdate && ((ExecutableUpdate)b).exe_name.Equals(exename)));
            }

            if (!isNull(req.Params.Get("contact")))
            {
                string c = req.Params.Get("contact");
                q = q.Where(a => a.ProjectContacts.Any(b => b.Contact.contact_name.IndexOf(c) != -1));
            }

            if (!isNull(req.Params.Get("contact_id")))
            {
                int cid = int.Parse(req.Params.Get("contact_id"));
                q = q.Where(a => a.ProjectContacts.Any(b => b.contact_id == cid));
            }

            //this one should be last (restrict q as much as possible to limit the search space)
            if (!isNull(req.Params.Get("search_start_date")) && !isNull(req.Params.Get("search_end_date")))
            {
                DateTime startDate = DateTime.Parse(req.Params.Get("search_start_date"));
                DateTime endDate = DateTime.Parse(req.Params.Get("search_end_date"));
                string sdate = req.Params.Get("search_date_type");
                List<int> ids = new List<int>();
                if (isNull(sdate) || sdate.Equals("all"))
                {
                    foreach (Project p in q)
                    {
                        foreach (Option o in p.Options)
                        {
                            if (dateInRange(o.quoted_uat_date, startDate, endDate)
                                || dateInRange(o.production_date, startDate, endDate))
                            {
                                ids.Add(p.project_id);
                                break;
                            }
                            Assessment a = o.Assessments.SingleOrDefault(b => b.assessment_type.Equals("SWD"));
                            if (a != null)
                            {
                                if (dateInRange(a.booked_start, startDate, endDate)
                                    || dateInRange(a.booked_complete, startDate, endDate))
                                {
                                    ids.Add(p.project_id);
                                    break;
                                }
                            }
                        }
                    }
                    
                }
                else if (sdate.Equals("uat"))
                {
                    foreach (Project p in q)
                    {
                        foreach (Option o in p.Options)
                        {
                            if (dateInRange(o.quoted_uat_date, startDate, endDate))
                            {
                                ids.Add(p.project_id);
                                break;
                            }
                        }
                    }
                }
                else if (sdate.Equals("prod"))
                {
                    foreach (Project p in q)
                    {
                        foreach (Option o in p.Options)
                        {
                            if (dateInRange(o.production_date, startDate, endDate))
                            {
                                ids.Add(p.project_id);
                                break;
                            }
                        }
                    }
                }
                else if (sdate.Equals("dev_start"))
                {
                    foreach (Project p in q)
                    {
                        foreach (Option o in p.Options)
                        {
                            Assessment a = o.Assessments.SingleOrDefault(b => b.assessment_type.Equals("SWD"));
                            if (a != null)
                            {
                                if (dateInRange(a.booked_start, startDate, endDate))
                                {
                                    ids.Add(p.project_id);
                                    break;
                                }
                            }
                        }
                    }
                }
                else if (sdate.Equals("dev_end"))
                {
                    foreach (Project p in q)
                    {
                        foreach (Option o in p.Options)
                        {
                            Assessment a = o.Assessments.SingleOrDefault(b => b.assessment_type.Equals("SWD"));
                            if (a != null)
                            {
                                if (dateInRange(a.booked_complete, startDate, endDate))
                                {
                                    ids.Add(p.project_id);
                                    break;
                                }
                            }
                        }
                    }
                }
                q = q.Where(a => ids.Contains(a.project_id));
            }

            return q;
        }

        public static bool isNull(string str)
        {
            return DatabaseHandler.isNull(str);
        }

        public static DateTime? convertDate(string date)
        {
            try
            {
                DateTime ret = DateTime.Parse(date);
                return ret;
            }
            catch
            {
                return null;
            }
        }

        public static bool dateInRange(string str_date, DateTime startDate, DateTime endDate)
        {
            DateTime? date = convertDate(str_date);
            if (date.HasValue)
            {
                return dateInRange(date, startDate, endDate);
            }
            return false;
        }

        public static bool dateInRange(DateTime? date, DateTime startDate, DateTime endDate)
        {
            if (date >= startDate && date <= endDate)
            {
                return true;
            }
            return false;
        }
    }
}
