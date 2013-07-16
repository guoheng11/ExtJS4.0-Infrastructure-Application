using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;

public class Contract_Date_Object
{
    public int date_id;
    public int contract_id;
    public string date_name;
    public DateTime? date_due;
    public bool alert_required;
    public DateTime? alert_due;

    private bool isLoaded;

    public Contract_Date_Object()
    {
        isLoaded = false;
    }

    // load contract from http request
    public bool loadObject(HttpRequest request)
    {
        return true;
    }

    public int commit(string connStr)
    {
        bool insertNeeded = true;
        if (date_id > 0)
        {
            insertNeeded = false;
        }

        if (insertNeeded)
        {
            bool insertFailed = false;
            string errorMessage = "";
            string dateDueStr = "NULL";
            string alertDueStr = "NULL";
            int alertReqInt = 0;
            if (alert_required)
            {
                alertReqInt = 1;
            }
            if (date_due.HasValue)
            {
                dateDueStr = "'" + date_due.Value.ToString("s") + "'";
            }
            if (alert_due.HasValue)
            {
                alertDueStr = "'" + alert_due.Value.ToString("s") + "'";
            }
            string queryString = "INSERT INTO ContractDates (contract_id, date_name, date_due, alert_required, alert_due) VALUES (" +
                contract_id + ",'" + date_name + "'," + dateDueStr + "," + alertReqInt +
                "," + alertDueStr + "); SELECT CAST(scope_identity() AS int);";
            using (SqlConnection connection = new SqlConnection(connStr))
            {
                try
                {
                    SqlCommand command = new SqlCommand(queryString, connection);
                    connection.Open();
                    int result = Convert.ToInt32(command.ExecuteScalar());
                    contract_id = result;
                    connection.Close();
                }
                catch (Exception ex)
                {
                    insertFailed = true;
                    errorMessage = ex.Message;
                }
            }
            if (insertFailed)
            {
                throw new Exception(errorMessage);
            }
        }
        else
        {
            bool updateFailed = false;
            string errorMessage = "";
            string dateDueStr = "NULL";
            string alertDueStr = "NULL";
            int alertReqInt = 0;
            if (alert_required)
            {
                alertReqInt = 1;
            }
            if (date_due.HasValue)
            {
                dateDueStr = "'" + date_due.Value.ToString("s") + "'";
            }
            if (alert_due.HasValue)
            {
                alertDueStr = "'" + alert_due.Value.ToString("s") + "'";
            }
            string queryString = "UPDATE ContractDates " + 
                "SET date_name='" + date_name + "', " +
                "date_due=" + dateDueStr + "," +
                "alert_required=" + alertReqInt + ", " +
                "alert_due=" + alertDueStr + " " +
                "WHERE date_id="+date_id+";";
            using (SqlConnection connection = new SqlConnection(connStr))
            {
                try
                {
                    SqlCommand command = new SqlCommand(queryString, connection);
                    connection.Open();
                    command.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    updateFailed = true;
                    errorMessage = ex.Message;
                }
            }
            if (updateFailed)
            {
                throw new Exception(errorMessage);
            }
        }
        return date_id;
    }

    public bool isContactLoaded()
    {
        return isLoaded;
    }
}