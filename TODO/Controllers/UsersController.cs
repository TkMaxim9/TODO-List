using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TODO.Data;

namespace TODO.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;

    public UsersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("register")]
    public async Task<ActionResult<User>> Register(User user)
    {
        if (await _context.Users.AnyAsync(u => u.Username == user.Username))
        {
            return BadRequest("Username already exists.");
        }

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok(user);
    }
    
    [HttpPost("login")]
    public async Task<ActionResult<User>> Login(User login)
    {
        var user = await _context.Users.SingleOrDefaultAsync(u => u.Username == login.Username && u.Password == login.Password);

        if (user == null)
        {
            return Unauthorized("Invalid credentials.");
        }

        return Ok(user);
    }
}