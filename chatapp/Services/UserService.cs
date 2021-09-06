using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using ChatTest.App.Models;
using ChatTest.App.Services.Database;
using ChatTest.App.Services.Database.Entities;

namespace ChatTest.App.Services
{
    public class UserService : IUserService
    {
        private readonly ISiteDbContext _dbContext;
        private readonly ITokenGenerator _tokenGenerator;
        private const string UsersCacheKey = "users";

        private static readonly ConcurrentDictionary<string, int> _connectionIdsMap = new ConcurrentDictionary<string, int>();


        public UserService(ISiteDbContext dbContext, ITokenGenerator tokenGenerator)
        {
            _dbContext = dbContext;
            _tokenGenerator = tokenGenerator;
        }
        public UserModel GetUser(int userId)
        {
            return Map(_dbContext.User.FirstOrDefault(u => u.Id == userId));
        }

        public UserModel GetUser(string userName)
        {
            return Map(_dbContext.User.FirstOrDefault(u => u.Name == userName));
        }



        public UserModel GetUserByToken(string userToken)
        {
            var userName = _tokenGenerator.GetName(userToken);

            return Map(_dbContext.User.FirstOrDefault(u => u.Name == userName),
                       u => u.Token = userToken);
        }


        public UserModel GetUserByConnection(string connectionId)
        {
            if (!_connectionIdsMap.TryGetValue(connectionId, out var id))
                return null;

            return GetUser(id);
        }



        public IEnumerable<UserModel> GetAll()
        {
            return _dbContext.User.ToList().Select(u => Map(u)).ToList();
        }



        public bool IsValid(UserModel user) => _tokenGenerator.IsValid(user.Token);

        public UserModel CreateUserSession(string connectionId, string userId)
        {
            if (!int.TryParse(userId, out var uid))
                return null;

            var user = GetUser(uid);

            if (_connectionIdsMap.ContainsKey(connectionId))
                _connectionIdsMap[connectionId] = uid;
            else if (_connectionIdsMap.Values.Contains(uid))
            {
                var kvp = _connectionIdsMap.First(kvp => kvp.Value == uid);

                if (_connectionIdsMap.TryRemove(kvp.Key, out uid))
                    _connectionIdsMap.TryAdd(connectionId, uid);
            }
            else
                _connectionIdsMap.TryAdd(connectionId, uid);

            return user;
        }

        public bool RemoveSession(string connectionId)
        {
            return _connectionIdsMap.TryRemove(connectionId, out _);
        }

        private UserModel Map(User user, Action<UserModel> aditional = null)
        {
            if (user == null)
                return null;

            var connectionId = _connectionIdsMap.FirstOrDefault(kvp => kvp.Value == user.Id).Key;

            var userModel = new UserModel
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                ConnectionId = connectionId,
                Online = !string.IsNullOrEmpty(connectionId)
            };

            aditional?.Invoke(userModel);

            return userModel;
        }
    }
}
