using AutoMapper;
using Contacts.API.Entities;
using Contacts.API.Exceptions;
using Contacts.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Contacts.API.Services
{
    public class ContactService : IContactService
    {
        private ContactsDbContext _dbContext;
        private IMapper _mapper;
        private IUserContextService _userContextService;

        public ContactService(ContactsDbContext dbContext, IMapper mapper, IUserContextService userContextService)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _userContextService = userContextService;
        }

        public async Task<IEnumerable<ContactDto>> GetAllContacts(int userId)
        {
            var id = _userContextService.GetUserId;
            if (id is null)
                throw new UnathorizedException("You are not logged in.");
            if (userId != id)
                throw new ForbidenException();

            var contacts = await _dbContext.Contact
                .Include(c => c.User)
                .Include(c => c.SubCategory)
                .Include(c => c.Category)
                .Where(c => c.OwnerId == userId)
                .ToListAsync();

            var contactDtos = _mapper.Map<List<ContactDto>>(contacts);

            return contactDtos;
        }

        public async Task<ContactDto> CreateContact(int userId, CreateContactDto dto)
        {
            var id = _userContextService.GetUserId;
            if (id is null)
                throw new UnathorizedException("You are not logged in.");
            if (userId == dto.UserId)
                throw new BadRequestException("Can't add contact to yourself.");
            var contact = _mapper.Map<Contact>(dto);
            contact.OwnerId = userId;

            await _dbContext.Contact.AddAsync(contact);
            await _dbContext.SaveChangesAsync();
            var createdContact = await _dbContext.Contact
                .Include(c => c.User)
                .Include(c => c.SubCategory)
                .Include(c => c.Category)
                .FirstOrDefaultAsync(c => c.Id == contact.Id);

            var contactDto = _mapper.Map<ContactDto>(createdContact);

            return contactDto;
        }

        public async Task DeleteContact(int contactId)
        {
            var userId = _userContextService.GetUserId;
            if (userId is null)
                throw new UnathorizedException("You are not logged in.");
            var contact = await _dbContext.Contact.FirstOrDefaultAsync(c => c.Id == contactId);

            if (contact is null)
                throw new NotFoundException("Contact with given id was not found.");
            if (contact.OwnerId != userId)
                throw new ForbidenException();

            _dbContext.Contact.Remove(contact);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<ContactDto> UpdateContact(int contactId, UpdateContactDto dto)
        {
            var userId = _userContextService.GetUserId;
            if (userId is null)
                throw new UnathorizedException("You are not logged in.");
            var contact = await _dbContext.Contact.FirstOrDefaultAsync(c => c.Id == contactId);

            if (contact is null)
                throw new NotFoundException("Contact with given id was not found.");
            if (contact.OwnerId != userId)
                throw new ForbidenException();

            if (dto.Name != null)
                contact.Name = dto.Name;
            
            if (dto.CategoryId is not null)
            {
                contact.CategoryId = (int)dto.CategoryId;
                contact.SubCategoryId = dto.SubCategoryId;
                contact.SubCategoryName = dto.SubCategoryName;
            }
                
            _dbContext.Contact.Update(contact);
            await _dbContext.SaveChangesAsync();

            var updatedContact = await _dbContext.Contact
                .Include(c => c.User)
                .Include(c => c.SubCategory)
                .Include(c => c.Category)
                .FirstOrDefaultAsync(c => c.Id == contactId);
            
            var updatedContactDto = _mapper.Map<ContactDto>(updatedContact);
            return updatedContactDto;
        }
    }
    public interface IContactService
    {
        Task<IEnumerable<ContactDto>> GetAllContacts(int userId);
        Task<ContactDto> CreateContact(int userId, CreateContactDto dto);
        Task DeleteContact(int contactId);
        Task<ContactDto> UpdateContact(int contactId, UpdateContactDto dto);
    }
}
