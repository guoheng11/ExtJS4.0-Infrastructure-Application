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
    /// Summary description for UpdateMISUpdates
    /// </summary>
    public class UpdateMISUpdates : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            //IQueryable<PromptDetail> q = db.PromptDetails;
            var comment = "comments: ";
            System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.InputStream, context.Request.ContentEncoding);

            var jsonSerializer = new JsonSerializer();
            JObject blob = (JObject)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(reader.ReadToEnd())));

            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                //read from MISUpdates to get the mis_update_id (and update the description)
                MISUpdate update_record = db.MISUpdates.Single(a => a.project_id.Equals(int.Parse(filter)));
                int mis_update_id = update_record.mis_update_id;




                if (blob["misupdatesDescriptionOfChange"] != null)
                {
                    update_record.description = (String)blob["misupdatesDescriptionOfChange"];
                }
                else
                {
                    update_record.description = "";
                }


                try
                {
                    if (db.MISUpdateDistributionChanges.Count(a => a.mis_update_id.Equals(mis_update_id)) > 0)
                    {
                        var records_to_delete = db.MISUpdateDistributionChanges.Where(a => a.mis_update_id.Equals(mis_update_id));
                        db.MISUpdateDistributionChanges.DeleteAllOnSubmit(records_to_delete);
                        db.SubmitChanges();
                    }

                    if ((String)blob["misupdatesDistributionAddEmail"] != "")
                    {
                        String[] emails = ((String)blob["misupdatesDistributionAddEmail"]).Split(';');
                        foreach (string email in emails)
                        {
                            string real_email = email.Trim();
                            MISUpdateDistributionChange record = new MISUpdateDistributionChange();
                            record.mis_update_id = mis_update_id;
                            record.add_or_delete = "add";
                            if (db.Contacts.Count(a => a.email1.Equals(real_email)) > 0)
                            {
                                record.contact_id = (db.Contacts.Single(a => a.email1.Equals(real_email))).contact_id;
                                db.MISUpdateDistributionChanges.InsertOnSubmit(record);
                            }
                        }
                    }

                    if ((String)blob["misupdatesDistributionDeleteEmail"] != "")
                    {
                        String[] emails = ((String)blob["misupdatesDistributionDeleteEmail"]).Split(';');
                        foreach (string email in emails)
                        {
                            string real_email = email.Trim();
                            MISUpdateDistributionChange record = new MISUpdateDistributionChange();
                            record.mis_update_id = mis_update_id;
                            record.add_or_delete = "delete";
                            if (db.Contacts.Count(a => a.email1.Equals(real_email)) > 0)
                            {
                                record.contact_id = (db.Contacts.Single(a => a.email1.Equals(real_email))).contact_id;

                                db.MISUpdateDistributionChanges.InsertOnSubmit(record);
                            }
                        }
                    }

                    db.SubmitChanges();
                }
                catch (Exception e)
                {
                    comment += "distro did not save" + e.Source + e.Message + e.StackTrace + e.TargetSite;
                }

                
                try
                {
                    MISUpdateDeliveryChange delivery_record = new MISUpdateDeliveryChange();
                    delivery_record.mis_update_id = mis_update_id;
                    if (db.MISUpdateDeliveryChanges.Count(a => a.mis_update_id.Equals(mis_update_id)) > 0)
                    {
                        delivery_record = db.MISUpdateDeliveryChanges.First(a => a.mis_update_id.Equals(mis_update_id));
                    }

                    if (blob["misupdatesDeliveryChangeNewFormat"] != null)
                    {
                        if (blob["misupdatesDeliveryChangeNewFormat"].GetType() == typeof(JValue))
                        {
                            delivery_record.format = (string)blob["misupdatesDeliveryChangeNewFormat"];
                        }
                        else
                        {
                            if (((JArray)blob["misupdatesDeliveryChangeNewFormat"]).Count > 0)
                            {
                                string formats = (String)(blob["misupdatesDeliveryChangeNewFormat"][0]);
                                for (int i = 1; i < ((JArray)blob["misupdatesDeliveryChangeNewFormat"]).Count; i++)
                                {
                                    formats = formats + ", " + (String)(blob["misupdatesDeliveryChangeNewFormat"][i]);
                                }

                                delivery_record.format = formats;
                            }
                            else
                            {
                                delivery_record.format = "";
                            }
                        }
                    }
                    else
                    {
                        delivery_record.format = "";
                    }

                    if (blob["misupdatesDeliveryChangeNewFrequency"] != null)
                    {
                        if (blob["misupdatesDeliveryChangeNewFrequency"].GetType() == typeof(JValue))
                        {
                            delivery_record.frequency_id = (string)blob["misupdatesDeliveryChangeNewFrequency"];
                        }
                        else
                        {
                            if (((JArray)blob["misupdatesDeliveryChangeNewFrequency"]).Count > 0)
                            {
                                string frequencies = (String)(blob["misupdatesDeliveryChangeNewFrequency"][0]);
                                for (int i = 1; i < ((JArray)blob["misupdatesDeliveryChangeNewFrequency"]).Count; i++)
                                {
                                    frequencies = frequencies + ", " + (String)(blob["misupdatesDeliveryChangeNewFrequency"][i]);
                                }

                                delivery_record.frequency_id = frequencies;
                            }
                            else
                            {
                                delivery_record.frequency_id = "";
                            }
                        }
                        
                    }
                    else
                    {
                        delivery_record.frequency_id = "";
                    }

                    if (blob["misupdatesDeliveryChangeNewMethod"] != null)
                    {
                        if (blob["misupdatesDeliveryChangeNewMethod"].GetType() == typeof(JValue))
                        {
                            delivery_record.method = (string)blob["misupdatesDeliveryChangeNewMethod"];
                        }
                        else
                        {
                            if (((JArray)blob["misupdatesDeliveryChangeNewMethod"]).Count > 0)
                            {
                                string methods = (String)(blob["misupdatesDeliveryChangeNewMethod"][0]);
                                for (int i = 1; i < ((JArray)blob["misupdatesDeliveryChangeNewMethod"]).Count; i++)
                                {
                                    methods = methods + ", " + (String)(blob["misupdatesDeliveryChangeNewMethod"][i]);
                                }

                                delivery_record.method = methods;
                            }
                            else
                            {
                                delivery_record.method = "";
                            }
                        }
                        
                    }
                    else
                    {
                        delivery_record.method = "";
                    }

                    db.SubmitChanges();
                }
                catch (Exception e)
                {
                    comment += "delivery did not save" + e.Source + e.Message + e.TargetSite;
                }
                
                try
                {
                    //update MISUpdateReportNames
                    if (db.MISUpdateReportNames.Count(a => a.mis_update_id.Equals(mis_update_id)) > 0)
                    {
                        var report_records = db.MISUpdateReportNames.Where(a => a.mis_update_id.Equals(mis_update_id));
                        db.MISUpdateReportNames.DeleteAllOnSubmit(report_records);
                    }


                    if (blob["misupdatesReportNames"] != null)
                    {
                        if (blob["misupdatesReportNames"].GetType() == typeof(JValue))
                        {
                            string[] reports = ((String)blob["misupdatesReportNames"]).Split(',');
                            foreach (string report in reports)
                            {
                                string real_report = report.Trim();
                                MISUpdateReportName record = new MISUpdateReportName();
                                record.report_name = real_report;
                                record.mis_update_id = mis_update_id;
                                db.MISUpdateReportNames.InsertOnSubmit(record);
                            }
                        }
                        else
                        {
                            //string report = (String)(blob["misupdatesReportNames"][0]);
                            JArray reports = (JArray)blob["misupdatesReportNames"];
                            for (int i = 0; i < reports.Count; i++)
                            {
                                MISUpdateReportName record = new MISUpdateReportName();
                                record.report_name = ((String)(blob["misupdatesReportNames"][i])).Trim();
                                record.mis_update_id = mis_update_id;
                                db.MISUpdateReportNames.InsertOnSubmit(record);
                            }
                        }
                    }
                    db.SubmitChanges();
                }
                catch (Exception e)
                {
                    comment += "report names did not save" + e.Source + e.Message + e.TargetSite;
                }

                return new PagedData("MIS Updates saved|"+comment);

            }

            return new PagedData("UpdateMISUpdates.ashx requires a project_id");
        }
    }
}