using System.Reflection;
using Microsoft.Data.SqlClient;

namespace Wak.Api.Data.Helpers;

public interface IDbHelper
{
    void Connect();
    DataTable ExecuteProcToTable(string procName, params SqlParameter[] parameters);
    Task<DataTable> ExecuteProcToTableAsync(string procName, params SqlParameter[] parameters);
    List<T> ExecuteProcToList<T>(string procName, params SqlParameter[] parameters);
    Task<List<T>> ExecuteProcToListAsync<T>(string procName, params SqlParameter[] parameters);
    List<T> ExecuteTextToList<T>(string queryText);
    Task<List<T>> ExecuteTextToListAsync<T>(string queryText);
    int ExecuteProcNonQuery(string procName, List<SqlParameter> lstParam);
    Task<int> ExecuteProcNonQueryAsync(string procName, List<SqlParameter> lstParam);

    void Dispose();
}

public class SqlDbHelper : IDbHelper
{
    private readonly IConfiguration _configuration;

    public SqlDbHelper(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    #region Create connection

    private static SqlConnection connection = new SqlConnection();

    public void Connect()
    {
        if (connection.State == ConnectionState.Closed)
        {
            connection.ConnectionString = _configuration.GetConnectionString("WakConnect");
            connection.Open();
        }
    }

    #endregion Create connection

    #region Execute Store Procedure And Convert Result to DataTable

    public DataTable ExecuteProcToTable(string procName, params SqlParameter[] parameters)
    {
        var result = new DataTable();

        using (var sqlCommand = connection.CreateCommand())
        {
            sqlCommand.CommandType = CommandType.StoredProcedure;
            sqlCommand.CommandText = procName;
            if (parameters != null)
                sqlCommand.Parameters.AddRange(parameters);

            Connect();

            var reader = sqlCommand.ExecuteReader();
            result.Load(reader);

            return result;
        }
    }

    public async Task<DataTable> ExecuteProcToTableAsync(string procName, params SqlParameter[] parameters)
    {
        var result = new DataTable();

        using (var sqlCommand = connection.CreateCommand())
        {
            sqlCommand.CommandType = CommandType.StoredProcedure;
            sqlCommand.CommandText = procName;
            if (parameters != null)
                sqlCommand.Parameters.AddRange(parameters);

            Connect();

            var reader = await sqlCommand.ExecuteReaderAsync();
            result.Load(reader);

            return result;
        }
    }

    #endregion Execute Store Procedure And Convert Result to DataTable

    #region Execute Store Procedure And Convert Result to List<T>

    public List<T> ExecuteProcToList<T>(string procName, params SqlParameter[] parameters)
    {
        Type objType = typeof(T);
        List<T> collection = new List<T>();

        using (var sqlCommand = connection.CreateCommand())
        {
            sqlCommand.CommandType = CommandType.StoredProcedure;
            sqlCommand.CommandText = procName;
            if (parameters != null)
                sqlCommand.Parameters.AddRange(parameters);

            Connect();

            using (var reader = sqlCommand.ExecuteReader())
            {
                // get our object type's properties
                PropertyInfo[] properties = objType.GetProperties();
                while (reader.Read())
                {
                    // create an instance of our object
                    T item = (T)Activator.CreateInstance(objType);

                    // set the object's properties as they are found.
                    foreach (PropertyInfo property in properties)
                    {
                        Type pType = property.PropertyType;
                        property.SetValue(item, reader[property.Name]);
                    }
                    collection.Add(item);
                }
            }
            return collection;
        }
    }

    public async Task<List<T>> ExecuteProcToListAsync<T>(string procName, params SqlParameter[] parameters)
    {
        Type objType = typeof(T);
        List<T> collection = new List<T>();

        using (var sqlCommand = connection.CreateCommand())
        {
            sqlCommand.CommandType = CommandType.StoredProcedure;
            sqlCommand.CommandText = procName;
            if (parameters != null)
                sqlCommand.Parameters.AddRange(parameters);

            Connect();

            using (var reader = await sqlCommand.ExecuteReaderAsync())
            {
                // get our object type's properties
                PropertyInfo[] properties = objType.GetProperties();
                while (reader.Read())
                {
                    // create an instance of our object
                    T item = (T)Activator.CreateInstance(objType);

                    // set the object's properties as they are found.
                    foreach (PropertyInfo property in properties)
                    {
                        Type pType = property.PropertyType;
                        property.SetValue(item, reader[property.Name]);
                    }
                    collection.Add(item);
                }
            }
            return collection;
        }
    }

    #endregion Execute Store Procedure And Convert Result to List<T>

    #region Execute Text Query And Convert Result to List<T>

    public List<T> ExecuteTextToList<T>(string queryText)
    {
        Type objType = typeof(T);
        List<T> collection = new List<T>();

        using (var sqlCommand = connection.CreateCommand())
        {
            sqlCommand.CommandType = CommandType.StoredProcedure;
            sqlCommand.CommandText = queryText;

            Connect();

            using (var reader = sqlCommand.ExecuteReader())
            {
                // get our object type's properties
                PropertyInfo[] properties = objType.GetProperties();
                while (reader.Read())
                {
                    // create an instance of our object
                    T item = (T)Activator.CreateInstance(objType);

                    // set the object's properties as they are found.
                    foreach (PropertyInfo property in properties)
                    {
                        Type pType = property.PropertyType;
                        property.SetValue(item, reader[property.Name]);
                    }
                    collection.Add(item);
                }
            }
            return collection;
        }
    }

    public async Task<List<T>> ExecuteTextToListAsync<T>(string queryText)
    {
        Type objType = typeof(T);
        List<T> collection = new List<T>();

        using (var sqlCommand = connection.CreateCommand())
        {
            sqlCommand.CommandType = CommandType.StoredProcedure;
            sqlCommand.CommandText = queryText;

            Connect();

            using (var reader = await sqlCommand.ExecuteReaderAsync())
            {
                // get our object type's properties
                PropertyInfo[] properties = objType.GetProperties();
                while (reader.Read())
                {
                    // create an instance of our object
                    T item = (T)Activator.CreateInstance(objType);

                    // set the object's properties as they are found.
                    foreach (PropertyInfo property in properties)
                    {
                        Type pType = property.PropertyType;
                        property.SetValue(item, reader[property.Name]);
                    }
                    collection.Add(item);
                }
            }
            return collection;
        }
    }

    #endregion

    #region Execute Non Query for Store Procedure

    public int ExecuteProcNonQuery(string procName, List<SqlParameter> lstParam)
    {
        Connect();

        SqlTransaction transaction = connection.BeginTransaction(IsolationLevel.ReadCommitted);
        try
        {
            using (var cmd = new SqlCommand(procName, connection))
            {
                cmd.Transaction = transaction;
                cmd.CommandType = CommandType.StoredProcedure;
                if (lstParam.Count > 0)
                {
                    foreach (var param in lstParam)
                    {
                        cmd.Parameters.Add(param);
                    }
                }

                var result = cmd.ExecuteNonQuery();
                transaction.Commit();
                return result;
            }
        }
        catch (Exception)
        {
            transaction.Rollback();
            return 0;
        }
    }

    public async Task<int> ExecuteProcNonQueryAsync(string procName, List<SqlParameter> lstParam)
    {
        Connect();

        SqlTransaction transaction = connection.BeginTransaction(IsolationLevel.ReadCommitted);
        try
        {
            using (var cmd = new SqlCommand(procName, connection))
            {
                cmd.Transaction = transaction;
                cmd.CommandType = CommandType.StoredProcedure;
                if (lstParam.Count > 0)
                {
                    foreach (var param in lstParam)
                    {
                        cmd.Parameters.Add(param);
                    }
                }

                var result = await cmd.ExecuteNonQueryAsync();
                transaction.Commit();
                return result;
            }
        }
        catch (Exception)
        {
            transaction.Rollback();
            return 0;
        }
    }

    #endregion Execute Non Query for Store Procedure

    #region Close the connection

    public void Dispose()
    {
        if (connection.State == ConnectionState.Open) connection.Close();
    }

    #endregion Close the connection
}