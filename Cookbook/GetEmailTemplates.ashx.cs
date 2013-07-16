using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetEmailTemplates
    /// </summary>
    public class GetEmailTemplates : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        { 


            IQueryable<EmailTemplate> q = db.EmailTemplates;
            //string user = context.Request.Params.Get("user");
            string filter = context.Request.Params.Get("project_id");
            string type = context.Request.Params.Get("type");
            string url = context.Request.Params.Get("urlinfo");
            if (!isNull(type) && !isNull(filter))
            {
                q = q.Where(a => a.template_type.Equals(type));

                //we need to replace all of the tags passed in. 

                EmailTemplate thisTemplate = db.EmailTemplates.Single(b => b.template_type.Equals(type));

                string bodyToBeParsed = thisTemplate.template_body;
                string toFieldToBeParsed = thisTemplate.template_to;
                string ccFieldToBeParsed = thisTemplate.template_cc;
                string bccFieldToBeParsed = thisTemplate.template_bcc;
                string subjectFieldToBeParsed = thisTemplate.template_subject;

                if (bodyToBeParsed != null)
                {
                    bodyToBeParsed = parseString(bodyToBeParsed, db, filter, url);
                }
                if (subjectFieldToBeParsed != null)
                {
                    subjectFieldToBeParsed = parseString(subjectFieldToBeParsed, db, filter, url);
                }
                if (toFieldToBeParsed != null)
                {
                    toFieldToBeParsed = parseEmailString(toFieldToBeParsed, db, filter);
                }
                if (ccFieldToBeParsed != null)
                {
                    ccFieldToBeParsed = parseEmailString(ccFieldToBeParsed, db, filter);
                }
                if (bccFieldToBeParsed != null)
                {
                    bccFieldToBeParsed = parseEmailString(bccFieldToBeParsed, db, filter);
                }


                string template_body = bodyToBeParsed;
                string template_to = toFieldToBeParsed;
                string template_cc = ccFieldToBeParsed;
                string template_bcc = bccFieldToBeParsed;
                string template_subject = subjectFieldToBeParsed;

                //last check to remove any \r and \n from the code...
                do
                {
                    template_body = template_body.Replace("\r", "");
                } while (template_body.Contains("\r"));
                
                do
                {
                    template_body = template_body.Replace("\n", "");
                } while (template_body.Contains("\n"));
                

                return new PagedData(q.Select(a => new
                {
                    a.template_type,
                    template_to,
                    template_subject,
                    template_cc,
                    template_bcc,
                    template_body,
                    a.User.user_name,
                }));
            }

            return new PagedData("GetEmailTemplates expects a template type && project ID", false);
        }

        public string parseString(String incString, CookDBDataContext db, string filter, string url)
        {
            //ToDo: probably should add error handling on EVERY replacement, in case the replacement string is not found we can add {xxxx not found}. this is already
            //done for the findContacts contacts
            ProjectInformation currentProj = db.ProjectInformations.Single(c => c.project_id.Equals(Convert.ToInt32(filter)));
            try
            {
                incString = incString.Replace("[ProjectNumber]", currentProj.project_number);
            }
            catch (Exception)
            {
                incString = incString.Replace("[ProjectNumber]", "ProjectNumber Exception. Contact Cookbook Admin.");
            }
            try
            {
                incString = incString.Replace("[ProjectName]", currentProj.project_name);
            }
            catch (Exception)
            {
                incString = incString.Replace("[ProjectName]", "ProjectName Exception. Contact Cookbook Admin.");
            }
            try
            {
                incString = incString.Replace("[RFQRecDate]", currentProj.rfq_loe_recv_date);
            }
            catch (Exception)
            {
                incString = incString.Replace("[RFQRecDate]", "RFQRecDate Exception. Contact Cookbook Admin.");
            }
            try
            {
                incString = incString.Replace("[RFQDueDate]", currentProj.quote_loe_due_date);
            }
            catch (Exception)
            {
                incString = incString.Replace("[RFQDueDate]", "RFQDueDate Exception. Contact Cookbook Admin.");
            }
            try
            {
                incString = incString.Replace("[RequestedUATDate]", currentProj.requested_uat_date);
            }
            catch (Exception)
            {
                incString = incString.Replace("[RequestedProdDate]", "RequestedProdDate Exception. Contact Cookbook Admin.");
            }
            try
            {
                incString = incString.Replace("[RequestedProdDate]", currentProj.requested_prod_date);
            }
            catch (Exception)
            {
                incString = incString.Replace("[RequestedProdDate]", "RequestedProdDate Exception. Contact Cookbook Admin.");
            }
            try
            {
                incString = incString.Replace("[SummaryBU]", currentProj.primary_business_unit);
            }
            catch (Exception)
            {
                incString = incString.Replace("[SummaryBU]", "SummaryBU Exception. Contact Cookbook Admin.");
            }
            try
            {
                incString = incString.Replace("[ProjectFolderLink]", "<a href='" + currentProj.project_folder + "'>" + currentProj.project_folder + "</a>");
            }
            catch (Exception)
            {
                incString = incString.Replace("[ProjectFolderLink]", "ProjectFolderLink Exception. Contact Cookbook Admin.");
            }
            try
            {
                if (url.Contains('?'))
                {
                    url = url.Substring(0, url.IndexOf('?'));
                }
                url = url + "?p=" + currentProj.project_number;
                incString = incString.Replace("[CookbookLink]", "<a href=" + url + ">" + url + "</a>");
            }
            catch (Exception)
            {
                incString = incString.Replace("[CookbookLink]", "CookbookLink Exception. Contact Cookbook Admin.");
            }
            //prompts folder
            try
            {
                if (db.PromptWorksheets.Count(d => d.project_id.Equals(Convert.ToInt32(filter))) > 0)
                {
                    var pf = db.PromptWorksheets.First(d => d.project_id.Equals(Convert.ToInt32(filter))).prompt_worksheet;
                    incString = incString.Replace("[PromptsFolderLink]", "<a href='" + pf + "'>" + pf + "</a>");
                }
                else
                {
                    incString = incString.Replace("[PromptsFolderLink]", "PromptsFolderLink Not found. Please populate this field before generating an email.");
                }
            }
            catch (Exception)
            {
                incString = incString.Replace("[PromptsFolderLink]", "PromptsFolderLink Exception. Contact Cookbook Admin.");
            }
            //greatvoice prompts section
            try
            {
                if (incString.Contains("[FullPromptCosts]") || incString.Contains("[PromptLanguages]") || incString.Contains("[TotalRecordingFees]") || incString.Contains("[RecordingStudio]"))
                {
                    if (db.PromptDetails.Count(d => d.project_id.Equals(Convert.ToInt32(filter))) > 0)
                    {
                        incString = incString.Replace("[RecordingStudio]", "GreatVoice"); //(smm) db.PromptDetails.First(g => g.project_id.Equals(Convert.ToInt32(filter))).recording_studio);
                        var allEntries = db.PromptDetails.Where(e => e.project_id.Equals(Convert.ToInt32(filter)));
                        var allEntriesList = allEntries.ToList();
                        string buildingString = "";
                        string allLanguages = "";
                        var totalCosts = 0.00;

                        //(smm) grab the CD Fee and add it to totalCosts first
                        string CDFee = db.PromptWorksheets.First(f => f.project_id.Equals(Convert.ToInt32(filter))).great_voice_cd_fee;
                        if (!isNull(CDFee))
                        {
                            CDFee = CDFee.Replace("$", "0");
                            totalCosts += Convert.ToDouble(CDFee);
                        }

                        foreach (PromptDetail currentItem in allEntriesList)
                        {
                            buildingString += "&nbsp;&nbsp;&nbsp;&nbsp;" + currentItem.setup_fee + "&nbsp;" + currentItem.language + "&nbsp;Setup<br />";
                            buildingString += "&nbsp;&nbsp;&nbsp;&nbsp;" + currentItem.prompt_fee + "&nbsp;" + currentItem.language + "&nbsp;Prompts<br />";
                            buildingString += "&nbsp;&nbsp;&nbsp;&nbsp;<u>" + currentItem.transfer_fee + "</u>&nbsp;" + currentItem.language + "&nbsp;Transfer<br />";
                            buildingString += "&nbsp;&nbsp;&nbsp;&nbsp;" + currentItem.total_recording_fee + "&nbsp;" + currentItem.language + "&nbsp;Recording<br /><br />";
                            string currentItemFee = currentItem.total_recording_fee;
                            allLanguages += currentItem.language + ", ";
                            currentItemFee = currentItemFee.Replace("$", "0");
                            totalCosts += Convert.ToDouble(currentItemFee);
                        }
                        allLanguages = allLanguages.Substring(0, allLanguages.Length - 2);
                        if (allEntriesList.Count > 1)
                        {
                            allLanguages = allLanguages.Insert(allLanguages.LastIndexOf(" "), " and ");
                        }
                        incString = incString.Replace("[PromptLanguages]", allLanguages);
                        incString = incString.Replace("[TotalRecordingFees]", totalCosts.ToString("N2"));

                        //(smm) Print the CD Fee if it applies
                        if (!isNull(CDFee)) 
                        {
                            buildingString += "&nbsp;&nbsp;&nbsp;&nbsp;" + db.PromptWorksheets.First(f => f.project_id.Equals(Convert.ToInt32(filter))).great_voice_cd_fee + "&nbsp;CD Prep / Delivery";
                        }
                        // ath 11-5-12 no longer located in promptDetailsbuildingString += "&nbsp;&nbsp;&nbsp;&nbsp;" + db.PromptDetails.First(f => f.project_id.Equals(Convert.ToInt32(filter))).cd_fee + "&nbsp;CD Prep / Delivery";

                        incString = incString.Replace("[FullPromptCosts]", buildingString);
                    }
                    else
                    {
                        incString = incString.Replace("[FullPromptCosts]", "{Prompt Details Not Found}");
                        incString = incString.Replace("[PromptLanguages]", "{Prompt Languages Not Found}");
                        incString = incString.Replace("[TotalRecordingFees]", "{Total Recording Fees Not Found}");
                        incString = incString.Replace("[RecordingStudio]", "{Recording Studio Not Found}");
                    }
                }
            }
            catch (Exception)
            {
                incString = incString.Replace("[FullPromptCosts]", "{Prompt Details Exception. Contact Cookbook Admin.}");
                incString = incString.Replace("[PromptLanguages]", "{Prompt Languages Exception. Contact Cookbook Admin.}");
                incString = incString.Replace("[TotalRecordingFees]", "{Total Recording Fees Exception. Contact Cookbook Admin.}");
                incString = incString.Replace("[RecordingStudio]", "{Recording Studio Exception. Contact Cookbook Admin.}");
            }

            //GM Voice Prompts PO Request
            try
            {
                if (incString.Contains("[GMVoicesVendor]") || incString.Contains("[GMVoicesTotalRecordingFees]") || incString.Contains("[GMVoicesFullPromptCosts]"))
                {
                    if (db.GMVoicePromptDetails.Count(d => d.project_id.Equals(Convert.ToInt32(filter))) > 0)
                    {
                        incString = incString.Replace("[GMVoicesVendor]", "GM Voices");
                        var allEntries = db.GMVoicePromptDetails.Where(e => e.project_id.Equals(Convert.ToInt32(filter)));
                        var allEntriesList = allEntries.ToList();
                        string buildingString = "";
                        var totalCosts = 0.00;

                        foreach (GMVoicePromptDetail currentItem in allEntriesList)
                        {
                            buildingString += currentItem.setup_fee.Contains("$") ? "&nbsp;&nbsp;&nbsp;&nbsp;" + currentItem.setup_fee + "&nbsp;" + currentItem.language + "&nbsp;Setup<br />" : "&nbsp;&nbsp;&nbsp;&nbsp;$" + currentItem.setup_fee + "&nbsp;" + currentItem.language + "&nbsp;Setup<br />";
                            buildingString += currentItem.translation_fee.Contains("$") ? "&nbsp;&nbsp;&nbsp;&nbsp;" + currentItem.translation_fee + "&nbsp;" + currentItem.language + "&nbsp;Translation<br />" : "&nbsp;&nbsp;&nbsp;&nbsp;$" + currentItem.translation_fee + "&nbsp;" + currentItem.language + "&nbsp;Translation<br />";
                            buildingString += currentItem.delivery_fee.Contains("$") ? "&nbsp;&nbsp;&nbsp;&nbsp;" + currentItem.delivery_fee + "&nbsp;" + currentItem.language + "&nbsp;Delivery<br />" : "&nbsp;&nbsp;&nbsp;&nbsp;$" + currentItem.delivery_fee + "&nbsp;" + currentItem.language + "&nbsp;Delivery<br />";
                            buildingString += currentItem.recording1_fee.Contains("$") ? "&nbsp;&nbsp;&nbsp;&nbsp;" + currentItem.recording1_fee + "&nbsp;" + currentItem.language + "&nbsp;Recording 1-2<br />" : "&nbsp;&nbsp;&nbsp;&nbsp;$" + currentItem.recording1_fee + "&nbsp;" + currentItem.language + "&nbsp;Recording 1-2<br />";
                            buildingString += currentItem.recording3_fee.Contains("$") ? "&nbsp;&nbsp;&nbsp;&nbsp;<u>" + currentItem.recording3_fee + "&nbsp;" + currentItem.language + "&nbsp;Recording 3+</u><br />" : "&nbsp;&nbsp;&nbsp;&nbsp;<u>$" + currentItem.recording3_fee + "&nbsp;" + currentItem.language + "&nbsp;Recording 3+</u><br />";
                            buildingString += "&nbsp;&nbsp;&nbsp;&nbsp;" + currentItem.total_recording_fee + "&nbsp;" + currentItem.language + "&nbsp;Total Recording Fee<br /><br />";
                            string currentItemFee = currentItem.total_recording_fee;
                            currentItemFee = currentItemFee.Replace("$", "0");
                            totalCosts += Convert.ToDouble(currentItemFee);
                        }
                        incString = incString.Replace("[GMVoicesTotalRecordingFees]", totalCosts.ToString("N2"));

                        incString = incString.Replace("[GMVoicesFullPromptCosts]", buildingString);

                    }
                    else
                    {
                        incString = incString.Replace("[GMVoicesVendor]", "{Prompt GM Voices Details Not Found}");
                        incString = incString.Replace("[GMVoicesTotalRecordingFees]", "{Prompt GM Voices Details Not Found}");
                        incString = incString.Replace("[GMVoicesFullPromptCosts]", "{Prompt GM Voices Details Not Found}");
                    }
                }
            }
            catch (Exception)
            {
                incString = incString.Replace("[GMVoicesVendor]", "{Prompt GM Voices Exception. Contact Cookbook Admin.}");
                incString = incString.Replace("[GMVoicesTotalRecordingFees]", "{Prompt GM Voices Exception. Contact Cookbook Admin.}");
                incString = incString.Replace("[GMVoicesFullPromptCosts]", "{Prompt GM Voices Exception. Contact Cookbook Admin.}");
            }



            //GM Voice Prompts 
            try
            {
                if (incString.Contains("[GMVoicesPromptNumLangInfo]") || incString.Contains("[GMVoicesPromptLangVoiceTalentInfo]"))
                {
                    if (db.GMVoicePromptDetails.Count(d => d.project_id.Equals(Convert.ToInt32(filter))) > 0)
                    {
                        var allEntries = db.GMVoicePromptDetails.Where(e => e.project_id.Equals(Convert.ToInt32(filter)));
                        var allEntriesList = allEntries.ToList();
                        string buildingString = "";
                        string endingString = " - with ";
                        var totalPrompts = 0;
                        string buildingString2 = "<b>";
                        int endingStringCounter = 0;
                        foreach (GMVoicePromptDetail currentItem in allEntriesList)
                        {
                            totalPrompts += Convert.ToInt32(currentItem.prompts_recorded);
                            buildingString += "[" + currentItem.prompts_recorded + "] " + currentItem.language + " / ";
                            if (!currentItem.language.Contains("English"))
                            {
                                endingString += currentItem.language + ", ";
                                endingStringCounter++;
                            }

                            buildingString2 += currentItem.language + " (" + currentItem.recording_studio + ")<br>";
                        }
                        buildingString2 += "</b>";
                        endingString = endingString.Substring(0, endingString.Length - 2);
                        buildingString = buildingString.Substring(0, buildingString.Length - 2);

                        if (endingStringCounter > 1)
                        {
                            endingString = endingString.Insert(endingString.LastIndexOf(" "), " and ");
                        }
                        if (endingStringCounter > 0)
                        {
                            endingString += " translations";
                            buildingString += endingString;
                        }
                        buildingString = totalPrompts + " - " + buildingString;
                        incString = incString.Replace("[GMVoicesPromptNumLangInfo]", buildingString);
                        incString = incString.Replace("[GMVoicesPromptLangVoiceTalentInfo]", buildingString2);
                    }
                    else
                    {
                        incString = incString.Replace("[GMVoicesPromptNumLangInfo]", "{Prompt GM Voices Details Not Found}");
                        incString = incString.Replace("[GMVoicesPromptLangVoiceTalentInfo]", "{Prompt GM Voices Details Not Found}");
                    }
                }
            }
            catch (Exception)
            {
                incString = incString.Replace("[GMVoicesPromptNumLangInfo]", "{Prompt GM Voices Exception. Contact Cookbook Admin.}");
                incString = incString.Replace("[GMVoicesPromptLangVoiceTalentInfo]", "{Prompt GM Voices Exception. Contact Cookbook Admin.}");
            }






            //SWD schedules 

            try
            {
                if (incString.Contains("[ScheduledUATDelivery]") || incString.Contains("[ScheduledCFDocsApproval]") || incString.Contains("[ScheduledCFDocsToCustomer]") 
                    || incString.Contains("[ScheduledBAComplete]") || incString.Contains("[ScheduledBAStart]"))
                {
                    if (db.SWDSchedules.Count(d => d.project_id.Equals(Convert.ToInt32(filter))) > 0)
                    {
                        incString = incString.Replace("[ScheduledUATDelivery]", db.SWDSchedules.First(g => g.project_id.Equals(Convert.ToInt32(filter))).scheduled_uat_delivery);
                        incString = incString.Replace("[ScheduledCFDocsApproval]", db.SWDSchedules.First(g => g.project_id.Equals(Convert.ToInt32(filter))).scheduled_docs_approval);
                        incString = incString.Replace("[ScheduledCFDocsToCustomer]", db.SWDSchedules.First(g => g.project_id.Equals(Convert.ToInt32(filter))).scheduled_docs_to_customer);
                        incString = incString.Replace("[ScheduledBAComplete]", db.SWDSchedules.First(g => g.project_id.Equals(Convert.ToInt32(filter))).scheduled_ba_complete);
                        incString = incString.Replace("[ScheduledBAStart]", db.SWDSchedules.First(g => g.project_id.Equals(Convert.ToInt32(filter))).scheduled_ba_start);
                    }
                    else
                    {
                        incString = incString.Replace("[ScheduledUATDelivery]", "{Scheduled UAT Delivery Not Found}");
                        incString = incString.Replace("[ScheduledCFDocsApproval]", "{Scheduled CF Docs Approval Not Found}");
                        incString = incString.Replace("[ScheduledCFDocsToCustomer]", "{Scheduled CF Docs To Customer Not Found}");
                        incString = incString.Replace("[ScheduledBAComplete]", "{Scheduled BA Complete Not Found}");
                        incString = incString.Replace("[ScheduledBAStart]", "{Scheduled BA Start Not Found}");
                    }
                }
                
            }
            catch(Exception)
            {
                incString = incString.Replace("[ScheduledUATDelivery]", "{Scheduled UAT Delivery Exception. Contact Cookbook Admin.}");
                incString = incString.Replace("[ScheduledCFDocsApproval]", "{Scheduled CF Docs Approval Exception. Contact Cookbook Admin.}");
                incString = incString.Replace("[ScheduledCFDocsToCustomer]", "{Scheduled CF Docs To Customer Exception. Contact Cookbook Admin.}");
                incString = incString.Replace("[ScheduledBAComplete]", "{Scheduled BA Complete Exception. Contact Cookbook Admin.}");
                incString = incString.Replace("[ScheduledBAStart]", "{Scheduled BA Start Exception. Contact Cookbook Admin.}");
            }



            try
            {
                if (incString.Contains("[ScheduledDevComplete]") || incString.Contains("[ScheduledDevStart]"))
                {
                    if (db.SWDSchedules.Count(d => d.project_id.Equals(Convert.ToInt32(filter))) > 0)
                    {
                        //dev start/complete
                        DateTime earliestDate = Convert.ToDateTime("01/01/2099");
                        DateTime latestDate = Convert.ToDateTime("01/01/1099");
                        if (db.SWDAssessments.Count(h => h.project_id.Equals(Convert.ToInt32(filter)) && h.assessment_type_id.Equals(db.AssessmentTypes.Single(i => i.type.Equals("Coding")).assessment_type_id)) > 0)
                        {
                            var codingList = db.SWDAssessments.Where(h => h.project_id.Equals(Convert.ToInt32(filter)) && h.assessment_type_id.Equals(db.AssessmentTypes.Single(i => i.type.Equals("Coding")).assessment_type_id)).ToList();
                            foreach (SWDAssessment a in codingList)
                            {
                                DateTime result;
                                if (DateTime.TryParseExact(a.scheduled_start_date, "MM/dd/yyyy", System.Globalization.CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.NoCurrentDateDefault, out result))
                                {
                                    //scheduled start date IS a date, not a string
                                    if (DateTime.Compare(earliestDate, Convert.ToDateTime(a.scheduled_start_date)) > 0)
                                    {
                                        //earliestDate is LATER than the current item's date
                                        earliestDate = Convert.ToDateTime(a.scheduled_start_date);
                                    }
                                }
                                if (DateTime.TryParseExact(a.scheduled_complete, "MM/dd/yyyy", System.Globalization.CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.NoCurrentDateDefault, out result))
                                {
                                    //scheduled complete date IS a date, not a string
                                    if (DateTime.Compare(latestDate, Convert.ToDateTime(a.scheduled_complete)) < 0)
                                    {
                                        //latestDate is EARLIER than current item's date
                                        latestDate = Convert.ToDateTime(a.scheduled_complete);
                                    }
                                }

                                
                            }
                        }
                        if (db.SWDAssessments.Count(h => h.project_id.Equals(Convert.ToInt32(filter)) && h.assessment_type_id.Equals(db.AssessmentTypes.Single(i => i.type.Equals("MIS Other")).assessment_type_id)) > 0)
                        {
                            var codingList = db.SWDAssessments.Where(h => h.project_id.Equals(Convert.ToInt32(filter)) && h.assessment_type_id.Equals(db.AssessmentTypes.Single(i => i.type.Equals("MIS Other")).assessment_type_id)).ToList();
                            foreach (SWDAssessment a in codingList)
                            {
                                DateTime result;
                                if (DateTime.TryParseExact(a.scheduled_start_date, "MM/dd/yyyy", System.Globalization.CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.NoCurrentDateDefault, out result))
                                {
                                    //scheduled start date IS a date, not a string
                                    if (DateTime.Compare(earliestDate, Convert.ToDateTime(a.scheduled_start_date)) > 0)
                                    {
                                        //earliestDate is LATER than the current item's date
                                        earliestDate = Convert.ToDateTime(a.scheduled_start_date);
                                    }
                                }

                                if (DateTime.TryParseExact(a.scheduled_complete, "MM/dd/yyyy", System.Globalization.CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.NoCurrentDateDefault, out result))
                                {
                                    //scheduled complete date IS a date, not a string
                                    if (DateTime.Compare(latestDate, Convert.ToDateTime(a.scheduled_complete)) < 0)
                                    {
                                        //latestDate is EARLIER than current item's date
                                        latestDate = Convert.ToDateTime(a.scheduled_complete);
                                    }
                                }
                                
                            }
                        }

                        if (earliestDate == Convert.ToDateTime("01/01/2099"))
                        {
                            incString = incString.Replace("[ScheduledDevStart]", "{Scheduled Dev Start Not Found}");
                        }
                        else
                        {
                            incString = incString.Replace("[ScheduledDevStart]", earliestDate.ToString("MM/dd/yyyy").Substring(0, 10));
                        }
                        if (latestDate == Convert.ToDateTime("01/01/1099"))
                        {
                            incString = incString.Replace("[ScheduledDevComplete]", "{Scheduled Dev Complete Not Found}");
                        }
                        else
                        {
                            incString = incString.Replace("[ScheduledDevComplete]", latestDate.ToString("MM/dd/yyyy").Substring(0, 10));
                        }
                    }
                    else
                    {
                        incString = incString.Replace("[ScheduledDevComplete]", "{Scheduled Dev Complete Not Found}");
                        incString = incString.Replace("[ScheduledDevStart]", "{Scheduled Dev Start Not Found}");
                    }
                }
            }
            catch (Exception)
            {
                incString = incString.Replace("[ScheduledDevComplete]", "{Scheduled Dev Complete Exception. Contact Cookbook Admin.}");
                incString = incString.Replace("[ScheduledDevStart]", "{Scheduled Dev Start Exception. Contact Cookbook Admin.}");
            }

            //UATProdInstall section
            try
            {
                if (incString.Contains("[UATProdInstallProdDate]"))
                {
                    if (db.UatProdInstalls.Count(d => d.project_id.Equals(Convert.ToInt32(filter))) > 0)
                    {
                        if (db.UatProdInstalls.Single(j => j.project_id.Equals(Convert.ToInt32(filter))).uat_date != null && db.UatProdInstalls.Single(j => j.project_id.Equals(Convert.ToInt32(filter))).uat_date != "")
                        {
                            incString = incString.Replace("[UATProdInstallProdDate]", db.UatProdInstalls.Single(j => j.project_id.Equals(Convert.ToInt32(filter))).uat_date);
                        }
                        else
                        {
                            incString = incString.Replace("[UATProdInstallProdDate]", "{UAT Prod Install Prod Date Not Found}");
                        }
                    }
                    else
                    {
                        incString = incString.Replace("[UATProdInstallProdDate]", "{UAT Prod Install Prod Date Not Found}");
                    }
                }
            }
            catch (Exception)
            {
                incString = incString.Replace("[UATProdInstallProdDate]", "{UAT Prod Install Prod Date Exception. Contact Cookbook Admin.}");
            }


            try
            {
                if (incString.Contains("[UATProdInstallXLSAndETMFiles]"))
                {
                    if (db.ProjectRequirements.Count(d => d.project_id.Equals(Convert.ToInt32(filter)) && d.RequirementType.type.Equals("Table")) > 0)
                    {
                        string buildingString = "";
                        var tableReqsInUATList = db.ProjectRequirements.Where(d => d.project_id.Equals(Convert.ToInt32(filter)) && d.RequirementType.type.Equals("Table")).ToList();
                        for (int i = 0; i < tableReqsInUATList.Count; i++)
                        {
                            if (tableReqsInUATList[i].filename.Contains(".xls") || tableReqsInUATList[i].filename.Contains(".etm") && !tableReqsInUATList[i].filename.Contains("_def"))
                            {
                                buildingString += "&nbsp;&nbsp;&nbsp;&nbsp;" + tableReqsInUATList[i].filename + "<br />";
                            }
                        }
                        incString = incString.Replace("[UATProdInstallXLSAndETMFiles]", buildingString);
                    }
                    else
                    {
                        incString = incString.Replace("[UATProdInstallXLSAndETMFiles]", "{UAT Prod Install XLS and ETM file names Not Found}");
                    }
                }
            }
            catch (Exception)
            {
                incString = incString.Replace("[UATProdInstallXLSAndETMFiles]", "{UAT Prod Install XLS and ETM file names exception. Contact Cookbook Admin.}");
            }

            //BuffetProdInstall section
            try
            {
                if (incString.Contains("[BuffetProdInstallProdDate]"))
                {
                    if (db.ProdInstallationBuffets.Count(d => d.project_id.Equals(Convert.ToInt32(filter))) > 0)
                    {
                        if (db.ProdInstallationBuffets.Single(j => j.project_id.Equals(Convert.ToInt32(filter))).date != null && db.ProdInstallationBuffets.Single(j => j.project_id.Equals(Convert.ToInt32(filter))).date != "")
                        {
                            incString = incString.Replace("[BuffetProdInstallProdDate]", db.ProdInstallationBuffets.Single(j => j.project_id.Equals(Convert.ToInt32(filter))).date);
                        }
                        else
                        {
                            incString = incString.Replace("[BuffetProdInstallProdDate]", "{Buffet Prod Install Prod Date Not Found}");
                        }

                    }
                    else
                    {
                        incString = incString.Replace("[BuffetProdInstallProdDate]", "{Buffet Prod Install Prod Date Not Found}");
                    }
                }
            }
            catch (Exception)
            {
                incString = incString.Replace("[BuffetProdInstallProdDate]", "{Buffet Prod Install Prod Date Exception. Contact Cookbook Admin.}");
            }

            try
            {
                if (incString.Contains("[BuffetProdInstallXLSAndETMFiles]"))
                {
                    if (db.BuffetProjectRequirements.Count(d => d.project_id.Equals(Convert.ToInt32(filter)) && d.RequirementType.type.Equals("Table")) > 0)
                    {
                        string buildingString = "";
                        var tableReqsInBuffetList = db.BuffetProjectRequirements.Where(d => d.project_id.Equals(Convert.ToInt32(filter)) && d.RequirementType.type.Equals("Table")).ToList();
                        for (int i = 0; i < tableReqsInBuffetList.Count; i++)
                        {
                            if (tableReqsInBuffetList[i].filename.Contains(".xls") || tableReqsInBuffetList[i].filename.Contains(".etm") && !tableReqsInBuffetList[i].filename.Contains("_def"))
                            {
                                buildingString += "&nbsp;&nbsp;&nbsp;&nbsp;" + tableReqsInBuffetList[i].filename + "<br />";
                            }
                        }
                        incString = incString.Replace("[BuffetProdInstallXLSAndETMFiles]", buildingString);
                    }
                    else
                    {
                        incString = incString.Replace("[BuffetProdInstallXLSAndETMFiles]", "{Buffet Prod Install XLS and ETM file names Not Found}");
                    }
                }
            }
            catch (Exception)
            {
                incString = incString.Replace("[BuffetProdInstallXLSAndETMFiles]", "{Buffet Prod Install XLS and ETM file names exception. Contact Cookbook Admin.}");
            }

            //linked projects section
            try
            {
                if (incString.Contains("[BuffetProdInstallLinkedProjects]"))
                {
                    if (db.ProjectInformations.Count(k => k.project_id.Equals(Convert.ToInt32(filter))) > 0)
                    {
                        string buildingLinkedProjStr = db.ProjectInformations.First(k => k.project_id.Equals(Convert.ToInt32(filter))).project_number + "&nbsp;&nbsp;&nbsp;&nbsp;" +
                            db.ProjectInformations.First(l => l.project_id.Equals(Convert.ToInt32(filter))).project_name + "<br />";
                        //grab linked projects from this project's linked_projects info
                        string linkedProjsStr = db.ProjectInformations.First(k => k.project_id.Equals(Convert.ToInt32(filter))).linked_projects;
                        if (linkedProjsStr.Contains(','))
                        {
                            var linkedProjsList = linkedProjsStr.Split(',');
                            foreach (string currProjNumber in linkedProjsList)
                            {
                                if (db.ProjectInformations.Count(a => a.project_number.Equals(currProjNumber.Trim())) > 0)
                                {
                                    buildingLinkedProjStr += currProjNumber + "&nbsp;&nbsp;&nbsp;&nbsp;" + db.ProjectInformations.First(k => k.project_number.Equals(currProjNumber.Trim())).project_name;
                                    buildingLinkedProjStr += "<br />";
                                }
                            }
                            incString = incString.Replace("[BuffetProdInstallLinkedProjects]", buildingLinkedProjStr);
                        }
                        else
                        {
                            if (db.ProjectInformations.Count(a => a.project_number.Equals(linkedProjsStr.Trim())) > 0)
                            {
                                buildingLinkedProjStr += linkedProjsStr + "&nbsp;&nbsp;&nbsp;&nbsp;" + db.ProjectInformations.First(k => k.project_number.Equals(linkedProjsStr.Trim())).project_name;
                                buildingLinkedProjStr += "<br />";
                            }
                        }
                        incString = incString.Replace("[BuffetProdInstallLinkedProjects]", buildingLinkedProjStr);
                    }
                }
            }
            catch (Exception)
            {
                incString = incString.Replace("[BuffetProdInstallLinkedProjects]", "{Buffet Prod Install Linked Projects Exception. Contact Cookbook Admin.}");
            }

            try
            {
                if (incString.Contains("[BuffetProdInstallMasterProjectNumber]"))
                {
                    if (db.ProjectInformations.First(k => k.project_id.Equals(Convert.ToInt32(filter))).link_type != "Master")
                    {
                        incString = incString.Replace("[BuffetProdInstallMasterProjectNumber]", "{Please Generate This Email From The Master Project}");
                    }
                    else
                    {
                        incString = incString.Replace("[BuffetProdInstallMasterProjectNumber]", db.ProjectInformations.First(k => k.project_id.Equals(Convert.ToInt32(filter))).project_number);
                    }
                }
            }
            catch (Exception)
            {
                incString = incString.Replace("[BuffetProdInstallMasterProjectNumber]", "{Exception in MasterProjectNumber. Contact Cookbook Admin.}");
            }

            //contacts -- each one added here needs to be added to the parseEmailString below also!!! however this should be all of them...
            if (incString.Contains("[USANDevPM"))
            {
                incString = findContact(incString, "[USANDevPM]", "USAN Dev PM", db, filter);
            }
            if (incString.Contains("[USANTC"))
            {
                incString = findContact(incString, "[USANTC]", "USAN TC", db, filter);
            }
            if (incString.Contains("[USANBA"))
            {
                incString = findContact(incString, "[USANBA]", "USAN BA", db, filter);
            }
            if (incString.Contains("[USANDeveloper"))
            {
                incString = findContact(incString, "[USANDeveloper]", "USAN Developer", db, filter);
            }
            if (incString.Contains("[USANMIS"))
            {
                incString = findContact(incString, "[USANMIS]", "USAN MIS", db, filter);
            }
            if (incString.Contains("[USANQA"))
            {
                incString = findContact(incString, "[USANQA]", "USAN QA", db, filter);
            }
            if (incString.Contains("[USANOpsPM"))
            {
                incString = findContact(incString, "[USANOpsPM]", "USAN Ops PM", db, filter);
            }
            if (incString.Contains("[USANTLSIP"))
            {
                incString = findContact(incString, "[USANTLSIP]", "USAN TLS-IP", db, filter);
            }
            if (incString.Contains("[USANTLSSaaS"))
            {
                incString = findContact(incString, "[USANTLSSaaS]", "USAN TLS-SaaS", db, filter);
            }
            if (incString.Contains("[USANSystemsEngineer"))
            {
                incString = findContact(incString, "[USANSystemsEngineer]", "USAN Systems Engineer", db, filter);
            }
            if (incString.Contains("[CustomerPM"))
            {
                incString = findContact(incString, "[CustomerPM]", "Customer PM", db, filter);
            }
            if (incString.Contains("[CustomerRFQ"))
            {
                incString = findContact(incString, "[CustomerRFQ]", "Customer RFQ", db, filter);
            }
            if (incString.Contains("[CustomerTC"))
            {
                incString = findContact(incString, "[CustomerTC]", "Customer TC", db, filter);
            }
            if (incString.Contains("[CustomerHost"))
            {
                incString = findContact(incString, "[CustomerHost]", "Customer Host", db, filter);
            }
            if (incString.Contains("[CustomerTesting"))
            {
                incString = findContact(incString, "[CustomerTesting]", "Customer Testing", db, filter);
            }

            return incString;
        }

        public string findContact(string incString, string tagToBeReplaced, string contactTypeToMatch, CookDBDataContext db, string filter)
        {
            if (db.ProjectContacts.Count(d => d.project_id.Equals(Convert.ToInt32(filter)) && d.type.Equals(contactTypeToMatch)) > 0)
            {
                ProjectContact currentContacts = db.ProjectContacts.First(d => d.project_id.Equals(Convert.ToInt32(filter)) && d.type.Equals(contactTypeToMatch));
                incString = incString.Replace(tagToBeReplaced, db.Contacts.Single(e => e.contact_id.Equals(currentContacts.contact_id)).name);
            }
            else
            {
                incString = incString.Replace(tagToBeReplaced, "{"+contactTypeToMatch+" Not Found}");
            }
            return incString;
        }

        //2nd group of parsing methods for just doing email 

        public string parseEmailString(String incString, CookDBDataContext db, string filter)
        {
            //contacts
            incString = findContactEmail(incString, "[USANDevPM]", "USAN Dev PM", db, filter);
            incString = findContactEmail(incString, "[USANTC]", "USAN TC", db, filter);
            incString = findContactEmail(incString, "[USANBA]", "USAN BA", db, filter);
            incString = findContactEmail(incString, "[USANDeveloper]", "USAN Developer", db, filter);
            incString = findContactEmail(incString, "[USANMIS]", "USAN MIS", db, filter);
            incString = findContactEmail(incString, "[USANQA]", "USAN QA", db, filter);
            incString = findContactEmail(incString, "[USANOpsPM]", "USAN Ops PM", db, filter);
            incString = findContactEmail(incString, "[USANTLSIP]", "USAN TLS-IP", db, filter);
            incString = findContactEmail(incString, "[USANTLSSaaS]", "USAN TLS-SaaS", db, filter);
            incString = findContactEmail(incString, "[USANSystemsEngineer]", "USAN Systems Engineer", db, filter);
            incString = findContactEmail(incString, "[CustomerPM]", "Customer PM", db, filter);
            incString = findContactEmail(incString, "[CustomerRFQ]", "Customer RFQ", db, filter);
            incString = findContactEmail(incString, "[CustomerTC]", "Customer TC", db, filter);
            incString = findContactEmail(incString, "[CustomerHost]", "Customer Host", db, filter);
            incString = findContactEmail(incString, "[CustomerTesting]", "Customer Testing", db, filter);
            return incString;
        }

        public string findContactEmail(string incString, string tagToBeReplaced, string contactTypeToMatch, CookDBDataContext db, string filter)
        {
            try
            {
                if (db.ProjectContacts.Count(d => d.project_id.Equals(Convert.ToInt32(filter)) && d.type.Equals(contactTypeToMatch)) > 0)
                {
                    if (db.ProjectContacts.Count(d => d.project_id.Equals(Convert.ToInt32(filter)) && d.type.Equals(contactTypeToMatch)) > 1)
                    {
                        var multipleContacts = db.ProjectContacts.Where(e => e.project_id.Equals(Convert.ToInt32(filter)) && e.type.Equals(contactTypeToMatch));
                        var multipleContactsList = multipleContacts.ToList();
                        string allNames = "";
                        foreach (ProjectContact currentContact in multipleContactsList)
                        {
                            allNames += db.Contacts.Single(e => e.contact_id.Equals(currentContact.contact_id)).email1 + "; ";
                        }
                        allNames = allNames.Substring(0, allNames.Length - 2);
                        incString = incString.Replace(tagToBeReplaced, allNames);
                    }
                    else
                    {
                        ProjectContact currentContacts = db.ProjectContacts.First(d => d.project_id.Equals(Convert.ToInt32(filter)) && d.type.Equals(contactTypeToMatch));
                        incString = incString.Replace(tagToBeReplaced, db.Contacts.Single(e => e.contact_id.Equals(currentContacts.contact_id)).email1);
                    }
                }
                else
                {
                    incString = incString.Replace(tagToBeReplaced, "{" + contactTypeToMatch + " Not Found}");
                }
            }
            catch (Exception)
            {
                incString = incString.Replace(tagToBeReplaced, "{" + contactTypeToMatch + " Caused an Error when trying to reference. Contact Cookbook Admin.}");
            }
            return incString;
        }









    }
}