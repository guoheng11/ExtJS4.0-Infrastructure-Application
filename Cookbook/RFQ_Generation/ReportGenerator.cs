using System;
using System.Collections.Generic;
using System.Text;
using System.Collections;
namespace Cookbook
{
    public class ReportGenerator
    {
        public ReportGenerator()
        {
        }
        /*
         * Purpose: Generates a row for the main report table
         * Args: Row name, Row Value
         */
        private string generateSimpleField(string fieldName, string fieldValue)
        {
            return
    "            <tr>\n" +
    "                <td>\n" +
    "                    <b>" + fieldName + ":</b></td>\n" +
    "                <td>\n" +
    "                    " + fieldValue +
    "\n                </td>\n" +
    "            </tr>\n";
        }

        /*
         * Purpose: Generates a row for the main report table. Supports coloring the name and the value
         * Args: Row name, Row Value, HEX color of the name, HEX color of the value. Use "DEFAULT" as a HEX color to disable special coloring
         */
        private string generateColorField(string fieldName, string fieldValue, string colorName, string colorField)
        {
            string fieldString =
    "            <tr>\n";
            if (colorName.Equals("DEFAULT"))
            {
                fieldString = fieldString +
    "                <td>\n";
            }
            else
            {
                fieldString = fieldString +
    "                <td style=\"color: #" + colorName + "\">\n";
            }
            fieldString = fieldString +
    "                    <b>" + fieldName + ":</b></td>\n";

            if (colorField.Equals("DEFAULT"))
            {
                fieldString = fieldString +
    "                <td>\n";
            }
            else
            {
                fieldString = fieldString +
    "                <td style=\"color: #" + colorField + "\">\n";
            }
            fieldString = fieldString +
    "                    " + fieldValue +
    "\n                </td>\n" +
    "            </tr>\n";
            return fieldString;
        }

        /*
         * Purpose: Generates an hours row for the main report table
         * Args: Row name, String to use in Total, dictionary of hours and descriptions
         */
        private string generateHours(string totalName, Dictionary<string, double> hours, bool boldTotals)
        {
            string hourString = "";
            List<string> list = new List<string>(hours.Keys);
            double total = 0;
            foreach (string k in list)
            {
                double hourValue = hours[k];
                total = total + hourValue;
                hourString = hourString +
    "\n                    " + hourValue.ToString("F") + " " + k +
    "\n                    <br>";
            }
            if (total != 0)
            {
                hourString = hourString + "\n                    <br>\n";
            }
            if (total != 0)
            {
                hourString = hourString +
    "                    <b>" + total.ToString("F") + " " + totalName + "</b>";
            }
            else
            {
                hourString = hourString +
    "                    " + total.ToString("F") + " " + totalName;
            }
            hourString = hourString + "\n";
            return hourString;
        }

        /*
         * Purpose: Generates an hours row for the main report table
         * Args: List of hardware unit entries
         */
        private string generateHWTable(List<HardwareUnitEntry> hardware)
        {
            string hourString = "";
            double total = 0;
            foreach (HardwareUnitEntry k in hardware)
            {
                int quantity = k.Quantity;
                double cost = k.Cost;
                total = total + k.getTotalPrice();
                hourString = hourString +
    "\n                    " + k.getTotalPrice().ToString("C") + " " + k.Description + " (" + k.Cost.ToString("C") + " x " + k.Quantity + ")" +
    "\n                    <br>";
            }
            if (total != 0)
            {
                hourString = hourString + "\n                    <br>\n";
            }
            if (total != 0)
            {
                hourString = hourString +
    "                    <b>" + total.ToString("C") + " Total Hardware</b>";
            }
            else
            {
                hourString = hourString +
    "                    " + total.ToString("F") + " " + " Total Hardware";
            }
            hourString = hourString + "\n";
            return hourString;
        }

        /*
         * Purpose: Generates a row for an inner table
         * Args: Row name, Row Value
         */
        private string generateInnerSimpleField(string fieldName, string fieldValue)
        {
            string returnString =
    "                        <tr>\n" +
    "                            <td style=\"width: 130px;\">\n" +
    "                                " + fieldName;
            if (fieldValue != default(string))
            {
                if (fieldValue.Length > 0)
                {
                    returnString = returnString + ":";
                }
            }
            returnString = returnString + "</td>\n" +
    "                            <td>\n" +
    "                                " + fieldValue + "</td>\n" +
    "                        </tr>\n";
            return returnString;
        }

        private string optionModule(string fieldName, List<string> optionResults)
        {
            return optionModule(fieldName, optionResults, default(List<string>), "");
        }

        private string optionModule(string fieldName, List<string> optionResults, List<string> notes)
        {
            return optionModule(fieldName, optionResults, notes, "");
        }

        private string optionModule(string fieldName, List<string> optionResults, List<string> notes, string commonStuff)
        {
            bool sameResults = true;
            int counter = 0;
            string previousResult = "";
            string constructedOptionResult = commonStuff;
            string notesString = "<div style='color:red'>";
            if (notes != default(List<string>))
            {
                foreach (string note in notes)
                {
                    notesString = notesString + note + "<br><br>\n";
                }
            }
            notesString = notesString + "</div>\n";
            foreach (string optionResult in optionResults)
            {
                if (counter > 0 && (!optionResult.Equals(previousResult)))
                {
                    sameResults = false;
                }
                counter++;
                previousResult = optionResult;
                if (optionResult != "")
                {
                    if (counter > 1)
                    {
                        constructedOptionResult = constructedOptionResult + "<br>";
                    }
                    constructedOptionResult = constructedOptionResult +
        "                    <b>Option " + counter + "</b><br>\n" + surroundWithComments(optionResult) + "                    <br>\n";
                }
            }
            if (sameResults)
            {
                return generateSimpleField(fieldName, notesString + surroundWithComments(commonStuff) + "<br>" + surroundWithComments(previousResult));
            }
            else
            {
                return generateSimpleField(fieldName, notesString + constructedOptionResult);
            }
        }

        private string surroundWithComments(string orig)
        {
            return "\n<!-- GenField -->\n" + orig + "\n<!-- GenField -->\n";
        }

        public string getNoteString(List<string> notes)
        {
            string notesString = "<div style='color:red'>\n";
            if (notes != default(List<string>))
            {
                foreach (string note in notes)
                {
                    notesString = notesString + note + "<br><br>\n";
                }
            }
            notesString = notesString + "\n</div>\n";
            return notesString;
        }

        public string putInColorDiv(string strToPut, string color)
        {
            return "<div style='color:#" + color + "'>\n" + strToPut + "\n</div>\n";
        }

        public string getDeliverableString(List<string> deliverables)
        {
            string deliverablesString = "<UL>\n";
            if (deliverables != default(List<string>))
            {
                foreach (string deliv in deliverables)
                {
                    deliverablesString = deliverablesString + "   <li>" + deliv + "\n";
                }
                deliverablesString = deliverablesString + "</UL>\n";
            }
            else
            {
                deliverablesString = "N/A";
            }

            return deliverablesString;
        }

        public string generateStart()
        {
            return
    "<!DOCTYPE html PUBLIC \" -//W3C//DTD HTML 4.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">\n" +
    "<html>\n" +
    "<head>\n" +
    "    <meta http-equiv=\"content-type\" content=\"text/html; charset=ISO-8859-1\">\n" +
    "    <style type=\"text/css\">\n" +
    ".hours {\n" +
    "   border:2px solid #000000;\n" +
    "   border-collapse:collapse;\n" +
    "}\n" +
    "</style>\n" +
    "    <title>Information for Quote (RFQ)</title>\n" +
    "</head>\n" +
    "<body>\n" +
    "    <h4 style=\"padding-left: 200px\">\n" +
    "        Information for Quote (RFQ)</h4>\n" +
    "    <table class=\"hours\" border=\"2\" width=\"660\" cellpadding=\"2\">\n" +
    "        <tbody style=\"font-size: 80%; vertical-align: top\">\n";
        }

        public string generateEnd()
        {
            return
    "        </tbody>\n" +
    "    </table>\n" +
    "</body>\n" +
    "</html>";
        }

        public string generateProjectId(string ctgNumber, string projectName)
        {
            return
    "            <tr>\n" +
    "                <td style=\"width: 200px;\" valign=\"top\">\n" +
    "                    <b>Project ID:</b></td>\n" +
    "                <td>\n" +
    "                    " + ctgNumber + " " + projectName + "</td>\n" +
    "            </tr>\n";
        }

        public string generatePMAssigned(string pmName)
        {
            return generateSimpleField("PM Assigned", pmName);
        }

        public string generateProjectDescription(string projectDescription)
        {
            return generateSimpleField("Project Description", projectDescription);
        }

        public string generateAssumptions(List<List<string>> assumptions, bool standard, List<string> notes)
        {
            // first lets extract common assumptions
            List<string> commonAssumptions = new List<string>();
            if (assumptions.Count > 1)
            {
                // add all from option 1
                foreach (string sumption in assumptions[0])
                {
                    commonAssumptions.Add(sumption);
                }
                // now remove any common assumptions that arent found in other options
                List<string> listToRemove = new List<string>();
                foreach (List<string> assumption in assumptions)
                {
                    foreach (string comSump in commonAssumptions)
                    {
                        if (!assumption.Contains(comSump))
                        {
                            listToRemove.Add(comSump);
                        }
                    }
                }
                foreach (string toRemove in listToRemove)
                {
                    commonAssumptions.Remove(toRemove);
                }
                // now remove common assumptions from other lists
                if (commonAssumptions.Count > 0)
                {
                    foreach (List<string> assumption in assumptions)
                    {
                        foreach (string comSump in commonAssumptions)
                        {
                            assumption.Remove(comSump);
                        }
                    }
                }
            }
            // common assumption string
            string commonAssumptionString = "";
            if (commonAssumptions.Count > 0)
            {
                commonAssumptionString = "<b>Common Assumptions:</b>";
                for (int x = 0; x < commonAssumptions.Count; x++)
                {
                    commonAssumptionString = commonAssumptionString + "\n                    <br>\n" + "                        ";
                    commonAssumptionString = commonAssumptionString + commonAssumptions[x] + "\n" + "                    <br>";
                }
                if (standard)
                {
                    commonAssumptionString = surroundWithComments(commonAssumptionString);
                }
                else
                {
                    commonAssumptionString = surroundWithComments(putInColorDiv(commonAssumptionString, "FF0000"));
                }
            }
            List<string> optionResults = new List<string>();
            foreach (List<string> assumption in assumptions)
            {
                string assumptionsString = "";
                if (assumption.Count > 0)
                {
                    for (int x = 0; x < assumption.Count; x++)
                    {
                        if (x > 0)
                        {
                            assumptionsString = assumptionsString +
                "\n                    <br>\n" + "                        ";
                        }
                        else
                        {
                            assumptionsString = assumptionsString + "                        ";
                        }
                        assumptionsString = assumptionsString +
                assumption[x] + "\n" +
                "                    <br>";
                    }
                    if (standard)
                    {
                        optionResults.Add(surroundWithComments(assumptionsString));
                    }
                    else
                    {
                        optionResults.Add(surroundWithComments(putInColorDiv(assumptionsString, "FF0000")));
                    }
                }
                else
                {
                    optionResults.Add("");
                }
            }

            if (standard)
            {
                return optionModule("Standard Assumptions", optionResults, notes, commonAssumptionString);
            }
            else
            {
                return optionModule("Project Specific Assumptions", optionResults, notes, commonAssumptionString);
            }
        }

        public string generateDeliverables(List<List<string>> deliverables, List<string> notes)
        {
            List<string> optionResults = new List<string>();
            foreach (List<string> deliverable in deliverables)
            {
                string result = getDeliverableString(deliverable);
                optionResults.Add(result);
            }
            return optionModule("Customer Deliverables", optionResults, notes);
        }

        public string generateHoursX(string hourString, List<Dictionary<string, double>> hours, List<string> notes)
        {
            List<string> optionResults = new List<string>();
            foreach (Dictionary<string, double> hour in hours)
            {
                string result = "N/A";
                if (hour.Count > 0)
                {
                    result = generateHours("Total " + hourString, hour, false);
                }
                optionResults.Add(result);
            }
            return optionModule(hourString + " ", optionResults, notes);
        }

        public string generateHoursX(string hourString, List<double> hours, List<string> notes)
        {
            List<string> optionResults = new List<string>();
            foreach (double hour in hours)
            {
                string result = "N/A";
                if (hour > 0)
                {
                    result = hour.ToString("F") + " Total " + hourString;
                }
                optionResults.Add(result);
            }
            return optionModule(hourString, optionResults, notes);
        }
        /*
        public string generateSysHours(List<Dictionary<string, double>> hours, List<string> notes)
        {
            List<string> optionResults = new List<string>();
            foreach (Dictionary<string, double> hour in hours)
            {
                string result = generateHours("Total SYS Hours", hour, false);
                optionResults.Add(result);
            }
            return optionModule("SYS Hours ", optionResults, notes);
        }

        public string generateQaHours(List<Dictionary<string, double>> hours, List<string> notes)
        {
            List<string> optionResults = new List<string>();
            foreach (Dictionary<string, double> hour in hours)
            {
                string result = generateHours("Total QA Hours", hour, false);
                optionResults.Add(result);
            }
            return optionModule("QA Hours ", optionResults, notes);
        }

        public string generateTCBANonBillable(List<double> hours)
        {
            List<string> optionResults = new List<string>();
            foreach (double hour in hours)
            {
                string result = hour.ToString("F") + " Total TC / BA Non-Billable";
                optionResults.Add(result);
            }
            return optionModule("TC / BA Hours Non-Billable", optionResults);
        }

        public string generateTCBABillable(List<double> hours)
        {
            List<string> optionResults = new List<string>();
            foreach (double hour in hours)
            {
                string result = hour.ToString("F") + " Total TC / BA Billable";
                optionResults.Add(result);
            }
            return optionModule("TC / BA Hours Billable", optionResults);
        }

        public string generateDevHoursNonBillable(List<Dictionary<string, double>> hours)
        {
            List<string> optionResults = new List<string>();
            foreach(Dictionary<string, double> hour in hours) {
                string result = generateHours("Total Dev Non-Billable", hour, false);
                optionResults.Add(result);
            }
            return optionModule("Dev. Hours Non-Billable", optionResults);
        }

        public string generateDevHoursBillable(List<Dictionary<string, double>> hours)
        {
            List<string> optionResults = new List<string>();
            foreach (Dictionary<string, double> hour in hours)
            {
                string result = generateHours("Total Dev Billable", hour, true);
                optionResults.Add(result);
            }
            return optionModule("Dev. Hours Billable", optionResults);
        }

        public string generateTLSHours(List<Dictionary<string, double>> hours)
        {
            List<string> optionResults = new List<string>();
            foreach (Dictionary<string, double> hour in hours)
            {
                string result = generateHours("Total TLS", hour, true);
                optionResults.Add(result);
            }
            return optionModule("TLS Hours", optionResults);
        }

        public string generateNetworkEngBillable(List<Dictionary<string, double>> hours)
        {
            List<string> optionResults = new List<string>();
            foreach(Dictionary<string, double> hour in hours) {
                string result = generateHours("Total Network Engineering (Billable)", hour, true);
                optionResults.Add(result);
            }
            return optionModule("Network Eng Billable", optionResults);
        }

        public string generateNetworkEngNonBillable(List<Dictionary<string, double>> hours)
        {
            List<string> optionResults = new List<string>();
            foreach (Dictionary<string, double> hour in hours)
            {
                string result = generateHours("Total Network Engineering (Non-Billable)", hour, true);
                optionResults.Add(result);
            }
            return optionModule("Network Eng Non Billable", optionResults);
        }
    
        public string generatePMHours(List<double> hours)
        {
            List<string> optionResults = new List<string>();
            foreach (double hour in hours)
            {
                string result = "<b>" + hour.ToString("F") + " Total PM</b>";
                optionResults.Add(result);
            }
            return optionModule("PM Hours", optionResults);
        }
        */
        public string generateHardware(List<List<HardwareUnitEntry>> hardware, List<string> notes)
        {
            List<string> optionResults = new List<string>();
            foreach (List<HardwareUnitEntry> hour in hardware)
            {
                string result = generateHWTable(hour);
                optionResults.Add(result);
            }
            return optionModule("Hardware", optionResults, notes);
        }



        public string generateDevStartDate(List<DateTime> dates, List<string> notes)
        {
            List<string> optionResults = new List<string>();
            foreach (DateTime date in dates)
            {
                if (date != default(DateTime))
                {
                    optionResults.Add(date.ToString("d"));
                }
                else
                {
                    optionResults.Add("N/A");
                }
            }
            return optionModule("Dev. Start On or After", optionResults, notes);
        }

        public string generateDevCompleteDate(List<DateTime> dates, List<string> notes)
        {
            List<string> optionResults = new List<string>();
            foreach (DateTime date in dates)
            {
                if (date != default(DateTime))
                {
                    optionResults.Add(date.ToString("d"));
                }
                else
                {
                    optionResults.Add("N/A");
                }
            }
            return optionModule("Dev. Complete Date", optionResults, notes);
        }

        public string generateQuotedDeliveryDate(List<string> dates, List<string> notes)
        {
            List<string> optionResults = new List<string>();
            foreach (string date in dates)
            {
                if (date != "")
                {
                    optionResults.Add(date);
                }
                else
                {
                    optionResults.Add("N/A");
                }
            }
            return optionModule("Quoted Delivery Date", optionResults, notes);
        }

        public string generateRecordingSection(List<List<PromptInformation>> prompts, List<string> notes)
        {
            List<string> optionResults = new List<string>();
            for (int count = 0; count < prompts.Count; count++)
            {
                optionResults.Add(generateOneRecordingSection(prompts[count]));
            }
            return optionModule("Recording / Digitization", optionResults, notes);
        }

        public string generateOneRecordingSection(List<PromptInformation> promptsForOption)
        {
            // start of table
            string promptsTable =
    "\n                    <table style=\"font-size: 90%\">\n";
            if (promptsForOption.Count < 1)
            {
                promptsTable = promptsTable +
                    generateInnerSimpleField("N/A", "");
            }
            else
            {
                // summary section
                promptsTable = promptsTable + generatePromptsSummarySection(promptsForOption);
                double totalFee = 0;
                for (int a = 0; a < promptsForOption.Count; a++)
                {
                    // specific language break downs
                    if (!promptsForOption[a].isNull())
                    {
                        totalFee = totalFee + promptsForOption[a].getTotalFee();
                        promptsTable = promptsTable + generateLanguageSection(promptsForOption[a].Language, promptsForOption[a]);
                    }
                }
                promptsTable = promptsTable + generateInnerSimpleField("<br>", "");
                promptsTable = promptsTable + generateInnerSimpleField("<b>TOTAL</b>", "<b>" + totalFee.ToString("C") + "</b>");
            }

            // end of table
            promptsTable = promptsTable +
    "                    </table>\n";
            return promptsTable;
            //return generateSimpleField("Recording / Digitization", promptsTable);
        }

        private string generateLanguageSection(string language, PromptInformation promptInfo)
        {
            string languageSection = "";
            languageSection = languageSection + generateInnerSimpleField("<br><b>" + language + "</b>", "");
            languageSection = languageSection + generateInnerSimpleField("Setup", promptInfo.SetupFee.ToString("C"));
            languageSection = languageSection + generateInnerSimpleField("Prompt Fee", promptInfo.PromptFee.ToString("C"));
            languageSection = languageSection + generateInnerSimpleField("Transfer", promptInfo.TransferFee.ToString("C"));
            languageSection = languageSection + generateInnerSimpleField("CD", promptInfo.CDFee.ToString("C"));
            if (promptInfo.TranslationFeeMinimum > 0)
            {
                languageSection = languageSection + generateInnerSimpleField("Translation", promptInfo.getTranslationString());
            }
            languageSection = languageSection + generateInnerSimpleField("Total " + language, "<b>" + promptInfo.getTotalFee().ToString("C") + "</b>");
            return languageSection;
        }

        private string generatePromptsSummarySection(List<PromptInformation> prompts)
        {
            string summarySection = "";
            int digiCount = 0;
            for (int a = 0; a < prompts.Count; a++)
            {
                digiCount = digiCount + prompts[a].getPromptsToBeDigitized();
            }
            summarySection = summarySection + generateInnerSimpleField("Digitization", digiCount.ToString());

            // records
            int totalRecord = 0;
            string recordString = " Prompts (";
            bool needSlash = false;

            for (int a = 0; a < prompts.Count; a++)
            {
                int promptsToRecord = prompts[a].PromptsToRecord;
                if (promptsToRecord > 0)
                {
                    if (needSlash)
                    {
                        recordString = recordString + " / ";
                    }
                    recordString = recordString + promptsToRecord.ToString() + " " + prompts[a].Language;
                    needSlash = true;
                    totalRecord = totalRecord + promptsToRecord;
                }
            }
            recordString = totalRecord.ToString() + recordString + ")";
            summarySection = summarySection + generateInnerSimpleField("Recording", recordString);

            // order type
            List<PromptInformation> nonNullPIs = new List<PromptInformation>();
            for (int a = 0; a < prompts.Count; a++)
            {
                if (!prompts[a].isNull())
                {
                    nonNullPIs.Add(prompts[a]);
                }
            }

            // lets find out if all order types are the same
            bool sameOrderTypes = true;
            string orderType = "";
            foreach (PromptInformation pi in nonNullPIs)
            {
                if (orderType == "")
                {
                    orderType = pi.OrderType;
                }
                else
                {
                    if (orderType != pi.OrderType)
                        sameOrderTypes = false;
                }
            }

            // if order types are the same - just print it, otherwise print separate order types for each language
            if (sameOrderTypes)
            {
                summarySection = summarySection + generateInnerSimpleField("Order Type", orderType);
            }
            else
            {
                string orderTypeString = "";
                bool needBr = false;
                for (int a = 0; a < prompts.Count; a++)
                {
                    if (prompts[a].OrderType != default(string))
                    {
                        if (prompts[a].OrderType.Length > 0)
                        {
                            if (needBr)
                            {
                                orderTypeString = orderTypeString + "<br>";
                            }
                            orderTypeString = orderTypeString + prompts[a].Language + " - " + prompts[a].OrderType;
                            needBr = true;
                        }
                    }
                }
                summarySection = summarySection + generateInnerSimpleField("Order Type", orderTypeString);
            }

            // studio
            // lets find out if all order studio are the same
            bool sameStudio = true;
            string studio = "";
            foreach (PromptInformation pi in nonNullPIs)
            {
                if (studio == "")
                {
                    studio = pi.RecordingStudio;
                }
                else
                {
                    if (studio != pi.RecordingStudio)
                        sameStudio = false;
                }
            }

            // if studio is the same - just print it, otherwise print separate order types for each language
            if (sameStudio)
            {
                summarySection = summarySection + generateInnerSimpleField("Studio", studio);
            }
            else
            {
                string studioString = "";
                bool needBr = false;
                for (int a = 0; a < prompts.Count; a++)
                {
                    if (prompts[a].RecordingStudio.Length > 0)
                    {
                        if (needBr)
                        {
                            studioString = studioString + "<br>";
                        }
                        studioString = studioString + prompts[a].Language + " - " + prompts[a].RecordingStudio;
                        needBr = true;
                    }
                }
                summarySection = summarySection + generateInnerSimpleField("Studio", studioString);
            }


            return summarySection;
        }
    }
}