using Microsoft.EntityFrameworkCore;
namespace Contacts.API.Entities
{
    public class ContactsDbContext : DbContext
    {
        public ContactsDbContext(DbContextOptions<ContactsDbContext> options) : base(options) {}

        public DbSet<Contact> Contact { get; set; }
        public DbSet<BusinessContactSubCategory> BusinessContactSubCategory { get; set; }
        public DbSet<ContactCategory> ContactCategory { get; set; }
        public DbSet<User> User { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BusinessContactSubCategory>()
                .HasData(
                new BusinessContactSubCategory() { Id = 1, Name = "Boss" },
                new BusinessContactSubCategory() { Id = 2, Name = "Client"},
                new BusinessContactSubCategory() { Id = 3, Name = "Coworker" }
                );
            modelBuilder.Entity<ContactCategory>()
                .HasData(
                new ContactCategory() { Id = (int)ContactCategoryEnum.Private, Name = "Private" },
                new ContactCategory() { Id = (int)ContactCategoryEnum.Business, Name = "Business" },
                new ContactCategory() { Id = (int)ContactCategoryEnum.Other, Name = "Other" }
                );
        }
    }
}
