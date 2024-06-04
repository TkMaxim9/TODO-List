namespace TODO.DTOs.PostsDTO;

public class CreatePostDTO
{
    public string Data { get; set; }
    public bool IsDone { get; set; }
    public int UserId { get; set; }
    public int CategoryId { get; set; }
}