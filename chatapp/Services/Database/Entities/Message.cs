using System;

namespace ChatTest.App.Services.Database.Entities
{
    public class Message
    {
        public int Id { get; set; }

        public int ConversationId {get;set;}

        public DateTime SentAt {get;set;} 

        public int Sender {get;set;}

        public string Text { get; set; }
    }
}