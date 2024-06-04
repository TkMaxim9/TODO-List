namespace TODO.DTOs.PostsDTO;

public class PostDTO
{
    public int Id { get; set; }
    public string Data { get; set; }
    public bool IsDone { get; set; }
    public int UserId { get; set; }
    public int CategoryId { get; set; }
    public string CategoryName { get; set; }
}