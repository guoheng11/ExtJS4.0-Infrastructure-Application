using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Linq;

namespace Cookbook
{
    public partial class Project : IGetId<Project>
    {
        public static string PM_CONTACT_TYPE = "USAN Dev PM";
        public static string TC_CONTACT_TYPE = "USAN TC";
        public static string DEV_CONTACT_TYPE = "USAN Developer";
        public static string TLS_CONTACT_TYPE = "USAN TLS";
        public static string VTC_CONTACT_TYPE = "VZB TC";
        public static string RFQ_CONTACT_TYPE = "Customer RFQ";
        public static string HOST_CONTACT_TYPE = "Customer HOST";
        public static string OSG_CONTACT_TYPE = "USAN OSG";
        public static string TESTER_CONTACT_TYPE = "Customer Testing";


        public IQueryable<Option> Options
        {
            get
            {
                IQueryable<Option> ret = this.AllOptions.AsQueryable();
                if (ret.Any(a => a.selected == true))
                {
                    ret = ret.Where(a => a.selected == true);
                }
                return ret;
            }
        }

        public ProjectStatus CurrentStatus
        {
            get { return this.ProjectStatus.OrderByDescending(a => a.Created.changed).FirstOrDefault(); }
        }

        public ProjectChangeHistory Created
        {
            get { return this.ProjectChangeHistories.OrderBy(b => b.changed).FirstOrDefault(); }
        }

        public DateTime CreatedTime
        {
            get { return this.Created.changed; }
        }

        public string CreatedBy
        {
            get { return this.Created.ChangedBy.contact_name; }
        }

        public string Company
        {
            get { return this.PrimaryBusinessUnit.Company.company_name; }
        }

        public string PrimaryBusinessUnitName
        {
            get { return this.PrimaryBusinessUnit.biz_name; }
        }

        public string Status
        {
            get { return this.CurrentStatus.status_type; }
        }

        public string OptionCount
        {
            get
            {
                int count = this.AllOptions.Count();
                return count + " Option" + (count == 1 ? "" : "s");
            }
        }

        public string Executables
        {
            get
            {
                IEnumerable<string> q = this.ProjectIngredients.Where(a => a is ExecutableUpdate).Select(a => ((ExecutableUpdate)a).exe_name);
                return aggregateList(q);
            }
        }

        public string Tables
        {
            get
            {
                IEnumerable<string> q = this.ProjectIngredients.Where(a => a is TableUpdate).Select(a => ((TableUpdate)a).table_name);
                return aggregateList(q);
            }
        }

        public string Applications
        {
            get
            {
                IEnumerable<string> q = this.ProjectIngredients.Where(a => a is ApplicationUpdate).Select(a => ((ApplicationUpdate)a).app_name);
                return aggregateList(q);
            }
        }

        public string Ingredients
        {
            get
            {
                return (DatabaseHandler.isNull(Applications) ? "" : "Apps: " + Applications + "\n")
                    + (DatabaseHandler.isNull(Executables) ? "" : "Exes: " + Executables + "\n")
                    + (DatabaseHandler.isNull(Tables) ? "" : "Tables: " + Tables + "\n");
                    
            }
        }

        //Contact Type properties
        public string USANTCContacts
        {
            get { return aggregateList(this.ProjectContacts.Where(a => a.ContactType.type_name.Equals(TC_CONTACT_TYPE)).Select(a => a.Contact.contact_name)); }
        }

        public string USANPMContacts
        {
            get { return aggregateList(this.ProjectContacts.Where(a => a.ContactType.type_name.Equals(PM_CONTACT_TYPE)).Select(a => a.Contact.contact_name)); }
        }

        public string USANDevContacts
        {
            get { return aggregateList(this.ProjectContacts.Where(a => a.ContactType.type_name.Equals(DEV_CONTACT_TYPE)).Select(a => a.Contact.contact_name)); }
        }

        public string USANTLSContacts
        {
            get { return aggregateList(this.ProjectContacts.Where(a => a.ContactType.type_name.Equals(TLS_CONTACT_TYPE)).Select(a => a.Contact.contact_name)); }
        }

        public string VerizonTCContacts
        {
            get { return aggregateList(this.ProjectContacts.Where(a => a.ContactType.type_name.Equals(VTC_CONTACT_TYPE)).Select(a => a.Contact.contact_name)); }
        }

        public string CustomerRFQContacts
        {
            get { return aggregateList(this.ProjectContacts.Where(a => a.ContactType.type_name.Equals(RFQ_CONTACT_TYPE)).Select(a => a.Contact.contact_name)); }
        }

        public string CustomerHostContacts
        {
            get { return aggregateList(this.ProjectContacts.Where(a => a.ContactType.type_name.Equals(HOST_CONTACT_TYPE)).Select(a => a.Contact.contact_name)); }
        }

        public string CustomerTestContacts
        {
            get { return aggregateList(this.ProjectContacts.Where(a => a.ContactType.type_name.Equals(TESTER_CONTACT_TYPE)).Select(a => a.Contact.contact_name)); }
        }

        public string USANOSGContacts
        {
            get { return aggregateList(this.ProjectContacts.Where(a => a.ContactType.type_name.Equals(OSG_CONTACT_TYPE)).Select(a => a.Contact.contact_name)); }
        }
        //end Contact Type properties

        //Dates
        public string DevStartDate
        {
            get
            {
                IQueryable<Option> opts = this.Options.Where(a => a.Assessments.Any(b => b.assessment_type.Equals("SWD")));
                var selection = opts.Select(a => new {
                    a.option_id,
                    a.name,
                    dev_start = a.Assessments.Where(b => b.assessment_type.Equals("SWD")).Single().booked_start,
                });

                string returnString = "";
                foreach(var row in selection) {
                    string dateString = "N/A";
                    if(row.dev_start.HasValue) {
                        dateString = row.dev_start.Value.ToString("yyyy/MM/dd");
                    }
                    if (selection.Count() == 1)
                    {
                        returnString = dateString;
                    }
                    else
                    {
                        string optionName = row.name;
                        if (optionName == default(string))
                        {
                            optionName = "Unnamed (" + row.option_id + ")";
                        }
                        string stuffToAdd = "";
                        if (returnString != "")
                        {
                            stuffToAdd = ", ";
                        }
                        returnString = returnString + stuffToAdd + optionName + ":" + dateString;
                    }
                }

                
                    
                return returnString;

            }
        }
        //Dev End Date (options, swd schedule)
        //OPS Start Date (options, OPS schedule)
        //OPS End Date (options, OPS schedule)
        //Quoted UAT (options)
        //Target UAT Date (options)
        //Production Date (options)

        public string QuotedUATDate
        {
            get
            {
                IQueryable<Option> opts = this.Options;

                string returnString = "";
                foreach (var row in opts)
                {
                    string dateString = "N/A";
                    dateString = row.quoted_uat_date;
                    if (opts.Count() == 1)
                    {
                        returnString = dateString;
                    }
                    else
                    {
                        string optionName = row.name;
                        if (optionName == default(string))
                        {
                            optionName = "Unnamed (" + row.option_id + ")";
                        }
                        string stuffToAdd = "";
                        if (returnString != "")
                        {
                            stuffToAdd = ", ";
                        }
                        returnString = returnString + stuffToAdd + optionName + ":" + dateString;
                    }
                }

                return returnString;
            }
        }

        public string TargetUATDate
        {
            get
            {
                IQueryable<Option> opts = this.Options;

                string returnString = "";
                foreach (var row in opts)
                {
                    string dateString = "N/A";
                    dateString = row.target_uat_date;
                    if (opts.Count() == 1)
                    {
                        returnString = dateString;
                    }
                    else
                    {
                        string optionName = row.name;
                        if (optionName == default(string))
                        {
                            optionName = "Unnamed (" + row.option_id + ")";
                        }
                        string stuffToAdd = "";
                        if (returnString != "")
                        {
                            stuffToAdd = ", ";
                        }
                        returnString = returnString + stuffToAdd + optionName + ":" + dateString;
                    }
                }

                return returnString;
            }
        }

        public string ProductionDate
        {
            get
            {
                IQueryable<Option> opts = this.Options;

                string returnString = "";
                foreach (var row in opts)
                {
                    string dateString = "N/A";
                    dateString = row.production_date;
                    if (opts.Count() == 1)
                    {
                        returnString = dateString;
                    }
                    else
                    {
                        string optionName = row.name;
                        if (optionName == default(string))
                        {
                            optionName = "Unnamed (" + row.option_id + ")";
                        }
                        string stuffToAdd = "";
                        if (returnString != "")
                        {
                            stuffToAdd = ", ";
                        }
                        returnString = returnString + stuffToAdd + optionName + ":" + dateString;
                    }
                }

                return returnString;
            }
        }

        //end Dates


        public static string aggregateList(IEnumerable<string> e)
        {
            bool first = true;
            return e.Aggregate("", (a, b) => { a = a + (first ? "" : ",") + b; first = false; return a; });
        }

        public string aggredateContacts(string type)
        {
            return aggregateList(
                this.ProjectContacts.Where(a => a.contact_type.Equals(type))
                .Select(a => a.Contact.contact_name));
        }

        public string getProjectManagers()
        {
            bool first = true;
            return this.ProjectContacts.Where(
                     b => b.ContactType.type_name.Equals(Project.PM_CONTACT_TYPE))
                     .Select(a => a.Contact.contact_name)
                     .Aggregate("", (a, b) => { a = a + (first ? "" : ",") + b; first = false; return a; });
        }

        public Func<Project, bool> compareIds(string[] ids)
        {
            return (a => a.project_id == int.Parse(ids[0]));
        }

        public object[] getSubProjects()
        {
            List<object> ret = new List<object>();
            foreach (Project p in this.SubProjects)
            {
                ret.Add(new
                {
                    id = p.project_id,
                    name = p.project_name,
                    number = p.project_number,
                });
            }
            return ret.ToArray();
        }

        public int[] getBusinessUnits()
        {
            return this.ProjectBusinessUnits.Select(a => a.biz_id).ToArray();
        }

        public string getBusinessUnitNames()
        {
            string ret = "<b>" + this.PrimaryBusinessUnit.biz_name + "</b>";
            return this.ProjectBusinessUnits.Select(a => a.BusinessUnit.biz_name)
                .Aggregate(ret, (a, b) => a + "," + b);
        }

        //Email utility methods
        public void notifyContacts(IEnumerable<Contact> lst, string subject, string msg)
        {
            notifyContacts(lst, null, subject, msg);
        }

        public void notifyContacts(IEnumerable<Contact> lst, IEnumerable<Contact> cclist, string subject, string msg)
        {
            subject = getEmailHeader() + subject;
            msg = msg + "\n\n" + getProjectDirectoryString();
            Contact.sendEmail(lst, cclist, subject, msg);
        }

        public string getProjectDirectoryString()
        {
            if (DatabaseHandler.isNull(project_directory))
                return "";
            return "Project Directory:\n\n" + "<" + project_directory + ">";
        }

        public string getEmailHeader()
        {
            if (DatabaseHandler.isNull(project_number))
                return "";
            return "[" + this.project_number + "] - ";
        }

        public string getLongName()
        {
            string name = project_number == null ? project_name : project_number;
            string longname = name + (project_number == null ? "" : " - " + project_name);
            return longname;
        }

        public void notifyProjectManagers(IEnumerable<Contact> cclist, string subject, string msg)
        {
            notifyContacts(this.ProjectContacts.Where(a => a.ContactType.type_name.Equals(Project.PM_CONTACT_TYPE)).Select(a => a.Contact),
                cclist, subject, msg);
        }
    }
}