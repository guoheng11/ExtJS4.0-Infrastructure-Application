using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;

namespace Cookbook
{
    /// <summary>
    /// Summary description for UpdateMISNewPage
    /// </summary>
    public class UpdateMISNewPage : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<ProjectInformation> q = db.ProjectInformations;

            System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.InputStream, context.Request.ContentEncoding);

            var jsonSerializer = new JsonSerializer();
            JObject blob = (JObject)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(reader.ReadToEnd())));

            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                MISNew proj = db.MISNews.Single(a => a.project_id.Equals(int.Parse(filter)));
                int mis_new_id = proj.mis_new_id;

                //set newReportDescription panel
                if (((String)blob["newReportDescription"]) != null) { proj.description = (String)blob["newReportDescription"]; }

                //set File1 Reporting Info panel
                if (((String)blob["misNewBusinessUnit"]) != null)
                {
                    proj.business_units_id = (db.BusinessUnits.Single(a => a.name.Equals((String)blob["misNewBusinessUnit"])).business_units_id);
                }
                else
                {
                    proj.business_units_id = null;
                }
                
                if (((String)blob["misNewApplicationGroup"]) != null) { proj.application_group = (String)blob["misNewApplicationGroup"]; }

                db.SubmitChanges();
                
                //DISTRIBUTION CHANGE
                var records_to_delete = db.MISNewDistributions.Where(a => a.mis_new_id.Equals(mis_new_id));
                db.MISNewDistributions.DeleteAllOnSubmit(records_to_delete);
                db.SubmitChanges();

                if ((String)blob["misnewDistributionAddEmail"] != "")
                {
                    String[] emails = ((String)blob["misnewDistributionAddEmail"]).Split(';');
                    foreach (string email in emails)
                    {
                        string real_email = email.Trim();
                        MISNewDistribution record = new MISNewDistribution();
                        record.mis_new_id = mis_new_id;
                        record.add_or_delete = "add";
                        record.contact_id = (db.Contacts.Single(a => a.email1.Equals(real_email))).contact_id;

                        db.MISNewDistributions.InsertOnSubmit(record);
                        db.SubmitChanges();
                    }
                }

                if ((String)blob["misNewDistributionDeleteEmail"] != "")
                {
                    String[] emails = ((String)blob["misNewDistributionDeleteEmail"]).Split(';');
                    foreach (string email in emails)
                    {
                        string real_email = email.Trim();
                        MISNewDistribution record = new MISNewDistribution();
                        record.mis_new_id = mis_new_id;
                        record.add_or_delete = "delete";
                        record.contact_id = (db.Contacts.Single(a => a.email1.Equals(real_email))).contact_id;

                        db.MISNewDistributions.InsertOnSubmit(record);
                        db.SubmitChanges();
                    }
                }

                //DELIVERY CHANGES
                MISNewDelivery delivery_record = db.MISNewDeliveries.Single(a => a.mis_new_id.Equals(mis_new_id));
                if (blob["misNewFormat"] != null)
                {
                    string formats = "";
                    if (blob["misNewFormat"].Type.ToString().Equals("String"))
                    {
                        formats = (String)(blob["misNewFormat"]);
                    }
                    else
                    {
                        if ((blob["misNewFormat"]).Count() != 0)
                        {
                            formats = (String)(blob["misNewFormat"][0]);

                            for (int i = 1; i < ((JArray)blob["misNewFormat"]).Count; i++)
                            {
                                formats = formats + ", " + (String)(blob["misNewFormat"][i]);
                            }
                        }
                        else
                        {
                            formats = "";
                        }
                    }
                    delivery_record.format = formats;
                }
                else
                {
                    delivery_record.format = "";
                }

                if (blob["misNewFrequency"] != null)
                {
                    string frequencies = "";
                    if (blob["misNewFrequency"].Count() != 0)
                    {
                        frequencies = (String)(blob["misNewFrequency"][0]);
                        for (int i = 1; i < ((JArray)blob["misNewFrequency"]).Count; i++)
                        {
                            frequencies = frequencies + ", " + (String)(blob["misNewFrequency"][i]);
                        }
                    }
                    delivery_record.frequency = frequencies;
                }
                else
                {
                    delivery_record.frequency = "";
                }

                if (blob["misNewMethod"] != null)
                {
                    string methods = "";
                    if (blob["misNewMethod"].Count() != 0)
                    {
                        methods = (String)(blob["misNewMethod"][0]);
                        for (int i = 1; i < ((JArray)blob["misNewMethod"]).Count; i++)
                        {
                            methods = methods + ", " + (String)(blob["misNewMethod"][i]);
                        }
                    }
                    delivery_record.method = methods;
                }
                else
                {
                    delivery_record.method = "";
                }

                db.SubmitChanges();

                //REPORT NAMES
                var report_records = db.MISNewReportNames.Where(a => a.mis_new_id.Equals(mis_new_id));
                db.MISNewReportNames.DeleteAllOnSubmit(report_records);
                if (blob["misNewRequestedReportName"] != null)
                {
                    if (blob["misNewRequestedReportName"].GetType() == typeof(JValue))
                    {
                        string[] reports = ((String)blob["misNewRequestedReportName"]).Split(',');
                        foreach (string report in reports)
                        {
                            string real_report = report.Trim();
                            MISNewReportName record = new MISNewReportName();
                            record.report_name = real_report;
                            record.mis_new_id = mis_new_id;
                            db.MISNewReportNames.InsertOnSubmit(record);
                        }
                    }
                    else
                    {
                        JArray reports = (JArray)blob["misNewRequestedReportName"];
                        for (int i = 0; i < reports.Count; i++)
                        {
                            MISNewReportName record = new MISNewReportName();
                            record.report_name = ((String)(blob["misNewRequestedReportName"][i])).Trim();
                            record.mis_new_id = mis_new_id;
                            db.MISNewReportNames.InsertOnSubmit(record);
                        }
                    }
                }
                db.SubmitChanges();
            }

            return new PagedData("success");
        }
    }
}