using System;

namespace ChatTest.App.Models
{
    public class MessageModel
    {
        public int  Id { get; set; }

        public int ConversationId { get; set; }

        public string Text { get; set; }

        public string Sender { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
