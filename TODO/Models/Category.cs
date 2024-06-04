﻿namespace TODO;

public class Category
{
    public int Id { get; set; }
        
    public string Title { get; set; }
    
    public int UserId { get; set; }
        
    public User User { get; set; }
        
    public ICollection<Post> Posts { get; set; }
}