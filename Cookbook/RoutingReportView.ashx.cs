using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;
using System.Globalization;

namespace Cookbook
{
    public class RoutingReportView : DatabaseHandler
    {
        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {

            System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.InputStream, context.Request.ContentEncoding);
            IQueryable<ProjectInformation> q = db.ProjectInformations;
            var jsonSerializer = new JsonSerializer();
            String blob = (String)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(reader.ReadToEnd())));
            String type = "", application = "", platform = "", dnis = "";
            DateTime dateStart = DateTime.MinValue, dateEnd = DateTime.MaxValue;
            List<RoutingReports> returnReport = new List<RoutingReports>();

            if (blob.Contains('|'))
            {
                String[] criteria = blob.Split('|');
                foreach (String currCriteria in criteria)
                {
                    if (currCriteria.Contains("[T]"))
                    {
                        type = currCriteria.Substring(currCriteria.IndexOf(']') + 1).Trim();
                    }
                    else if (currCriteria.Contains("[A]"))
                    {
                        application = currCriteria.Substring(currCriteria.IndexOf(']') + 1).Trim();
                    }
                    else if (currCriteria.Contains("[P]"))
                    {
                        platform = currCriteria.Substring(currCriteria.IndexOf(']') + 1).Trim();
                    }
                    else if (currCriteria.Contains("[DS]"))
                    {
                        string str = currCriteria.Substring(currCriteria.IndexOf(']') + 1).Trim();
                        string format = "dd-MM-yyyy";
                        if (str != "" && (!isNull(str)))
                        {
                            string dateStartStr = DateTime.ParseExact(str, format, CultureInfo.InvariantCulture).ToString("MM/dd/yyyy");
                            dateStart = DateTime.ParseExact(dateStartStr, "MM/dd/yyyy", CultureInfo.InvariantCulture);
                        }
                    }
                    else if (currCriteria.Contains("[DE]"))
                    {
                        string str = currCriteria.Substring(currCriteria.IndexOf(']') + 1).Trim();
                        string format = "dd-MM-yyyy";
                        if (str != "" && (!isNull(str)))
                        {
                            string dateEndStr = DateTime.ParseExact(str, format, CultureInfo.InvariantCulture).ToString("MM/dd/yyyy");
                            dateEnd = DateTime.ParseExact(dateEndStr, "MM/dd/yyyy", CultureInfo.InvariantCulture);
                        }
                    }
                    else if (currCriteria.Contains("[D]"))
                    {
                        dnis = currCriteria.Substring(currCriteria.IndexOf(']') + 1).Trim();
                    }
                }
            }
            else
            {
                return new PagedData("Error: valid criteria must be submitted", false);
            }

            try
            {
                if (type.Contains(','))
                {
                    var typesArray = type.Split(',');
                    foreach (var currentType in typesArray)
                    {
                        var resultsList = db.RoutingRequirements.Where(a => a.type.Equals(currentType.ToLower().Trim())).ToList();
                        foreach (var currItem in resultsList)
                        {
                            if (currentType.ToLower() != "remove")
                            {
                                var dateToAdd = currItem.usan_date;
                                if (!isNull(dateToAdd))
                                {
                                    if (dateToAdd.Contains("T00"))
                                    {
                                        var month = dateToAdd.Substring(5, 2);
                                        var day = dateToAdd.Substring(8, 2);
                                        var year = dateToAdd.Substring(0, 4);
                                        dateToAdd = month + "/" + day + "/" + year;
                                    }
                                }
                                returnReport.Add(new RoutingReports
                                {
                                    project_name = currItem.ProjectInformation.project_name,
                                    project_number = currItem.ProjectInformation.project_number,
                                    project_id = currItem.ProjectInformation.project_id,
                                    type = currentType.ToUpper(),
                                    description = currItem.description,
                                    prod_date = dateToAdd,
                                    dnis = currItem.dnis,
                                    platform = currItem.platform,
                                    app = currItem.route_to
                                });
                            }
                            else
                            {
                                var dateToAdd = currItem.usan_date;
                                if (!isNull(dateToAdd))
                                {
                                    if (dateToAdd.Contains("T00"))
                                    {
                                        var month = dateToAdd.Substring(5, 2);
                                        var day = dateToAdd.Substring(8, 2);
                                        var year = dateToAdd.Substring(0, 4);
                                        dateToAdd = month + "/" + day + "/" + year;
                                    }
                                }
                                returnReport.Add(new RoutingReports
                                {
                                    project_name = currItem.ProjectInformation.project_name,
                                    project_number = currItem.ProjectInformation.project_number,
                                    project_id = currItem.ProjectInformation.project_id,
                                    type = currentType.ToUpper(),
                                    description = currItem.description,
                                    prod_date = dateToAdd,
                                    dnis = currItem.dnis,
                                    platform = currItem.platform,
                                    app = currItem.remove_from
                                });
                            }
                        }
                    }
                }
                else
                {
                    var resultsList = db.RoutingRequirements.Where(a => a.type.Equals(type.ToLower().Trim())).ToList();
                    foreach (var currItem in resultsList)
                    {
                        if (type.ToLower() != "remove")
                        {
                            var dateToAdd = currItem.usan_date;
                            if (!isNull(dateToAdd))
                            {
                                if (dateToAdd.Contains("T00"))
                                {
                                    var month = dateToAdd.Substring(5, 2);
                                    var day = dateToAdd.Substring(8, 2);
                                    var year = dateToAdd.Substring(0, 4);
                                    dateToAdd = month + "/" + day + "/" + year;
                                }
                            }
                            returnReport.Add(new RoutingReports
                            {
                                project_name = currItem.ProjectInformation.project_name,
                                project_number = currItem.ProjectInformation.project_number,
                                project_id = currItem.ProjectInformation.project_id,
                                type = type.ToUpper(),
                                description = currItem.description,
                                prod_date = dateToAdd,
                                dnis = currItem.dnis,
                                platform = currItem.platform,
                                app = currItem.route_to
                            });
                        }
                        else
                        {
                            var dateToAdd = currItem.usan_date;
                            if (!isNull(dateToAdd))
                            {
                                if (dateToAdd.Contains("T00"))
                                {
                                    var month = dateToAdd.Substring(5, 2);
                                    var day = dateToAdd.Substring(8, 2);
                                    var year = dateToAdd.Substring(0, 4);
                                    dateToAdd = month + "/" + day + "/" + year;
                                }
                            }
                            returnReport.Add(new RoutingReports
                            {
                                project_name = currItem.ProjectInformation.project_name,
                                project_number = currItem.ProjectInformation.project_number,
                                project_id = currItem.ProjectInformation.project_id,
                                type = type.ToUpper(),
                                description = currItem.description,
                                prod_date = dateToAdd,
                                dnis = currItem.dnis,
                                platform = currItem.platform,
                                app = currItem.remove_from
                            });
                        }
                    }
                }
            }
            catch (Exception e)
            {
                return new PagedData(e.ToString());
            }
            //now we have all of the reports for the given types, lets filter out the other submitted criteria

            if (application != "")
            {
                foreach (RoutingReports currItem in returnReport.ToList())
                {
                    if (isNull(currItem.app))
                    {
                        returnReport.Remove(currItem);
                        continue;
                    }
                    else if (!currItem.app.ToLower().Trim().Contains(application.ToLower().Trim()))
                    {
                        returnReport.Remove(currItem);
                    }
                }
            }

            if (platform != "")
            {
                foreach (RoutingReports currItem in returnReport.ToList())
                {
                    if (isNull(currItem.platform))
                    {
                        returnReport.Remove(currItem);
                        continue;
                    }
                    else if (!currItem.platform.ToLower().Trim().Contains(platform.ToLower().Trim()))
                    {
                        returnReport.Remove(currItem);
                    }
                }
            }

            if (dateStart != DateTime.MinValue || dateEnd != DateTime.MaxValue)
            {
                foreach (RoutingReports currItem in returnReport.ToList())
                {
                    if (isNull(currItem.prod_date))
                    {
                        returnReport.Remove(currItem);
                        continue;
                    }
                    else if (currItem.prod_date.Trim() == "")
                    {
                        returnReport.Remove(currItem);
                        continue;
                    }

                    string str = currItem.prod_date.Trim();
                    string format = "MM/dd/yyyy";
                    DateTime temp;
                    if (DateTime.TryParseExact(str, format, System.Globalization.CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.NoCurrentDateDefault, out temp))
                    {
                        if (str != "" && (!isNull(str)))
                        {
                            /* try
                             {*/
                            DateTime dateFromList = DateTime.ParseExact(str, format, CultureInfo.InvariantCulture);

                            if (DateTime.Compare(dateFromList, dateStart) < 0)
                            {
                                returnReport.Remove(currItem);
                            }
                            if (DateTime.Compare(dateFromList, dateEnd) > 0)
                            {
                                returnReport.Remove(currItem);
                            }
                            /* }
                             catch (Exception e)
                             {
                                 return new PagedData("ERROR: " + str + "|" + e.ToString());
                             }*/
                        }
                        else
                        {
                            returnReport.Remove(currItem);
                            continue;
                        }
                    }
                    else
                    {
                        returnReport.Remove(currItem);
                        continue;
                    }
                }
            }

            if (dnis != "")
            {
                string dnisToSearch = dnis, dnisToSearch2 = "";
                //we want to search for the DNIS xxxxxxxxxx as well as xxx-xxx-xxxx
                if (dnis.Length == 10)
                {
                    dnisToSearch2 = dnisToSearch.Substring(0, 3) + "-" + dnisToSearch.Substring(3, 3) + "-" + dnisToSearch.Substring(6, 4);
                }
                else if (dnis.Length == 12)
                {
                    dnisToSearch2 = dnisToSearch.Substring(0, 3) + dnisToSearch.Substring(4, 3) + dnisToSearch.Substring(8, 4);
                }

                foreach (RoutingReports currItem in returnReport.ToList())
                {
                    if (isNull(currItem.dnis))
                    {
                        returnReport.Remove(currItem);
                        continue;
                    }
                    if (dnisToSearch2 != "")
                    {
                        if (!(currItem.dnis.ToLower().Trim().Contains(dnisToSearch.ToLower().Trim()) || currItem.dnis.ToLower().Trim().Contains(dnisToSearch2.ToLower().Trim())))
                        {
                            returnReport.Remove(currItem);
                        }
                    }
                    else
                    {
                        if (!(currItem.dnis.ToLower().Trim().Contains(dnisToSearch.ToLower().Trim())))
                        {
                            returnReport.Remove(currItem);
                        }
                    }
                }
            }
            return new PagedData(returnReport);
        }
    }

    public class RoutingReports
    {
        public string project_name;
        public string project_number;
        public int project_id;
        public string type;
        public string description;
        public string prod_date;
        public string dnis;
        public string app;
        public string platform;

        public RoutingReports()
        {

        }
    }
}