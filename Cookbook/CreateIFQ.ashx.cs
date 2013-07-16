using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Globalization;

namespace Cookbook
{
    /// <summary>
    /// Summary description for CreateIFQ
    /// </summary>
    public class CreateIFQ : DatabaseHandler
    {
        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {

                using (new ImpersonateUser("cookbook", "USANAD", "987-oiu8"))
                {
                    try
                    {
                        ProjectInformation project = db.ProjectInformations.Single(a => a.project_id.Equals(int.Parse(filter)));

                        string htmlHeader = "<!DOCTYPE html PUBLIC \" -//W3C//DTD HTML 4.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">\n" +
                                            "<html>\n" +
                                            "<head>\n" +
                                            "    <meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\">\n" +   //(smm - changed to UTF-8) iso-8859-1\">\n" +
                                            "    <style type=\"text/css\">\n" +
                                            ".hours {\n" +
                                            "   border:2px solid #000000;\n" +
                                            "   border-collapse:collapse;\n" +
                                            "}\n" +
                                            "</style>\n" +
                                            "    <title>Information for Quote (RFQ)</title>\n" +
                                            "</head>\n" +
                                            "    <table class=\"hours\" border=\"2\" width=\"660\" cellpadding=\"2\">\n" +
                                            "        <tbody style=\"font-size: 80%; vertical-align: top\">\n";

                        string htmlEnd = "        </tbody>\n" +
                                            "    </table>\n" +
                                            "</body>\n" +
                                            "</html>";


                        //fill in the table with project data
                        string htmlBody = "            <tr>\n" +
                        "                <td style=\"width: 200px; color: #0000CC\" valign=\"top\">\n" +
                        "                    <b>Project ID:</b></td>\n" +
                        "                <td style=\"color: #FF0000\">\n" +
                        "                    " + project.project_number + " " + project.project_name + "</td>\n" +
                        "            </tr>\n" +

                        //PM assigned
                        "            <tr>\n" +
                        "                <td style=\"color: #0000CC\">\n" +
                        "                    <b>" + "PM Assigned" + ":</b></td>\n" +
                        "                <td style=\"color: #FF0000\">\n";

                        List<ProjectContact> contacts = project.ProjectContacts.ToList<ProjectContact>();
                        for (int i = 0; i < contacts.Count; i++)
                        {
                            if (contacts[i].type.Equals("USAN Dev PM"))
                            {
                                htmlBody = htmlBody + contacts[i].Contact.name + "<br/>";
                            }
                        }

                        htmlBody = htmlBody + "\n                </td>\n" +
                        "            </tr>\n" +

                        //Project Description
                        "            <tr>\n" +
                        "                <td style=\"color: #0000CC\">\n" +
                        "                    <b>" + "Project Description" + ":</b></td>\n" +
                        "                <td style=\"color: #FF0000\">\n" +
                        "                    " + project.description +
                        "\n                </td>\n" +
                        "            </tr>\n" +

                        //Prompts Requirements
                        "            <tr>\n" +
                        "                <td style=\"color: #0000CC\">\n" +
                        "                    <b>" + "Prompts Requirements" + ":</b></td>\n" +
                        "                <td style=\"color: #FF0000\">\n<b>Recording:</b><br/>";


                        if (project.PromptDetails.Count() > 0)
                        {
                            List<PromptDetail> prompt_details = project.PromptDetails.ToList<PromptDetail>();

                            for (int i = 0; i < prompt_details.Count; i++)
                            {
                                if (prompt_details[i].prompts_provided > 0)
                                {
                                    int byGreatVoice = (int)prompt_details[i].prompts_recorded; // - prompt_details[i].prompts_provided);
                                    if (byGreatVoice > 0)
                                        htmlBody = htmlBody + "&nbsp&nbsp&nbsp&nbsp&nbsp " + byGreatVoice + " " + prompt_details[i].language + " prompts to be recorded by Great Voice<br/>";  //prompt_details[i].recording_studio
                                    htmlBody = htmlBody + "&nbsp&nbsp&nbsp&nbsp&nbsp " + prompt_details[i].prompts_provided + " " + prompt_details[i].language + " prompts to be provided by Customer<br/>";  //prompt_details[i].recording_studio
                                }
                                else
                                {
                                    htmlBody = htmlBody + "&nbsp&nbsp&nbsp&nbsp&nbsp " + prompt_details[i].prompts_recorded + " " + prompt_details[i].language + " prompts to be recorded by Great Voice<br/>";  //prompt_details[i].recording_studio
                                }
                            }

                            htmlBody = htmlBody + "<b>Translation:</b><br/>";
                            for (int i = 0; i < prompt_details.Count; i++)
                            {
                                if ((prompt_details[i].min_fee == true) || (prompt_details[i].num_words > 0))
                                {
                                    if (prompt_details[i].prompts_provided > 0)
                                    {
                                        int byGreatVoice = (int)prompt_details[i].prompts_recorded;  // - prompt_details[i].prompts_provided);
                                        if (byGreatVoice > 0)
                                            htmlBody = htmlBody + "&nbsp&nbsp&nbsp&nbsp&nbsp " + prompt_details[i].language + " to be provided by Great Voice<br/>";
                                        htmlBody = htmlBody + "&nbsp&nbsp&nbsp&nbsp&nbsp " + prompt_details[i].language + " to be provided by Customer<br/>";
                                    }
                                    else
                                    {
                                        htmlBody = htmlBody + "&nbsp&nbsp&nbsp&nbsp&nbsp " + prompt_details[i].language + " to be provided by Great Voice<br/>";  //prompt_details[i].recording_studio
                                    }
                                }
                            }

                            htmlBody = htmlBody + "<b>Order Type:</b><br/>";
                            for (int i = 0; i < prompt_details.Count; i++)
                            {
                                htmlBody = htmlBody + "&nbsp&nbsp&nbsp&nbsp&nbsp " + prompt_details[i].order_type + " (" + prompt_details[i].language + ")<br/>";
                            }

                            htmlBody = htmlBody + "\n                </td>\n" +
                                                  "            </tr>\n" +



                            //Prompts Recording and Digitization
                            "            <tr>\n" +
                            "                <td style=\"color: #0000CC\">\n" +
                            "                    <b>" + "Prompt Recording & Digitization" + ":</b></td>\n" +
                            "                <td style=\"color: #FF0000\">\n";

                            double recordingTotal = 0;
                            int totalDigitized = 0;

                            for (int i = 0; i < prompt_details.Count; i++)
                            {
                                htmlBody = htmlBody + prompt_details[i].setup_fee + "  " + prompt_details[i].language + " Setup <br/>";
                                htmlBody = htmlBody + prompt_details[i].prompt_fee + "  " + prompt_details[i].language + " Prompts <br/>";
                                htmlBody = htmlBody + prompt_details[i].transfer_fee + "  " + prompt_details[i].language + " Transfer <br/>";

                                if (!prompt_details[i].fee_min.Equals("$0.00") || !prompt_details[i].fee_per_word.Equals("$0.00"))
                                {
                                    double feeMin = 0;
                                    double fee_per_word = 0;

                                    if (!isNull(prompt_details[i].fee_min))
                                    {
                                        try
                                        {
                                            //ah 2-21-13; put in this temporary fix. may need to check if fee_min is over 2 length before doing substring.
                                            feeMin = double.Parse(prompt_details[i].fee_min.Substring(1));
                                        }
                                        catch (Exception)
                                        {
                                            feeMin = 0;
                                        }
                                    }

                                    if (!isNull(prompt_details[i].fee_per_word))
                                    {
                                        try
                                        {
                                            //ah 2-21-13; put in this temporary fix. may need to check if fee_per_word is over 2 length before doing substring.
                                            //melanie's issue came because the field was literally "$" in the backend, so the parse on nothing was failing
                                            fee_per_word = double.Parse(prompt_details[i].fee_per_word.Substring(1));
                                        }
                                        catch (Exception)
                                        {
                                            fee_per_word = 0;
                                        }
                                    }


                                    if (feeMin > fee_per_word)
                                    {
                                        htmlBody = htmlBody + prompt_details[i].fee_min + "  " + prompt_details[i].language + " Translation <br/>";
                                    }
                                    else
                                    {
                                        htmlBody = htmlBody + prompt_details[i].fee_per_word + "  " + prompt_details[i].language + " Translation <br/>";
                                    }
                                }

                                double setupFee = 0;
                                double promptFee = 0;

                                if (!isNull(prompt_details[i].conversion_setup_fee))
                                {
                                    if (prompt_details[i].conversion_setup_fee.Length > 1)
                                    {
                                        setupFee = double.Parse(prompt_details[i].conversion_setup_fee.Substring(1));
                                    }
                                }

                                if (!isNull(prompt_details[i].conversion_prompt_fee))
                                {
                                    if (prompt_details[i].conversion_prompt_fee.Length > 1)
                                    {
                                        promptFee = double.Parse(prompt_details[i].conversion_prompt_fee.Substring(1));
                                    }
                                }

                                double totalConvFee = setupFee + promptFee;

                                if (totalConvFee > 0)
                                {
                                    htmlBody = htmlBody + "<u>" + String.Format("{0:C}", totalConvFee) + "  " + prompt_details[i].language + " Conversion </u><br/>";
                                }
                                //htmlBody = htmlBody + "<u>" + prompt_details[i].cd_fee + "  " + prompt_details[i].language + " CD Prep & Delivery </u><br/>";
                                htmlBody = htmlBody + "<b>" + prompt_details[i].total_recording_fee + "  " + prompt_details[i].language + " Recording </b><br/><br/>";

                                if (!isNull(prompt_details[i].total_recording_fee))
                                {
                                    if (prompt_details[i].total_recording_fee.Length > 1)
                                    {
                                        recordingTotal = recordingTotal + double.Parse(prompt_details[i].total_recording_fee.Substring(1));
                                    }
                                }
                                    

                                totalDigitized = totalDigitized + (int)prompt_details[i].prompts_digitized;
                            }

                            PromptWorksheet promptWorksheet = db.PromptWorksheets.Single(a => a.project_id.Equals(project.project_id));

                            if (promptWorksheet.great_voice_cd_fee != null)
                            {
                                if (promptWorksheet.great_voice_cd_fee.Length > 0)
                                {
                                    recordingTotal = recordingTotal + double.Parse(promptWorksheet.great_voice_cd_fee.Substring(1));
                                    htmlBody = htmlBody + "<br/><b>" + String.Format("{0:C}", double.Parse(promptWorksheet.great_voice_cd_fee.Substring(1))) + " CD Prep & Delivery</b><br/>";
                                }
                            }


                            htmlBody = htmlBody + "<br/><b>" + String.Format("{0:C}", recordingTotal) + " TOTAL</b><br/><br/>";
                            htmlBody = htmlBody + "<b>" + totalDigitized + " Prompts to be digitized, distributed and verified by USAN</b><br/>";
                            htmlBody = htmlBody + "\n                </td>\n" +
                                                  "            </tr>\n";
                        }
                        else if (project.GMVoicePromptDetails.Count() > 0)
                        {
                            List<GMVoicePromptDetail> prompt_details = project.GMVoicePromptDetails.ToList<GMVoicePromptDetail>();

                            for (int i = 0; i < prompt_details.Count; i++)
                            {
                                htmlBody = htmlBody + "&nbsp&nbsp&nbsp&nbsp&nbsp " + prompt_details[i].prompts_recorded + " " + prompt_details[i].language + " prompts to be recorded by GM Voices<br/>";  //prompt_details[i].recording_studio
                            }

                            htmlBody = htmlBody + "<b>Translation:</b><br/>";
                            for (int i = 0; i < prompt_details.Count; i++)
                            {
                                if (prompt_details[i].min_fee == true)
                                {
                                    htmlBody = htmlBody + "&nbsp&nbsp&nbsp&nbsp&nbsp " + prompt_details[i].language + " to be provided by GM Voices<br/>";  //prompt_details[i].recording_studio
                                }
                            }

                            htmlBody = htmlBody + "<b>Order Type:</b><br/>";
                            for (int i = 0; i < prompt_details.Count; i++)
                            {
                                htmlBody = htmlBody + "&nbsp&nbsp&nbsp&nbsp&nbsp " + prompt_details[i].order_type + " (" + prompt_details[i].language + ")<br/>";
                            }

                            htmlBody = htmlBody + "\n                </td>\n" +
                                                  "            </tr>\n" +



                            //Prompts Recording and Digitization
                            "            <tr>\n" +
                            "                <td style=\"color: #0000CC\">\n" +
                            "                    <b>" + "Prompt Recording & Digitization" + ":</b></td>\n" +
                            "                <td style=\"color: #FF0000\">\n";

                            double recordingTotal = 0;
                            int totalDigitized = 0;

                            for (int i = 0; i < prompt_details.Count; i++)
                            {
                                htmlBody = htmlBody + prompt_details[i].setup_fee + "  " + prompt_details[i].language + " Setup <br/>";
                                htmlBody = htmlBody + prompt_details[i].recording1_fee + "  " + prompt_details[i].language + " Recording 1-2 <br/>";
                                htmlBody = htmlBody + prompt_details[i].recording3_fee + "  " + prompt_details[i].language + " Recording 3+ <br/>";
                                htmlBody = htmlBody + prompt_details[i].translation_fee + "  " + prompt_details[i].language + " Translation <br/>";
                                htmlBody = htmlBody + "<u>" + prompt_details[i].delivery_fee + "  " + prompt_details[i].language + " Delivery </u><br/>";
                                htmlBody = htmlBody + "<b>" + prompt_details[i].total_recording_fee + "  " + prompt_details[i].language + " Recording </b><br/><br/>";

                                totalDigitized = totalDigitized + (int)prompt_details[i].prompts_digitized;
                            }

                            PromptWorksheet promptWorksheet = db.PromptWorksheets.Single(a => a.project_id.Equals(project.project_id));

                            if (!isNull(promptWorksheet.gm_voices_total_fee))
                                recordingTotal = recordingTotal + double.Parse(promptWorksheet.gm_voices_total_fee.Substring(1));

                            htmlBody = htmlBody + "<br/><b>" + String.Format("{0:C}", recordingTotal) + " TOTAL</b><br/><br/>";
                            htmlBody = htmlBody + "<b>" + totalDigitized + " Prompts to be digitized, distributed and verified by USAN</b><br/>";
                            htmlBody = htmlBody + "\n                </td>\n" +
                                                  "            </tr>\n";
                        }


                        //Project Assumptions
                        htmlBody = htmlBody + "            <tr>\n" +
                        "                <td style=\"color: #0000CC\">\n" +
                        "                    <b>" + "Project Specific Assumptions" + ":</b></td>\n" +
                        "                <td style=\"color: #FF0000\">\n";

                        List<ProjectAssumption> project_assumptions = project.ProjectAssumptions.ToList<ProjectAssumption>();

                        for (int i = 0; i < project_assumptions.Count; i++)
                        {
                            if (!project_assumptions[i].category.Equals("Standard"))
                            {
                                htmlBody = htmlBody + "<b>" + project_assumptions[i].assumption_text + "</b><br/><br/>";
                            }
                        }

                        htmlBody = htmlBody + "\n                </td>\n" +
                                              "            </tr>\n" +

                        //Standard Assumptions
                        "            <tr>\n" +
                        "                <td style=\"color: #0000CC\">\n" +
                        "                    <b>" + "Standard Assumptions" + ":</b></td>\n" +
                        "                <td style=\"color: #FF0000\">\n";

                        for (int i = 0; i < project_assumptions.Count; i++)
                        {
                            if (project_assumptions[i].category.Equals("Standard"))
                            {
                                htmlBody = htmlBody + "<b>" + project_assumptions[i].assumption_text + "</b><br/><br/>";
                            }
                        }

                        htmlBody = htmlBody + "\n                </td>\n" +
                                              "            </tr>\n" +


                        //Customer Deliverables
                        "            <tr>\n" +
                        "                <td style=\"color: #0000CC\">\n" +
                        "                    <b>" + "Customer Deliverables" + ":</b></td>\n" +
                        "                <td style=\"color: #FF0000\">\n";

                        List<ProjectDeliverable> project_deliverables = project.ProjectDeliverables.ToList<ProjectDeliverable>();

                        for (int i = 0; i < project_deliverables.Count; i++)
                        {
                            htmlBody = htmlBody + "<b>" + project_deliverables[i].deliverable_text + "</b><br/><br/>";
                        }


                        htmlBody = htmlBody + "\n                </td>\n" +
                                              "            </tr>\n" +

                        //TC / BA Hours Non-Billable
                        "            <tr>\n" +
                        "                <td style=\"color: #0000CC\">\n" +
                        "                    <b>" + "TC / BA Hours Non-Billable" + ":</b></td>\n" +
                        "                <td style=\"color: #FF0000\">\n";

                        List<SWDAssessment> swdAssessments = project.SWDAssessments.ToList<SWDAssessment>();
                        double nonBillableTCHours = 0;
                        double billableTCHours = 0;
                        for (int i = 0; i < swdAssessments.Count; i++)
                        {
                            if (swdAssessments[i].AssessmentType.assessment_type_id == 13)
                            {
                                double booked = 0;
                                double billed = 0;

                                if (isNull(swdAssessments[i].booked_hours))
                                {
                                    booked = 0;
                                }
                                else
                                {
                                    booked = double.Parse(swdAssessments[i].booked_hours);
                                }

                                if (isNull(swdAssessments[i].hours))
                                {
                                    billed = 0;
                                }
                                else
                                {
                                    billed = double.Parse(swdAssessments[i].hours);
                                }

                                nonBillableTCHours = nonBillableTCHours + (booked - billed);
                                billableTCHours = billableTCHours + billed;
                            }
                        }

                        //if the nonBillable hours is negative, set it to zero
                        if (nonBillableTCHours < 0)
                        {
                            nonBillableTCHours = 0;
                        }

                        htmlBody = htmlBody + "<b>" + nonBillableTCHours + " Total Hours</b>";
                        htmlBody = htmlBody + "\n                </td>\n" +
                        "            </tr>\n" +


                        //TC / BA Hours Non-Billable
                        "            <tr>\n" +
                        "                <td style=\"color: #0000CC\">\n" +
                        "                    <b>" + "TC / BA Hours Billable" + ":</b></td>\n" +
                        "                <td style=\"color: #FF0000\">\n" +
                        "                    <b>" + billableTCHours + " Total Hours</b>";
                        htmlBody = htmlBody + "\n                </td>\n" +
                        "            </tr>\n" +


                        //Development Hours
                        "            <tr>\n" +
                        "                <td style=\"color: #0000CC\">\n" +
                        "                    <b>" + "Development Hours" + ":</b></td>\n" +
                        "                <td style=\"color: #FF0000\">\n";


                        double totalDevHours = 0;
                        double totalCodeHours = 0;
                        string scheduled_dev_start = "";
                        string scheduled_dev_complete = "";

                        SWDSchedule schedule = project.SWDSchedules.Single(a => a.project_id.Equals(project.project_id));

                        scheduled_dev_start = schedule.scheduled_dev_start;
                        scheduled_dev_complete = schedule.scheduled_dev_complete;

                        for (int i = 0; i < swdAssessments.Count; i++)
                        {
                            switch (swdAssessments[i].AssessmentType.assessment_type_id)
                            {
                                case 4:   /* workflow */
                                    if (!isNull(swdAssessments[i].hours)) { totalDevHours = totalDevHours + double.Parse(swdAssessments[i].hours); }
                                    break;

                                case 5:   /* requirements */
                                    if (!isNull(swdAssessments[i].hours)) { totalDevHours = totalDevHours + double.Parse(swdAssessments[i].hours); }
                                    break;

                                case 6:   /* coding */
                                    if (!isNull(swdAssessments[i].hours))
                                    {
                                        totalDevHours = totalDevHours + double.Parse(swdAssessments[i].hours);
                                        totalCodeHours = totalCodeHours + double.Parse(swdAssessments[i].hours);
                                    }
                                    break;

                                case 12:  /* MIS */
                                    if (!isNull(swdAssessments[i].hours)) { totalDevHours = totalDevHours + double.Parse(swdAssessments[i].hours); }
                                    break;

                                case 8:   /* Testing/Implementation */
                                    if (!isNull(swdAssessments[i].hours)) { totalDevHours = totalDevHours + double.Parse(swdAssessments[i].hours); }
                                    break;

                                case 15:  /* MIS Other */
                                    if (!isNull(swdAssessments[i].hours)) { totalDevHours = totalDevHours + double.Parse(swdAssessments[i].hours); }

                                    
                                    break;

                                case 9:   /* QA */
                                    if (!isNull(swdAssessments[i].hours)) { totalDevHours = totalDevHours + double.Parse(swdAssessments[i].hours); }
                                    break;

                                case 11:  /* UAT Support */
                                    if (!isNull(swdAssessments[i].hours))
                                    {
                                        totalDevHours = totalDevHours + double.Parse(swdAssessments[i].hours);
                                    }
                                    break;

                                case 14:  /* Project Overhead */
                                    if (!isNull(swdAssessments[i].hours)) { totalDevHours = totalDevHours + double.Parse(swdAssessments[i].hours); }
                                    break;

                            }
                        }

                        htmlBody = htmlBody + "<b>" + totalDevHours + " Total Hours</b><br/>" +
                                                      totalCodeHours + " Code<br/>" +
                                                      (totalDevHours - totalCodeHours) + " Other";
                        htmlBody = htmlBody + "\n                </td>\n" +
                        "            </tr>\n" +


                        //PM Hours
                        "            <tr>\n" +
                        "                <td style=\"color: #0000CC\">\n" +
                        "                    <b>" + "PM Hours" + ":</b></td>\n" +
                        "                <td style=\"color: #FF0000\">\n" +
                        "                    <b>";

                        try
                        {
                            htmlBody = htmlBody + schedule.billable_pm_hours;
                        }
                        catch (Exception)
                        {
                            htmlBody = htmlBody + "0";
                        }
                        htmlBody = htmlBody + " Total Hours</b>";

                        htmlBody = htmlBody + "\n                </td>\n" +
                        "            </tr>\n" +


                        //TLS-IP Hours
                        "            <tr>\n" +
                        "                <td style=\"color: #0000CC\">\n" +
                        "                    <b>" + "TLS-IP Hours" + ":</b></td>\n" +
                        "                <td style=\"color: #FF0000\">\n";


                        double totalAccessUSANHours = 0;
                        double totalScriptHours = 0;
                        double totalUatImp = 0;
                        double totalUatSupport = 0;
                        double totalProductionImp = 0;
                        double totalOther = 0;

                        for (int i = 0; i < swdAssessments.Count; i++)
                        {
                            switch (swdAssessments[i].AssessmentType.assessment_type_id)
                            {
                                case 22:   /* TLS_IP AccessUSAN */
                                    if (!isNull(swdAssessments[i].hours)) { totalAccessUSANHours = totalAccessUSANHours + double.Parse(swdAssessments[i].hours); }
                                    break;
                                /*
                            case 23:   // Scripts TLS_IP
                                if (!isNull(swdAssessments[i].hours)) { totalScriptHours = totalScriptHours + double.Parse(swdAssessments[i].hours); }
                                break;
                                */
                                case 24:   /* TLS_IP Uat Implementation */
                                    if (!isNull(swdAssessments[i].hours)) { totalUatImp = totalUatImp + double.Parse(swdAssessments[i].hours); }
                                    break;

                                case 25:   /* TLS_IP Uat Support */
                                    if (!isNull(swdAssessments[i].hours)) { totalUatSupport = totalUatSupport + double.Parse(swdAssessments[i].hours); }
                                    break;

                                case 26:   /* TLS_IP Production Implementation */
                                    if (!isNull(swdAssessments[i].hours)) { totalProductionImp = totalProductionImp + double.Parse(swdAssessments[i].hours); }
                                    break;

                                case 27:   /* TLS_IP Other */
                                    if (!isNull(swdAssessments[i].hours)) { totalOther = totalOther + double.Parse(swdAssessments[i].hours); }
                                    break;
                            }
                        }

                        htmlBody = htmlBody + "<b>" + (totalAccessUSANHours + totalScriptHours + totalUatImp + totalUatSupport + totalProductionImp + totalOther) + " Total Hours</b><br/>" +
                                                      totalAccessUSANHours + " AccessUSAN Setup<br/>" +
                            //totalScriptHours + " Scripts<br/>" +
                                                      totalUatImp + " UAT Implementation<br/>" +
                                                      totalUatSupport + " UAT Support<br/>" +
                                                      totalProductionImp + " Production Implementation<br/>" +
                                                      totalOther + " Other<br/>";
                        htmlBody = htmlBody + "\n                </td>\n" +
                        "            </tr>\n" +


                        //TLS-SaaS Hours
                        "            <tr>\n" +
                        "                <td style=\"color: #0000CC\">\n" +
                        "                    <b>" + "TLS-SaaS Hours" + ":</b></td>\n" +
                        "                <td style=\"color: #FF0000\">\n";


                        double totalTestingHours = 0;
                        double totalCodingHours = 0;
                        double totalOSG = 0;  //smm
                        double totalOSGScripts = 0; //ah
                        double totalOSGOther = 0; //ah
                        double totalNetworkOPS = 0; //smm
                        totalUatImp = 0;
                        totalUatSupport = 0;
                        totalProductionImp = 0;
                        totalOther = 0;

                        for (int i = 0; i < swdAssessments.Count; i++)
                        {
                            switch (swdAssessments[i].AssessmentType.assessment_type_id)
                            {
                                case 16:   /* Coding TLS_SaaS */
                                    if (!isNull(swdAssessments[i].hours)) { totalCodingHours = totalCodingHours + double.Parse(swdAssessments[i].hours); }
                                    break;

                                case 17:   /* Testing TLS_SaaS */
                                    if (!isNull(swdAssessments[i].hours)) { totalTestingHours = totalTestingHours + double.Parse(swdAssessments[i].hours); }
                                    break;

                                case 18:   /* Uat Implementation TLS_SaaS */
                                    if (!isNull(swdAssessments[i].hours)) { totalUatImp = totalUatImp + double.Parse(swdAssessments[i].hours); }
                                    break;

                                case 19:   /* Uat Support TLS_SaaS */
                                    if (!isNull(swdAssessments[i].hours)) { totalUatSupport = totalUatSupport + double.Parse(swdAssessments[i].hours); }
                                    break;

                                case 20:   /* Production Implementation TLS_SaaS */
                                    if (!isNull(swdAssessments[i].hours)) { totalProductionImp = totalProductionImp + double.Parse(swdAssessments[i].hours); }
                                    break;

                                case 21:   /* Other TLS_SaaS */
                                    if (!isNull(swdAssessments[i].hours)) { totalOther = totalOther + double.Parse(swdAssessments[i].hours); }
                                    break;

                                //smm (for OSG)
                                case 28:   /* Non-SWD QA */
                                    if (!isNull(swdAssessments[i].hours))
                                    {
                                        totalOSG = totalOSG + double.Parse(swdAssessments[i].hours);
                                        totalOSGOther += double.Parse(swdAssessments[i].hours);
                                    }
                                    break;

                                //smm (for Network OPS)
                                case 29:   /* Network OPS */
                                    if (!isNull(swdAssessments[i].hours)) { totalNetworkOPS = totalNetworkOPS + double.Parse(swdAssessments[i].hours); }
                                    break;

                                //ah (for OSG scripts)
                                case 30:   /* OSG Scripts */
                                    if (!isNull(swdAssessments[i].hours))
                                    {
                                        totalOSG = totalOSG + double.Parse(swdAssessments[i].hours);
                                        totalOSGScripts += double.Parse(swdAssessments[i].hours);
                                    }
                                    break;
                            }
                        }

                        htmlBody = htmlBody + "<b>" + (totalCodingHours + totalTestingHours + totalUatImp + totalUatSupport + totalProductionImp + totalOther) + " Total Hours</b><br/>" +
                                                      totalCodingHours + " Coding<br/>" +
                                                      totalTestingHours + " Testing<br/>" +
                                                      totalUatImp + " UAT Implementation<br/>" +
                                                      totalUatSupport + " UAT Support<br/>" +
                                                      totalProductionImp + " Production Implementation<br/>" +
                                                      totalOther + " Other<br/>";
                        htmlBody = htmlBody + "\n                </td>\n" +
                        "            </tr>\n" +


                        //OSG Hours
                        "            <tr>\n" +
                        "                <td style=\"color: #0000CC\">\n" +
                        "                    <b>" + "OSG Hours" + ":</b></td>\n" +
                        "                <td style=\"color: #FF0000\">\n" +
                        " <b>" + totalOSG + " Total Hours</b>" +
                        " <br/>" + totalOSGScripts + " Scripts" +
                        " <br/>" + totalOSGOther + " Other";


                        htmlBody = htmlBody + "\n                </td>\n" +
                        "            </tr>\n" +


                        //Systems Engineering Hours and Hardware Charges
                        "            <tr>\n" +
                        "                <td style=\"color: #0000CC\">\n" +
                        "                    <b>" + "Systems Engineering Hours" + ":</b><br/><br/><b>Hardware/Software Charges</b></td>\n" +
                        "                <td style=\"color: #FF0000\">\n";

                        double totalSystemsHours = 0.00;
                        double hardwareChargesOneTime = 0.00;
                        double hardwareChargesMonthlyRecurring = 0.00;
                        double hardwareChargesAnnualRecurring = 0.00;
                        double hardwareChargesMonthlyRental = 0.00;

                        List<SystemsAssessment> sysAssessments = project.SystemsAssessments.ToList<SystemsAssessment>();
                        for (int i = 0; i < sysAssessments.Count; i++)
                        {
                            if (!isNull(sysAssessments[i].billed_hours))
                            {
                                totalSystemsHours = totalSystemsHours + double.Parse(sysAssessments[i].billed_hours);
                            }
                        }

                        htmlBody = htmlBody + "<b>" + totalSystemsHours + " Total Hours</b><br/><br/>";

                        List<HardwareRequirement> hardwareReqs = project.HardwareRequirements.ToList<HardwareRequirement>();
                        foreach (HardwareRequirement currentReq in hardwareReqs)
                        {
                            switch (currentReq.requirement_type)
                            {
                                case "One Time Charges":
                                    {
                                        if (currentReq.total_item_cost.Length > 1)
                                        {
                                            if (currentReq.total_item_cost.Substring(0, 1) == "$")
                                            {
                                                hardwareChargesOneTime += double.Parse(currentReq.total_item_cost.Substring(1));
                                            }
                                        }
                                        break;
                                    }
                                case "Monthly Recurring Charges":
                                    {
                                        if (currentReq.total_item_cost.Length > 1)
                                        {
                                            if (currentReq.total_item_cost.Substring(0, 1) == "$")
                                            {
                                                hardwareChargesMonthlyRecurring += double.Parse(currentReq.total_item_cost.Substring(1));
                                            }
                                        }
                                        break;
                                    }
                                case "Annual Recurring Charges":
                                    {
                                        if (currentReq.total_item_cost.Length > 1)
                                        {
                                            if (currentReq.total_item_cost.Substring(0, 1) == "$")
                                            {
                                                hardwareChargesAnnualRecurring += double.Parse(currentReq.total_item_cost.Substring(1));
                                            }

                                        }
                                        break;
                                    }
                                case "Monthly Rental Charges":
                                    {
                                        if (currentReq.total_item_cost.Length > 1)
                                        {
                                            if (currentReq.total_item_cost.Substring(0, 1) == "$")
                                            {
                                                hardwareChargesMonthlyRental += double.Parse(currentReq.total_item_cost.Substring(1));
                                            }
                                        }
                                        break;
                                    }
                                default:
                                    break;
                            }
                        }
                        List<HardwareRequirement> hardwareReqsOneTime = project.HardwareRequirements.Where(a => a.requirement_type == "One Time Charges").ToList<HardwareRequirement>();
                        List<HardwareRequirement> hardwareReqsMonthlyRecurring = project.HardwareRequirements.Where(a => a.requirement_type == "Monthly Recurring Charges").ToList<HardwareRequirement>();
                        List<HardwareRequirement> hardwareReqsAnnualRecurring = project.HardwareRequirements.Where(a => a.requirement_type == "Annual Recurring Charges").ToList<HardwareRequirement>();
                        List<HardwareRequirement> hardwareReqsMonthlyRental = project.HardwareRequirements.Where(a => a.requirement_type == "Monthly Rental Charges").ToList<HardwareRequirement>();

                        htmlBody += "<b>" + String.Format("{0:C}", hardwareChargesOneTime) + " Total One Time Charges</b><br/>";
                        foreach (HardwareRequirement currentReq in hardwareReqsOneTime)
                        {
                            if (currentReq.total_item_cost.Length > 1)
                            {
                                if (currentReq.total_item_cost.Substring(0, 1) == "$")
                                {
                                    htmlBody += "&nbsp&nbsp" + String.Format("{0:C}", double.Parse(currentReq.total_item_cost.Substring(1))) + " - " + currentReq.description + "<br/>";
                                }

                            }
                        }

                        htmlBody += "<b>" + String.Format("{0:C}", hardwareChargesMonthlyRecurring) + " Total Monthly Recurring Charges</b><br/>";
                        foreach (HardwareRequirement currentReq in hardwareReqsMonthlyRecurring)
                        {
                            if (currentReq.total_item_cost.Length > 1)
                            {
                                if (currentReq.total_item_cost.Substring(0, 1) == "$")
                                {
                                    htmlBody += "&nbsp&nbsp" + String.Format("{0:C}", double.Parse(currentReq.total_item_cost.Substring(1))) + " - " + currentReq.description + "<br/>";
                                }

                            }
                        }

                        htmlBody += "<b>" + String.Format("{0:C}", hardwareChargesAnnualRecurring) + " Total Annual Recurring Charges</b><br/>";
                        foreach (HardwareRequirement currentReq in hardwareReqsAnnualRecurring)
                        {
                            if (currentReq.total_item_cost.Length > 1)
                            {
                                if (currentReq.total_item_cost.Substring(0, 1) == "$")
                                {
                                    htmlBody += "&nbsp&nbsp" + String.Format("{0:C}", double.Parse(currentReq.total_item_cost.Substring(1))) + " - " + currentReq.description + "<br/>";
                                }

                            }
                        }

                        htmlBody += "<b>" + String.Format("{0:C}", hardwareChargesMonthlyRental) + " Total Monthly Rental Charges</b><br/>";
                        foreach (HardwareRequirement currentReq in hardwareReqsMonthlyRental)
                        {
                            if (currentReq.total_item_cost.Length > 1)
                            {
                                if (currentReq.total_item_cost.Substring(0, 1) == "$")
                                {
                                    htmlBody += "&nbsp&nbsp" + String.Format("{0:C}", double.Parse(currentReq.total_item_cost.Substring(1))) + " - " + currentReq.description + "<br/>";
                                }

                            }
                        }

                        htmlBody = htmlBody + "<br/>\n                </td>\n" +
                        "            </tr>\n" +


                        //OSG Hours
                        "            <tr>\n" +
                        "                <td style=\"color: #0000CC\">\n" +
                        "                    <b>" + "Network Operations Hours" + ":</b></td>\n" +
                        "                <td style=\"color: #FF0000\">\n" +
                        " <b>" + totalNetworkOPS + " Total Hours</b>";
                        htmlBody = htmlBody + "\n                </td>\n" +
                        "            </tr>\n";


                        //VUI/Visio Design Start
                        htmlBody = htmlBody + "            <tr>\n" +
                        "                <td style=\"color: #0000CC\">\n" +
                        "                    <b>" + "VUI/Visio Design Start" + ":</b></td>\n" +
                        "                <td style=\"color: #FF0000\">\n" +
                        "                    <b>" + schedule.scheduled_ba_start + "</b>";
                        htmlBody = htmlBody + "\n                </td>\n" +
                        "            </tr>\n" +

                        //VUI/Visio Design End
                        "            <tr>\n" +
                        "                <td style=\"color: #0000CC\">\n" +
                        "                    <b>" + "VUI/Visio Design End" + ":</b></td>\n" +
                        "                <td style=\"color: #FF0000\">\n" +
                        "                    <b>" + schedule.scheduled_ba_complete + "</b>";
                        htmlBody = htmlBody + "\n                </td>\n" +
                        "            </tr>\n" +

                        //VUI/Visio To [project.company]
                        "            <tr>\n" +
                        "                <td style=\"color: #0000CC\">\n" +
                        "                    <b>" + "VUI/Visio to " + project.company + ":</b></td>\n" +
                        "                <td style=\"color: #FF0000\">\n" +
                        "                    <b>" + schedule.scheduled_docs_to_customer + "</b>";
                        htmlBody = htmlBody + "\n                </td>\n" +
                        "            </tr>\n" +

                        //VUI/Visio Approval by [project.company]
                        "            <tr>\n" +
                        "                <td style=\"color: #0000CC\">\n" +
                        "                    <b>" + "VUI/Visio Approval by " + project.company + ":</b></td>\n" +
                        "                <td style=\"color: #FF0000\">\n" +
                        "                    <b>" + schedule.scheduled_docs_approval + "</b>";
                        htmlBody = htmlBody + "\n                </td>\n" +
                        "            </tr>\n" +

                        //Dev Start On or After
                        "            <tr>\n" +
                        "                <td style=\"color: #0000CC\" style=\"color: #0000CC\">\n" +
                        "                    <b>" + "Dev Start On or After" + ":</b></td>\n" +
                        "                <td style=\"color: #FF0000\">\n" +
                        "                    <b>" + scheduled_dev_start + "</b>";
                        htmlBody = htmlBody + "\n                </td>\n" +
                        "            </tr>\n" +

                        //Dev Complete Date
                        "            <tr>\n" +
                        "                <td style=\"color: #0000CC\">\n" +
                        "                    <b>" + "Dev Complete Date" + ":</b></td>\n" +
                        "                <td style=\"color: #FF0000\">\n" +
                        "                    <b>" + scheduled_dev_complete + "</b>";
                        htmlBody = htmlBody + "\n                </td>\n" +
                        "            </tr>\n" +

                        //Quoted Delivery Date
                        "            <tr>\n" +
                        "                <td style=\"color: #0000CC\">\n" +
                        "                    <b>" + "Quoted Delivery Date" + ":</b></td>\n" +
                        "                <td style=\"color: #FF0000\">\n" +
                        "                    <b>" + schedule.scheduled_uat_delivery + "</b>";
                        htmlBody = htmlBody + "\n                </td>\n" +
                        "            </tr>\n";


                        DateTime date = DateTime.Now;
                        string locationToSave = project.project_folder;
                        string timeStamp = "" + date.Year + date.Month + date.Day + "_" + date.Hour + date.Minute + date.Second;
                        string reportFileName = project.project_number + " IFQ" + timeStamp + ".html";
                        if (!(locationToSave.EndsWith("\\") || locationToSave.EndsWith("/")))
                        {
                            locationToSave = locationToSave + "\\";
                        }

                        string filePath = locationToSave + reportFileName;
                        FileStream fStream = new FileStream(
                            filePath,
                            FileMode.Create,
                            FileAccess.Write,
                            FileShare.Read);
                        StreamWriter sw = new StreamWriter(fStream);
                        sw.Write(htmlHeader + htmlBody + htmlEnd);
                        sw.Close();     // Close the Stream
                        fStream.Close();     // Close the File


                        return new PagedData("IFQ created");

                    }
                    catch (Exception e)
                    {
                        return new PagedData(e.ToString());
                    }

                }
            }

            return new PagedData("CreateIFQ.ashx expects a project_id");
        }
    }
}