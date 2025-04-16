using Contacts.API.Models;
using Contacts.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Contacts.API.Controllers
{
    [ApiController]
    [Route("api/users/{userId}/contacts")]
    [Authorize]
    public class ContactController : ControllerBase
    {
        private IContactService _contactService;

        public ContactController(IContactService contactService)
        {
            _contactService = contactService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllContacts([FromRoute] int userId)
        {
            var contacts = await _contactService.GetAllContacts(userId);

            return Ok(contacts);
        }

        [HttpGet("{contactId}")]
        public async Task<IActionResult> GetContactById([FromRoute] int userId, [FromRoute] int contactId)
        {
            var contact = await _contactService.GetContactById(userId, contactId);

            return Ok(contact);
        }

        [HttpPost]
        public async Task<IActionResult> CreateContact([FromRoute] int userId, [FromBody] CreateContactDto createContactDto)
        {
            var contact = await _contactService.CreateContact(userId, createContactDto);

            return Created($"/api/users/{userId}/contacts/{contact.Id}", contact);
        }
        [HttpDelete("{contactId}")]
        public async Task<IActionResult> DeleteContact([FromRoute] int userId, [FromRoute] int contactId)
        {
            await _contactService.DeleteContact(contactId);

            return NoContent();
        }

        [HttpPatch("{contactId}")]
        public async Task<IActionResult> UpdateContact([FromRoute] int userId, [FromRoute] int contactId, [FromBody] UpdateContactDto updateContactDto)
        {
            var updatedContact = await _contactService.UpdateContact(contactId, updateContactDto);

            return Ok(updatedContact);
        }

        [HttpGet("categories")]
        public async Task<IActionResult> GetAllContactCategories()
        {
            var categories = await _contactService.GetAllContactCategories();

            return Ok(categories);
        }

        [HttpGet("subcategories")]
        public async Task<IActionResult> GetAllBusinessContactSubCategories()
        {
            var subCategories = await _contactService.GetAllBusinessContactSubCategories();

            return Ok(subCategories);
        }
    }
}
