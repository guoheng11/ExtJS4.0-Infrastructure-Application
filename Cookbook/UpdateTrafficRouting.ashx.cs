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
    /// Summary description for UpdateTrafficRouting
    /// </summary>
    public class UpdateTrafficRouting : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<ProjectInformation> q = db.ProjectInformations;

            System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.InputStream, context.Request.ContentEncoding);

            var jsonSerializer = new JsonSerializer();
            JObject blob = (JObject)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(reader.ReadToEnd())));
            string intro = "The Traffic & Routing page had the following modifications: ";
            string logBuilder = "";

            string filter = context.Request.Params.Get("project_id");
            string username = context.Request.Params.Get("user_name");
            string permission = context.Request.Params.Get("permission");
            if (!isNull(filter))
            {
                TrafficRequirement record = db.TrafficRequirements.Single(a => a.project_id.Equals(int.Parse(filter)));

                if (blob["trafficroutingAverageCallDuration"] != null)
                {
                    if (record.avg_call_duration != (String)blob["trafficroutingAverageCallDuration"])
                    {
                        logBuilder += "Average Call Duration changed from \"" + record.avg_call_duration + "\" -> \"" + (String)blob["trafficroutingAverageCallDuration"] + "\"; ";
                    }
                    record.avg_call_duration = (String)blob["trafficroutingAverageCallDuration"];
                }
                if (blob["trafficroutingBusyHourCallPercentage"] != null)
                {
                    if (record.busy_hour_call_percentage != (String)blob["trafficroutingBusyHourCallPercentage"])
                    {
                        logBuilder += "Busy-Hour Call % changed from \"" + record.busy_hour_call_percentage + "\" -> \"" + (String)blob["trafficroutingBusyHourCallPercentage"] + "\"; ";
                    }
                    record.busy_hour_call_percentage = (String)blob["trafficroutingBusyHourCallPercentage"];
                }
                if (blob["trafficroutingBusyHourCalls"] != null)
                {
                    if (record.busy_hour_calls != (String)blob["trafficroutingBusyHourCalls"])
                    {
                        logBuilder += "Busy-Hour Calls changed from \"" + record.busy_hour_calls + "\" -> \"" + (String)blob["trafficroutingBusyHourCalls"] + "\"; ";
                    }
                    record.busy_hour_calls = (String)blob["trafficroutingBusyHourCalls"];
                }
                if (blob["trafficroutingIncludedInForecast"] != null) 
                {
                    if (record.forecast != (((String)blob["trafficroutingIncludedInForecast"]) == "yes" ? true : false))
                    {
                        logBuilder += "Included in Forecast changed from \"" + record.forecast + "\" -> \"" + (String)blob["trafficroutingIncludedInForecast"] + "\"; ";
                    }
                    record.forecast = (((String)blob["trafficroutingIncludedInForecast"]) == "yes" ? true : false); 
                }
                if (blob["trafficroutingIncrementalCallsPerMonth"] != null)
                {
                    if (record.calls_month != (String)blob["trafficroutingIncrementalCallsPerMonth"])
                    {
                        logBuilder += "Incremental Calls / Mo. changed from \"" + record.calls_month + "\" -> \"" + (String)blob["trafficroutingIncrementalCallsPerMonth"] + "\"; ";
                    }
                    record.calls_month = (String)blob["trafficroutingIncrementalCallsPerMonth"];
                }
                if (blob["trafficroutingIncrementalMinutesPerMonth"] != null)
                {
                    if (record.min_month != (String)blob["trafficroutingIncrementalMinutesPerMonth"])
                    {
                        logBuilder += "Incremental Min. / Mo. changed from \"" + record.min_month + "\" -> \"" + (String)blob["trafficroutingIncrementalMinutesPerMonth"] + "\"; ";
                    }
                    record.min_month = (String)blob["trafficroutingIncrementalMinutesPerMonth"];
                }

                
                db.SubmitChanges();


               // if (permission != "PM")
              //  {
                    if (logBuilder != "")
                    {
                        logBuilder = logBuilder.Replace("False", "no");
                        logBuilder = logBuilder.Replace("True", "yes");
                    }

                    intro = (intro + logBuilder);
                    intro = intro.Trim();
                    
                    if (intro.LastIndexOf(";") == intro.Length - 1)
                    {
                        intro = intro.Substring(0, intro.Length - 1);
                    }
                    ChangeLog newLog = new ChangeLog();
                    newLog.project_id = Convert.ToInt32(filter);
                    newLog.time = DateTime.Now.ToShortTimeString();
                    newLog.date = DateTime.Now.ToShortDateString();
                    newLog.tab = "Traffic & Routing";
                    newLog.user_name = username;
                    newLog.description = intro;
                    if ((!db.ChangeLogs.Contains(newLog)) && (logBuilder.Length > 0))
                    {
                        db.ChangeLogs.InsertOnSubmit(newLog);
                        db.SubmitChanges();
                    }
               // }
                return new PagedData("Traffic requirements saved");
            }

            return new PagedData("UpdateTrafficRouting.ashx required a project_id");
        }
    }
}