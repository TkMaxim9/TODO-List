namespace TODO;

public class Post
{
    public int Id { get; set; }
        
    public string Data { get; set; }
        
    public bool IsDone { get; set; }
        
    public int UserId { get; set; }
        
    public User User { get; set; }

    public int CategoryId { get; set; }
        
    public Category Category { get; set; }
}