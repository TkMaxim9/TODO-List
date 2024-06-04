using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TODO.Data;
using AutoMapper;
using TODO.DTOs.PostsDTO;

namespace TODO.Controllers;

[ApiController]
[Route("[controller]")]
public class PostsController : ControllerBase
{
    private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public PostsController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Posts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostDTO>>> GetPosts()
        {
            var posts = await _context.Posts
                .Include(p => p.Category) // Включаем информацию о категории
                .ToListAsync();

            var postDTOs = posts.Select(p => new PostDTO
            {
                Id = p.Id,
                Data = p.Data,
                IsDone = p.IsDone,
                UserId = p.UserId,
                CategoryId = p.CategoryId, // Идентификатор категории
                CategoryName = p.Category != null ? p.Category.Title : null // Название категории
            });

            return Ok(postDTOs);
        }

// GET: api/Posts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PostDTO>> GetPost(int id)
        {
            var post = await _context.Posts
                .Include(p => p.Category) // Включаем информацию о категории
                .FirstOrDefaultAsync(p => p.Id == id);

            if (post == null)
            {
                return NotFound();
            }

            var postDTO = new PostDTO
            {
                Id = post.Id,
                Data = post.Data,
                IsDone = post.IsDone,
                UserId = post.UserId,
                CategoryId = post.CategoryId, // Идентификатор категории
                CategoryName = post.Category != null ? post.Category.Title : null // Название категории
            };

            return Ok(postDTO);
        }

        // GET: api/Users/{userId}/posts
        [HttpGet("~/Users/{userId}/Posts")]
        public async Task<ActionResult<IEnumerable<PostDTO>>> GetUserPosts(int userId)
        {
            var posts = await _context.Posts
                .Where(p => p.UserId == userId)
                .Select(p => new PostDTO
                {
                    Id = p.Id,
                    Data = p.Data,
                    IsDone = p.IsDone,
                    UserId = p.UserId,
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category.Title // Здесь мы получаем название категории
                })
                .ToListAsync();

            return Ok(posts);
        }

        // POST: api/Posts
        [HttpPost]
        public async Task<ActionResult<Post>> CreatePost(CreatePostDTO createPostDTO)
        {
            var post = _mapper.Map<Post>(createPostDTO);
            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            var postDTO = _mapper.Map<PostDTO>(post);

            return CreatedAtAction(nameof(GetPost), new { id = postDTO.Id }, postDTO);
        }

        // PUT: api/Posts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePost(int id, UpdatePostDTO updatePostDTO)
        {
            var post = await _context.Posts.FindAsync(id);

            if (post == null)
            {
                return NotFound();
            }

            // Обновляем данные поста из DTO
            _mapper.Map(updatePostDTO, post);

            // Обновляем идентификатор категории в посте
            post.CategoryId = updatePostDTO.CategoryId;

            // Устанавливаем состояние сущности Post как измененное
            _context.Entry(post).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostExists(id))
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

        // DELETE: api/Posts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null)
            {
                return NotFound();
            }

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PostExists(int id)
        {
            return _context.Posts.Any(e => e.Id == id);
        }
}