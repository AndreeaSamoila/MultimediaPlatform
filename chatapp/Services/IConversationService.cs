using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using ChatTest.App.Models;

namespace ChatTest.App.Services
{
    public interface IConversationService
    {
        IEnumerable<ConversationGetModel> GetUserConversations(string userName);
        bool Exists(IEnumerable<string> participants, string name = null);
        ValueTask<ConversationModel> Create(string name, IEnumerable<string> participants, string userName, CancellationToken cancellationToken = default);
        ConversationModel Get(int conversationId, string userName);
        ValueTask Delete(int conversationId, CancellationToken cancellationToken = default);
    }
}