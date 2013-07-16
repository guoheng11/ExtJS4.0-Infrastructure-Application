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
    /// Summary description for GetSpeechRecognitionRequirements
    /// </summary>
    public class GetSpeechRecognitionRequirements : DatabaseHandler
    {
        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<SpeechRecognitionReq> q = db.SpeechRecognitionReqs;

            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                q = q.Where(a => a.project_id == int.Parse(filter));
               
            }
            else
            {

                return new PagedData("GetSpeechRecognitionRequirements expects a project_id");
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
                        return new PagedData(q.Select(a => new { a.speech_recognition_req_id, a.project_id, a.@new, a.call_volume, a.language, a.notes }));
                    }
                case "POST":
                    {
                        if (blob["rows"].GetType() == typeof(JObject))
                        {
                            JObject obj = (JObject)blob["rows"];
                            SpeechRecognitionReq record = new SpeechRecognitionReq();

                            record.project_id = int.Parse(filter);
                            record.@new = (bool)obj["new"];
                            record.call_volume = (string)obj["call_volume"];
                            record.language = (string)obj["language"];
                            record.notes = (string)obj["notes"];

                            db.SpeechRecognitionReqs.InsertOnSubmit(record);
                            db.SubmitChanges();

                            ChangeLog newLog = new ChangeLog();
                            newLog.project_id = Convert.ToInt32(int.Parse(filter));
                            newLog.time = DateTime.Now.ToShortTimeString();
                            newLog.date = DateTime.Now.ToShortDateString();
                            newLog.tab = "Requirements";
                            newLog.user_name = username;
                            newLog.description = "New Speech Recognition requirement added";
                            if (!db.ChangeLogs.Contains(newLog))
                            {
                                db.ChangeLogs.InsertOnSubmit(newLog);
                                db.SubmitChanges();
                            }

                            return new PagedData(record);
                        }

                        JArray objs = (JArray)blob["rows"];
                        List<SpeechRecognitionReq> list = new List<SpeechRecognitionReq>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            SpeechRecognitionReq record = new SpeechRecognitionReq();
                            record.project_id = int.Parse(filter);
                            record.@new = (bool)objs[j]["new"];
                            record.call_volume = (string)objs[j]["call_volume"];
                            record.language = (string)objs[j]["language"];
                            record.notes = (string)objs[j]["notes"];

                            db.SpeechRecognitionReqs.InsertOnSubmit(record);
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
                            string intro = "Existing Speech Recognition record modified: ";
                            
                            SpeechRecognitionReq record = db.SpeechRecognitionReqs.Single(a => a.speech_recognition_req_id.Equals((int)obj["speech_recognition_req_id"]));
                            //record.project_id = int.Parse(filter);
                            if (record.@new != (bool)obj["new"])
                            {
                                logBuilder += "New changed from \"" + record.@new + "\" to \"" + (bool)obj["new"] + "\".";
                            }
                            record.@new = (bool)obj["new"];
                            if (record.call_volume != (string)obj["call_volume"])
                            {
                                logBuilder += "Call Volume changed from \"" + record.call_volume + "\" to \"" + (string)obj["call_volume"] + "\".";
                            }
                            record.call_volume = (string)obj["call_volume"];
                            if (record.language != (string)obj["language"])
                            {
                                logBuilder += "Language Site changed from \"" + record.language + "\" to \"" + (string)obj["language"] + "\".";
                            }
                            record.language = (string)obj["language"];
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
                        List<SpeechRecognitionReq> list = new List<SpeechRecognitionReq>();
                        for (int j = 0; j < objs.Count; j++)
                        {
                            SpeechRecognitionReq record = db.SpeechRecognitionReqs.Single(a => a.speech_recognition_req_id.Equals((int)objs[j]["speech_recognition_req_id"]));
                            //record.project_id = int.Parse(filter);
                            record.@new = (bool)objs[j]["new"];
                            record.call_volume = (string)objs[j]["call_volume"];
                            record.language = (string)objs[j]["language"];
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

                            SpeechRecognitionReq record = db.SpeechRecognitionReqs.Single(a => a.speech_recognition_req_id.Equals((int)obj["speech_recognition_req_id"]));
                            logbuilder += "New: \"" + record.@new + "\"; Call Volume: \"" + record.call_volume + "\"; Language: \"" + record.language + "\"; Notes: \""  + record.notes + "\".";
                                
                            db.SpeechRecognitionReqs.DeleteOnSubmit(record);

                            db.SubmitChanges();

                            ChangeLog newLog = new ChangeLog();
                            newLog.project_id = Convert.ToInt32(int.Parse(filter));
                            newLog.time = DateTime.Now.ToShortTimeString();
                            newLog.date = DateTime.Now.ToShortDateString();
                            newLog.tab = "Requirements";
                            newLog.user_name = username;
                            newLog.description = "Existing Speech Recoginition Requirement deleted: " + logbuilder;
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
                            SpeechRecognitionReq record = db.SpeechRecognitionReqs.Single(a => a.speech_recognition_req_id.Equals((int)objs[j]["speech_recognition_req_id"]));
                            db.SpeechRecognitionReqs.DeleteOnSubmit(record);
                        }

                        db.SubmitChanges();
                        return new PagedData("SpeechRecognitionReq deleted");
                    }
                default:
                    return new PagedData("Unsupported Http Request:  " + context.Request.RequestType + " not recognized");
            }

           
        }
    }
}