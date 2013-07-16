using System;
using System.Collections.Generic;
using System.Text;

namespace Cookbook
{
    class OptionInformation
    {
        public List<PromptInformation> Prompts;
        public List<string> Deliverables;
        public Dictionary<string, double> DEVHours_billable;
        public Dictionary<string, double> DEVHours_unbillable;
        public Dictionary<string, double> TLSHours_billable;
        public Dictionary<string, double> TLSHours_unbillable;
        public Dictionary<string, double> SYSHours_billable;
        public Dictionary<string, double> SYSHours_unbillable;

        public List<string> ProjectSpecificAssumptions;
        public List<string> ProjectStandardAssumptions;

        public double TCHours_billable;
        public double TCHours_unbillable;
        public double QAHours;
        public double PMHours;

        public string ctgNumber;
        public List<HardwareUnitEntry> Hardware;
        public DateTime DevStart;
        public DateTime DevComplete;
        public string QuotedDeliveryDate;

        public OptionInformation(string ctgNumber)
        {
            Prompts = new List<PromptInformation>();
            Deliverables = new List<string>();
            this.ctgNumber = ctgNumber;
            // hours
            TCHours_billable = 0;
            TCHours_unbillable = 0;
            QAHours = 0;
            PMHours = 0;
            DEVHours_billable = new Dictionary<string, double>();
            DEVHours_unbillable = new Dictionary<string, double>();
            TLSHours_billable = new Dictionary<string, double>();
            TLSHours_unbillable = new Dictionary<string, double>();
            SYSHours_billable = new Dictionary<string, double>();
            SYSHours_unbillable = new Dictionary<string, double>();

            ProjectSpecificAssumptions = new List<string>();
            ProjectStandardAssumptions = new List<string>();

            Hardware = new List<HardwareUnitEntry>();
            DevStart = new DateTime(0);
            DevComplete = new DateTime(0);
            QuotedDeliveryDate = "";
        }

        // not anymore lol ;atXX looks for a specific language prompt information
        public List<PromptInformation> getLanguagePromptInfo()
        {
            return Prompts;
        }

        public PromptInformation createLanguagePromptInfo(string language)
        {
            PromptInformation promptInfo = new PromptInformation(this.ctgNumber, language);
            Prompts.Add(promptInfo);
            return promptInfo;
        }

    }

    public class HardwareUnitEntry
    {
        public double Cost;
        public int Quantity;
        public string Description;
        public HardwareUnitEntry(string info, double cost, int quantity)
        {
            Description = info;
            Cost = cost;
            Quantity = quantity;
        }

        public double getTotalPrice()
        {
            return Cost * Quantity;
        }
    }
}
