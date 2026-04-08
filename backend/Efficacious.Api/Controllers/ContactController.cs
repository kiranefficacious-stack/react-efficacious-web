using Efficacious.Api.Data;
using Efficacious.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Efficacious.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ContactController : ControllerBase
{
    private readonly AppDbContext _context;

    public ContactController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<Contact>> GetContact()
    {
        // Assuming single contact record for the site settings
        var contact = await _context.Contacts.FirstOrDefaultAsync();
        if (contact == null)
        {
            return NotFound();
        }
        return contact;
    }

    [HttpPost]
    public async Task<ActionResult<Contact>> PostContact(Contact contact)
    {
        // Simplification: Always update or create the single record
        var existing = await _context.Contacts.FirstOrDefaultAsync();
        if (existing != null)
        {
            existing.Address = contact.Address;
            existing.Phone = contact.Phone;
            existing.Email = contact.Email;
            existing.SocialLinks = contact.SocialLinks;
            existing.Website = contact.Website;
            await _context.SaveChangesAsync();
            return Ok(existing);
        }
        else
        {
            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetContact", new { id = contact.Id }, contact);
        }
    }
}
