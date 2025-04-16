using AutoMapper;
using Contacts.API.Entities;
using Contacts.API.Models;

namespace Contacts.API
{
    public class ContactsMappingProfile : Profile
    {
        public ContactsMappingProfile() {
            CreateMap<User, UserDto>();
            CreateMap<Contact, ContactDto>()
                .ForMember(d => d.ContactCategory,
                opt => opt.MapFrom(c => c.Category.Name))
                .ForMember(d => d.BusinessContactSubCategory,
                opt => opt.MapFrom(c => c.SubCategory.Name));
            CreateMap<CreateContactDto, Contact>();
            CreateMap<ContactCategory, ContactCategoryDto>();
            CreateMap<BusinessContactSubCategory, BusinessContactSubCategoryDto>();
        }
    }
}
