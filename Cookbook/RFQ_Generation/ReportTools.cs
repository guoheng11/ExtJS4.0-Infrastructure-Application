using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Text.RegularExpressions;

namespace Cookbook
{

    class ReportTools
    {

        public ReportTools()
        {
        }

        /**
         * Arguments:
         *      - ProjectInformation object
         *      - locationToSave string. For example: 'C:\\' or "\\nor2k3ops1\e_drive\Project Management\Projects\CitiGroup\SEARS\CTG-3000s\CTG-3171 Project Nuance Phase I - NLU". Filename will be appended
         */
        public string saveReport(ProjectInformation pi, string locationToSave)
        {

            /* Generating Report String */
            ReportGenerator generator = new ReportGenerator();
            string reportString = "";
            reportString = reportString + generator.generateStart();
            reportString = reportString + generator.generateProjectId(pi.CTGNumber, pi.ProjectName);
            reportString = reportString + generator.generatePMAssigned(pi.PMName);
            reportString = reportString + generator.generateProjectDescription(pi.Description);
            reportString = reportString + generator.generateRecordingSection(pi.getLanguagePrompts(), pi.getNotes("Prompts"));
            reportString = reportString + generator.generateAssumptions(pi.getAssumptions(false), false, pi.getNotes("Assumptions (Project Specific)"));
            reportString = reportString + generator.generateAssumptions(pi.getAssumptions(true), true, pi.getNotes("Assumptions (Standard)"));
            reportString = reportString + generator.generateDeliverables(pi.getDeliverables(), pi.getNotes("Customer Deliverables"));
            reportString = reportString + generator.generateHoursX("Dev Billable", pi.getDEVHours_billable(), pi.getNotes("DEV Hours (billable)"));
            reportString = reportString + generator.generateHoursX("Dev Unbillable", pi.getDEVHours_unbillable(), pi.getNotes("DEV Hours (unbillable)"));
            reportString = reportString + generator.generateHoursX("PM Hours", pi.getPMHours(), pi.getNotes("PM Hours"));
            reportString = reportString + generator.generateHoursX("TC Billable", pi.getTCHours_billable(), pi.getNotes("TC Hours (billable)"));
            reportString = reportString + generator.generateHoursX("TC Unbillable", pi.getTCHours_unbillable(), pi.getNotes("TC Hours (unbillable)"));
            reportString = reportString + generator.generateHoursX("TLS", pi.getTLSHours_billable(), pi.getNotes("TLS Hours"));
            //reportString = reportString + generator.generateHoursX("TLS Unbillable", pi.getTLSHours_unbillable(), pi.getNotes("TLS Hours (unbillable)"));
            reportString = reportString + generator.generateHoursX("QA Hours", pi.getQAHours(), pi.getNotes("QA Hours"));
            reportString = reportString + generator.generateHoursX("SYS Billable", pi.getSYSHours_billable(), pi.getNotes("SYS Hours (billable)"));
            reportString = reportString + generator.generateHoursX("SYS Unbillable", pi.getSYSHours_unbillable(), pi.getNotes("SYS Hours (unbillable)"));
            reportString = reportString + generator.generateHardware(pi.getHardware(), pi.getNotes("Hardware"));
            reportString = reportString + generator.generateDevStartDate(pi.getDevStarts(), pi.getNotes("Dev Start Date"));
            reportString = reportString + generator.generateDevCompleteDate(pi.getDevCompletes(), pi.getNotes("Dev Complete Date"));
            reportString = reportString + generator.generateQuotedDeliveryDate(pi.getQuotedDeliveryDates(), pi.getNotes("Quoted Delivery"));
            reportString = reportString + generator.generateEnd();


            /*  Saving Report */
            DateTime date = DateTime.Now;
            string timeStamp = "" + date.Year + date.Month + date.Day + "_" + date.Hour + date.Minute + date.Second;
            string reportFileName = pi.CTGNumber + " IFQ" + timeStamp + ".html";
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
            sw.Write(reportString);
            sw.Close();     // Close the Stream
            fStream.Close();     // Close the File
            return reportFileName;
        }

        // diffLocation - desired output location. Filename will NOT be appended
        public void diffReports(string firstReportLocation, string secondReportLocation, string diffLocation)
        {
            // create reader & open file
            TextReader tr1 = new StreamReader(firstReportLocation);
            TextReader tr2 = new StreamReader(secondReportLocation);

            // read a files
            string file1 = tr1.ReadToEnd();
            string file2 = tr2.ReadToEnd();
            string[] file1Lines = Regex.Split(file1, "\r|\n|(\r\n)");
            string[] file2Lines = Regex.Split(file2, "\r|\n|(\r\n)");

            // close the stream
            tr1.Close();
            tr2.Close();

            // get diffs
            //string reportString = "";
            Diff diffUtil = new Diff();
            Diff.Item[] diffs = diffUtil.DiffText(file1, file2);

            // initialize the list that we will use to insert new lines and build diff IFQ
            List<string> mergeList = new List<string>();
            int pos = 0;
            for (int n = 0; n < diffs.Length; n++)
            {
                Diff.Item it = diffs[n];

                // write unchanged lines
                while ((pos < it.StartB) && (pos < file2Lines.Length))
                {
                    mergeList.Add(file2Lines[pos]);
                    pos++;
                } // while
                if (it.deletedA != it.insertedB)
                {
                    // write deleted chars
                    if (it.deletedA > 0)
                    {
                        mergeList.Add("<div style='color: #ff0000; text-decoration: line-through';>");
                        for (int m = 0; m < it.deletedA; m++)
                        {
                            mergeList.Add(file1Lines[it.StartA + m]);
                        } // for
                        mergeList.Add("</div>");
                    }
                }

                // write inserted chars
                if (pos < it.StartB + it.insertedB)
                {
                    mergeList.Add("<div style='color: #008E00'>");
                    while (pos < it.StartB + it.insertedB)
                    {
                        mergeList.Add(file2Lines[pos]);
                        pos++;
                    } // while
                    mergeList.Add("</div>");
                } // if
            } // while

            // write rest of unchanged chars
            while (pos < file2Lines.Length)
            {
                mergeList.Add(file2Lines[pos]);
                pos++;
            }

            /*  Saving Output */
            FileStream fStream = new FileStream(
                diffLocation,
                FileMode.Create,
                FileAccess.Write,
                FileShare.Read);
            StreamWriter sw = new StreamWriter(fStream);
            string[] reportStrings = mergeList.ToArray();
            sw.Write(string.Join("\n", reportStrings));
            sw.Close();     // Close the Stream
            fStream.Close();     // Close the File
        }
            
    }

}
