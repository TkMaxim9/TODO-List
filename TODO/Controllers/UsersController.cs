using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TODO.Data;
using TODO.DTOs.UsersDto;
using AutoMapper;

namespace TODO.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public UsersController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> GetUserByUsernameAndPassword([FromBody] CreateUserDTO userLoginDTO)
        {
            var user = await _context.Users
                .Where(u => u.Username == userLoginDTO.Username && u.Password == userLoginDTO.Password)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<UserDTO>(user));
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<UserDTO>>(users));
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDTO>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<UserDTO>(user));
        }

        // POST: api/Users
        [HttpPost]
        public async Task<ActionResult<User>> CreateUser(CreateUserDTO createUserDTO)
        {
            // Проверка, существует ли пользователь с таким логином
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Username == createUserDTO.Username);
            if (existingUser != null)
            {
                // Возвращаем ошибку, если пользователь с таким логином уже существует
                return Conflict(new { message = "Пользователь с таким логином уже существует." });
            }
        
            // Создаем нового пользователя
            var user = _mapper.Map<User>(createUserDTO);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        
            var userDTO = _mapper.Map<UserDTO>(user);
        
            return CreatedAtAction(nameof(GetUser), new { id = userDTO.Id }, userDTO);
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UpdateUserDTO updateUserDTO)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            _mapper.Map(updateUserDTO, user);
            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
}