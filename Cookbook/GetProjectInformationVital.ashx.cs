using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;

namespace Cookbook
{
    /// <summary>
    /// Summary description for GetProjectInformation
    /// </summary>
    public class GetProjectInformationVital : DatabaseHandler
    {
        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<ProjectInformation> q = db.ProjectInformations;

            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                return new PagedData("ProjectInformation Vitals does not expect a project_id");
            }
            else
            {
                string queryString = "SELECT project_id, project_number, project_name, rfq_loe_recv_date, prod_complete_date, current_project_status FROM dbo.ProjectInformation;";
                List<Object> returnList = new List<Object>();
                using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["cookbookDEVConnectionString1"].ToString()))
                {
                    SqlCommand command = new SqlCommand(queryString, connection);
                    connection.Open();
                    System.Data.SqlClient.SqlDataReader reader = command.ExecuteReader();

                    try
                    {
                        while (reader.Read())
                        {
                            //count++;
                            string project_id = reader["project_id"].ToString();
                            string project_number = reader["project_number"].ToString();
                            string project_name = reader["project_name"].ToString();
                            string rfq_loe_recv_date = reader["rfq_loe_recv_date"].ToString();
                            string prod_complete_date = reader["prod_complete_date"].ToString();
                            string current_project_status = reader["current_project_status"].ToString();
                            string scheduled_production_date = "", scheduled_uat_delivery = "", project_status="";

                            string queryString2 = "SELECT uat_date FROM dbo.UatProdInstall WHERE project_id=" + project_id + ";";
                            using (SqlConnection connection2 = new SqlConnection(ConfigurationManager.ConnectionStrings["cookbookDEVConnectionString1"].ToString()))
                            {
                                SqlCommand command2 = new SqlCommand(queryString2, connection2);
                                connection2.Open();
                                System.Data.SqlClient.SqlDataReader reader2 = command2.ExecuteReader();
                                try
                                {
                                    while (reader2.Read())
                                    {
                                        scheduled_production_date = reader2["uat_date"].ToString();
                                    }
                                }
                                catch (Exception ex)
                                {
                                    Console.WriteLine("  *ERROR (getEntryID): " + ex.Message);
                                }
                                finally
                                {
                                    // Always call Close when done reading.
                                    reader2.Close();
                                    connection2.Close();
                                }
                            }

                            string queryString3 = "SELECT scheduled_uat_delivery FROM dbo.SWDSchedule WHERE project_id=" + project_id + ";";
                            using (SqlConnection connection3 = new SqlConnection(ConfigurationManager.ConnectionStrings["cookbookDEVConnectionString1"].ToString()))
                            {
                                SqlCommand command3 = new SqlCommand(queryString3, connection3);
                                connection3.Open();
                                System.Data.SqlClient.SqlDataReader reader3 = command3.ExecuteReader();
                                try
                                {
                                    while (reader3.Read())
                                    {
                                        scheduled_uat_delivery = reader3["scheduled_uat_delivery"].ToString();
                                    }
                                }
                                catch (Exception ex)
                                {
                                    Console.WriteLine("  *ERROR (getEntryID): " + ex.Message);
                                }
                                finally
                                {
                                    // Always call Close when done reading.
                                    reader3.Close();
                                    connection3.Close();
                                }
                            }

                            if (current_project_status == null || current_project_status.Trim().Length < 1 || isNull(current_project_status))
                            {
                                string queryString4 = "SELECT t.type FROM dbo.ProjectStatus p join StatusType t on p.status_type_id=t.status_type_id where project_id=" + project_id + " ORDER BY p.date ASC;";
                                using (SqlConnection connection4 = new SqlConnection(ConfigurationManager.ConnectionStrings["cookbookDEVConnectionString1"].ToString()))
                                {
                                    SqlCommand command4 = new SqlCommand(queryString4, connection4);
                                    connection4.Open();
                                    System.Data.SqlClient.SqlDataReader reader4 = command4.ExecuteReader();
                                    try
                                    {
                                        while (reader4.Read())
                                        {
                                            project_status = reader4["type"].ToString();
                                        }
                                    }
                                    catch (Exception ex)
                                    {
                                        Console.WriteLine("  *ERROR (getEntryID): " + ex.Message);
                                    }
                                    finally
                                    {
                                        // Always call Close when done reading.
                                        reader4.Close();
                                        connection4.Close();
                                    }
                                }
                            }
                            else
                            {
                                project_status = current_project_status;
                            }


                            returnList.Add(new
                            {
                                project_id,
                                project_number,
                                project_name,
                                rfq_loe_recv_date,
                                prod_complete_date,
                                scheduled_production_date,
                                scheduled_uat_delivery,
                                project_status
                            });
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("  *ERROR (getEntryID): " + ex.Message);
                    }
                    finally
                    {
                        // Always call Close when done reading.
                        reader.Close();
                        connection.Close();
                    }
                }

                return new PagedData(returnList);
                /*

                List<Object> recordsToReturn = new List<Object>();
                List<ProjectInformation> projectInformationsList = q.ToList();

                foreach (ProjectInformation currentRec in projectInformationsList)
                {
                    string scheduled_production_date = "", scheduled_uat_delivery = "", project_status = "";
                    
                    if (db.SWDSchedules.Count(e => e.project_id == currentRec.project_id) > 0)
                    {
                        scheduled_uat_delivery = db.SWDSchedules.Single(e => e.project_id == currentRec.project_id).scheduled_uat_delivery;
                    }
                    if (db.UatProdInstalls.Count(e => e.project_id == currentRec.project_id) > 0)
                    {
                        scheduled_production_date = db.UatProdInstalls.Single(e => e.project_id == currentRec.project_id).uat_date;
                    }
                    if (db.ProjectStatus.Count(e => e.project_id == currentRec.project_id) > 0)
                    {
                        var ww = db.ProjectStatus.Where(e => e.project_id == currentRec.project_id).OrderByDescending(k => k.date).ToArray();
                        if (ww.Length > 0)
                        {
                            if (ww[0] != null)
                            {
                                if (ww[0].StatusType.type != null)
                                {
                                    project_status = ww[0].StatusType.type;
                                }
                            }
                        }
                    }
                    recordsToReturn.Add(new
                    {
                        currentRec.project_id,
                        currentRec.project_number,
                        currentRec.project_name,
                        currentRec.rfq_loe_recv_date,
                        currentRec.prod_complete_date,
                        scheduled_production_date,
                        scheduled_uat_delivery,
                        project_status
                    });
                }
                
                return new PagedData(recordsToReturn);

                */
                /*
                return new PagedData(q.Select(a => new
                {
                    a.project_id,
                    a.project_number,
                    a.project_name,
                    a.rfq_loe_recv_date,
                    a.prod_complete_date
                }));
                 * */
            }
        }
    }
}