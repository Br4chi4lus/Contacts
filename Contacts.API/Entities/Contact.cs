namespace Contacts.API.Entities
{
    public class Contact
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int OwnerId { get; set; }
        public User Owner { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int CategoryId { get; set; }
        public ContactCategory Category { get; set; }
        public int? SubCategoryId { get; set; }
        public BusinessContactSubCategory SubCategory { get; set; }
        public string? SubCategoryName { get; set; }
    }
}
