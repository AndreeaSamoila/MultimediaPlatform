﻿using System;
using System.Threading.Tasks;
using ChatTest.App.Services;
using Microsoft.AspNetCore.SignalR;

namespace ChatTest.App.Hubs
{
    public class ChatHub : Hub
    {
        private const string userIdKey = "userId";
        private readonly IUserService _userService;
        public const string SendMessageMethod = "messageReceived";
        public const string NewConversationMethod = "conversationRecieved";
        public const string DeleteConversationMethod = "conversationRemoved";
        public const string UserConnectedMethod = "userConnected";
        public const string UserDisconnectedMethod = "userDisconnected";



        public ChatHub(IUserService userService)
        {
            _userService = userService;
        }



        public async Task UserConnected()
        {
            var user = _userService.GetUserByConnection(Context.ConnectionId);

            if (user == null)
                return;

            await Clients.All.SendAsync(UserConnectedMethod, user.Name);
        }



        public override async Task OnConnectedAsync()
        {
            try
            {
                var user = _userService.GetUserByConnection(Context.ConnectionId);

                if (user == null)
                {
                    if(!Context.Items.ContainsKey(userIdKey))
                        return;

                    user = _userService.CreateUserSession(Context.ConnectionId, Context.Items[userIdKey].ToString());
                }

                await Clients.All.SendAsync(UserConnectedMethod, user.Name);
            }
            finally
            {
                await base.OnConnectedAsync();
            }
        }



        public override async Task OnDisconnectedAsync(Exception exception)
        {
            try
            {
                var user = _userService.GetUserByConnection(Context.ConnectionId);

                if (user == null)
                    return;

                _userService.RemoveSession(user.ConnectionId);

                await Clients.All.SendAsync(UserDisconnectedMethod, user.Name);
            }
            finally
            {
                await base.OnDisconnectedAsync(exception);
            }
        }
    }
}
