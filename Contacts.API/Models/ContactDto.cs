namespace Contacts.API.Models
{
    public class ContactDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public UserDto User { get; set; }
        public string ContactCategory { get; set; }
        public string? BusinessContactSubCategory { get; set; }
        public string? SubCategoryName { get; set; }
    }
}
