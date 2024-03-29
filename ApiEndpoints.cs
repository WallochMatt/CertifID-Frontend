using CertifID.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace CertifID
{
    public static class ApiEndpoints
    {

        [FunctionName(nameof(GetUsers))]
        public static async Task<IActionResult> GetUsers(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = $"api/{nameof(GetUsers)}")] HttpRequest req,
            ILogger log)
        {


            string fakeDatabaseCall = @"
            
                [
                    {
                      ""firstName"" : ""Matthew"",
                      ""lastName"" : ""Walloch"",
                      ""location"" : ""South Milwaukee"",
                      ""group"" : 2,
                      ""title"" : ""Software Engineer"",
                    },
                    {
                      ""firstName"" : ""Chris"",
                      ""lastName"" : ""Walloch"",
                      ""location"" : ""South Milwaukee"",
                      ""group"" : 2,
                      ""title"" : ""Sr Software Engineer"",
                    },
                ]
            ";

            List<User> UserListObj = JsonConvert.DeserializeObject<List<User>>(fakeDatabaseCall);

            string UserListStr = JsonConvert.SerializeObject(UserListObj);

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);

            return new OkObjectResult(UserListStr);
        }

        [FunctionName(nameof(GetGroups))]
        public static async Task<IActionResult> GetGroups(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = $"api/{nameof(GetGroups)}")] HttpRequest req,
            ILogger log)
        {


            string fakeDatabaseCall = @"
            
                [
                    {
                        ""name"" : ""Web Application Team"",
                        ""department"" : ""Software Development"",
                        ""status"" : ""Active"",
                        ""objective"" : ""Create and maintain buisness site""
                    },
                    {
                        ""name"" : ""Security Education"",
                        ""department"" : ""Security"",
                        ""status"" : ""Active"",
                        ""objective"" : ""Train security personel""
                    },
                    {
                        ""name"" : ""MKE Maintenence"",
                        ""department"" : ""Maintenence"",
                        ""status"" : ""Active"",
                        ""objective"" : ""Maintain facility functionality and hygiene""
                    }
                ]
            ";

            List<Group> GroupListObj = JsonConvert.DeserializeObject<List<Group>>(fakeDatabaseCall);

            string GroupListStr = JsonConvert.SerializeObject(GroupListObj);

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);

            return new OkObjectResult(GroupListStr);
        }

        [FunctionName(nameof(GetLocations))]

        public static async Task<IActionResult> GetLocations(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = $"api/{nameof(GetLocations)}")] HttpRequest req,
            ILogger log)
        {


            string fakeDatabaseCall = @"
            
                [
                    //{
                    //    ""id"" : 1,
                    //    ""city"" : ""Milwaukee"",
                    //    ""state"" : ""WI"",
                    //    ""address"" : "" 777 E Wisconsin Ave"",
                    //    ""zip"" : ""53202"",
                    //    // ""associatedGroup"" : [groups[0], groups[1]],
                    //    ""accessPoints"" : [
                    //        {
                    //        ""entrance"" : ""Main Entrance"",
                    //        ""group"" : groups[0].name,
                    //        },
                    //        {
                    //        ""entrance"" : ""Back Entrance"",
                    //        ""group"" : groups[2].name,
                    //        }
                    //}

                    {
                        ""id"" : 1,
                        ""city"" : ""Milwaukee"",
                        ""state"" : ""WI"",
                        ""address"" : ""777 E Wisconsin Ave"",
                        ""zip"" : ""53202"",
                        ""accessPoints"" : []
                    },


                 ]
            ";

            List<Location> LocationListObj = JsonConvert.DeserializeObject<List<Location>>(fakeDatabaseCall);

            string LocationListStr = JsonConvert.SerializeObject(LocationListObj);

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);

            return new OkObjectResult(LocationListStr);
        }
    }
}
