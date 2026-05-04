// Controllers/ApplicationsController.cs
using JobTrackerAPI.Data;
using JobTrackerAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JobTrackerAPI.Controllers
{
    [ApiController]
    [Route("api/applications")]
    public class ApplicationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ApplicationsController(AppDbContext context)
        {
            _context = context;
        }

        // Hämta alla ansökningar
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var applications = await _context.Applications.ToListAsync();
            return Ok(applications);
        }

        // Skapa en ny ansökan
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Application application)
        {
            _context.Applications.Add(application);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAll), new { id = application.Id }, application);
        }
    }
}
