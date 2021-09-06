using System;
using System.Collections.Concurrent;
using System.Collections.Generic;

namespace ChatTest.App.Models
{
    public class ConversationModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Text { get; set; }

        public bool? Online { get; set; }

        public string CreatedBy { get; set; }

        public IEnumerable<string> Participants { get; set; }

        public ConcurrentDictionary<string, DateTime> Reads { get; set; }



        public ConversationModel()
        {
            Reads = new ConcurrentDictionary<string, DateTime>();
        }
    }
}
