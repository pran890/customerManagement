using System.Data;
using Microsoft.Data.SqlClient;
using System.Configuration;
using Microsoft.Extensions.Configuration;

namespace CRUD.Data
{
    public class Connection
    {

        private IConfiguration Configuration;
        public Connection()
        {

        }
        public Connection(IConfiguration _configuration)
        {
            Configuration = _configuration;
        }



        public SqlConnection GetConnection(string dbname)
        {
            SqlConnection connection = new SqlConnection(
             @$"Server=PRANAV-GUPTA\SQLEXPRESS;Database={dbname};User Id=sa;Password=ciitdc#1234;" +
             "TrustServerCertificate=True;" + "Encrypt=False;"

             );
            string connString = this.Configuration.GetConnectionString("MyConn");

            return connection;




        }
    }
}