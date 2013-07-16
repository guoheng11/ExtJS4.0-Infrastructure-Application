using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;
using System.IO;
using System.Web.Configuration;
//using System.Windows.Forms;
namespace Cookbook {
    class ProjectPathTools {
        /*
         * Function name: createProject()
           Arguments:
            - (string) corporation (company) name. For example: CitiGroup or Honda
            - (string) business unit name. Can be empty. For example: "INT", "CARDS", "RETAIL", or ""
            - (string) project number. For example: “CTG-1234” or “AHFC-006”. It needs to match the following regex: \^[A-Z]+\-\d+$\
            - (string) project name. For example: “Dealing with mad customers” or “Custom Report Changes”
           Algorithm:
            1. Check to see if the path to the business unit exists. If not – create it.
            2. Figure out range directory name. Parse project number into Project Type (such as CTG or AHFC or INT) and Project Number (1234, 006). Range directories are constructed like this: “CTG-1200 thru CTG-1299”, or “AHFC-000 thru AFHC-099”. Create range directory if it does not exist.
            3. Create project folder (by concatenating project name to project number) in the range directory if it does not exist.
           Returns:
            - (string) path to the project directory such as: \\ops1\E_Drive\Project Management\Projects\CitiGroup\RETAIL\CTG-1200 thru CTG-1299\CTG-1234 Dealing with mad customers
        */

        public static string createProject(string dirname, string corpName, string bizName, string projectNumber, string projectName)
        {
            string newdir = createProject(corpName, bizName, projectNumber, projectName);
            if (dirname != null && !newdir.Equals(dirname))
            {
                if (Directory.Exists(dirname))
                {
                    Directory.Delete(newdir);
                    Directory.Move(dirname, newdir);
                }
            }
            return newdir;
        }

        public static string createProject(string corpName, string bizName, string projectNumber, string projectName)
        {
            return createDirectory(WebConfigurationManager.AppSettings["projectBasePath"],
                corpName, bizName, projectNumber, projectName);
        }

        public static string createStaging(string corpName, string bizName, string projectNumber, string projectName)
        {
            return createDirectory(WebConfigurationManager.AppSettings["stagingBasePath"],
                corpName, bizName, projectNumber, projectName);
        }

        public static string createDirectory(string basepath, string corpName, string bizName, string projectNumber, string projectName)
        {
            string pathToBiz = basepath;
            if (!Directory.Exists(pathToBiz))
            {
                Directory.CreateDirectory(pathToBiz);
            }

            pathToBiz = Path.Combine(pathToBiz, corpName);
            if (!Directory.Exists(pathToBiz))
            {
                Directory.CreateDirectory(pathToBiz);
            }

            if (bizName.Length > 0)
            {
                pathToBiz = Path.Combine(pathToBiz, bizName);
            }
            string newPath = pathToBiz;
            // check path to business unit
            if (!Directory.Exists(pathToBiz))
            {
                Directory.CreateDirectory(pathToBiz);
            }

            // figure out project type and project number
            Regex projectNumberRegex = new Regex("^([A-Z]+)\\-(\\d+)");
            Match m = projectNumberRegex.Match(projectNumber);
            if (m == null)
            {
                throw new FormatException("ERROR: Project number is in the wrong format. (1)");
            }
            //int dashPosition = projectNumber.IndexOf("-");
            string projType = m.Groups[1].Value; // projectNumber.Substring(0, dashPosition);
            string projNumb = m.Groups[2].Value; // projectNumber.Substring(dashPosition + 1);

            // figure out range directory name
            int intProjNumb = 0;
            try {
                intProjNumb = int.Parse(projNumb);
            }
            catch (FormatException e)
            {
                throw new FormatException("ERROR: Project number is in the wrong format. (2)", e);
            }
            catch (OverflowException e)
            {
                throw new FormatException("ERROR: Project number is too large.", e);
            }

            int bottom = (intProjNumb / 100) * 100;
            int top = (intProjNumb / 100) * 100 + 99;
            string bottomStr = "" + bottom;
            string topStr = "" + top;
            if (bottom == 0)
            {
                bottomStr = "000";
            }
            if (top == 99)
            {
                topStr = "099";
            }
            string rangeDir = projType + "-" + bottomStr + " thru " + projType + "-" + topStr;
            string rangePath = pathToBiz;
            rangePath = Path.Combine(rangePath, rangeDir);
            if (!Directory.Exists(rangePath))
            {
                Directory.CreateDirectory(rangePath);
            }

            // create project folder
            newPath = Path.Combine(rangePath, projectNumber + " " + projectName);
            if (!Directory.Exists(newPath))
            {
                Directory.CreateDirectory(newPath);
            }

            /*MessageBox.Show("Type:" + projType + "\nNumber: " + projNumb + "\nBottom: " + bottomStr + "\nTop: " + topStr + "\nRangeDir: " + rangeDir + "\nRangePath: " + rangePath, "You've got mail",
                MessageBoxButtons.OK, MessageBoxIcon.Exclamation);*/

            return newPath;
        }

    }
}
