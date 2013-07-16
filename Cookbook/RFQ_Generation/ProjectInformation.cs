using System;
using System.Collections.Generic;
using System.Text;

namespace Cookbook {
    class ProjectInformation
    {
        public string CTGNumber;
        public string ProjectName;
        public string PMName;
        public string Description;
        public List<OptionInformation> Options;

        public Dictionary<string, List<string>> ProjectNotes;

        public ProjectInformation(string ctgNumber)
        {
            CTGNumber = ctgNumber;
            ProjectName = "";
            PMName = "";
            Description = "";
            Options = new List<OptionInformation>();
            ProjectNotes = new Dictionary<string, List<string>>();
        }

        /*
         * Creates a new options and returns it
         */
        public OptionInformation makeNewOption()
        {
            OptionInformation newOption = new OptionInformation(CTGNumber);
            Options.Add(newOption);
            return newOption;
        }

        /*
         * Returns the list of deliverables for each option
         */
        public List<List<string>> getDeliverables()
        {
            List<List<string>> deliverables = new List<List<string>>();
            foreach (OptionInformation option in Options)
            {
                deliverables.Add(option.Deliverables);
            }
            return deliverables;
        }

        /*
         * Returns the list of assumptions for each option
         */
        public List<List<string>> getAssumptions(bool standard)
        {
            List<List<string>> assumptions = new List<List<string>>();
            foreach (OptionInformation option in Options)
            {
                if (standard)
                {
                    assumptions.Add(option.ProjectStandardAssumptions);
                }
                else
                {
                    assumptions.Add(option.ProjectSpecificAssumptions);
                }
            }
            return assumptions;
        }

        /*
         * Returns the list of language specific prompt information for each option
         */
        public List<List<PromptInformation>> getLanguagePrompts()
        {
            List<List<PromptInformation>> prompts = new List<List<PromptInformation>>();
            foreach (OptionInformation option in Options)
            {
                prompts.Add(option.getLanguagePromptInfo());
            }
            return prompts;
        }

        // HOURS!
        public List<Dictionary<string, double>> getDEVHours_billable()
        {
            List<Dictionary<string, double>> list = new List<Dictionary<string, double>>();
            foreach (OptionInformation option in Options)
            {
                list.Add(option.DEVHours_billable);
            }
            return list;
        }

        public List<Dictionary<string, double>> getDEVHours_unbillable()
        {
            List<Dictionary<string, double>> list = new List<Dictionary<string, double>>();
            foreach (OptionInformation option in Options)
            {
                list.Add(option.DEVHours_unbillable);
            }
            return list;
        }

        public List<Dictionary<string, double>> getTLSHours_billable()
        {
            List<Dictionary<string, double>> list = new List<Dictionary<string, double>>();
            foreach (OptionInformation option in Options)
            {
                list.Add(option.TLSHours_billable);
            }
            return list;
        }

        public List<Dictionary<string, double>> getTLSHours_unbillable()
        {
            List<Dictionary<string, double>> list = new List<Dictionary<string, double>>();
            foreach (OptionInformation option in Options)
            {
                list.Add(option.TLSHours_unbillable);
            }
            return list;
        }

        public List<Dictionary<string, double>> getSYSHours_billable()
        {
            List<Dictionary<string, double>> list = new List<Dictionary<string, double>>();
            foreach (OptionInformation option in Options)
            {
                list.Add(option.SYSHours_billable);
            }
            return list;
        }

        public List<Dictionary<string, double>> getSYSHours_unbillable()
        {
            List<Dictionary<string, double>> list = new List<Dictionary<string, double>>();
            foreach (OptionInformation option in Options)
            {
                list.Add(option.SYSHours_unbillable);
            }
            return list;
        }

        public List<double> getTCHours_billable()
        {
            List<double> list = new List<double>();
            foreach (OptionInformation option in Options)
            {
                list.Add(option.TCHours_billable);
            }
            return list;
        }

        public List<double> getTCHours_unbillable()
        {
            List<double> list = new List<double>();
            foreach (OptionInformation option in Options)
            {
                list.Add(option.TCHours_unbillable);
            }
            return list;
        }

        public List<double> getQAHours()
        {
            List<double> list = new List<double>();
            foreach (OptionInformation option in Options)
            {
                list.Add(option.QAHours);
            }
            return list;
        }

        public List<double> getPMHours()
        {
            List<double> list = new List<double>();
            foreach (OptionInformation option in Options)
            {
                list.Add(option.PMHours);
            }
            return list;
        }

        /*
         * Returns the list of EngHoursNonBillable for each option
         */
        public List<List<HardwareUnitEntry>> getHardware()
        {
            List<List<HardwareUnitEntry>> list = new List<List<HardwareUnitEntry>>();
            foreach (OptionInformation option in Options)
            {
                list.Add(option.Hardware);
            }
            return list;
        }

        /*
         * Returns the list of DevStart for each option
         */
        public List<DateTime> getDevStarts()
        {
            List<DateTime> list = new List<DateTime>();
            foreach (OptionInformation option in Options)
            {
                list.Add(option.DevStart);
            }
            return list;
        }

        /*
         * Returns the list of DevComplete for each option
         */
        public List<DateTime> getDevCompletes()
        {
            List<DateTime> list = new List<DateTime>();
            foreach (OptionInformation option in Options)
            {
                list.Add(option.DevComplete);
            }
            return list;
        }

        /*
         * Returns the list of QuotedDeliveryDate for each option
         */
        public List<string> getQuotedDeliveryDates()
        {
            List<string> list = new List<string>();
            foreach (OptionInformation option in Options)
            {
                list.Add(option.QuotedDeliveryDate);
            }
            return list;
        }

        public List<string> getNotes(string type)
        {

            List<string> notes = new List<string>();
            if (ProjectNotes.TryGetValue(type, out notes))
            {
                return notes;
            }
            else
            {
                return default(List<string>);
            }
        }
    }
}
