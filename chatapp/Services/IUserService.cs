using System.Collections.Generic;
using ChatTest.App.Models;

namespace ChatTest.App.Services
{
    public interface IUserService
    {
        UserModel GetUser(int userId);
        UserModel GetUser(string userName);
        UserModel GetUserByToken(string userToken);
        UserModel GetUserByConnection(string connectionId);
        IEnumerable<UserModel> GetAll();
        UserModel CreateUserSession(string connectionId, string userId);
        bool RemoveSession(string connectionId);
        bool IsValid(UserModel user);
    }
}