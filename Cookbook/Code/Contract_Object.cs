using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;

public class Contract_Object
{
    public int contract_id;
    public string contract_title;
    public int customer_id;
    public int customer_type_id;
    public string customer_name;
    public string contract_type;
    public string status;
    public string description;
    public string terms;
    public string directory;
    public List<Contract_Date_Object> contract_dates;
    private bool isLoaded;

    public Contract_Object()
    {
        isLoaded = false;
    }

    // load contract from http request
    public bool loadContract(HttpRequest request)
    {
        contract_id = ContractTools.parseRequestIntID(request, "contract_id", false);
        customer_id = ContractTools.parseRequestIntID(request, "customer_id", false);
        customer_type_id = ContractTools.parseRequestIntID(request, "customer_type_id", false);
        customer_name = ContractTools.parseRequestString(request, "customer_name", false);
        contract_title = ContractTools.parseRequestString(request, "contract_title", true);
        contract_type = ContractTools.parseRequestString(request, "contract_type", true);
        status = ContractTools.parseRequestString(request, "status", true);
        description = ContractTools.parseRequestString(request, "description", false);
        terms = ContractTools.parseRequestString(request, "terms", false);
        directory = ContractTools.parseRequestString(request, "directory", false);
        contract_dates = ContractTools.parseJSONArray<Contract_Date_Object>(request, "contract_dates", false);
        if (customer_name == "" && customer_id < 0)
        {
            throw new ArgumentException("Provide either customer_id or customer_name");
        }
        if (customer_id < 0 && customer_type_id < 0)
        {
            throw new ArgumentException("When creating new customer - provide customer_type_id");
        }
        return true;
    }

    public int commit(string connStr, int userID)
    {
        // lets get customer_id
        if (customer_id < 0)
        {
            if (customer_name != "" && customer_type_id >= 0)
            {
                int tempCustID = ContractTools.getCustomerIDByName(customer_name, connStr);
                if (tempCustID < 0)
                {
                    customer_id = ContractTools.addCustomer(customer_name, customer_type_id, connStr);
                }
                else
                {
                    customer_id = tempCustID;
                }
            }
            else
            {
                throw new ArgumentException("Need both - customer_name and customer_type_id to create a new customer");
            }
        }
        bool insertNeeded = true;
        if (contract_id > 0)
        {
            insertNeeded = false;
        }

        if (insertNeeded)
        {
            bool insertFailed = false;
            string errorMessage = "";
            string queryString = "INSERT INTO Contracts (contract_title, customer_id, contract_type, status, description, terms, directory, created_by) VALUES ('" +
                ContractTools.escapeDBString(contract_title) + "'," + customer_id + ",'" + ContractTools.escapeDBString(contract_type) + "','" + ContractTools.escapeDBString(status) +
                "','" + ContractTools.escapeDBString(description) + "','" + ContractTools.escapeDBString(terms) + "','" + ContractTools.escapeDBString(directory) + "', " + userID + "); SELECT CAST(scope_identity() AS int);";
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
            string queryString = "UPDATE Contracts " + 
                "SET contract_title='" + ContractTools.escapeDBString(contract_title) + "', " + 
                "customer_id="+customer_id + ","+
                "contract_type='" + ContractTools.escapeDBString(contract_type) + "', " +
                "status='" + ContractTools.escapeDBString(status) + "', " +
                "description='" + ContractTools.escapeDBString(description) + "', " +
                "terms='" + ContractTools.escapeDBString(terms) + "', " +
                "directory='" + ContractTools.escapeDBString(directory) + "' " + 
                "WHERE contract_id="+contract_id+";";
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
        foreach (Contract_Date_Object dateObject in contract_dates)
        {
            dateObject.contract_id = contract_id;
            dateObject.commit(connStr);
        }
        return contract_id;
    }

    public bool isContactLoaded()
    {
        return isLoaded;
    }
}
