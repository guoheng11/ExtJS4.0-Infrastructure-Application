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
    /// Summary description for GetFileXferRequirements
    /// </summary>
    public class GetFileXferRequirements : DatabaseHandler
    {
        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<FileXferReq> q = db.FileXferReqs;

            string filter = context.Request.Params.Get("project_id");
            string type = context.Request.Params.Get("type");
            if (!isNull(filter))
            {
                q = q.Where(a => a.project_id == int.Parse(filter));

            }
            else
            {

                return new PagedData("GetFileXferRequirements expects a project_id");
            }

            string readOnly = context.Request.Params.Get("read_only");
            if (isNull(readOnly))
            {
                return new PagedData("read_only flag is expected");
            }
            if (readOnly == "true" && context.Request.RequestType != "GET")
            {
                return new PagedData("Read Only");
            }
            string username = context.Request.Params.Get("user_name");

            System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.InputStream, context.Request.ContentEncoding);

            var jsonSerializer = new JsonSerializer();
            JObject blob = (JObject)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(reader.ReadToEnd())));


            switch (context.Request.RequestType)
            {
                case "GET":
                    {
                        FileXferReq record = new FileXferReq();
                        int parsedType = int.Parse(type);
                        if (parsedType == 0)
                        {
                            q = q.Where(a => a.upload_or_download == "upload" && a.project_id == int.Parse(filter));
                            //return this pagedData WHERE upload_or_download = 'upload'
                            return new PagedData(q.Select(a => new { a.file_xfer_req_id, a.project_id, a.@new, a.name, a.ndm_file, a.uat_or_prod, a.upload_or_download, a.protocol, a.timeframe, a.send_site, a.recv_site, a.usan_password, a.notes }));
                        }
                        else
                        {
                            q = q.Where(a => a.upload_or_download == "download" && a.project_id == int.Parse(filter));
                            //return this pagedData WHERE upload_or_download = 'download'
                            return new PagedData(q.Select(a => new { a.file_xfer_req_id, a.project_id, a.@new, a.name, a.ndm_file, a.uat_or_prod, a.upload_or_download, a.protocol, a.timeframe, a.send_site, a.recv_site, a.usan_password, a.notes }));
                        }
                        
                    }
                case "POST":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];
                            FileXferReq record = new FileXferReq();

                            record.project_id = int.Parse(filter);
                            record.name = (string)obj["name"];
                            record.@new = (bool)obj["new"];
                            record.ndm_file = (string)obj["ndm_file"];
                            record.uat_or_prod = (string)obj["uat_or_prod"];
                            record.upload_or_download = (string)obj["upload_or_download"];
                            record.protocol = (string)obj["protocol"];
                            record.timeframe = (string)obj["timeframe"];
                            record.send_site = (string)obj["send_site"];
                            record.recv_site = (string)obj["recv_site"];
                            record.usan_password = (string)obj["usan_password"];
                            record.notes = (string)obj["notes"];

                            db.FileXferReqs.InsertOnSubmit(record);
                            db.SubmitChanges();

                            ChangeLog newLog = new ChangeLog();
                            newLog.project_id = Convert.ToInt32(int.Parse(filter));
                            newLog.time = DateTime.Now.ToShortTimeString();
                            newLog.date = DateTime.Now.ToShortDateString();
                            newLog.tab = "Requirements";
                            newLog.user_name = username;
                            newLog.description = "New File Xfer requirement added";
                            if (!db.ChangeLogs.Contains(newLog))
                            {
                                db.ChangeLogs.InsertOnSubmit(newLog);
                                db.SubmitChanges();
                            }

                            return new PagedData(record);
                        }

                        JArray objs = (JArray)blob["rows"];
                        List<FileXferReq> list = new List<FileXferReq>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            FileXferReq record = new FileXferReq();
                            record.project_id = int.Parse(filter);
                            record.name = (string)objs[j]["name"];
                            record.@new = (bool)objs[j]["new"];
                            record.ndm_file = (string)objs[j]["ndm_file"];
                            record.uat_or_prod = (string)objs[j]["uat_or_prod"];
                            record.upload_or_download = (string)objs[j]["upload_or_download"];
                            record.protocol = (string)objs[j]["protocol"];
                            record.timeframe = (string)objs[j]["timeframe"];
                            record.send_site = (string)objs[j]["send_site"];
                            record.recv_site = (string)objs[j]["recv_site"];
                            record.usan_password = (string)objs[j]["usan_password"];
                            record.notes = (string)objs[j]["notes"];

                            db.FileXferReqs.InsertOnSubmit(record);
                            db.SubmitChanges();
                            list.Add(record);
                        }

                        
                        return new PagedData(list);
                    }
                case "PUT":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];

                            string logBuilder = "";
                            string intro = "Existing File Xfer record modified: ";
                            
                            FileXferReq record = db.FileXferReqs.Single(a => a.file_xfer_req_id.Equals((int)obj["file_xfer_req_id"]));
                            if (record.name != (string)obj["name"])
                            {
                                logBuilder += "Name changed from \"" + record.name + "\" to \"" + (string)obj["name"] + "\".";
                            }
                            record.name = (string)obj["name"];
                            //record.project_id = int.Parse(filter);
                            if (record.@new != (bool)obj["new"])
                            {
                                logBuilder += "New changed from \"" + record.@new + "\" to \"" + (bool)obj["new"] + "\".";
                            }
                            record.@new = (bool)obj["new"];
                            if (record.ndm_file != (string)obj["ndm_file"])
                            {
                                logBuilder += "NDM File changed from \"" + record.ndm_file + "\" to \"" + (string)obj["ndm_file"] + "\".";
                            }
                            record.ndm_file = (string)obj["ndm_file"];
                            if (record.uat_or_prod != (string)obj["uat_or_prod"])
                            {
                                logBuilder += "UAT or Prod changed from \"" + record.uat_or_prod + "\" to \"" + (string)obj["uat_or_prod"] + "\".";
                            }
                            record.uat_or_prod = (string)obj["uat_or_prod"];
                            if (record.upload_or_download != (string)obj["upload_or_download"])
                            {
                                logBuilder += "Upload or Download changed from \"" + record.upload_or_download + "\" to \"" + (string)obj["upload_or_download"] + "\".";
                            }
                            record.upload_or_download = (string)obj["upload_or_download"];
                            if (record.protocol != (string)obj["protocol"])
                            {
                                logBuilder += "Protocol changed from \"" + record.protocol + "\" to \"" + (string)obj["protocol"] + "\".";
                            }
                            record.protocol = (string)obj["protocol"];
                            if (record.timeframe != (string)obj["timeframe"])
                            {
                                logBuilder += "Timeframe changed from \"" + record.timeframe + "\" to \"" + (string)obj["timeframe"] + "\".";
                            }
                            record.timeframe = (string)obj["timeframe"];
                            if (record.send_site != (string)obj["send_site"])
                            {
                                logBuilder += "Send Site changed from \"" + record.send_site + "\" to \"" + (string)obj["send_site"] + "\".";
                            }
                            record.send_site = (string)obj["send_site"];
                            if (record.recv_site != (string)obj["recv_site"])
                            {
                                logBuilder += "Recieving Site changed from \"" + record.recv_site + "\" to \"" + (string)obj["recv_site"] + "\".";
                            }
                            record.recv_site = (string)obj["recv_site"];
                            if (record.usan_password != (string)obj["usan_password"])
                            {
                                logBuilder += "USAN Password changed from \"" + record.usan_password + "\" to \"" + (string)obj["usan_password"] + "\".";
                            }
                            record.usan_password = (string)obj["usan_password"];
                            if (record.notes != (string)obj["notes"])
                            {
                                logBuilder += "Notes changed from \"" + record.notes + "\" to \"" + (string)obj["notes"] + "\".";
                            }
                            record.notes = (string)obj["notes"];

                            db.SubmitChanges();

                            if (logBuilder != "")
                            {
                                ChangeLog newLog = new ChangeLog();
                                newLog.project_id = Convert.ToInt32(int.Parse(filter));
                                newLog.time = DateTime.Now.ToShortTimeString();
                                newLog.date = DateTime.Now.ToShortDateString();
                                newLog.tab = "Requirements";
                                newLog.user_name = username;
                                newLog.description = intro + logBuilder;
                                if (!db.ChangeLogs.Contains(newLog))
                                {
                                    db.ChangeLogs.InsertOnSubmit(newLog);
                                    db.SubmitChanges();
                                }
                            }

                            return new PagedData(record);
                        }


                        JArray objs = (JArray)blob["rows"];
                        List<FileXferReq> list = new List<FileXferReq>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            FileXferReq record = db.FileXferReqs.Single(a => a.file_xfer_req_id.Equals((int)objs[j]["file_xfer_req_id"]));
                            record.name = (string)objs[j]["name"];
                            //record.project_id = int.Parse(filter);
                            record.@new = (bool)objs[j]["new"];
                            record.ndm_file = (string)objs[j]["ndm_file"];
                            record.uat_or_prod = (string)objs[j]["uat_or_prod"];
                            record.upload_or_download = (string)objs[j]["upload_or_download"];
                            record.protocol = (string)objs[j]["protocol"];
                            record.timeframe = (string)objs[j]["timeframe"];
                            record.send_site = (string)objs[j]["send_site"];
                            record.recv_site = (string)objs[j]["recv_site"];
                            record.usan_password = (string)objs[j]["usan_password"];
                            record.notes = (string)objs[j]["notes"];

                            db.SubmitChanges();
                            list.Add(record);
                        }

                        return new PagedData(list);
                    }
                case "DELETE":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];

                            string logbuilder = "";

                            FileXferReq record = db.FileXferReqs.Single(a => a.file_xfer_req_id.Equals((int)obj["file_xfer_req_id"]));
                            logbuilder += "Name: \"" + record.name + "\"; New: \"" + record.@new + "\"; NDM File: \"" + record.ndm_file + "\"; UAT or Prod: \"" +
                           record.uat_or_prod + "\"; Upload or Download: \"" + record.upload_or_download + "\"; Protocol: \"" + record.protocol + "\"; Timeframe: \"" + record.timeframe +
                           "\"; Send Site: \"" + record.send_site + "\"; Recieving Site: \"" + record.recv_site+ "\"; USAN Password: \"" + record.usan_password + "\"; Notes: \"" + record.notes + "\".";
                                
                            db.FileXferReqs.DeleteOnSubmit(record);

                            db.SubmitChanges();

                            ChangeLog newLog = new ChangeLog();
                            newLog.project_id = Convert.ToInt32(int.Parse(filter));
                            newLog.time = DateTime.Now.ToShortTimeString();
                            newLog.date = DateTime.Now.ToShortDateString();
                            newLog.tab = "Requirements";
                            newLog.user_name = username;
                            newLog.description = "Existing File Xfer Requirement deleted: " + logbuilder;
                            if (!db.ChangeLogs.Contains(newLog))
                            {
                                db.ChangeLogs.InsertOnSubmit(newLog);
                                db.SubmitChanges();
                            }

                            return new PagedData("good");
                        }


                        JArray objs = (JArray)blob["rows"];
                        for (int j = 0; j < objs.Count; j++)
                        {
                            FileXferReq record = db.FileXferReqs.Single(a => a.file_xfer_req_id.Equals((int)objs[j]["file_xfer_req_id"]));
                            db.FileXferReqs.DeleteOnSubmit(record);
                        }

                        db.SubmitChanges();
                        return new PagedData("FileXferReqs deleted");
                    }
                default:
                    return new PagedData("Unsupported Http Request:  " + context.Request.RequestType + " not recognized");
            }

            
        }
    }
}