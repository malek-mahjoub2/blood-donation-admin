using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BloodDonationAPI.Data;
using BloodDonationAPI.Models;
using System.Linq;
using System.Threading.Tasks;

namespace BloodDonationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonorsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DonorsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Donors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Donor>>> GetDonors(
            string searchTerm = "",
            string bloodType = "",
            string governorate = "",
            string status = "")
        {
            var query = _context.Donors.AsQueryable();

            if (!string.IsNullOrEmpty(searchTerm))
            {
                query = query.Where(d => 
                    d.Name.Contains(searchTerm) || 
                    d.CIN.Contains(searchTerm));
            }

            if (!string.IsNullOrEmpty(bloodType))
            {
                query = query.Where(d => d.BloodType == bloodType);
            }

            if (!string.IsNullOrEmpty(governorate))
            {
                query = query.Where(d => d.Governorate == governorate);
            }

            if (!string.IsNullOrEmpty(status))
            {
                query = query.Where(d => d.Status == status);
            }

            return await query.ToListAsync();
        }

        // GET: api/Donors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Donor>> GetDonor(int id)
        {
            var donor = await _context.Donors.FindAsync(id);

            if (donor == null)
            {
                return NotFound();
            }

            return donor;
        }

        // POST: api/Donors
        [HttpPost]
        public async Task<ActionResult<Donor>> CreateDonor(Donor donor)
        {
            _context.Donors.Add(donor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDonor", new { id = donor.DonorId }, donor);
        }

        // PUT: api/Donors/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDonor(int id, Donor donor)
        {
            if (id != donor.DonorId)
            {
                return BadRequest();
            }

            _context.Entry(donor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DonorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Donors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDonor(int id)
        {
            var donor = await _context.Donors.FindAsync(id);
            if (donor == null)
            {
                return NotFound();
            }

            _context.Donors.Remove(donor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PATCH: api/Donors/5/toggle-status
        [HttpPatch("{id}/toggle-status")]
        public async Task<IActionResult> ToggleDonorStatus(int id)
        {
            var donor = await _context.Donors.FindAsync(id);
            if (donor == null)
            {
                return NotFound();
            }

            donor.Status = donor.Status == "active" ? "inactive" : "active";
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Donors/stats
        [HttpGet("stats")]
        public async Task<ActionResult<object>> GetDonorStats()
        {
            var activeDonors = await _context.Donors.CountAsync(d => d.Status == "active");
            var loyalDonors = await _context.Donors.CountAsync(d => d.DonationsCount >= 5);

            return new { 
                activeDonors, 
                loyalDonors 
            };
        }

        private bool DonorExists(int id)
        {
            return _context.Donors.Any(e => e.DonorId == id);
        }
    }
}