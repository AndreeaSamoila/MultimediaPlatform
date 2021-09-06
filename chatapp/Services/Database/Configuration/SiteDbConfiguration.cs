using ChatTest.App.Services.Database.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ChatTest.App.Services.Database.Configuration 
{
    internal class ConversationConfiguration : IEntityTypeConfiguration<Conversation>
    {
        public void Configure(EntityTypeBuilder<Conversation> builder)
        {
            builder.ToTable("tblconversatii")
                   .HasKey(c => c.Id);

            builder.Property(c => c.Id).HasColumnName("IdConversatie");
            builder.Property(c => c.Name).HasColumnName("NumeConversatie");
        }
    }

    internal class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("tblutilizator")
                   .HasKey(c => c.Id);

            builder.Property(c => c.Id).HasColumnName("IdUtilizator");
            builder.Property(c => c.Name).HasColumnName("NumeUtilizator");
            builder.Property(c => c.Email).HasColumnName("Email");
        }
    }

    internal class MessageConfiguration : IEntityTypeConfiguration<Message>
    {
        public void Configure(EntityTypeBuilder<Message> builder)
        {
            builder.ToTable("tblmesaj")
                   .HasKey(c => c.Id);

            builder.Property(c => c.Id).HasColumnName("IdMesaj");
            builder.Property(c => c.ConversationId).HasColumnName("UtilizatorDestinatar");
            builder.Property(c => c.Sender).HasColumnName("TrimisDeUtilizator");
            builder.Property(c => c.SentAt).HasColumnName("DataTrimitere");
            builder.Property(c => c.Text).HasColumnName("TextMesaj");
        }
    }

    internal class UserInConversationConfiguration : IEntityTypeConfiguration<UserInConversation>
    {
        public void Configure(EntityTypeBuilder<UserInConversation> builder)
        {
            builder.ToTable("tblutilizatoriinconversatie")
                   .HasKey(c => c.Id);

            builder.Property(c => c.Id).HasColumnName("id");
            builder.Property(c => c.ConversationId).HasColumnName("CodConversatie");
            builder.Property(c => c.UserId).HasColumnName("CodUtilizatorInConversatie");
        }
    }
}