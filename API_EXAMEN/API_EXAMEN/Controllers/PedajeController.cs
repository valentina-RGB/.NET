using API_EXAMEN.Models;
using API_EXAMEN.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace API_EXAMEN.Controllers
{
 
        [Route("api/pedaje")]
        [ApiController]
        public class PedajeController : ControllerBase
        {
            private readonly AplicationDbContext _context;

            public PedajeController(AplicationDbContext context)
            {
                _context = context;
            }

            [HttpGet]
            public async Task<ActionResult<IEnumerable<Pedaje>>> GetC()
            {
                return await _context.pedaje.ToListAsync();
            }

            [HttpGet("{id}")]
            public async Task<ActionResult<Pedaje>> GetIdc(int id)
            {
                var pedaje = await _context.pedaje.FindAsync(id);
                if (pedaje == null)
                {
                    return NotFound();
                }
                return pedaje;

            }

            [HttpPost]
            public async Task<ActionResult<Pedaje>> Postc(Pedaje pedaje)
            {
                _context.pedaje.Add(pedaje);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetC), new { id = pedaje.idPedaje }, pedaje);
            }


            [HttpPut("{id}")]
            public async Task<IActionResult> Putc(int id, Pedaje pedaje)
            {
                if (id != pedaje.idPedaje)
                {
                    return BadRequest();
                }

                _context.Entry(pedaje).State = EntityState.Modified;
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!_context.pedaje.Any(e => e.idPedaje == id))
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
                var pedaje = await _context.pedaje.FindAsync(id);
                if (pedaje == null)
                {
                    return NotFound();
                }

                _context.pedaje.Remove(pedaje);
                await _context.SaveChangesAsync();

                return NoContent();
            }

        }
}
