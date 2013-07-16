using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ExcelLibrary.SpreadSheet;

namespace Cookbook
{

    public class ExportTrafficRoutingGrid : DatabaseHandler
    {
        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            string filter = context.Request.Params.Get("project_id");
            string user_name = context.Request.Params.Get("user_name");
            string exportAdd = context.Request.Params.Get("export_add");
            string exportChange = context.Request.Params.Get("export_change");
            string exportRemove = context.Request.Params.Get("export_remove");
            if (!isNull(filter) && filter != "0")
            {
                using (new ImpersonateUser("cookbook", "USANAD", "987-oiu8"))
                {
                    ProjectInformation projInfo = db.ProjectInformations.Single(a => a.project_id.Equals(int.Parse(filter)));

                    string folder = projInfo.project_folder;
                    if (folder == "" || folder == null)
                    {
                        return new PagedData("Error - Project Folder (on the Summary Tab) Must Be Populated");
                    }
                    if ((folder.Reverse()).ToString().Substring(0, 1) != "\\") //add a slash to the network path if it doesn't already exist or it will be put in the parent dir
                    {
                        folder = folder + "\\";
                    }

                    string type = exportAdd == "true" ? "Add" : "";
                    type += exportChange == "true" ? "Change" : "";
                    type += exportRemove == "true" ? "Remove" : "";


                    string filename = projInfo.project_name.Replace(' ', '_') + "_" + type + "DnisRouting" + DateTime.Today.Year + DateTime.Today.Month + DateTime.Today.Day +
                        "_" + DateTime.Now.Hour + DateTime.Now.Minute + ".xls";
                    string file = folder + filename;

                    Workbook workbook = new Workbook();
                    Worksheet trafficroutingTab = new Worksheet("Routing Requirements Template");

                    /*
                     * fill first 200 cells with null data - this is a workaround using the ExcelLibrary so that a warning 
                     * prompt will not show when opening the file. File needs to be >6000 bytes for the warning not to show up...don't ask me...
                     */
                    for (var k = 0; k < 200; k++)
                        trafficroutingTab.Cells[k, 0] = new Cell(null);


                    //set up the column headers (titles)
                    trafficroutingTab.Cells[0, 0] = new Cell("Type (Add/Change/Remove)");
                    trafficroutingTab.Cells[0, 1] = new Cell("New/Existing DNIS");
                    trafficroutingTab.Cells[0, 2] = new Cell("App To Be Routed To");
                    trafficroutingTab.Cells[0, 3] = new Cell("Platform TO");
                    trafficroutingTab.Cells[0, 4] = new Cell("Description");
                    trafficroutingTab.Cells[0, 5] = new Cell("App To Be Removed From");
                    trafficroutingTab.Cells[0, 6] = new Cell("Platform FROM");
                    trafficroutingTab.Cells[0, 7] = new Cell("USAN Prod Routing Date");
                    trafficroutingTab.Cells[0, 8] = new Cell("USAN Prod Routing Time");
                    trafficroutingTab.Cells[0, 9] = new Cell("DNIS Table Prod Load Date");
                    trafficroutingTab.Cells[0, 10] = new Cell("DNIS Table Prod Load Time");
                    trafficroutingTab.Cells[0, 11] = new Cell("Carrier Prod Routing Date");
                    trafficroutingTab.Cells[0, 12] = new Cell("Carrier Prod Routing Time");
                    trafficroutingTab.Cells[0, 13] = new Cell("Alias");

                    int cellCounter1 = 1;
                    int cellCounter2 = 1;

                    if (exportAdd == "true")
                    {
                        string totalGridResults = grabTrafficRoutingDNIS(db, filter, "add");
                        string[] gridResultsSeparated = totalGridResults.Split('|');
                        
                        var buildingList = db.RoutingRequirements.Where(a => a.project_id.Equals(int.Parse(filter)) && a.type.Equals("add")).ToList();

                        for (int x = 0; x < gridResultsSeparated.Length; x++)
                        {
                            int currentCell = cellCounter1;    
                            var individualCell = gridResultsSeparated[x].Split(';');

                            for (int i = 0; i < individualCell.Length; i++)
                            {
                                trafficroutingTab.Cells[currentCell, i] = new Cell(individualCell[i].Trim());
                            }
                            cellCounter1 = currentCell + 1;
                        }
                    }

                    if (exportChange == "true")
                    {
                        string totalGridResults = grabTrafficRoutingDNIS(db, filter, "change");
                        string[] gridResultsSeparated = totalGridResults.Split('|');

                        var buildingList = db.RoutingRequirements.Where(a => a.project_id.Equals(int.Parse(filter)) && a.type.Equals("change")).ToList();

                        for (int x = 0; x < gridResultsSeparated.Length; x++)
                        {
                            int currentCell = cellCounter1 + x;
                            var individualCell = gridResultsSeparated[x].Split(';');
                            for (int i = 0; i < individualCell.Length; i++)
                            {
                                trafficroutingTab.Cells[currentCell, i] = new Cell(individualCell[i].Trim());
                            }
                            cellCounter2 = currentCell + 1;
                        }
                    }

                    if (cellCounter2 > 1)
                    {
                        cellCounter1 = cellCounter2;
                    }
                    
                    if (exportRemove == "true")
                    {
                        string totalGridResults = grabTrafficRoutingDNIS(db, filter, "delete");
                        string[] gridResultsSeparated = totalGridResults.Split('|');

                        var buildingList = db.RoutingRequirements.Where(a => a.project_id.Equals(int.Parse(filter)) && a.type.Equals("remove")).ToList();

                        for (int x = 0; x < gridResultsSeparated.Length; x++)
                        {
                            int currentCell = cellCounter1 + x;
                            var individualCell = gridResultsSeparated[x].Split(';');

                            for (int i = 0; i < individualCell.Length; i++)
                            {
                                trafficroutingTab.Cells[currentCell, i] = new Cell(individualCell[i].Trim());
                            }
                        }
                    }

                    
                    
                    trafficroutingTab.Cells.ColumnWidth[0,14] = 8000;

                    workbook.Worksheets.Add(trafficroutingTab);


                    try
                    {
                        workbook.Save(file);
                        return new PagedData("Grid Data Exported to " + folder + " with the filename: " + filename);
                    }
                    catch (Exception e)
                    {
                        return new PagedData("Project Unable To Be Exported Contact Cookbook Admin - Error: " + e.Message, false);
                    }
                }
            }
            else
            {
                return new PagedData("ExportTrafficRoutingGrid expects a project id!");
            }
        }

        public String grabTrafficRoutingDNIS(CookDBDataContext db, string filter, string type)
        {
            string building = "";
            switch (type)
            {
                case "add":
                    {
                        if (db.RoutingRequirements.Count(a => a.project_id.Equals(int.Parse(filter)) && a.type.Equals("add")) > 0)
                        {
                            var buildingList = db.RoutingRequirements.Where(a => a.project_id.Equals(int.Parse(filter)) && a.type.Equals("add")).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += "Add; ";
                                building += buildingList[i].dnis + "; ";
                                building += buildingList[i].route_to + "; ";
                                building += buildingList[i].platform + "; ";
                                building += buildingList[i].description + "; ";
                                building += " ; "; //app to be removed from
                                building += " ; "; //platform from
                                if (buildingList[i].usan_date != null)
                                {
                                    if (buildingList[i].usan_date.Contains(":") && buildingList[i].usan_date.Contains("T"))
                                    {
                                        try
                                        {
                                            var k = Convert.ToDateTime(buildingList[i].usan_date);
                                            building += k.ToString("MM/dd/yyyy") + "; ";
                                        }
                                        catch (Exception)
                                        {
                                            building += buildingList[i].usan_date + "; ";
                                        }
                                    }
                                    else
                                    {
                                        building += buildingList[i].usan_date + "; ";
                                    }
                                }
                                else
                                {
                                    building += buildingList[i].usan_date + "; ";
                                }
                                if (buildingList[i].usan_time != null)
                                {
                                    if (buildingList[i].usan_time.Contains("-") && buildingList[i].usan_time.Contains("T"))
                                    {
                                        try
                                        {
                                            var k = Convert.ToDateTime(buildingList[i].usan_time);
                                            building += k.ToString("h:mm tt") + "; ";
                                        }
                                        catch (Exception)
                                        {
                                            building += buildingList[i].usan_time + "; ";
                                        }
                                    }
                                    else
                                    {
                                        building += buildingList[i].usan_time + "; ";
                                    }
                                }
                                else
                                {
                                    building += buildingList[i].usan_time + "; ";
                                }
                                if (buildingList[i].dnis_date != null)
                                {
                                    if (buildingList[i].dnis_date.Contains(":") && buildingList[i].dnis_date.Contains("T"))
                                    {
                                        try
                                        {
                                            var k = Convert.ToDateTime(buildingList[i].dnis_date);
                                            building += k.ToString("MM/dd/yyyy") + "; ";
                                        }
                                        catch (Exception)
                                        {
                                            building += buildingList[i].dnis_date + "; ";
                                        }
                                    }
                                    else
                                    {
                                        building += buildingList[i].dnis_date + "; ";
                                    }
                                }
                                else
                                {
                                    building += buildingList[i].dnis_date + "; ";
                                }
                                if (buildingList[i].dnis_time != null)
                                {
                                    if (buildingList[i].dnis_time.Contains("-") && buildingList[i].dnis_time.Contains("T"))
                                    {
                                        try
                                        {
                                            var k = Convert.ToDateTime(buildingList[i].dnis_time);
                                            building += k.ToString("h:mm tt") + "; ";
                                        }
                                        catch (Exception)
                                        {
                                            building += buildingList[i].dnis_time + "; ";
                                        }
                                    }
                                    else
                                    {
                                        building += buildingList[i].dnis_time + "; ";
                                    }
                                }
                                else
                                {
                                    building += buildingList[i].dnis_time + "; ";
                                }
                                if (buildingList[i].carrier_date != null)
                                {
                                    if (buildingList[i].carrier_date.Contains(":") && buildingList[i].carrier_date.Contains("T"))
                                    {
                                        try
                                        {
                                            var k = Convert.ToDateTime(buildingList[i].carrier_date);
                                            building += k.ToString("MM/dd/yyyy") + "; ";
                                        }
                                        catch (Exception)
                                        {
                                            building += buildingList[i].carrier_date + "; ";
                                        }
                                    }
                                    else
                                    {
                                        building += buildingList[i].carrier_date + "; ";
                                    }
                                }
                                else
                                {
                                    building += buildingList[i].carrier_date + "; ";
                                }
                                if (buildingList[i].carrier_time != null)
                                {
                                    if (buildingList[i].carrier_time.Contains("-") && buildingList[i].carrier_time.Contains("T"))
                                    {
                                        try
                                        {
                                            var k = Convert.ToDateTime(buildingList[i].carrier_time);
                                            building += k.ToString("h:mm tt") + "; ";
                                        }
                                        catch (Exception)
                                        {
                                            building += buildingList[i].carrier_time + "; ";
                                        }
                                    }
                                    else
                                    {
                                        building += buildingList[i].carrier_time + "; ";
                                    }
                                }
                                else
                                {
                                    building += buildingList[i].carrier_time + "; ";
                                }
                                building += buildingList[i].alias;
                                if (i + 1 < buildingList.Count())
                                {
                                    building += " | ";
                                }
                            }

                        }
                        return building;
                    }
                case "change":
                    {
                        if (db.RoutingRequirements.Count(a => a.project_id.Equals(int.Parse(filter)) && a.type.Equals("change")) > 0)
                        {
                            var buildingList = db.RoutingRequirements.Where(a => a.project_id.Equals(int.Parse(filter)) && a.type.Equals("change")).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += "Change; ";
                                building += buildingList[i].dnis + "; ";
                                building += buildingList[i].route_to + "; ";
                                building += buildingList[i].platform + "; ";
                                building += buildingList[i].description + "; ";
                                building += buildingList[i].remove_from + "; ";
                                building += buildingList[i].platform_from + "; ";
                                if (buildingList[i].usan_date != null)
                                {
                                    if (buildingList[i].usan_date.Contains(":") && buildingList[i].usan_date.Contains("T"))
                                    {
                                        try
                                        {
                                            var k = Convert.ToDateTime(buildingList[i].usan_date);
                                            building += k.ToString("MM/dd/yyyy") + "; ";
                                        }
                                        catch (Exception)
                                        {
                                            building += buildingList[i].usan_date + "; ";
                                        }
                                    }
                                    else
                                    {
                                        building += buildingList[i].usan_date + "; ";
                                    }
                                }
                                else
                                {
                                    building += buildingList[i].usan_date + "; ";
                                }
                                if (buildingList[i].usan_time != null)
                                {
                                    if (buildingList[i].usan_time.Contains("-") && buildingList[i].usan_time.Contains("T"))
                                    {
                                        try
                                        {
                                            var k = Convert.ToDateTime(buildingList[i].usan_time);
                                            building += k.ToString("h:mm tt") + "; ";
                                        }
                                        catch (Exception)
                                        {
                                            building += buildingList[i].usan_time + "; ";
                                        }
                                    }
                                    else
                                    {
                                        building += buildingList[i].usan_time + "; ";
                                    }
                                }
                                else
                                {
                                    building += buildingList[i].usan_time + "; ";
                                }
                                if (buildingList[i].dnis_date != null)
                                {
                                    if (buildingList[i].dnis_date.Contains(":") && buildingList[i].dnis_date.Contains("T"))
                                    {
                                        try
                                        {
                                            var k = Convert.ToDateTime(buildingList[i].dnis_date);
                                            building += k.ToString("MM/dd/yyyy") + "; ";
                                        }
                                        catch (Exception)
                                        {
                                            building += buildingList[i].dnis_date + "; ";
                                        }
                                    }
                                    else
                                    {
                                        building += buildingList[i].dnis_date + "; ";
                                    }
                                }
                                else
                                {
                                    building += buildingList[i].dnis_date + "; ";
                                }
                                if (buildingList[i].dnis_time != null)
                                {
                                    if (buildingList[i].dnis_time.Contains("-") && buildingList[i].dnis_time.Contains("T"))
                                    {
                                        try
                                        {
                                            var k = Convert.ToDateTime(buildingList[i].dnis_time);
                                            building += k.ToString("h:mm tt") + "; ";
                                        }
                                        catch (Exception)
                                        {
                                            building += buildingList[i].dnis_time + "; ";
                                        }
                                    }
                                    else
                                    {
                                        building += buildingList[i].dnis_time + "; ";
                                    }
                                }
                                else
                                {
                                    building += buildingList[i].dnis_time + "; ";
                                }
                                if (buildingList[i].carrier_date != null)
                                {
                                    if (buildingList[i].carrier_date.Contains(":") && buildingList[i].carrier_date.Contains("T"))
                                    {
                                        try
                                        {
                                            var k = Convert.ToDateTime(buildingList[i].carrier_date);
                                            building += k.ToString("MM/dd/yyyy") + "; ";
                                        }
                                        catch (Exception)
                                        {
                                            building += buildingList[i].carrier_date + "; ";
                                        }
                                    }
                                    else
                                    {
                                        building += buildingList[i].carrier_date + "; ";
                                    }
                                }
                                else
                                {
                                    building += buildingList[i].carrier_date + "; ";
                                }
                                if (buildingList[i].carrier_time != null)
                                {
                                    if (buildingList[i].carrier_time.Contains("-") && buildingList[i].carrier_time.Contains("T"))
                                    {
                                        try
                                        {
                                            var k = Convert.ToDateTime(buildingList[i].carrier_time);
                                            building += k.ToString("h:mm tt") + "; ";
                                        }
                                        catch (Exception)
                                        {
                                            building += buildingList[i].carrier_time + "; ";
                                        }
                                    }
                                    else
                                    {
                                        building += buildingList[i].carrier_time + "; ";
                                    }
                                }
                                else
                                {
                                    building += buildingList[i].carrier_time + "; ";
                                }
                                building += " "; //alias
                                if (i + 1 < buildingList.Count())
                                {
                                    building += " | ";
                                }
                            }

                        }
                        return building;
                    }
                case "delete":
                    {
                        if (db.RoutingRequirements.Count(a => a.project_id.Equals(int.Parse(filter)) && a.type.Equals("remove")) > 0)
                        {
                            var buildingList = db.RoutingRequirements.Where(a => a.project_id.Equals(int.Parse(filter)) && a.type.Equals("remove")).ToList();
                            for (int i = 0; i < buildingList.Count(); i++)
                            {
                                building += "Remove; ";
                                building += buildingList[i].dnis + "; ";
                                building += " ; "; //app to be routed to
                                building += " ; "; //platform 
                                building += buildingList[i].description + "; ";
                                building += buildingList[i].remove_from + "; ";
                                building += buildingList[i].platform + "; ";
                                if (buildingList[i].usan_date != null)
                                {
                                    if (buildingList[i].usan_date.Contains(":") && buildingList[i].usan_date.Contains("T"))
                                    {
                                        try
                                        {
                                            var k = Convert.ToDateTime(buildingList[i].usan_date);
                                            building += k.ToString("MM/dd/yyyy") + "; ";
                                        }
                                        catch (Exception)
                                        {
                                            building += buildingList[i].usan_date + "; ";
                                        }
                                    }
                                    else
                                    {
                                        building += buildingList[i].usan_date + "; ";
                                    }
                                }
                                else
                                {
                                    building += buildingList[i].usan_date + "; ";
                                }
                                if (buildingList[i].usan_time != null)
                                {
                                    if (buildingList[i].usan_time.Contains("-") && buildingList[i].usan_time.Contains("T"))
                                    {
                                        try
                                        {
                                            var k = Convert.ToDateTime(buildingList[i].usan_time);
                                            building += k.ToString("h:mm tt") + "; ";
                                        }
                                        catch (Exception)
                                        {
                                            building += buildingList[i].usan_time + "; ";
                                        }
                                    }
                                    else
                                    {
                                        building += buildingList[i].usan_time + "; ";
                                    }
                                }
                                else
                                {
                                    building += buildingList[i].usan_time + "; ";
                                }
                                building += " ; "; //dnis date
                                building += " ; "; //dnis time
                                building += " ; "; //carrier date
                                building += " ; "; //carrier time
                                building += " "; //alias
                                if (i + 1 < buildingList.Count())
                                {
                                    building += " | ";
                                }
                            }

                        }
                        return building;
                    }
                default:
                    {
                        break;
                    }

            }
            return building;
        }
    }
}