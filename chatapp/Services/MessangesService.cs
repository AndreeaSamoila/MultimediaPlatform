using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ChatTest.App.Hubs;
using ChatTest.App.Models;
using ChatTest.App.Services.Database;
using ChatTest.App.Services.Database.Entities;
using Microsoft.AspNetCore.SignalR;

namespace ChatTest.App.Services
{
    public class MessangesService : IMessangesService
    {
        private readonly ISiteDbContext _dbContext;
        private readonly IConversationService _conversationService;
        private readonly IUserService _userService;
        private readonly IHubContext<ChatHub> _hubContext;
        private const string MessangesCacheKey = "messages";



        public MessangesService(ISiteDbContext dbContext,
                                IConversationService conversationService,
                                IUserService userService,
                                IHubContext<ChatHub> hubContext)
        {
            _dbContext = dbContext;
            _conversationService = conversationService;
            _userService = userService;
            _hubContext = hubContext;
        }

        public IEnumerable<MessageGetModel> GetMessages(int conversationId, string userName)
        {
            return _dbContext.Messages.Where(m => m.ConversationId == conversationId)
                        .ToList()
                        .Select(m =>
                        {
                            var sender = _userService.GetUser(m.Sender)?.Name;
                            return new MessageGetModel
                            {
                                Id = m.Id,
                                CreatedAt = m.SentAt,
                                Text = m.Text,
                                Sender = sender,
                                ConversationId = m.ConversationId,
                                IsMine = sender == userName
                            };
                        });
        }



        public async ValueTask Create(string userName, int conversationId, string text, CancellationToken cancellationToken = default)
        {
            var messageModel = new MessageModel
            {
                CreatedAt = DateTime.UtcNow,
                Sender = userName,
                ConversationId = conversationId,
                Text = text
            };

            ConversationModel conv = _conversationService.Get(conversationId, userName);

            if (conv != null)
            {
                conv.Text = text;
                conv.Reads.Clear();

                List<string> users = conv.Participants
                                         .Where(p => p != messageModel.Sender)
                                         .Select(_userService.GetUser)
                                         .Where(u => u != null)
                                         .Select(u => u.ConnectionId)
                                         .ToList();

                if (users.Count > 0)
                    //Users(users)
                    await _hubContext.Clients.All.SendAsync(ChatHub.SendMessageMethod, messageModel, cancellationToken)
                                     .ConfigureAwait(false);
            }

            var user = _userService.GetUser(userName);

            var message = new Message
            {
                ConversationId = conversationId,
                Sender = user.Id,
                SentAt = messageModel.CreatedAt,
                Text = messageModel.Text
            };

            _dbContext.Messages.Add(message);

            _dbContext.SaveChanges();
        }
    }
}
