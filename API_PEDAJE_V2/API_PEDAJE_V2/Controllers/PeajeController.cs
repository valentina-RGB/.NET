using API_PEDAJE_V2.Data;
using API_PEDAJE_V2.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API_PEDAJE_V2.Controllers
{
    [Route("api/peaje")]
    [ApiController]
    public class PeajeController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public PeajeController(AplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Peaje>>> GetC()
        {
            return await _context.peaje.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Peaje>> GetIdc(int id)
        {
            var peaje = await _context.peaje.FindAsync(id);
            if (peaje == null)
            {
                return NotFound();
            }
            return peaje;
        }

        [HttpPost]
        public async Task<ActionResult<Peaje>> Postc(Peaje peaje)
        {
            _context.peaje.Add(peaje);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetC), new { id = peaje.idPeaje }, peaje);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Putc(int id, Peaje peaje)
        {
            if (id != peaje.idPeaje)
            {
                return BadRequest();
            }

            _context.Entry(peaje).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.peaje.Any(e => e.idPeaje == id))
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletec(int id)
        {
            var peaje = await _context.peaje.FindAsync(id);
            if (peaje == null)
            {
                return NotFound();
            }

            _context.peaje.Remove(peaje);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
