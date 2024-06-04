namespace TODO;

public class User
{
    public int Id { get; set; }
    
    public string Username { get; set; }
    
    public string Password { get; set; }
    
    public ICollection<Post> Posts { get; set; }
    
    public ICollection<Category> Categories { get; set; }
}