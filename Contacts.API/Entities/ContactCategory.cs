namespace Contacts.API.Entities
{
    public enum ContactCategoryEnum
    {
        Private = 1,
        Business = 2,
        Other = 3
    }
    public class ContactCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
