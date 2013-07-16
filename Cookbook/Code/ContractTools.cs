using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

public class ContractTools
{
    // return negative number if fails to parse
    public static int parseRequestIntID(HttpRequest request, string paramStr, bool required)
    {
        int tempInt = -1;
        if (request.Params[paramStr] != null && request.Params[paramStr] != "")
        {
            if (Int32.TryParse(request.Params[paramStr], out tempInt))
            {
                return tempInt;
            }
            else
            {
                if (required)
                {
                    throw new ArgumentException("Error parsing " + paramStr);
                }
                else
                {
                    return -1;
                }
            }
        }
        else
        {
            if (required)
            {
                throw new ArgumentException("Missing required parameter " + paramStr);
            }
            else
            {
                return -2;
            }
        }
    }

    // return empty string if fails to parse
    public static string parseRequestString(HttpRequest request, string paramStr, bool required)
    {
        if (request.Params[paramStr] != null && request.Params[paramStr] != "")
        {
            return request.Params[paramStr];
        }
        else
        {
            if (required)
            {
                throw new ArgumentException("Missing required parameter " + paramStr);
            }
            else
            {
                return "";
            }
        }
    }

    public static string escapeDBString(string value)
    {
        return value.Replace("'", "''");
    }

    public static int getCustomerIDByName(string name, string connStr)
    {
        int customerID = -1;
        int count = 0;
        //Console.WriteLine("Quering AccessUSAN for latest information on all tables...");
        string queryString = "SELECT customer_id FROM dbo.ContractCustomers WHERE customer_name = '" + name + "';";
        using (SqlConnection connection = new SqlConnection(connStr))
        {
            SqlCommand command = new SqlCommand(queryString, connection);
            connection.Open();
            SqlDataReader reader = command.ExecuteReader();
            try
            {
                while (reader.Read())
                {
                    count++;
                    if (!Int32.TryParse(reader[0].ToString(), out customerID))
                    {
                        customerID = -1;
                    }
                    if (count > 2)
                    {
                        throw new Exception("ERROR: Multiple customers with the same name: " + name);
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                // Always call Close when done reading.
                reader.Close();
                connection.Close();
            }
        }
        return customerID;
    }

    public static int addCustomer(string customer_name, int customer_type_id, string connStr)
    {
        bool insertFailed = false;
        int custID = -1;
        string errorMessage = "";
        string queryString = "INSERT INTO ContractCustomers (customer_name, customer_type) VALUES ('" +
            ContractTools.escapeDBString(customer_name) + "'," + customer_type_id + "); SELECT CAST(scope_identity() AS int);";
        using (SqlConnection connection = new SqlConnection(connStr))
        {
            try
            {
                SqlCommand command = new SqlCommand(queryString, connection);
                connection.Open();
                int result = Convert.ToInt32(command.ExecuteScalar());
                custID = result;
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
        return custID;
    }

    public static List<T> parseJSONArray<T>(HttpRequest request, string name, bool required)
    {
        List<T> values = new List<T>();
        string value = request.Params[name];

        if (value != null)
        {
            try
            {
                values = JsonConvert.DeserializeObject<List<T>>(value);
            }
            catch (Exception e)
            {
                throw new ArgumentException("Request parameter " + name + " ('" + value + "') contains an invalid value. (" + e.Message + ")");
            }
        }
        else if (required)
        {
            throw new ArgumentException("Request parameter " + name + " is required.");
        }

        return values;
    }
}