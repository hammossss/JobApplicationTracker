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

        // Hamta alla ansokningar
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var applications = await _context.Applications.ToListAsync();
            return Ok(applications);
        }

        // Hamta ansokningar per status
        [HttpGet("status/{status}")]
        public async Task<IActionResult> GetByStatus(ApplicationStatus status)
        {
            var applications = await _context.Applications
                .Where(a => a.Status == status)
                .ToListAsync();
            return Ok(applications);
        }

        // Hamta statistik
        [HttpGet("stats")]
        public async Task<IActionResult> GetStats()
        {
            var stats = new
            {
                Ansokta = await _context.Applications.CountAsync(a => a.Status == ApplicationStatus.Ansokta),
                Intervju = await _context.Applications.CountAsync(a => a.Status == ApplicationStatus.Intervju),
                Erbjudande = await _context.Applications.CountAsync(a => a.Status == ApplicationStatus.Erbjudande),
                Nekade = await _context.Applications.CountAsync(a => a.Status == ApplicationStatus.Nekade),
                Totalt = await _context.Applications.CountAsync()
            };
            return Ok(stats);
        }

        // Skapa en ny ansokan
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Application application)
        {
            _context.Applications.Add(application);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAll), new { id = application.Id }, application);
        }

        // Uppdatera status
        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] StatusUpdateRequest request)
        {
            var application = await _context.Applications.FindAsync(id);
            if (application == null) return NotFound();

            application.Status = request.Status;
            await _context.SaveChangesAsync();
            return Ok(application);
        }

        // Ta bort en ansokan
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var application = await _context.Applications.FindAsync(id);
            if (application == null) return NotFound();

            _context.Applications.Remove(application);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }

    public class StatusUpdateRequest
    {
        public ApplicationStatus Status { get; set; }
    }
}

