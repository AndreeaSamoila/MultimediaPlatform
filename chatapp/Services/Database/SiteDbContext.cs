using ChatTest.App.Services.Database.Configuration;
using ChatTest.App.Services.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace ChatTest.App.Services.Database
{
    public interface ISiteDbContext
    {
        DbSet<Conversation> Conversations { get; set; }
        DbSet<Message> Messages { get; set; }
        DbSet<User> User { get; set; }
        DbSet<UserInConversation> UserInConversation { get; set; }

        void SaveChanges();
    }

    public class SiteDbContext : DbContext, ISiteDbContext
    {
        public DbSet<Conversation> Conversations { get; set; }

        public DbSet<Message> Messages { get; set; }

        public DbSet<User> User { get; set; }

        public DbSet<UserInConversation> UserInConversation { get; set; }

        public SiteDbContext(DbContextOptions<SiteDbContext> options)
            : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new ConversationConfiguration());
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new MessageConfiguration());
            modelBuilder.ApplyConfiguration(new UserInConversationConfiguration());
        }

        void ISiteDbContext.SaveChanges() => SaveChanges();
    }
}