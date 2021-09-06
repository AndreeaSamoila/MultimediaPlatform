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
    public class ConversationService : IConversationService
    {
        private readonly ISiteDbContext _dbContext;
        private readonly IUserService _userService;
        private readonly IHubContext<ChatHub> _hubContext;
        private const string ConversationsCacheKey = "conversations";



        public ConversationService(ISiteDbContext dbContext, IUserService userService, IHubContext<ChatHub> hubContext)
        {
            _dbContext = dbContext;
            _userService = userService;
            _hubContext = hubContext;
        }



        public IEnumerable<ConversationGetModel> GetUserConversations(string userName)
        {
            var user = _userService.GetUser(userName);
            var conversations = GetConversations(user.Id);

            return conversations.Select(c => FillConversation<ConversationGetModel>(c, userName, c => c.Text = GetLastMessage(c.Id)))
                .ToList();
        }

        public bool Exists(IEnumerable<string> participants, string userName = null)
        {
            var conversations = GetConversations();
            IList<string> testPart = participants.ToList();

            return conversations.Any(c =>
            {
                var convParts = GetParticipants(c.Id).ToList();

                return convParts.Count == testPart.Count && 
                       convParts.All(testPart.Contains) &&
                       (string.IsNullOrEmpty(userName) || c.Name == userName);
            });
        }



        public ConversationModel Get(int conversationId, string userName)
        {
            var conversation = GetConversations().FirstOrDefault(c => c.Id == conversationId);

            return FillConversation<ConversationModel>(conversation, userName);
        }



        public async ValueTask<ConversationModel> Create(string name, 
                                                    IEnumerable<string> participants, 
                                                    string userName, 
                                                    CancellationToken cancellationToken = default)
        {
            var newConv = new Conversation
                          {
                                Name = name
                          };

            _dbContext.Conversations.Add(newConv);
            _dbContext.SaveChanges();

            var newParticipants = participants.Union(new []{userName})
                        .Select(p => 
                        {
                            var user = _userService.GetUser(p);

                            return new UserInConversation
                            {
                                ConversationId = newConv.Id,
                                UserId = user.Id
                            };
                        })
                        .ToArray();
            _dbContext.UserInConversation.AddRange(newParticipants);
            _dbContext.SaveChanges();

            var model = Get(newConv.Id, userName);

            await _hubContext.Clients.All.SendAsync(ChatHub.SendMessageMethod, model, cancellationToken)
                                      .ConfigureAwait(false);

            return model;
        }



        public async ValueTask Delete(int conversationId, CancellationToken cancellationToken = default)
        {
            var conv = _dbContext.Conversations.FirstOrDefault(c => c.Id == conversationId);

            if (conv == null)
                return;

            _dbContext.Messages.RemoveRange(_dbContext.Messages.Where(m => m.ConversationId == conversationId));
            _dbContext.UserInConversation.RemoveRange(_dbContext.UserInConversation.Where(uic => uic.ConversationId == conversationId));
            _dbContext.Conversations.Remove(conv);

            _dbContext.SaveChanges();

            await _hubContext.Clients.All.SendAsync(ChatHub.DeleteConversationMethod, conv.Id, cancellationToken)
                             .ConfigureAwait(false);
        }



        private TConversation FillConversation<TConversation>(Conversation conversation, string user, Action<TConversation> aditional = null)
            where TConversation : ConversationModel, new()
        {
            var model = new TConversation
            {
                Id = conversation.Id,
                Name = conversation.Name,
                Text = GetLastMessage(conversation.Id)
            };

            if(model.Participants == null)
                model.Participants = GetParticipants(conversation.Id);

            if (string.IsNullOrEmpty(conversation.Name))
                model.Name = string.Join(", ", model.Participants.Where(p => p != model.CreatedBy));

            var participants = model.Participants as IList<string> ?? model.Participants.ToList();

            if(participants.Count == 2)
                model.Online = _userService.GetUser(participants.Single(p => p != user))?.Online ?? false;

            if(aditional != null)
                aditional(model);

            return model;
        }

        private IEnumerable<Conversation> GetConversations()
        {
            return _dbContext.Conversations.ToList();
        }

        private IEnumerable<Conversation> GetConversations(int userId)
        {
            var userInConversations = _dbContext.UserInConversation
                            .Where(uic => uic.UserId == userId)
                            .ToList()
                            .Select(uic => uic.ConversationId)
                            .Distinct()
                            .ToList();

            return _dbContext.Conversations.ToList()
                            .Where(c => userInConversations.Contains(c.Id))
                            .ToList();
        }

        private IEnumerable<string> GetParticipants(int conversationId)
        {
            return _dbContext.UserInConversation
                    .Where(uic => uic.ConversationId == conversationId)
                    .ToList()
                    .Select(uic => _userService.GetUser(uic.UserId)?.Name)
                    .Where(u => !string.IsNullOrEmpty(u))
                    .Distinct()
                    .ToList();
        }

        private string GetLastMessage(int conversationId)
        {
            return _dbContext.Messages
                    .Where(m => m.ConversationId == conversationId)
                    .OrderByDescending(m => m.SentAt)
                    .FirstOrDefault()?.Text;
        }
    }
}
