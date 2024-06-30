// Data/UserRepository.cs
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Reflection;
using System.Threading.Tasks;
using Management.Models;
using Microsoft.Extensions.Configuration;

namespace Db.Data
{
    public class UserRepository
    {
        private readonly string _connectionString;

        public UserRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

     

        public User GetUser(string email, string password)
        {
            Console.WriteLine(email);
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                // string query =
                //     // "SELECT  u.UserId,u.Username, u.Email, r.RoleName  FROM   Users u JOIN Roles r ON u.RoleId = r.RoleId where u.Email=@Email and u.Password=@Password";
                string query = "SELECT u.UserId,  u.Username,    u.Email,     r.RoleName FROM      Users u JOIN     UserRoles ur ON u.UserId = ur.UserId JOIN    Roles r ON ur.RoleId = r.RoleId WHERE   u.Email = @Email  AND u.Password = @Password";


                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@Email", email);
                command.Parameters.AddWithValue("@Password", password);

                using (SqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        return new User
                        {
                            Id = (int)reader["UserId"],
                            Name = (string)reader["UserName"],
                            Email = (string)reader["Email"],
                            Role = (string)reader["RoleName"]
                        };
                    }
                }
            }
            Console.WriteLine("hello");
            return null;
        }

        public List<string> GetPrivilegesByRoleIdAsync(int roleId)
        {
            Console.WriteLine(roleId);
            var privileges = new List<string>();

            using (var connection = new SqlConnection(_connectionString))
            {
                var command = new SqlCommand("usp_GetPrivilegesByRoleId", connection)
                {
                    CommandType = CommandType.StoredProcedure
                };
                command.Parameters.AddWithValue("@Id", roleId);

                connection.Open();
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        privileges.Add(reader.GetString(0));
                    }
                }
            }
            Console.WriteLine("lm");
            foreach (var privilege in privileges)
            {
                Console.WriteLine(privilege);
            }
            return privileges;
        }
    }
}
