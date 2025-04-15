namespace Contacts.API.Models
{
    public class UpdateContactDto
    {
        public string? Name { get; set; }
        public int? CategoryId { get; set; }
        public int? SubCategoryId { get; set; }
        public string? SubCategoryName { get; set; }
    }
}
