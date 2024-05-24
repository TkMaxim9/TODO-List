using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TODO.Data;

namespace TODO.Controllers;

[ApiController]
[Route("[controller]")]
public class PostsController : ControllerBase
{
    private readonly AppDbContext _context;

    public PostsController(AppDbContext context)
    {
        _context = context;
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Post>>> GetTodoItems()
    {
        return await _context.Posts.ToListAsync();
    }
    
    [HttpGet("user/{userId}")]
    public async Task<ActionResult<IEnumerable<Post>>> GetTodoItemsByUser(int userId)
    {
        return await _context.Posts.Where(t => t.UserId == userId).ToListAsync();
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<Post>> GetTodoItem(int id)
    {
        var todoItem = await _context.Posts.FindAsync(id);

        if (todoItem == null)
        {
            return NotFound();
        }

        return todoItem;
    }

    [HttpPost]
    public async Task<ActionResult<Post>> PostTodoItem(Post todoItem)
    {
        // Поскольку у TodoItem есть UserId, EF автоматически добавит его в коллекцию TodoItems пользователя
        _context.Posts.Add(todoItem);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTodoItem), new { id = todoItem.Id }, todoItem);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutTodoItem(int id, Post todoItem)
    {
        if (id != todoItem.Id)
        {
            return BadRequest();
        }

        _context.Entry(todoItem).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!TodoItemExists(id))
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
    public async Task<IActionResult> DeleteTodoItem(int id)
    {
        var todoItem = await _context.Posts.FindAsync(id);
        if (todoItem == null)
        {
            return NotFound();
        }

        _context.Posts.Remove(todoItem);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool TodoItemExists(int id)
    {
        return _context.Posts.Any(e => e.Id == id);
    }
}