using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Text.RegularExpressions;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Web;

namespace Cookbook
{

    class OXMLTools
    {

        public OXMLTools()
        {
        }

        public string saveTheseProjects(List<Project> projects, View view, List<Column> columns)
        {
            // convert Project object into ProjectStatusInfo
            List<Dictionary<string, string>> projectList = new List<Dictionary<string, string>>();
            Dictionary<string, string> fieldToLabel = new Dictionary<string, string>();
            foreach (Column column in columns)
            {
                fieldToLabel.Add(column.project_property, column.column_name);
            }
                
            foreach (Project p in projects)
            {
                Dictionary<string, string> aProject = new Dictionary<string, string>();
                foreach (ViewColumn col in view.ViewColumns)
                {
                    object val = null;
                    string colname = col.Column.project_property;
                    string coltype = col.Column.column_type;
                    try
                    {
                        val = p.GetType().GetProperty(colname).GetGetMethod().Invoke(p, null);
                    }
                    catch { }


                    if (colname == "description")
                    {
                        //string tempStr = HttpUtility.HtmlDecode((string)val);
                        string tempStr2 = HttpUtility.UrlDecode((string)val);
                        if (tempStr2 != default(string))
                        {
                            tempStr2 = Regex.Replace(tempStr2, "<.*?>", string.Empty);
                        }
                        val = tempStr2;
                    }

                    string stringValue = "";
                    if (coltype == "Boolean")
                    {
                        if (val == null)
                        {
                            stringValue = "NO";
                        }
                        else if (val.GetType().ToString() == "System.Boolean")
                        {
                            if ((Boolean)val)
                            {
                                stringValue = "YES";
                            }
                            else
                            {
                                stringValue = "NO";
                            }
                        }
                    }
                    else if (val != null)
                    {
                        string type = val.GetType().ToString();
                        if (type == "System.DateTime")
                        {
                            DateTime thisTime = (DateTime)val;
                            stringValue = thisTime.ToString("yyyy/MM/dd");
                        }
                        else if (type.StartsWith("System.Linq.EnumerableQuery"))
                        {
                            stringValue = val.ToString();
                        }
                        else
                        {
                            stringValue = val.ToString();
                        }
                    }                        

                    aProject.Add(colname, stringValue);
                }
                projectList.Add(aProject);
            }

            OXMLGenerator generator = new OXMLGenerator();
            return generator.generateTable(projectList, fieldToLabel);
        }
                
            
    }

}
