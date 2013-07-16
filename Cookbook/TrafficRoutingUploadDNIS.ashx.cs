using System;
using System.Net;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;
using System.Globalization;
using System.Net.Mail;
using ExcelLibrary.SpreadSheet;


namespace Cookbook
{
    public class TrafficRoutingUploadDNIS: DatabaseHandler
    {
        string comments = " ";
        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            try
            {
                System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.InputStream, context.Request.ContentEncoding);
                var jsonSerializer = new JsonSerializer();


                
                    string blobParam = context.Request.Params.Get("jsonBlob");
                    JObject blob = (JObject)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(blobParam)));
                    string user_name = context.Request.Params.Get("user_name");
                    string filter = context.Request.Params.Get("project_id");
                    string deleteExistingRecords = context.Request.Params.Get("delete_existing");
                    string deleteAdd = context.Request.Params.Get("delete_add");
                    string deleteChange = context.Request.Params.Get("delete_change");
                    string deleteRemove = context.Request.Params.Get("delete_remove");
                    byte[] fileContent = default(byte[]);
                    string filename = "";
                    HttpRequest request = context.Request;
                    HttpFileCollection myFileCollection = request.Files;
                    string fileType = "";
                
                

                if (myFileCollection.Keys[0].ToString().Equals("xls_upload"))
                {


                    int fileLength = myFileCollection[0].ContentLength;
                    fileType = myFileCollection[0].ContentType;
                    if (fileLength > 0)
                    {
                        
                        fileContent = new byte[fileLength];
                        filename = myFileCollection[0].FileName;

                        if (filename.Substring(filename.LastIndexOf('.')) != ".xls")
                        {
                            return new PagedData("File not uploaded.  Please upload the file in a .xls format");
                        }
                        else
                        {
                            //comments += "IS AN xls|" + filename.Substring(filename.LastIndexOf('.')) + "|";
                        }


                        char[] arr = { '\\', '/' };
                        int filenameStart = filename.LastIndexOfAny(arr);
                        if (filenameStart > 0)
                        {
                            filename = filename.Substring(filenameStart + 1);
                        }
                        myFileCollection[0].InputStream.Read(fileContent, 0, fileLength);

                        if (filename != null && filename != "" && fileType != "" && filename != "")
                        {
                            try
                            {
                                if (deleteExistingRecords == "true")
                                {
                                    if (deleteAdd == "true")
                                    {
                                        if (db.RoutingRequirements.Count(a => a.project_id.Equals(int.Parse(filter)) && a.type == "add") > 0)
                                        {
                                            var p = db.RoutingRequirements.Where(a => a.project_id.Equals(int.Parse(filter)) && a.type == "add");
                                            db.RoutingRequirements.DeleteAllOnSubmit(p);
                                            db.SubmitChanges();
                                        }
                                    }
                                    if (deleteChange == "true")
                                    {
                                        if (db.RoutingRequirements.Count(a => a.project_id.Equals(int.Parse(filter)) && a.type == "change") > 0)
                                        {
                                            var p = db.RoutingRequirements.Where(a => a.project_id.Equals(int.Parse(filter)) && a.type == "change");
                                            db.RoutingRequirements.DeleteAllOnSubmit(p);
                                            db.SubmitChanges();
                                        }
                                    }
                                    if (deleteRemove == "true")
                                    {
                                        if (db.RoutingRequirements.Count(a => a.project_id.Equals(int.Parse(filter)) && a.type == "remove") > 0)
                                        {
                                            var p = db.RoutingRequirements.Where(a => a.project_id.Equals(int.Parse(filter)) && a.type == "remove");
                                            db.RoutingRequirements.DeleteAllOnSubmit(p);
                                            db.SubmitChanges();
                                        }
                                    }
                                }
                            }
                            catch (Exception e)
                            {
                                comments += "Error: Show this Screen to the Cookbook Admins!! Failed in delete routine: " + e.Message + "|" + e.StackTrace + "|" + e.InnerException;
                                throw new Exception(comments);
                            }

                            Workbook book = Workbook.Load(new MemoryStream(fileContent));
                            Worksheet sheet = book.Worksheets[0];

                            int curRow = 1;
                            bool isEmpty = false;
                            do
                            {
                                RoutingRequirement newReq = new RoutingRequirement();
                                try
                                {
                                    if (sheet.Cells[curRow, 0].IsEmpty)
                                    {
                                        isEmpty = true;
                                    }
                                    else
                                    {
                                        string firstCharInTypeColumn = sheet.Cells[curRow, 0].Value.ToString().Substring(0, 1).ToLower();
                                        if (firstCharInTypeColumn != "a" && firstCharInTypeColumn != "c" && firstCharInTypeColumn != "r")
                                        {
                                            isEmpty = true;
                                        }
                                        else
                                        {
                                            newReq.project_id = int.Parse(filter);

                                            //column 0
                                            if (firstCharInTypeColumn == "A" || firstCharInTypeColumn == "a")
                                            {
                                                newReq.type = "add";
                                            }
                                            else
                                                if (firstCharInTypeColumn == "C" || firstCharInTypeColumn == "c")
                                                {
                                                    newReq.type = "change";
                                                }
                                                else
                                                    if (firstCharInTypeColumn == "R" || firstCharInTypeColumn == "r")
                                                    {
                                                        newReq.type = "remove";
                                                    }

                                            //column 1
                                            if (sheet.Cells[curRow, 1].Value != null)
                                            {
                                                newReq.dnis = sheet.Cells[curRow, 1].Value.ToString();
                                            }
                                            //column 2
                                            if (newReq.type == "add" || newReq.type == "change")
                                            {
                                                if (sheet.Cells[curRow, 2].Value != null)
                                                {
                                                    newReq.route_to = sheet.Cells[curRow, 2].Value.ToString();
                                                }
                                            }
                                            //column 3
                                            if (newReq.type == "add" || newReq.type == "change")
                                            {
                                                if (sheet.Cells[curRow, 3].Value != null)
                                                {
                                                    newReq.platform = sheet.Cells[curRow, 3].Value.ToString();
                                                }
                                            }
                                            //column 4
                                            if (sheet.Cells[curRow, 4].Value != null)
                                            {
                                                newReq.description = sheet.Cells[curRow, 4].Value.ToString();
                                            }
                                            //column 5
                                            if (newReq.type == "remove" || newReq.type == "change")
                                            {
                                                if (sheet.Cells[curRow, 5].Value != null)
                                                {
                                                    newReq.remove_from = sheet.Cells[curRow, 5].Value.ToString();
                                                }
                                            }
                                            //column 6
                                            if (newReq.type == "change")
                                            {
                                                if (sheet.Cells[curRow, 6].Value != null)
                                                {
                                                    newReq.platform_from = sheet.Cells[curRow, 6].Value.ToString();
                                                }
                                            }
                                            else if (newReq.type == "remove")  //ath design flaw since day 1 -- so just going with it..
                                            {
                                                if (sheet.Cells[curRow, 6].Value != null)
                                                {
                                                    newReq.platform = sheet.Cells[curRow, 6].Value.ToString();
                                                }
                                            }
                                            //column 7
                                            try
                                            {
                                                if (sheet.Cells[curRow, 7].Value != null)
                                                {
                                                    newReq.usan_date = DateTime.FromOADate(Convert.ToDouble(sheet.Cells[curRow, 7].Value.ToString())).ToShortDateString();
                                                }
                                            }
                                            catch (FormatException)
                                            {
                                                if (sheet.Cells[curRow, 7].Value != null)
                                                {
                                                    newReq.usan_date = sheet.Cells[curRow, 7].Value.ToString();
                                                }
                                            }
                                            //column 8
                                            try
                                            {
                                                if (sheet.Cells[curRow, 8].Value != null)
                                                {
                                                    newReq.usan_time = DateTime.FromOADate(Convert.ToDouble(sheet.Cells[curRow, 8].Value.ToString())).ToShortTimeString();
                                                }
                                            }
                                            catch (FormatException)
                                            {
                                                if (sheet.Cells[curRow, 8].Value != null)
                                                {
                                                    newReq.usan_time = sheet.Cells[curRow, 8].Value.ToString();
                                                }
                                            }
                                            //column 9
                                            if (newReq.type == "add" || newReq.type == "change")
                                            {
                                                try
                                                {
                                                    if (sheet.Cells[curRow, 9].Value != null)
                                                    {
                                                        newReq.dnis_date = DateTime.FromOADate(Convert.ToDouble(sheet.Cells[curRow, 9].Value.ToString())).ToShortDateString();
                                                    }
                                                }
                                                catch (FormatException)
                                                {
                                                    if (sheet.Cells[curRow, 9].Value != null)
                                                    {
                                                        newReq.dnis_date = sheet.Cells[curRow, 9].Value.ToString();
                                                    }
                                                }
                                            }
                                            //column 10
                                            if (newReq.type == "add" || newReq.type == "change")
                                            {
                                                try
                                                {
                                                    if (sheet.Cells[curRow, 10].Value != null)
                                                    {
                                                        newReq.dnis_time = DateTime.FromOADate(Convert.ToDouble(sheet.Cells[curRow, 10].Value.ToString())).ToShortTimeString();
                                                    }
                                                }
                                                catch (FormatException)
                                                {
                                                    if (sheet.Cells[curRow, 10].Value != null)
                                                    {
                                                        newReq.dnis_time = sheet.Cells[curRow, 10].Value.ToString();
                                                    }
                                                }
                                            }
                                            //column 11
                                            if (newReq.type == "add" || newReq.type == "change")
                                            {
                                                try
                                                {
                                                    if (sheet.Cells[curRow, 11].Value != null)
                                                    {
                                                        newReq.carrier_date = DateTime.FromOADate(Convert.ToDouble(sheet.Cells[curRow, 11].Value.ToString())).ToShortDateString();
                                                    }
                                                }
                                                catch (FormatException)
                                                {
                                                    if (sheet.Cells[curRow, 11].Value != null)
                                                    {
                                                        newReq.carrier_date = sheet.Cells[curRow, 11].Value.ToString();
                                                    }
                                                }
                                            }
                                            //column 12
                                            if (newReq.type == "add" || newReq.type == "change")
                                            {
                                                try
                                                {
                                                    if (sheet.Cells[curRow, 12].Value != null)
                                                    {
                                                        newReq.carrier_time = DateTime.FromOADate(Convert.ToDouble(sheet.Cells[curRow, 12].Value.ToString())).ToShortTimeString();
                                                    }
                                                }
                                                catch (FormatException)
                                                {
                                                    if (sheet.Cells[curRow, 12].Value != null)
                                                    {
                                                        newReq.carrier_time = sheet.Cells[curRow, 12].Value.ToString();
                                                    }
                                                }
                                            }
                                            //column 13
                                            if (newReq.type == "add")
                                            {
                                                if (sheet.Cells[curRow, 13].Value != null)
                                                {
                                                    newReq.alias = sheet.Cells[curRow, 13].Value.ToString();
                                                }
                                            }
                                            db.RoutingRequirements.InsertOnSubmit(newReq);
                                            db.SubmitChanges();
                                        }
                                    }
                                }
                                catch (Exception e)
                                {
                                    throw new Exception("Error! Show this screen to Cookbook Admins! Failed inside parsing routine: " + e.Message + "|" + e.StackTrace +"|"+ e.TargetSite + "|" + e.HelpLink + "|" + e.Source + "|");
                                }
                                curRow++;

                            } while (isEmpty != true);
                            return new PagedData("Success! Imported " + (curRow - 2) + " rows." + comments);
                        }
                    }
                    else
                    {
                        return new PagedData("File not uploaded. Uploaded file is empty");
                    }
                }

                if (fileContent == default(byte[]))
                {
                    return new PagedData("File not uploaded. Uploaded file is missing");
                }

            }
            catch (Exception e)
            {
                comments += "Error: Show this Screen to the Cookbook Admins!! " + e.Message + "|" + e.StackTrace + "|" + e.InnerException;
                throw new Exception(comments);
            }
            return new PagedData("");
        }
    }
}